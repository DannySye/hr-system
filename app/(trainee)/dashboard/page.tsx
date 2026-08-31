import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTraineeFullTimeline } from '@/lib/day-gating'
import { ProgressStepper } from '@/components/shared/ProgressStepper'
import { ContinuousThreadsPanel } from '@/components/shared/ContinuousThreadsPanel'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Award, Sparkles, MessageSquare, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { ProgressStatus } from "@/lib/types"

export default async function TraineeDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const timeline = await getTraineeFullTimeline(session.user.id)

  // Determine current active day
  const currentActiveDay =
    timeline.find((t) => t.status === ProgressStatus.IN_PROGRESS) ||
    timeline.find((t) => t.isUnlocked && t.status !== ProgressStatus.GRADED) ||
    timeline[0]

  const completedCount = timeline.filter(
    (t) => t.status === ProgressStatus.SUBMITTED || t.status === ProgressStatus.GRADED
  ).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-teal-600 text-[10px] uppercase font-bold tracking-wider">
              Simulation in Progress
            </Badge>
            <span className="text-xs text-slate-300">
              {completedCount} of 12 Simulation Days Completed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {session.user.name || 'Alex'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You are operating as NovaLink Global&apos;s junior HR specialist. Each day presents hands-on talent challenges, AI persona interactions, and policy decisions across the complete employee lifecycle.
          </p>
        </div>

        {currentActiveDay && (
          <div className="w-full md:w-auto shrink-0 bg-white/10 backdrop-blur rounded-xl p-4 border border-white/15 flex flex-col sm:flex-row md:flex-col items-center justify-between gap-3">
            <div className="text-center sm:text-left md:text-center">
              <span className="text-[11px] text-teal-300 font-semibold uppercase tracking-wider block">
                Current Active Module
              </span>
              <span className="text-sm font-bold text-white block mt-0.5">
                Day {currentActiveDay.dayNumber}: {currentActiveDay.title}
              </span>
            </div>
            <Link href={`/day/${currentActiveDay.dayNumber}`} className="w-full">
              <Button className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" />
                Resume Day {currentActiveDay.dayNumber}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* 12-Day Interactive Stepper */}
      <ProgressStepper timeline={timeline} currentDay={currentActiveDay?.dayNumber} />

      {/* Bottom Grid: Continuous Storylines & Knowledge Hub Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContinuousThreadsPanel currentDay={currentActiveDay?.dayNumber || 1} />
        </div>

        <div className="space-y-6">
          {/* Quick Hub Card */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <CardTitle className="text-sm font-bold">Interactive HR Guides</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Master employment law, job analysis, and interview best practices before submitting daily deliverables.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <Link
                href="/tutorials/workforce-planning"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-xs font-medium transition"
              >
                <span>Phase 1: Workforce Planning & Scoping</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
              </Link>
              <Link
                href="/tutorials/sourcing-strategy"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-xs font-medium transition"
              >
                <span>Phase 2: Job Ads & Sourcing Channels</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
              </Link>
              <Link
                href="/tutorials/selection-shortlisting"
                className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-xs font-medium transition"
              >
                <span>Phase 3: Structured Interviewing</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
              </Link>
            </CardContent>
          </Card>

          {/* Trainer Feedback Feed */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-700" />
                <CardTitle className="text-sm font-bold">Trainer Evaluations</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Feedback and rubric evaluations provided by Lead Trainer Eleanor Vance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {timeline.some((t) => t.feedback) ? (
                <div className="space-y-3">
                  {timeline
                    .filter((t) => t.feedback)
                    .map((t) => (
                      <div key={t.dayNumber} className="p-3 rounded-lg bg-teal-50/60 border border-teal-200 text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                          <span>Day {t.dayNumber}: {t.title}</span>
                          <Badge variant="success" className="text-[9px]">Graded</Badge>
                        </div>
                        <p className="text-slate-600 text-[11px]">{t.feedback?.comments}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  No submissions graded yet. Complete and submit Day 1 to receive trainer rubric scores.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
