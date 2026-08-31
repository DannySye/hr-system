'use client'

import React from 'react'
import {
  Users,
  Clock,
  Plane,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface HrMetricsBarProps {
  headcount?: number
  openRequisitions?: number
  punctualityRate?: string
  pendingLeaveCount?: number
  activeDayNumber?: number
  activeDayTitle?: string
}

export function HrMetricsBar({
  headcount = 4,
  openRequisitions = 1,
  punctualityRate = '92.4%',
  pendingLeaveCount = 1,
  activeDayNumber = 1,
  activeDayTitle = 'Workforce Planning',
}: HrMetricsBarProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* Metric 1: Headcount & Requisitions */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hr-card-hover">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Workforce Headcount
          </span>
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-100">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{headcount} Staff</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +1 Requisition
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Network Ops & Engineering divisions
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Active Capacity: 100%</span>
          <span className="text-teal-700 font-semibold">1 Vacancy Open</span>
        </div>
      </div>

      {/* Metric 2: Attendance & Punctuality */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hr-card-hover">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Punctuality & Attendance
          </span>
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{punctualityRate}</span>
            <span className="text-xs font-semibold text-amber-700">
              4 Flags Monitored
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Live register active across 10 shifts
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Jordan Reed lateness review</span>
          <span className="text-amber-700 font-bold">Action Day 10</span>
        </div>
      </div>

      {/* Metric 3: Leave Accruals & Approvals */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hr-card-hover">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Leave Utilization
          </span>
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-100">
            <Plane className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">22.4d Avg</span>
            <span className="text-xs font-semibold text-blue-700">
              {pendingLeaveCount} Pending
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Statutory 24d annual allowance baseline
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Sick & Parental Leave Accrued</span>
          <span className="text-blue-700 font-semibold">1 Approval In Queue</span>
        </div>
      </div>

      {/* Metric 4: Active Lifecycle Milestone */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-teal-950 text-white border border-teal-900 shadow-xs flex flex-col justify-between space-y-3 hr-card-hover">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
            Simulation Milestone
          </span>
          <Badge variant="default" className="bg-teal-500 text-slate-950 font-bold text-[10px]">
            Day {activeDayNumber}
          </Badge>
        </div>

        <div>
          <div className="font-extrabold text-base text-white leading-tight truncate">
            {activeDayTitle}
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Practicum Employee Lifecycle
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-teal-200">
          <span>Progress: {Math.round((activeDayNumber / 12) * 100)}%</span>
          <span className="text-white font-bold">12 Total Stages</span>
        </div>
      </div>
    </div>
  )
}
