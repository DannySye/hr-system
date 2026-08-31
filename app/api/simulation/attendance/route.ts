import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const records = await prisma.attendanceRecord.findMany({
      include: {
        employee: true,
      },
      orderBy: { date: 'desc' },
      take: 50,
    })

    return NextResponse.json({ records })
  } catch (error: any) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Advance simulated working day
    const employees = await prisma.employee.findMany()
    const latestRecord = await prisma.attendanceRecord.findFirst({
      orderBy: { date: 'desc' },
    })

    const nextDate = latestRecord ? new Date(latestRecord.date) : new Date('2026-08-15')
    nextDate.setDate(nextDate.getDate() + 1)
    // skip weekends
    if (nextDate.getDay() === 6) nextDate.setDate(nextDate.getDate() + 2)
    if (nextDate.getDay() === 0) nextDate.setDate(nextDate.getDate() + 1)

    const createdRecords = []
    for (const emp of employees) {
      const isJordan = emp.name.includes('Jordan')
      // Jordan has ~45% chance of lateness
      const isLate = isJordan ? Math.random() < 0.45 : Math.random() < 0.08
      const isSick = !isJordan && Math.random() < 0.04

      let status = 'PRESENT'
      let timeIn = '08:56'
      let timeOut = '17:30'
      let remarks = 'Punctual arrival.'

      if (isSick) {
        status = 'ABSENT'
        timeIn = '--:--'
        timeOut = '--:--'
        remarks = 'Reported sick with migraine.'
      } else if (isLate) {
        status = 'LATE'
        const lateMin = Math.floor(Math.random() * 40) + 25
        timeIn = `09:${lateMin}`
        remarks = isJordan
          ? `Late arrival (${lateMin}m): Transport disruption on central commuter line, no prior call.`
          : `Late arrival (${lateMin}m): Traffic delay on bridge route.`
      }

      const rec = await prisma.attendanceRecord.upsert({
        where: {
          employeeId_date: {
            employeeId: emp.id,
            date: nextDate,
          },
        },
        create: {
          employeeId: emp.id,
          date: nextDate,
          timeIn,
          timeOut,
          status,
          remarks,
        },
        update: {
          timeIn,
          timeOut,
          status,
          remarks,
        },
      })
      createdRecords.push(rec)
    }

    return NextResponse.json({
      success: true,
      simulatedDate: nextDate.toISOString().split('T')[0],
      recordsCount: createdRecords.length,
    })
  } catch (error: any) {
    console.error('Error advancing attendance day:', error)
    return NextResponse.json({ error: error.message || 'Failed to advance day' }, { status: 500 })
  }
}
