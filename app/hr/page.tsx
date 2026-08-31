import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { FrappeSidebar } from '@/components/frappe/FrappeSidebar'
import { PeopleDirectory } from '@/components/shared/PeopleDirectory'
import { AttendanceRegisterTable } from '@/components/shared/AttendanceRegisterTable'
import { LeaveManagementCard } from '@/components/shared/LeaveManagementCard'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import {
  Building2,
  Users,
  GraduationCap,
  FileCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Shield,
  Briefcase,
  Compass,
  Star,
  Layers,
  Calendar,
  Search,
  ExternalLink,
  Check,
  X,
  UserCheck,
  Award,
} from 'lucide-react'
import { HrAtsCandidateFeed } from '@/components/hr/HrAtsCandidateFeed'

export const dynamic = 'force-dynamic'

export default async function EnterpriseHrPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  // 1. Fetch all trainee submissions
  const submissions = await prisma.traineeProgress.findMany({
    where: {
      status: { in: ['SUBMITTED', 'GRADED'] },
    },
    include: {
      trainee: true,
      feedback: true,
    },
    orderBy: { submittedAt: 'desc' },
  })

  // 2. Fetch all employees
  const employees = await prisma.employee.findMany({
    include: {
      position: {
        include: { department: true },
      },
    },
    orderBy: { startDate: 'asc' },
  })

  // 3. Fetch all applications
  const applications = await prisma.application.findMany({
    include: {
      candidate: true,
      shortlisting: true,
      position: {
        include: { department: true },
      },
    },
    orderBy: { dateReceived: 'desc' },
  })

  // 4. Fetch positions
  const positions = await prisma.position.findMany({
    include: {
      department: true,
      applications: true,
    },
  })

  // 5. Fetch calendar stages
  const calendarDays = await prisma.simulationCalendar.findMany({
    orderBy: { dayNumber: 'asc' },
  })
  const dayTitles = Object.fromEntries(calendarDays.map((d) => [d.dayNumber, d.stageLabels]))

  const pendingPracticumCount = submissions.filter((s) => s.status === 'SUBMITTED').length
  const newApplicantsCount = applications.filter((a) => !a.shortlisting).length

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#f7f9fb]">
      {/* Sidebar */}
      <FrappeSidebar />

      {/* Main Content Desk */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 max-w-7xl overflow-x-hidden">
        {/* Header Breadcrumbs & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#737686] mb-1">
              <span className="font-semibold text-[#191c1e]">NovaLink Global</span>
              <span>/</span>
              <span className="text-[#004ac6] font-medium">Enterprise HR Platform</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#191c1e] flex items-center gap-2.5">
              Enterprise HR Operations & Talent Suite
              <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                Production Core
              </Badge>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e]"
              >
                <span>Company Site</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs font-semibold gap-1.5 border-border bg-white hover:bg-[#f2f4f6] text-[#191c1e]"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#2563eb]" /> Switch to Training Lab
              </Button>
            </Link>
            <Link href="/careers" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="h-8 text-xs font-semibold bg-[#2563eb] hover:bg-[#1d4ed8] text-white gap-1.5 shadow-xs"
              >
                <Compass className="w-3.5 h-3.5" /> Public Careers Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Top 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active Headcount */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Total Active Personnel</span>
              <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] text-[#191c1e] flex items-center justify-center">
                <Users className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight text-[#191c1e]">
                {employees.length} Staff
              </span>
              <p className="text-[11px] text-[#004ac6] font-semibold mt-1">2 Operational Divisions</p>
            </div>
          </div>

          {/* Card 2: ATS Pipeline Inflow */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Candidate Applications</span>
              <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight text-[#191c1e]">
                {applications.length} Total
              </span>
              <p className="text-[11px] text-[#ba1a1a] font-semibold mt-1">
                {newApplicantsCount} Awaiting Initial Screening
              </p>
            </div>
          </div>

          {/* Card 3: Open Requisitions & Deadlines */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Active Requisitions</span>
              <div className="w-8 h-8 rounded-lg bg-[#d0e1fb] text-[#0b1c30] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight text-[#191c1e]">
                {positions.length} Live
              </span>
              <p className="text-[11px] text-[#bc4800] font-semibold mt-1">
                Next Deadline: 15 Sep 2026
              </p>
            </div>
          </div>

          {/* Card 4: Practicum Reviews */}
          <div className="bg-white border border-border rounded-xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group shadow-2xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#434655]">Practicum Submissions</span>
              <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tight text-[#191c1e]">
                {pendingPracticumCount} Pending
              </span>
              <p className="text-[11px] text-[#ba1a1a] font-semibold mt-1">
                Awaiting Assessor Rubric Grading
              </p>
            </div>
          </div>
        </div>

        {/* Main Enterprise Tabs Workspace */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-2xs">
          <Tabs defaultValue="ats" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-[#f2f4f6] p-1 rounded-lg mb-6">
              <TabsTrigger
                value="ats"
                className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs"
              >
                Recruitment & ATS ({applications.length})
              </TabsTrigger>
              <TabsTrigger
                value="practicum"
                className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs"
              >
                Practicum Queue ({submissions.length})
              </TabsTrigger>
              <TabsTrigger
                value="directory"
                className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs"
              >
                Employee Master ({employees.length})
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="text-xs font-semibold py-1.5 data-[state=active]:bg-white data-[state=active]:text-[#004ac6] data-[state=active]:shadow-xs"
              >
                Attendance & Leaves
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: RECRUITMENT & ATS PIPELINE */}
            <TabsContent value="ats" className="space-y-6">
              {/* Requisitions Overview with Deadlines */}
              <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#191c1e]">
                      Live Job Requisitions & Application Deadlines
                    </h3>
                    <p className="text-[11px] text-[#737686]">
                      Manage open positions published to the NovaLink Public Careers Site.
                    </p>
                  </div>
                  <Link href="/careers" target="_blank">
                    <Button size="sm" variant="outline" className="text-xs h-7 border-border bg-white text-[#004ac6] gap-1">
                      <span>View Public Job Board</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {positions.map((pos) => (
                    <div key={pos.id} className="p-3 bg-white rounded-lg border border-border text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#191c1e] truncate">{pos.title}</span>
                        <Badge variant="outline" className="text-[9px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                          {pos.department?.name || 'Operations'}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-[#737686]">
                        {pos.applications?.length || 0} candidate applications received
                      </div>
                      <div className="text-[10px] text-[#ba1a1a] font-bold bg-[#ffede6] px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#bc4800]" /> Closes: 15 Sep 2026 (15 Days Left)
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live ATS Inflow & Screening Scorecard Component */}
              <HrAtsCandidateFeed initialApplications={applications} />
            </TabsContent>

            {/* TAB 2: PRACTICUM SUBMISSIONS REVIEW & CIPD RUBRIC */}
            <TabsContent value="practicum" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#191c1e]">
                    Trainee Submissions Awaiting Assessor Review
                  </h3>
                  <p className="text-xs text-[#737686]">
                    Grade submitted trainee deliverables using the 4-dimension statutory rubric. Approved grades sync directly back into the training lab.
                  </p>
                </div>
              </div>

              {submissions.length > 0 ? (
                <div className="divide-y divide-border/60 border border-border rounded-xl overflow-hidden bg-white">
                  {submissions.map((sub) => {
                    const isGraded = sub.status === 'GRADED'
                    let scoresObj: any = null
                    try {
                      scoresObj = sub.feedback?.rubricScores ? JSON.parse(sub.feedback.rubricScores) : null
                    } catch {}

                    const totalScore = scoresObj
                      ? (scoresObj.compliance || 0) +
                        (scoresObj.quality || 0) +
                        (scoresObj.framework || 0) +
                        (scoresObj.communication || 0)
                      : null

                    return (
                      <div
                        key={sub.id}
                        className="p-4 hover:bg-[#f7f9fb] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-[#dbe1ff] text-[#004ac6] font-bold text-xs flex items-center justify-center shrink-0 border border-[#b4c5ff]">
                            {sub.trainee?.fullName ? sub.trainee.fullName[0].toUpperCase() : 'T'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs sm:text-sm text-[#191c1e]">
                                {sub.trainee?.fullName || 'Trainee'}
                              </h4>
                              <Badge
                                variant={isGraded ? 'default' : 'outline'}
                                className={`text-[10px] ${
                                  isGraded
                                    ? 'bg-[#004ac6] text-white'
                                    : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb596]'
                                }`}
                              >
                                {isGraded ? '✓ Graded & Approved' : '● Awaiting Review'}
                              </Badge>
                            </div>
                            <p className="text-xs text-[#434655] font-medium mt-0.5">
                              Day {sub.dayNumber}: {dayTitles[sub.dayNumber] || `Phase ${sub.dayNumber}`}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-[#737686] mt-0.5">
                              <span>Submitted: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'Recent'}</span>
                              {totalScore !== null && (
                                <span className="font-bold text-[#004ac6] bg-[#dbe1ff] px-1.5 py-0.2 rounded">
                                  Grade: {totalScore} / 100
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <Link href={`/hr/review/${sub.id}`}>
                            <Button
                              size="sm"
                              className={`text-xs font-bold h-8 px-4 gap-1.5 shadow-xs rounded-lg ${
                                isGraded
                                  ? 'bg-white border border-border text-[#191c1e] hover:bg-[#f2f4f6]'
                                  : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white'
                              }`}
                            >
                              <span>{isGraded ? 'View / Update Grade' : 'Inspect & Grade Deliverable'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#737686] border border-border rounded-xl bg-[#f7f9fb]">
                  No trainee submissions currently in queue. Trainees will appear here as they complete practicum milestones.
                </div>
              )}
            </TabsContent>

            {/* TAB 3: EMPLOYEE MASTER DIRECTORY */}
            <TabsContent value="directory" className="space-y-4">
              <PeopleDirectory employees={employees} />
            </TabsContent>

            {/* TAB 4: ATTENDANCE & LEAVES */}
            <TabsContent value="attendance" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttendanceRegisterTable />
              <LeaveManagementCard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
