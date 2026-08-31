import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const employeeId = searchParams.get('employeeId') || 'emp-100'

    const employee = await prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { name: 'Jordan Hayes' }, { fullName: 'Jordan Hayes' }],
      },
    })

    if (!employee) {
      return NextResponse.json({ employee: null, probationReview: null, appraisal: null })
    }

    const probationReview = await prisma.probationReview.findFirst({
      where: { employeeId: employee.id },
      orderBy: { createdAt: 'desc' },
    })

    const appraisal = await prisma.performanceAppraisal.findFirst({
      where: { employeeId: employee.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      employee,
      probationReview,
      appraisal,
    })
  } catch (error) {
    console.error('Error fetching evidence:', error)
    return NextResponse.json({ error: 'Failed to fetch evidence' }, { status: 500 })
  }
}
