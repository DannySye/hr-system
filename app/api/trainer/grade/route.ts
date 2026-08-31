import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ProgressStatus } from "@/lib/types"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'TRAINER') {
      return NextResponse.json({ error: 'Unauthorized: Trainer role required' }, { status: 403 })
    }

    const body = await req.json()
    const { traineeProgressId, rubricScores, comments } = body

    if (!traineeProgressId || !comments) {
      return NextResponse.json(
        { error: 'traineeProgressId and feedback comments are required' },
        { status: 400 }
      )
    }

    // Upsert TrainerFeedback
    const feedback = await prisma.trainerFeedback.upsert({
      where: { traineeProgressId },
      create: {
        traineeProgressId,
        rubricScores: rubricScores || {},
        comments,
      },
      update: {
        rubricScores: rubricScores || {},
        comments,
        gradedAt: new Date(),
      },
    })

    // Update status to GRADED
    await prisma.traineeProgress.update({
      where: { id: traineeProgressId },
      data: { status: ProgressStatus.GRADED },
    })

    return NextResponse.json({
      success: true,
      message: 'Grading rubric and comments saved successfully.',
      feedback,
    })
  } catch (error: any) {
    console.error('Grading error:', error)
    return NextResponse.json({ error: error.message || 'Failed to submit grade' }, { status: 500 })
  }
}
