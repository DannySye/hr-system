'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Award, Star, AlertTriangle, UserCheck, TrendingUp, BookOpen, CheckCircle2 } from 'lucide-react'

interface EvidenceSummaryCardProps {
  employeeId?: string
}

export function EvidenceSummaryCard({ employeeId = 'emp-100' }: EvidenceSummaryCardProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<{
    probationReview: any | null
    appraisal: any | null
    employee: any | null
  } | null>(null)

  useEffect(() => {
    async function fetchEvidence() {
      try {
        const res = await fetch(`/api/day11/evidence?employeeId=${employeeId}`)
        if (res.ok) {
          const result = await res.json()
          setData(result)
        }
      } catch (err) {
        console.error('Error fetching evidence:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvidence()
  }, [employeeId])

  if (loading) {
    return (
      <div data-tutorial-target="evidence-summary" className="p-5 rounded-2xl bg-white border border-border animate-pulse space-y-3 shadow-2xs">
        <div className="h-4 bg-[#f2f4f6] rounded w-1/3"></div>
        <div className="h-16 bg-[#f7f9fb] rounded"></div>
      </div>
    )
  }

  const hasData = data?.probationReview || data?.appraisal

  if (!hasData) {
    return (
      <div data-tutorial-target="evidence-summary" className="p-4 rounded-2xl bg-[#fff8e6] border border-[#fde68a] text-[#7d2d00] flex items-start gap-3 text-xs shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm text-[#92400e]">Data Integrity Warning</h4>
          <p className="mt-0.5 text-xs text-[#b45309]">
            No historical performance or probation data found for this employee. Ensure previous modules (Day 6 Probation & Day 7 Appraisal) were executed properly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Card data-tutorial-target="evidence-summary" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Pre-Conversation Evidence Summary
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff] font-bold">
            Jordan Hayes (NL-1000)
          </Badge>
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Contemporaneous records from Day 6 Probation Review and Day 7 360° Appraisal. Review prior to career planning.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Probation Milestone Review */}
          <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] space-y-2">
            <div className="flex items-center justify-between border-b border-border/70 pb-2">
              <span className="font-bold text-[#191c1e] flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" /> Day 6 Probation Outcome
              </span>
              <Badge className="text-[9px] bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold">
                {data?.probationReview?.outcome || 'CONFIRMED'}
              </Badge>
            </div>
            <p className="text-[#434655] leading-relaxed text-[11.5px]">
              {data?.probationReview?.notes ||
                'Completed 6-month probation with exceptional ratings. Demonstrated rapid mastery of optical cutovers with zero downtime incidents.'}
            </p>
          </div>

          {/* H1 Performance Appraisal */}
          <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] space-y-2">
            <div className="flex items-center justify-between border-b border-border/70 pb-2">
              <span className="font-bold text-[#191c1e] flex items-center gap-1.5 text-xs">
                <Star className="w-3.5 h-3.5 text-[#2563eb]" /> Day 7 Appraisal Summary
              </span>
              <span className="text-[10px] font-mono text-[#004ac6] font-bold">
                Top 5% Tier
              </span>
            </div>
            <div className="space-y-1 text-[#434655] text-[11px] leading-relaxed">
              <div>
                <strong className="text-[#191c1e]">Supervisor (Marcus Chen):</strong>{' '}
                {data?.appraisal?.supervisorNotes || 'Exceeded all SLA targets during metropolitan fiber cutovers.'}
              </div>
              <div>
                <strong className="text-[#191c1e]">Identified Training Need:</strong>{' '}
                {data?.appraisal?.trainingNeeds || 'Advanced DWDM certifications and junior engineer mentorship.'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
