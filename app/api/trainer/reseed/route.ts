import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Role, PersonaType, QualityTier, ProgressStatus } from "@/lib/types"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'TRAINER') {
      return NextResponse.json({ error: 'Unauthorized: Trainer access required' }, { status: 403 })
    }

    // Run seed procedure
    const trainerPassword = await bcrypt.hash('trainer123', 10)
    const traineePassword = await bcrypt.hash('trainee123', 10)

    // Upsert trainer
    await prisma.user.upsert({
      where: { email: 'trainer@novalink.com' },
      create: {
        email: 'trainer@novalink.com',
        passwordHash: trainerPassword,
        role: Role.TRAINER,
        fullName: 'Eleanor Vance (Lead Trainer)',
      },
      update: {
        passwordHash: trainerPassword,
        fullName: 'Eleanor Vance (Lead Trainer)',
      },
    })

    // Upsert trainee
    const trainee = await prisma.user.upsert({
      where: { email: 'trainee@novalink.com' },
      create: {
        email: 'trainee@novalink.com',
        passwordHash: traineePassword,
        role: Role.TRAINEE,
        fullName: 'Alex Mercer (HR Trainee)',
      },
      update: {
        passwordHash: traineePassword,
        fullName: 'Alex Mercer (HR Trainee)',
      },
    })

    // Upsert company
    let company = await prisma.company.findFirst()
    if (!company) {
      company = await prisma.company.create({
        data: {
          name: 'NovaLink Global',
          mission: 'Pioneering distributed infrastructure and empowering connected global teams.',
          vision: 'A world where high-performing organizations operate seamlessly across global borders.',
          orgChartNotes: 'Matrix organization: Human Resources, Engineering, Operations, and Customer Success.',
        },
      })
    }

    // Ensure departments exist
    const deptCount = await prisma.department.count()
    if (deptCount === 0 && company) {
      const hr = await prisma.department.create({
        data: { companyId: company.id, name: 'Human Resources', headOfDept: 'Eleanor Vance' },
      })
      const eng = await prisma.department.create({
        data: { companyId: company.id, name: 'Engineering', headOfDept: 'Marcus Chen' },
      })
      const ops = await prisma.department.create({
        data: { companyId: company.id, name: 'Operations', headOfDept: 'Sarah Jenkins' },
      })

      await prisma.position.createMany({
        data: [
          {
            departmentId: eng.id,
            title: 'Senior Backend Engineer',
            jobPurpose: 'Architect, build, and maintain mission-critical distributed data pipelines.',
            salaryBand: '£75,000 - £90,000',
            location: 'Remote (UK / EU)',
            workingHours: '40 hrs/week Flexible',
          },
          {
            departmentId: hr.id,
            title: 'Junior HR Generalist (Trainee)',
            jobPurpose: 'Execute daily talent and employee relations workflows.',
            salaryBand: '£28,000 - £34,000',
            location: 'Hybrid / London Hub',
            workingHours: '37.5 hrs/week',
          },
        ],
      })
    }

    // Ensure Calendar 1-12 exist
    const calendarCount = await prisma.simulationCalendar.count()
    if (calendarCount < 12) {
      const calendarData = [
        { dayNumber: 1, stageLabels: 'Workforce Planning & Job Analysis' },
        { dayNumber: 2, stageLabels: 'Sourcing Strategy & Job Adverts' },
        { dayNumber: 3, stageLabels: 'Selection Shortlisting & Interviewing' },
        { dayNumber: 4, stageLabels: 'Offer Letters & Employment Contracts' },
        { dayNumber: 5, stageLabels: 'Onboarding & Induction Design' },
        { dayNumber: 6, stageLabels: 'Probationary Review & Check-ins' },
        { dayNumber: 7, stageLabels: 'Attendance & Leave Management' },
        { dayNumber: 8, stageLabels: 'Performance Appraisal & 360 Feedback' },
        { dayNumber: 9, stageLabels: 'Learning & Development Needs Analysis' },
        { dayNumber: 10, stageLabels: 'Employee Welfare & Conflict Resolution' },
        { dayNumber: 11, stageLabels: 'Disciplinary & Grievance Procedures' },
        { dayNumber: 12, stageLabels: 'Exit Interviews & Offboarding' },
      ]

      for (const cal of calendarData) {
        await prisma.simulationCalendar.upsert({
          where: { dayNumber: cal.dayNumber },
          create: {
            dayNumber: cal.dayNumber,
            stageLabels: cal.stageLabels,
            manualUnlock: cal.dayNumber === 1,
          },
          update: {
            stageLabels: cal.stageLabels,
          },
        })
      }
    }

    // Ensure Trainee Progress records
    for (let day = 1; day <= 12; day++) {
      await prisma.traineeProgress.upsert({
        where: { traineeId_dayNumber: { traineeId: trainee.id, dayNumber: day } },
        create: {
          traineeId: trainee.id,
          dayNumber: day,
          status: day === 1 ? ProgressStatus.IN_PROGRESS : ProgressStatus.LOCKED,
        },
        update: {},
      })
    }

    return NextResponse.json({ success: true, message: 'NovaLink HR Lab seed verified successfully.' })
  } catch (err: any) {
    console.error('Seed API error:', err)
    return NextResponse.json({ error: err.message || 'Seed failed' }, { status: 500 })
  }
}
