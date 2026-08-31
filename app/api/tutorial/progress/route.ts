import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const phaseSlug = searchParams.get('phaseSlug')

    if (!phaseSlug) {
      return NextResponse.json({ error: 'phaseSlug is required' }, { status: 400 })
    }

    const progress = await prisma.tutorialProgress.findUnique({
      where: {
        traineeId_phaseSlug: {
          traineeId: session.user.id,
          phaseSlug,
        },
      },
    })

    return NextResponse.json(progress ?? { engagedAt: null })
  } catch (error) {
    console.error('Error fetching tutorial progress:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { phaseSlug, quizScore, quizTotal, scenarioChoice, reflectionText, type } = body

    if (!phaseSlug) {
      return NextResponse.json({ error: 'phaseSlug is required' }, { status: 400 })
    }

    const traineeId = session.user.id

    // Fetch existing progress
    const existing = await prisma.tutorialProgress.findUnique({
      where: {
        traineeId_phaseSlug: {
          traineeId,
          phaseSlug,
        },
      },
    })

    const newQuizScore = quizScore !== undefined ? quizScore : existing?.quizScore
    const newQuizTotal = quizTotal !== undefined ? quizTotal : existing?.quizTotal
    const newScenarioChoice = scenarioChoice !== undefined ? scenarioChoice : existing?.scenarioChoice
    const newReflection = reflectionText !== undefined ? reflectionText : existing?.reflectionText
    const newAttempts = type === 'QUIZ' ? (existing?.quizAttempts ?? 0) + 1 : (existing?.quizAttempts ?? 0)

    // Check if engagement condition is met:
    // 1. Quiz has been attempted (quizTotal is set and > 0)
    // 2. Scenario choice has been made (scenarioChoice is non-empty string)
    const isQuizDone = newQuizTotal !== null && newQuizTotal !== undefined && newQuizTotal > 0
    const isScenarioDone = !!newScenarioChoice
    const isNowEngaged = isQuizDone && isScenarioDone

    const engagedAt = existing?.engagedAt ?? (isNowEngaged ? new Date() : null)

    const updated = await prisma.tutorialProgress.upsert({
      where: {
        traineeId_phaseSlug: {
          traineeId,
          phaseSlug,
        },
      },
      create: {
        traineeId,
        phaseSlug,
        readAt: new Date(),
        quizScore: newQuizScore,
        quizTotal: newQuizTotal,
        quizAttempts: newAttempts || 1,
        scenarioChoice: newScenarioChoice,
        reflectionText: newReflection,
        engagedAt,
      },
      update: {
        readAt: existing?.readAt ?? new Date(),
        quizScore: newQuizScore,
        quizTotal: newQuizTotal,
        quizAttempts: newAttempts,
        scenarioChoice: newScenarioChoice,
        reflectionText: newReflection,
        engagedAt,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error saving tutorial progress:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
