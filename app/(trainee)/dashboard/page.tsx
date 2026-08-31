import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTraineeFullTimeline } from '@/lib/day-gating'
import { ProgressStepper } from '@/components/shared/ProgressStepper'
import { ContinuousThreadsPanel } from '@/components/shared/ContinuousThreadsPanel'
import { PeopleDirectory } from '@/components/shared/PeopleDirectory'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Play,
  Award,
  Sparkles,
  MessageSquare,
  BookOpen,
  Layers,
  Activity,
  Users,
  Briefcase,
  Compass,
  CheckCircle2,
  Shield,
  Clock,
  Plane,
  Plus,
  FileText,
  HelpCircle,
} from 'lucide-react'
import Link from 'next/link'
import { ProgressStatus } from '@/lib/types'

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
    <div className="flex min-h-[calc(100vh-3rem)] bg-[#F8F9FA]">
      {/* Frappe Left Sidebar */}
      <FrappeSidebar />

      {/* Main Frappe Desk Workspace */}
      <main className="flex-1 p-4 sm:p-6 space-y-5 max-w-7xl overflow-x-hidden">
        {/* Frappe Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-0.5">
              <span>Home</span>
              <span>/</span>
              <span className="font-semibold text-slate-800">HR Desk</span>
              <span>/</span>
              <span className="text-teal-700 font-medium">Practicum Workspace</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              HR Operations Desk
              <Badge variant="outline" className="text-[10px] font-normal bg-white">
                Live Simulation
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {currentActiveDay && (
              <Link href={`/day/${currentActiveDay.dayNumber}`}>
                <Button size="sm" className="h-8 text-xs bg-teal-700 hover:bg-teal-800 text-white font-semibold gap-1.5 shadow-xs">
                  <Play className="w-3 h-3 fill-current" />
                  Resume Day {currentActiveDay.dayNumber}: {currentActiveDay.title.split('&')[0]}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Frappe Number Cards (KPI Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Total Employees */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
              Total Employees <Users className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <div className="text-xl font-bold text-slate-900">4 Staff</div>
            <p className="text-[10px] text-emerald-700 font-medium">+1 Open Requisition</p>
          </div>

          {/* Card 2: Punctuality Index */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
              Attendance Index <Clock className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <div className="text-xl font-bold text-slate-900">92.4%</div>
            <p className="text-[10px] text-amber-700 font-medium">4 Lateness Flags Monitored</p>
          </div>

          {/* Card 3: Leave Utilization */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
              Avg Leave Accrual <Plane className="w-3.5 h-3.5 text-slate-400" />
            </span>
            <div className="text-xl font-bold text-slate-900">22.4 Days</div>
            <p className="text-[10px] text-blue-700 font-medium">1 Request In Queue</p>
          </div>

          {/* Card 4: Simulation Progression */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
              Curriculum Stage <Layers className="w-3.5 h-3.5 text-teal-700" />
            </span>
            <div className="text-xl font-bold text-teal-900">
              Day {currentActiveDay?.dayNumber || 1} / 12
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {completedCount} Completed • {12 - completedCount} Remaining
            </p>
          </div>
        </div>

        {/* Frappe Workspace Tabs */}
        <Tabs defaultValue="roadmap" className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-1 shadow-2xs">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-slate-100/70 p-1">
              <TabsTrigger
                value="roadmap"
                className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-1.5 h-7"
              >
                <Layers className="w-3.5 h-3.5 text-teal-700" />
                <span>Simulation Roadmap</span>
              </TabsTrigger>

              <TabsTrigger
                value="directory"
                className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-1.5 h-7"
              >
                <Users className="w-3.5 h-3.5 text-teal-700" />
                <span>Employee Master</span>
              </TabsTrigger>

              <TabsTrigger
                value="operations"
                className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-1.5 h-7"
              >
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>Registers & Operations</span>
              </TabsTrigger>

              <TabsTrigger
                value="feedback"
                className="text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 gap-1.5 h-7"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-700" />
                <span>Trainer Feedback</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: 12-DAY LIFECYCLE ROADMAP */}
          <TabsContent value="roadmap" className="space-y-4 m-0">
            <ProgressStepper timeline={timeline} currentDay={currentActiveDay?.dayNumber} />

            {/* Frappe Shortcuts Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-1">
                HR Governance & Policy Manuals
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link
                  href="/tutorials/workforce-planning"
                  className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-teal-600 transition shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700">
                      Workforce Planning & Job Analysis
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Equality Act 2010 compliance, vacancy requisition rules & job description benchmarks.
                  </p>
                </Link>

                <Link
                  href="/tutorials/selection-shortlisting"
                  className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-teal-600 transition shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700">
                      Selection & Competency Interviewing
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    STAR structured methodology, weighted candidate evaluation & statutory offer letters.
                  </p>
                </Link>

                <Link
                  href="/tutorials/onboarding-retention"
                  className="p-3.5 bg-white rounded-lg border border-slate-200 hover:border-teal-600 transition shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-teal-700">
                      Statutory Disciplinary Fair Process
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-teal-700" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    ACAS Code of Practice, natural justice, formal hearing protocols & appeals.
                  </p>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: EMPLOYEE MASTER DIRECTORY */}
          <TabsContent value="directory" className="m-0">
            <PeopleDirectory />
          </TabsContent>

          {/* TAB 3: CONTINUOUS OPERATIONS & REGISTERS */}
          <TabsContent value="operations" className="m-0">
            <ContinuousThreadsPanel currentDay={currentActiveDay?.dayNumber || 1} />
          </TabsContent>

          {/* TAB 4: TRAINER FEEDBACK */}
          <TabsContent value="feedback" className="m-0">
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Faculty Evaluations & Rubrics</h3>
                  <p className="text-xs text-slate-500">Formal grade reports issued by Lead Trainers.</p>
                </div>
              </div>

              {timeline.some((t) => t.feedback) ? (
                <div className="space-y-3">
                  {timeline
                    .filter((t) => t.feedback)
                    .map((t) => (
                      <div
                        key={t.dayNumber}
                        className="p-3.5 rounded-lg bg-teal-50/70 border border-teal-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>
                            Day {t.dayNumber}: {t.title}
                          </span>
                          <Badge variant="default" className="bg-emerald-700 text-white text-[9px]">
                            Graded
                          </Badge>
                        </div>
                        <p className="text-slate-700 text-xs">{t.feedback?.comments}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs italic">
                  No submissions graded yet. Complete and submit Day 1 to receive trainer rubric evaluations.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
