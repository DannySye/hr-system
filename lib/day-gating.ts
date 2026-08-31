import { prisma } from '@/lib/prisma'
import { ProgressStatus } from '@/lib/types'

export interface DayGatingResult {
  unlocked: boolean
  status: ProgressStatus
  reason?: string
}

export async function isDayUnlocked(
  traineeId: string,
  targetDay: number
): Promise<DayGatingResult> {
  if (targetDay < 1 || targetDay > 12) {
    return {
      unlocked: false,
      status: ProgressStatus.LOCKED,
      reason: 'Invalid simulation day number.',
    }
  }

  // Day 1 is always unlocked
  if (targetDay === 1) {
    const currentProgress = await prisma.traineeProgress.findUnique({
      where: { traineeId_dayNumber: { traineeId, dayNumber: 1 } },
    })
    return {
      unlocked: true,
      status: (currentProgress?.status as ProgressStatus) ?? ProgressStatus.IN_PROGRESS,
    }
  }

  // Check manual unlock override
  const calendarDay = await prisma.simulationCalendar.findUnique({
    where: { dayNumber: targetDay },
  })

  if (calendarDay?.manualUnlock) {
    const progress = await prisma.traineeProgress.findUnique({
      where: { traineeId_dayNumber: { traineeId, dayNumber: targetDay } },
    })
    return {
      unlocked: true,
      status: (progress?.status as ProgressStatus) ?? ProgressStatus.IN_PROGRESS,
    }
  }

  // Check previous day status
  const previousDay = targetDay - 1
  const prevProgress = await prisma.traineeProgress.findUnique({
    where: { traineeId_dayNumber: { traineeId, dayNumber: previousDay } },
  })

  const isPrevComplete =
    prevProgress?.status === ProgressStatus.SUBMITTED ||
    prevProgress?.status === ProgressStatus.GRADED

  if (!isPrevComplete) {
    return {
      unlocked: false,
      status: ProgressStatus.LOCKED,
      reason: `Day ${previousDay} deliverables must be submitted before Day ${targetDay} unlocks.`,
    }
  }

  const currentProgress = await prisma.traineeProgress.findUnique({
    where: { traineeId_dayNumber: { traineeId, dayNumber: targetDay } },
  })

  return {
    unlocked: true,
    status: (currentProgress?.status as ProgressStatus) ?? ProgressStatus.IN_PROGRESS,
  }
}

export async function getTraineeFullTimeline(traineeId: string) {
  const allDays = await prisma.simulationCalendar.findMany({
    orderBy: { dayNumber: 'asc' },
  })

  const progressRecords = await prisma.traineeProgress.findMany({
    where: { traineeId },
    include: { feedback: true },
  })

  const progressMap = new Map(progressRecords.map((p) => [p.dayNumber, p]))

  const timeline = allDays.map((day) => {
    const record = progressMap.get(day.dayNumber)
    let isUnlocked = false
    let status: ProgressStatus = (record?.status as ProgressStatus) ?? ProgressStatus.LOCKED

    if (day.dayNumber === 1 || day.manualUnlock) {
      isUnlocked = true
    } else {
      const prevRecord = progressMap.get(day.dayNumber - 1)
      if (
        prevRecord?.status === ProgressStatus.SUBMITTED ||
        prevRecord?.status === ProgressStatus.GRADED
      ) {
        isUnlocked = true
      }
    }

    return {
      dayNumber: day.dayNumber,
      title: day.stageLabels,
      stageLabels: day.stageLabels,
      isUnlocked,
      status: status ?? (isUnlocked ? ProgressStatus.IN_PROGRESS : ProgressStatus.LOCKED),
      submittedAt: record?.submittedAt,
      feedback: record?.feedback,
    }
  })

  return timeline
}

export async function getTraineeSimulationStatus(traineeId: string) {
  return getTraineeFullTimeline(traineeId)
}
