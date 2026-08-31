import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'
import { PeopleDirectory } from '@/components/shared/PeopleDirectory'
import { AttendanceRegisterTable } from '@/components/shared/AttendanceRegisterTable'
import { LeaveManagementCard } from '@/components/shared/LeaveManagementCard'
import { CohortManager } from '@/components/trainer/CohortManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Users,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Briefcase,
  Award,
  ChevronRight,
  Compass,
  GraduationCap,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TraineeDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  // Fetch employees
  const employees = await prisma.employee.findMany({
    include: {
      position: {
        include: { department: true },
      },
    },
    orderBy: { startDate: 'asc' },
  })

  // Fetch simulation calendar
  const calendarDays = await prisma.simulationCalendar.findMany({
    orderBy: { dayNumber: 'asc' },
  })

  // Fetch trainee progress
  const progressList = await prisma.traineeProgress.findMany({
    where: { traineeId: session.user.id },
    orderBy: { dayNumber: 'asc' },
  })

  // Fetch all trainees and trainers for the cohort view
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

  const trainers = await prisma.user.findMany({
    where: { role: 'TRAINER' },
    orderBy: { createdAt: 'asc' },
  })

  const completedDaysCount = progressList.filter(
    (p) => p.status === 'SUBMITTED' || p.status === 'GRADED'
  ).length

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#f7f9fb]">
      {/* Stitch Modern SaaS Sidebar */}
      <FrappeSidebar />

      {/* Main Content Desk */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl overflow-x-hidden">
        {/* Header Breadcrumb & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#737686] mb-1">
              <span className="font-semibold text-[#191c1e]">NovaLink Enterprise</span>
              <span>/</span>
              <span className="text-[#2563eb] font-medium">HR Operations Console</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#191c1e] flex items-center gap-2">
              HR Faculty & Operations Desk
              <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                Live Practicum
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/careers" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e]"
              >
                <Compass className="w-3.5 h-3.5 text-[#2563eb]" /> Public Careers Portal
              </Button>
            </Link>
            <Link href={`/day/${Math.min(completedDaysCount + 1, 12)}`}>
              <Button
                size="sm"
                className="h-8 text-xs font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-1.5 shadow-xs"
              >
                <span>Continue Day {Math.min(completedDaysCount + 1, 12)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 4 KPI Number Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs hover:shadow-card-hover transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#2563eb]/5 rounded-full blur-xl group-hover:bg-[#2563eb]/10 transition-colors"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Total Active Personnel</span>
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#191c1e]">
                <Users className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191c1e]">
                {employees.length} Staff
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-semibold text-[#004ac6] flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +1 Requisition Active
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs hover:shadow-card-hover transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#d0e1fb]/40 rounded-full blur-xl group-hover:bg-[#d0e1fb]/60 transition-colors"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Attendance Reliability</span>
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#191c1e]">
                <Clock className="w-4 h-4 text-[#505f76]" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191c1e]">
                94.2%
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-semibold text-[#004ac6] flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +2.1% from last cycle
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs hover:shadow-card-hover transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ffede6]/50 rounded-full blur-xl group-hover:bg-[#ffede6]/70 transition-colors"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Avg Leave Balance</span>
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#191c1e]">
                <Calendar className="w-4 h-4 text-[#bc4800]" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191c1e]">
                22.4 Days
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs text-[#737686]">1 Request in Approval Queue</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs hover:shadow-card-hover transition-all">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#dbe1ff]/60 rounded-full blur-xl group-hover:bg-[#dbe1ff]/80 transition-colors"></div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Practicum Progress</span>
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#191c1e]">
                <Award className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191c1e]">
                Day {completedDaysCount} / 12
              </span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-bold text-[#004ac6]">
                  {Math.round((completedDaysCount / 12) * 100)}% Curriculum Mastered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Column Grid: Workspaces Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-border rounded-xl p-5 shadow-2xs">
              <Tabs defaultValue="cohort" className="w-full">
                <TabsList className="grid grid-cols-4 w-full bg-[#f2f4f6] p-1 rounded-lg">
                  <TabsTrigger value="cohort" className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs">
                    Faculty & Cohort
                  </TabsTrigger>
                  <TabsTrigger value="directory" className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs">
                    Staff Directory
                  </TabsTrigger>
                  <TabsTrigger value="attendance" className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs">
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger value="leaves" className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs">
                    Leave Accruals
                  </TabsTrigger>
                </TabsList>

                {/* TAB 1: FACULTY & COHORT OVERVIEW */}
                <TabsContent value="cohort" className="pt-4 space-y-4">
                  <CohortManager
                    initialTrainees={trainees}
                    initialTrainers={trainers}
                    calendarDays={calendarDays}
                  />
                </TabsContent>

                {/* TAB 2: STAFF DIRECTORY */}
                <TabsContent value="directory" className="pt-4">
                  <PeopleDirectory employees={employees} />
                </TabsContent>

                {/* TAB 3: ATTENDANCE */}
                <TabsContent value="attendance" className="pt-4">
                  <AttendanceRegisterTable />
                </TabsContent>

                {/* TAB 4: LEAVES */}
                <TabsContent value="leaves" className="pt-4">
                  <LeaveManagementCard />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column (4 cols): Live Activity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-border rounded-xl p-5 shadow-2xs flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-sm text-[#191c1e]">Live Audit Activity</h2>
                <span className="text-[10px] font-mono text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded font-bold">
                  Active
                </span>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto pr-1 relative">
                {/* Event 1 */}
                <div className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#191c1e]">Day 1 JD Authorized</span>
                    <span className="text-[#434655] text-[11px]">Marcus Chen approved Field Engineer JD.</span>
                    <span className="text-[10px] text-[#737686] mt-0.5">Today, 09:30 AM</span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#d0e1fb] text-[#0b1c30] flex items-center justify-center shrink-0 shadow-2xs">
                    <Compass className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#191c1e]">Candidate Sourcing Live</span>
                    <span className="text-[#434655] text-[11px]">Published to NovaLink Careers Portal.</span>
                    <span className="text-[10px] text-[#737686] mt-0.5">Today, 10:15 AM</span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#191c1e]">Candidate Screened</span>
                    <span className="text-[#434655] text-[11px]">Jordan Hayes verified in ATS matrix.</span>
                    <span className="text-[10px] text-[#737686] mt-0.5">Today, 11:45 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
