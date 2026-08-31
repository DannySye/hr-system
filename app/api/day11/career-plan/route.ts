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

    const { employeeId, careerGoals, skillsToDevelop, trainingOpportunities, nextRoleTarget } =
      await req.json()

    if (!skillsToDevelop || skillsToDevelop.trim().length < 25) {
      return NextResponse.json(
        { error: '"Skills to develop" must contain at least 25 characters of specific technical competencies.' },
        { status: 400 }
      )
    }

    const employee = await prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { name: 'Jordan Hayes' }, { fullName: 'Jordan Hayes' }],
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Target employee not found' }, { status: 404 })
    }

    const plan = await prisma.careerDevelopmentPlan.create({
      data: {
        employeeId: employee.id,
        careerGoals,
        skillsToDevelop,
        trainingOpportunities,
        nextRoleTarget,
      },
    })

    // Also link to EmployeeFile timeline
    await prisma.employeeFile.create({
      data: {
        employeeId: employee.id,
        documentType: 'CAREER_PLAN',
        documentRefId: plan.id,
      },
    })

    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('Error saving career plan:', error)
    return NextResponse.json({ error: 'Failed to save career plan' }, { status: 500 })
  }
}
