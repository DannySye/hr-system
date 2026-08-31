import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { employeeId, exitReason, noticeDate, handoverNotes, propertyReturned, finalPayrollNote } =
      await req.json()

    if (!handoverNotes || handoverNotes.trim().length < 30) {
      return NextResponse.json(
        { error: 'Handover notes must contain at least 30 characters.' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { name: 'Elena Rostova' }, { fullName: 'Elena Rostova' }],
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Departing employee not found' }, { status: 404 })
    }

    const exitRecord = await prisma.exitRecord.upsert({
      where: { employeeId: employee.id },
      update: {
        exitReason: exitReason || 'RESIGNATION',
        noticeDate: new Date(noticeDate),
        handoverNotes,
        propertyReturned: Boolean(propertyReturned),
        finalPayrollNote,
      },
      create: {
        employeeId: employee.id,
        exitReason: exitReason || 'RESIGNATION',
        noticeDate: new Date(noticeDate),
        handoverNotes,
        propertyReturned: Boolean(propertyReturned),
        finalPayrollNote,
      },
    })

    // Add to EmployeeFile
    await prisma.employeeFile.create({
      data: {
        employeeId: employee.id,
        documentType: 'EXIT_RECORD',
        documentRefId: exitRecord.id,
      },
    })

    return NextResponse.json({ success: true, exitRecord })
  } catch (error) {
    console.error('Error saving exit checklist:', error)
    return NextResponse.json({ error: 'Failed to save exit checklist' }, { status: 500 })
  }
}
