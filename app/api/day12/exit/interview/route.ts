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

    const {
      employeeId,
      whyLeaving,
      whatEnjoyed,
      challenges,
      managementFeedback,
      improvementSuggestions,
      wouldRecommend,
    } = await req.json()

    const employee = await prisma.employee.findFirst({
      where: {
        OR: [{ id: employeeId }, { name: 'Elena Rostova' }, { fullName: 'Elena Rostova' }],
      },
      include: {
        aiPersona: true,
        exitRecord: true,
      },
    })

    if (!employee) {
      return NextResponse.json({ error: 'Departing employee not found' }, { status: 404 })
    }

    // 1. Ensure ExitRecord exists
    let exitRecord = employee.exitRecord
    if (!exitRecord) {
      exitRecord = await prisma.exitRecord.create({
        data: {
          employeeId: employee.id,
          exitReason: 'RESIGNATION',
          noticeDate: new Date(),
          handoverNotes: 'Standard operational handover of network systems telemetry.',
          propertyReturned: true,
          finalPayrollNote: 'Final salary and accrued holiday pay approved.',
        },
      })
    }

    // 2. Ensure an Interview session record exists
    let personaId = employee.aiPersonaId
    if (!personaId) {
      const persona = await prisma.aiPersona.findFirst({ where: { name: 'Elena Rostova' } })
      personaId = persona?.id || ''
    }

    const interview = await prisma.interview.create({
      data: {
        aiPersonaId: personaId,
        interviewType: 'EXIT',
        dayNumber: 12,
        transcript: JSON.stringify({ summary: 'Exit interview with Elena Rostova' }),
      },
    })

    // 3. Upsert ExitInterview record
    const exitInterview = await prisma.exitInterview.upsert({
      where: { exitRecordId: exitRecord.id },
      update: {
        interviewId: interview.id,
        whyLeaving,
        whatEnjoyed,
        challenges,
        managementFeedback,
        improvementSuggestions,
        wouldRecommend: Boolean(wouldRecommend),
      },
      create: {
        exitRecordId: exitRecord.id,
        interviewId: interview.id,
        whyLeaving,
        whatEnjoyed,
        challenges,
        managementFeedback,
        improvementSuggestions,
        wouldRecommend: Boolean(wouldRecommend),
      },
    })

    return NextResponse.json({ success: true, exitInterview })
  } catch (error) {
    console.error('Error saving exit interview:', error)
    return NextResponse.json({ error: 'Failed to save exit interview' }, { status: 500 })
  }
}
