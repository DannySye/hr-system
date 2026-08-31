'use client'

import React, { useState, useEffect } from 'react'
import { AlertOctagon, Clock, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CaseContextCard({
  employeeName = 'Jordan Reed',
  jobTitle = 'Logistics Associate',
}: {
  employeeName?: string
  jobTitle?: string
}) {
  const [lateCount, setLateCount] = useState(4)
  const [totalDays, setTotalDays] = useState(8)

  return (
    <Card id="case-context" className="border-amber-200 bg-amber-50/30 shadow-sm">
      <CardHeader className="pb-3 border-b border-amber-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-base font-bold text-slate-900">
              Evidence Trigger: Attendance Register Pattern Analysis
            </CardTitle>
          </div>
          <Badge variant="warning" className="text-[10px] bg-amber-600 text-white font-bold">
            Evidence-Driven Trigger
          </Badge>
        </div>
        <CardDescription className="text-xs text-slate-600">
          Surfaced from the live attendance register: persistent punctuality failure flagged for formal review.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-white border border-amber-200 text-xs space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-500">Employee of Record</span>
            <div className="font-bold text-slate-900">{employeeName}</div>
            <div className="text-[11px] text-slate-500">{jobTitle}</div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-amber-200 text-xs space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-500">Documented Lateness Incidents</span>
            <div className="text-lg font-extrabold text-amber-700">{lateCount} Unexcused Late Arrivals</div>
            <div className="text-[11px] text-slate-500">Across the last {totalDays} working days (50% failure rate)</div>
          </div>

          <div className="p-3 rounded-lg bg-white border border-amber-200 text-xs space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-500">Compliance Severity</span>
            <div className="font-bold text-slate-900">Formal Disciplinary Action Required</div>
            <div className="text-[11px] text-slate-500">ACAS Code of Practice Section 4 Trigger</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1.5">
          <span className="font-semibold text-slate-800">CITED ATTENDANCE AUDIT TRAIL:</span>
          <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
            <li><strong>2026-08-16:</strong> Clock-in at 09:42 (42 mins late). No advance notification provided to manager.</li>
            <li><strong>2026-08-18:</strong> Clock-in at 09:55 (55 mins late). Noted central rail signal delay.</li>
            <li><strong>2026-08-21:</strong> Clock-in at 09:38 (38 mins late). Unexplained delay.</li>
            <li><strong>2026-08-23:</strong> Clock-in at 09:49 (49 mins late). Arrived after shift handover commenced.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
