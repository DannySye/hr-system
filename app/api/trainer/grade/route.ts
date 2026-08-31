import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProgressStatus } from "@/lib/types"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized: Session required' }, { status: 401 })
    }

    const body = await req.json()
    const { traineeProgressId, rubricScores = {}, comments = '', status = 'GRADED' } = body

    if (!traineeProgressId) {
      return NextResponse.json(
        { error: 'traineeProgressId is required' },
        { status: 400 }
      )
    }

    const scoresString = typeof rubricScores === 'string' ? rubricScores : JSON.stringify(rubricScores)
    const feedbackComments = comments || 'Deliverable approved and graded by HR Assessor.'

    // Upsert TrainerFeedback
    const feedback = await prisma.trainerFeedback.upsert({
      where: { traineeProgressId },
      create: {
        traineeProgressId,
        rubricScores: scoresString,
        comments: feedbackComments,
      },
      update: {
        rubricScores: scoresString,
        comments: feedbackComments,
        gradedAt: new Date(),
      },
    })

    // Update status to GRADED in TraineeProgress
    const updatedProgress = await prisma.traineeProgress.update({
      where: { id: traineeProgressId },
      data: {
        status: status === 'REVISION_REQUESTED' ? ProgressStatus.IN_PROGRESS : ProgressStatus.GRADED,
      },
      include: {
        trainee: true,
      },
    })

    // If day was completed, ensure next day is unlocked for trainee
    if (updatedProgress.dayNumber < 12 && status !== 'REVISION_REQUESTED') {
      await prisma.traineeProgress.upsert({
        where: {
          traineeId_dayNumber: {
            traineeId: updatedProgress.traineeId,
            dayNumber: updatedProgress.dayNumber + 1,
          },
        },
        create: {
          traineeId: updatedProgress.traineeId,
          dayNumber: updatedProgress.dayNumber + 1,
          status: ProgressStatus.IN_PROGRESS,
        },
        update: {
          status: ProgressStatus.IN_PROGRESS,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Trainee deliverable for Day ${updatedProgress.dayNumber} has been graded and approved in the HR System.`,
      feedback,
      progress: updatedProgress,
    })
  } catch (error: any) {
    console.error('Grading error:', error)
    return NextResponse.json({ error: error.message || 'Failed to submit grade' }, { status: 500 })
  }
}
