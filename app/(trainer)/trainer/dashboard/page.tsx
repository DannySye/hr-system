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
} from 'lucide-react'
import { CohortManager } from '@/components/trainer/CohortManager'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <Badge variant="default" className="bg-teal-600 text-[10px] uppercase font-bold">
              Trainer Administration
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            NovaLink Simulation Control Center
          </h1>
          <p className="text-xs text-slate-300">
            Manage cohort members, create custom trainee & trainer accounts, and evaluate daily deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/trainer/seed">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Database className="w-3.5 h-3.5 text-teal-300" /> Seed Console
            </Button>
          </Link>
          <Link href="/trainer/tutorial-editor">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-300" /> Tutorial Inspector
            </Button>
          </Link>
        </div>
      </div>

      {/* Cohort Manager (Trainees + Trainers + Add User Modal) */}
      <CohortManager initialTrainees={trainees} initialTrainers={trainers} />

      {/* Global Simulation Calendar Days */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">12-Day Simulation Roadmap Schedule</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Stages and module titles configured across the NovaLink curriculum.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {calendarDays.map((cal) => (
              <div
                key={cal.dayNumber}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Day {cal.dayNumber}</span>
                  <Badge
                    variant={cal.manualUnlock ? 'default' : 'outline'}
                    className="text-[9px]"
                  >
                    {cal.manualUnlock ? 'Force Unlocked' : 'Progression'}
                  </Badge>
                </div>
                <p className="text-slate-600 line-clamp-2">{cal.stageLabels}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
