import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Shield,
  Calendar,
  Database,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react'
import { CohortManager } from '@/components/trainer/CohortManager'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'

export const dynamic = 'force-dynamic'

export default async function TrainerDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'TRAINER') {
    redirect('/login')
  }

  // Fetch all trainees
  const trainees = await prisma.user.findMany({
    where: { role: 'TRAINEE' },
    include: {
      traineeProgress: {
        include: { feedback: true },
        orderBy: { dayNumber: 'asc' },
      },
      tutorialProgress: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch all trainers
  const trainers = await prisma.user.findMany({
    where: { role: 'TRAINER' },
    orderBy: { createdAt: 'asc' },
  })

  // Fetch simulation calendar
  const calendarDays = await prisma.simulationCalendar.findMany({
    orderBy: { dayNumber: 'asc' },
  })

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#f7f9fb]">
      <FrappeSidebar />

      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl overflow-x-hidden">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#737686] mb-1">
              <Link href="/trainer/dashboard" className="hover:text-[#191c1e]">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#191c1e]">Trainer Administration</span>
              <span>/</span>
              <span className="text-[#004ac6] font-medium">Cohort Center</span>
            </div>
            <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight flex items-center gap-2.5">
              HR Faculty & Cohort Center
              <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                Trainer Role
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/trainer/seed">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e] shadow-2xs"
              >
                <Database className="w-3.5 h-3.5 text-[#2563eb]" /> Reset Database
              </Button>
            </Link>
            <Link href="/trainer/tutorial-editor">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e] shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#2563eb]" /> Curriculum
              </Button>
            </Link>
          </div>
        </div>

        {/* Cohort Manager */}
        <CohortManager
          initialTrainees={trainees}
          initialTrainers={trainers}
          calendarDays={calendarDays}
        />
      </main>
    </div>
  )
}
