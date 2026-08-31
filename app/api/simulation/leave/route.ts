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

    const balances = await prisma.leaveBalance.findMany({
      include: {
        employee: true,
        leaveType: true,
      },
    })

    const requests = await prisma.leaveRequest.findMany({
      include: {
        employee: true,
        leaveType: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const leaveTypes = await prisma.leaveType.findMany()

    return NextResponse.json({ balances, requests, leaveTypes })
  } catch (error: any) {
    console.error('Error fetching leave data:', error)
    return NextResponse.json({ error: 'Failed to fetch leave data' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { action, requestId, employeeId, leaveTypeId, startDate, endDate, days } = body

    if (action === 'REQUEST') {
      const newReq = await prisma.leaveRequest.create({
        data: {
          employeeId,
          leaveTypeId,
          startDate: new Date(startDate || Date.now()),
          endDate: new Date(endDate || Date.now() + 86400000 * 3),
          days: parseInt(days || '3', 10),
          status: 'REQUESTED',
        },
      })
      return NextResponse.json({ success: true, request: newReq })
    }

    if (action === 'APPROVE') {
      const targetReq = await prisma.leaveRequest.findUnique({
        where: { id: requestId },
        include: { leaveType: true },
      })

      if (!targetReq) {
        return NextResponse.json({ error: 'Request not found' }, { status: 404 })
      }

      await prisma.leaveRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          approvedBy: session.user.name || 'HR Trainee',
        },
      })

      // Deduct leave balance
      await prisma.leaveBalance.update({
        where: {
          employeeId_leaveTypeId: {
            employeeId: targetReq.employeeId,
            leaveTypeId: targetReq.leaveTypeId,
          },
        },
        data: {
          used: { increment: targetReq.days },
          balance: { decrement: targetReq.days },
        },
      })

      return NextResponse.json({ success: true, message: 'Leave request approved and balance updated.' })
    }

    if (action === 'REJECT') {
      await prisma.leaveRequest.update({
        where: { id: requestId },
        data: {
          status: 'REJECTED',
          approvedBy: session.user.name || 'HR Trainee',
        },
      })
      return NextResponse.json({ success: true, message: 'Leave request rejected.' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('Leave action error:', error)
    return NextResponse.json({ error: error.message || 'Failed to process leave action' }, { status: 500 })
  }
}
