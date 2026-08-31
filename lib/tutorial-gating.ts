import { prisma } from '@/lib/prisma'

/**
 * Checks whether a trainee has engaged with the tutorial for a given phase.
 * Engagement is satisfied when engagedAt is non-null (i.e. KnowledgeCheck and ScenarioDecision both completed).
 */
export async function isTutorialEngaged(traineeId: string, phaseSlug: string): Promise<{
  engaged: boolean
  progress: {
    quizScore?: number | null
    quizTotal?: number | null
    quizAttempts?: number
    scenarioChoice?: string | null
    reflectionText?: string | null
    engagedAt?: Date | null
  } | null
}> {
  const record = await prisma.tutorialProgress.findUnique({
    where: {
      traineeId_phaseSlug: {
        traineeId,
        phaseSlug,
      },
    },
  })

  if (!record || !record.engagedAt) {
    return {
      engaged: false,
      progress: record
        ? {
            quizScore: record.quizScore,
            quizTotal: record.quizTotal,
            quizAttempts: record.quizAttempts,
            scenarioChoice: record.scenarioChoice,
            reflectionText: record.reflectionText,
            engagedAt: record.engagedAt,
          }
        : null,
    }
  }

  return {
    engaged: true,
    progress: {
      quizScore: record.quizScore,
      quizTotal: record.quizTotal,
      quizAttempts: record.quizAttempts,
      scenarioChoice: record.scenarioChoice,
      reflectionText: record.reflectionText,
      engagedAt: record.engagedAt,
    },
  }
}

/**
 * Server-side guard to assert that the tutorial requirement has been fulfilled before submitting a simulation day.
 */
export async function assertTutorialCompleted(traineeId: string, phaseSlug: string) {
  const { engaged } = await isTutorialEngaged(traineeId, phaseSlug)
  if (!engaged) {
    throw new Error(
      `Tutorial engagement required: Please complete the Knowledge Check and Scenario Decision for "${phaseSlug}" before submitting.`
    )
  }
}
