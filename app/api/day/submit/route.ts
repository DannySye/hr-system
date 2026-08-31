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

    const num = parseInt(String(dayNumber), 10)
    if (isNaN(num) || num < 1 || num > 12) {
      return NextResponse.json(
        { error: 'Invalid day number (must be between 1 and 12)' },
        { status: 400 }
      )
    }

    // 1. Enforce strict sequential phase progression
    if (num > 1) {
      const prevProgress = await prisma.traineeProgress.findUnique({
        where: {
          traineeId_dayNumber: {
            traineeId,
            dayNumber: num - 1,
          },
        },
      })

      const isPrevComplete =
        prevProgress?.status === ProgressStatus.SUBMITTED ||
        prevProgress?.status === ProgressStatus.GRADED

      if (!isPrevComplete) {
        return NextResponse.json(
          {
            error: `Prerequisite Incomplete: You must complete and submit Day ${num - 1} before Day ${num} can be finalized.`,
          },
          { status: 403 }
        )
      }
    }

    // 2. Enforce server-side tutorial engagement gating
    try {
      await assertTutorialCompleted(traineeId, phaseSlug)
    } catch (gatingErr: any) {
      return NextResponse.json(
        { error: gatingErr.message || 'Tutorial completion required prior to submission.' },
        { status: 403 }
      )
    }

    // 3. Flip TraineeProgress for this day to SUBMITTED
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
