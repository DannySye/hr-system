import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Role, ProgressStatus } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, password, role = Role.TRAINEE, inviteCode = '' } = body

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Full Name, Email, and Password are all required.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    const cleanName = fullName.trim()

    // Check if user already exists
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
    const requestedRole = role === Role.TRAINER ? Role.TRAINER : Role.TRAINEE

    // Guard: TRAINER registration requires either an invite code OR being the very first trainer
    if (requestedRole === Role.TRAINER) {
      const expectedCode = process.env.TRAINER_INVITE_CODE
      // Check if any trainer already exists (first-trainer bootstrap allows no code if no trainers exist)
      const existingTrainerCount = await prisma.user.count({ where: { role: Role.TRAINER } })

      if (existingTrainerCount > 0 && expectedCode && inviteCode !== expectedCode) {
        return NextResponse.json(
          { error: 'Invalid trainer invite code. Please contact your programme administrator.' },
          { status: 403 }
        )
      }
    }

    // Create User
    const user = await prisma.user.create({
      data: {
        fullName: cleanName,
        email: cleanEmail,
        passwordHash,
        role: requestedRole,
      },
    })


    // If trainee, initialize Employee record and 12-day simulation progress
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

      // Initialize 12 days progress for the new trainee
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
        message: `Account created successfully for ${cleanName} as ${user.role}.`,
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
    console.error('Registration Error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to create account.' },
      { status: 500 }
    )
  }
}
