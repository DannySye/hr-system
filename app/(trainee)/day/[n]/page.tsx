import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DayLockGuard } from '@/components/shared/DayLockGuard'
import { DayModuleClient } from './DayModuleClient'

export default async function DayDynamicPage({
  params,
}: {
  params: { n: string }
}) {
  const dayNumber = parseInt(params.n, 10)

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 12) {
    redirect('/dashboard')
  }

  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }

  // Load calendar info
  const calendarDay = await prisma.simulationCalendar.findUnique({
    where: { dayNumber },
  })

  // Load trainee's progress on this day
  const traineeProgress = await prisma.traineeProgress.findUnique({
    where: {
      traineeId_dayNumber: {
        traineeId: session.user.id,
        dayNumber,
      },
    },
  })

  // Load appropriate persona for this day
  let persona = null
  if (dayNumber === 1 || dayNumber === 7) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Marcus Chen' } })
  } else if (dayNumber === 3) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Jordan Hayes' } })
  } else if (dayNumber === 4) {
    persona = await prisma.aiPersona.findFirst({ where: { personaType: 'REFEREE' } })
  } else if (dayNumber === 5) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Jordan Hayes' } })
  } else if (dayNumber === 6 || dayNumber === 8) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Riley Morgan' } })
  } else if (dayNumber === 9) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Samira Khan' } })
  } else if (dayNumber === 10) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Jordan Reed' } })
  } else if (dayNumber === 11) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Jordan Hayes' } })
  } else if (dayNumber === 12) {
    persona = await prisma.aiPersona.findFirst({ where: { name: 'Elena Rostova' } })
  } else {
    persona = await prisma.aiPersona.findFirst({
      where: {
        personaType: dayNumber <= 2 ? 'MANAGER' : 'CANDIDATE',
      },
    })
  }

  const phaseSlugs: Record<number, string> = {
    1: 'workforce-planning',
    2: 'recruitment',
    3: 'selection',
    4: 'hiring',
    5: 'onboarding',
    6: 'probation',
    7: 'performance-management',
    8: 'training-development',
    9: 'employee-welfare',
    10: 'discipline',
    11: 'career-development',
    12: 'separation',
  }

  const phaseSlug = phaseSlugs[dayNumber] || 'workforce-planning'
  const dayTitle = calendarDay?.stageLabels || `Simulation Module ${dayNumber}`

  return (
    <DayLockGuard dayNumber={dayNumber}>
      <DayModuleClient
        dayNumber={dayNumber}
        dayTitle={dayTitle}
        phaseSlug={phaseSlug}
        persona={persona}
        initialProgress={traineeProgress}
        traineeId={session.user.id}
      />
    </DayLockGuard>
  )
}
