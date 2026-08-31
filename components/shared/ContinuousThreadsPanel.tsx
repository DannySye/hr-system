'use client'

import React from 'react'
import { Flame, Clock, Users, Calendar, Plane } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceRegisterTable } from './AttendanceRegisterTable'
import { LeaveManagementCard } from './LeaveManagementCard'
import { Badge } from '@/components/ui/badge'

interface StorylineThread {
  id: string
  title: string
  category: string
  description: string
  dayMilestones: { day: number; label: string; status: 'DONE' | 'CURRENT' | 'UPCOMING' }[]
}

const DEFAULT_THREADS: StorylineThread[] = [
  {
    id: 'thread-eng-hire',
    title: 'Senior Backend Engineer Talent Pipeline',
    category: 'Recruitment & Sourcing',
    description: 'Scoping (Day 1), ads (Day 2), interviews (Day 3), and employment contracts (Day 4).',
    dayMilestones: [
      { day: 1, label: 'Workforce Planning', status: 'DONE' },
      { day: 2, label: 'Candidate Sourcing', status: 'DONE' },
      { day: 3, label: 'Interviews & Selection', status: 'DONE' },
      { day: 4, label: 'Offer & Contract', status: 'DONE' },
    ],
  },
  {
    id: 'thread-probation-case',
    title: 'Riley Morgan Probation & Performance Management',
    category: 'Employee Relations',
    description: 'Onboarding induction (Day 5), Week 1 probation check-in (Day 6), 360 performance appraisal (Day 7), and training catalog fulfillment (Day 8).',
    dayMilestones: [
      { day: 5, label: 'Onboarding & Induction', status: 'DONE' },
      { day: 6, label: 'Probation Objectives & Check-in', status: 'CURRENT' },
      { day: 7, label: '360° Appraisal & KPIs', status: 'UPCOMING' },
      { day: 8, label: 'Training Needs & Catalog', status: 'UPCOMING' },
    ],
  },
  {
    id: 'thread-disciplinary-case',
    title: 'Jordan Reed Persistent Lateness & Disciplinary Case',
    category: 'Compliance & Discipline',
    description: 'Attendance tracking surfaces chronic lateness (Day 6+), leading to a structured 6-step Disciplinary Hearing on Day 10.',
    dayMilestones: [
      { day: 6, label: 'Attendance Tracking Starts', status: 'CURRENT' },
      { day: 9, label: 'Staff Welfare Review', status: 'UPCOMING' },
      { day: 10, label: 'Formal Disciplinary Hearing', status: 'UPCOMING' },
    ],
  },
]

export function ContinuousThreadsPanel({ currentDay = 1 }: { currentDay?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="font-bold text-sm text-slate-900">Continuous HR Operations & Storylines</h3>
            <p className="text-[11px] text-slate-500">
              Live organizational data, continuous attendance records, and active case histories.
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] bg-teal-50 text-teal-800 border-teal-200">
          Persistent Simulation Engine
        </Badge>
      </div>

      <Tabs defaultValue="storylines" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-slate-100 p-1 mb-4">
          <TabsTrigger value="storylines" className="text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1.5" /> Storylines
          </TabsTrigger>
          <TabsTrigger value="attendance" className="text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 mr-1.5" /> Attendance Register
          </TabsTrigger>
          <TabsTrigger value="leave" className="text-xs font-semibold">
            <Plane className="w-3.5 h-3.5 mr-1.5" /> Leave Balances
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Multi-Day Storylines */}
        <TabsContent value="storylines" className="space-y-3">
          {DEFAULT_THREADS.map((thread) => (
            <div key={thread.id} className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{thread.title}</h4>
                <Badge variant="secondary" className="text-[9px]">
                  {thread.category}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{thread.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2">
                {thread.dayMilestones.map((m) => {
                  const isPassed = currentDay > m.day
                  const isCurrent = currentDay === m.day

                  let badgeColor = 'bg-slate-200 text-slate-600'
                  if (isPassed) badgeColor = 'bg-emerald-100 text-emerald-800 font-semibold'
                  if (isCurrent) badgeColor = 'bg-teal-700 text-white font-bold'

                  return (
                    <div
                      key={m.day}
                      className={`p-2 rounded text-[10px] text-center flex flex-col items-center justify-center ${badgeColor}`}
                    >
                      <span>Day {m.day}</span>
                      <span className="text-[9px] truncate max-w-full opacity-90">{m.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Tab 2: Attendance Register */}
        <TabsContent value="attendance">
          <AttendanceRegisterTable />
        </TabsContent>

        {/* Tab 3: Leave Balances & Approvals */}
        <TabsContent value="leave">
          <LeaveManagementCard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
