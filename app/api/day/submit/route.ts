import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { assertTutorialCompleted } from '@/lib/tutorial-gating'
import { ProgressStatus } from "@/lib/types"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const traineeId = session.user.id
    const body = await req.json()
    const { dayNumber, phaseSlug, deliverableData } = body

    if (!dayNumber || !phaseSlug) {
      return NextResponse.json(
        { error: 'dayNumber and phaseSlug are required' },
        { status: 400 }
      )
    }

    // 1. Enforce server-side tutorial engagement gating
    try {
      await assertTutorialCompleted(traineeId, phaseSlug)
    } catch (gatingErr: any) {
      return NextResponse.json(
        { error: gatingErr.message || 'Tutorial completion required prior to submission.' },
        { status: 403 }
      )
    }

    // 2. Flip TraineeProgress for this day to SUBMITTED
    const progress = await prisma.traineeProgress.upsert({
      where: {
        traineeId_dayNumber: {
          traineeId,
          dayNumber,
        },
      },
      create: {
        traineeId,
        dayNumber,
        status: ProgressStatus.SUBMITTED,
        submittedAt: new Date(),
      },
      update: {
        status: ProgressStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    })

    // 3. Unlock the next day if dayNumber < 12
    if (dayNumber < 12) {
      await prisma.traineeProgress.upsert({
        where: {
          traineeId_dayNumber: {
            traineeId,
            dayNumber: dayNumber + 1,
          },
        },
        create: {
          traineeId,
          dayNumber: dayNumber + 1,
          status: ProgressStatus.IN_PROGRESS,
        },
        update: {
          status: ProgressStatus.IN_PROGRESS,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Day ${dayNumber} successfully submitted! Next day is now unlocked.`,
      progress,
    })
  } catch (error: any) {
    console.error('Day submit error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process submission' },
      { status: 500 }
    )
  }
}
