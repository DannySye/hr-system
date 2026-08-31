import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Role, ProgressStatus } from '@/lib/types'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== Role.TRAINER) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true,
        traineeProgress: {
          select: {
            dayNumber: true,
            status: true,
            submittedAt: true,
            feedback: {
              select: {
                id: true,
                rubricScores: true,
                comments: true,
              },
            },
          },
          orderBy: { dayNumber: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ users })
  } catch (err: any) {
    console.error('Fetch Users Error:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== Role.TRAINER) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fullName, email, password, role = Role.TRAINEE } = await req.json()

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Full Name, Email, and Password are all required.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    const cleanName = fullName.trim()

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fullName: cleanName,
        email: cleanEmail,
        passwordHash,
        role: role === Role.TRAINER ? Role.TRAINER : Role.TRAINEE,
      },
    })

    if (user.role === Role.TRAINEE) {
      const emp = await prisma.employee.create({
        data: {
          name: cleanName,
          fullName: cleanName,
          email: cleanEmail,
          jobTitle: 'Junior HR Trainee',
          departmentName: 'Human Resources',
          employeeCode: `NL-${Math.floor(1000 + Math.random() * 9000)}`,
        },
      })

      await prisma.user.update({
        where: { id: user.id },
        data: { employeeId: emp.id },
      })

      for (let day = 1; day <= 12; day++) {
        await prisma.traineeProgress.create({
          data: {
            traineeId: user.id,
            dayNumber: day,
            status: day === 1 ? ProgressStatus.IN_PROGRESS : ProgressStatus.LOCKED,
          },
        })
      }
    }

    return NextResponse.json(
      {
        message: `Successfully added ${cleanName} to cohort as ${user.role}.`,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('Create User Error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create user' }, { status: 500 })
  }
}
