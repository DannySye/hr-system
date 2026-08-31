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
} from 'lucide-react'
import { CohortManager } from '@/components/trainer/CohortManager'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'

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
    <div className="flex min-h-[calc(100vh-3rem)] bg-[#F8F9FA]">
      <FrappeSidebar />

      <main className="flex-1 p-4 sm:p-6 space-y-5 max-w-7xl overflow-x-hidden">
        {/* Frappe Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
              <Link href="/trainer/dashboard" className="hover:text-slate-900">
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Trainer Administration</span>
              <span>/</span>
              <span className="text-teal-700 font-medium">Cohort Center</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              HR Faculty & Cohort Center
              <Badge variant="outline" className="text-[10px] bg-white">
                Trainer Role
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/trainer/seed">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              >
                <Database className="w-3.5 h-3.5 text-teal-700" /> Reset Database
              </Button>
            </Link>
            <Link href="/trainer/tutorial-editor">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5 border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-700" /> Curriculum
              </Button>
            </Link>
          </div>
        </div>

        {/* Cohort Manager */}
        <CohortManager initialTrainees={trainees} initialTrainers={trainers} />

        {/* 12-Day Simulation Roadmap Schedule */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-700" />
            <h3 className="font-bold text-sm text-slate-900">
              12-Day Simulation Curriculum Schedule
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {calendarDays.map((cal) => (
              <div
                key={cal.dayNumber}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Day {cal.dayNumber}</span>
                  <Badge
                    variant={cal.manualUnlock ? 'default' : 'outline'}
                    className="text-[9px] bg-white text-slate-700"
                  >
                    {cal.manualUnlock ? 'Force Unlocked' : 'Progression'}
                  </Badge>
                </div>
                <p className="text-slate-600 line-clamp-2 text-[11px]">{cal.stageLabels}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
