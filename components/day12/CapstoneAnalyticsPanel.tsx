'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  Clock,
  TrendingDown,
  Users,
  Award,
  Send,
  CheckCircle2,
  Sparkles,
  Lock,
  GraduationCap,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface CapstoneAnalyticsPanelProps {
  fileViewed?: boolean
  onCapstoneSubmitted?: () => void
}

export function CapstoneAnalyticsPanel({
  fileViewed = false,
  onCapstoneSubmitted,
}: CapstoneAnalyticsPanelProps) {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{
    timeToHireDays: number
    absenteeismRate: number
    totalAttendanceRows: number
    totalExits: number
    activeHeadcount: number
  }>({
    timeToHireDays: 4,
    absenteeismRate: 12.5,
    totalAttendanceRows: 32,
    totalExits: 1,
    activeHeadcount: 4,
  })

  const [turnoverNote, setTurnoverNote] = useState(
    'An absenteeism rate of 12.5% was primarily driven by isolated transit disruptions in the disciplinary case, while time-to-hire of 4 simulated days indicates a highly responsive multi-channel sourcing pipeline.'
  )
  const [submitting, setSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/day12/analytics')
        if (res.ok) {
          const data = await res.json()
          if (data.stats) {
            setStats(data.stats)
          }
        }
      } catch (err) {
        console.error('Error fetching analytics:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const handleSubmitCapstone = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Check file closure viewed
    if (!fileViewed) {
      toast.error('Audit Requirement: You must review the complete 12-day Employee File Timeline before submitting the final Capstone Analytics.')
      return
    }

    // 2. Check turnover note length >= 40 chars
    if (turnoverNote.trim().length < 40) {
      toast.error('Turnover note must contain at least 40 characters of genuine qualitative interpretation.')
      return
    }

    // 3. Soft check: reject if text is just digits
    const nonDigits = turnoverNote.replace(/[0-9\s.,%]/g, '')
    if (nonDigits.length < 20) {
      toast.error('Please provide an interpretive analysis in sentences, rather than simply restating numbers.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/day12/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeToHireDays: stats.timeToHireDays,
          absenteeismRate: stats.absenteeismRate,
          turnoverNote,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to submit capstone analytics.')
        return
      }

      setIsCompleted(true)
      toast.success('🎓 Congratulations! You have successfully completed the 12-Day NovaLink HR Practicum!')
      if (onCapstoneSubmitted) onCapstoneSubmitted()
    } catch (err) {
      toast.error('An error occurred while submitting capstone.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card data-tutorial-target="analytics-panel" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Capstone Workforce Analytics &amp; Strategic Interpretation
            </CardTitle>
          </div>
          {isCompleted && (
            <Badge className="text-[9px] bg-[#004ac6] text-white font-bold">
              🎓 Practicum Complete
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Auto-computed workforce metrics across all 12 days. Interpret the quantitative data into strategic decisions.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmitCapstone}>
        <CardContent className="p-5 space-y-5 text-xs">
          {/* 3 Auto-Computed Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Card 1: Time-to-Hire */}
            <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#737686]">Time-to-Hire</span>
                <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
              </div>
              <div className="text-2xl font-bold text-[#191c1e]">
                {stats.timeToHireDays} <span className="text-xs font-normal text-[#737686]">Days</span>
              </div>
              <p className="text-[10px] text-[#434655]">
                From Day 2 Job Advert to Day 4 Contract Signature.
              </p>
            </div>

            {/* Card 2: Absenteeism Rate */}
            <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#737686]">Absenteeism Rate</span>
                <TrendingDown className="w-3.5 h-3.5 text-[#bc4800]" />
              </div>
              <div className="text-2xl font-bold text-[#191c1e]">
                {stats.absenteeismRate}%
              </div>
              <p className="text-[10px] text-[#434655]">
                (Late + Absent) / {stats.totalAttendanceRows} Total Shift Records.
              </p>
            </div>

            {/* Card 3: Separation & Headcount */}
            <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#737686]">Turnover Volume</span>
                <Users className="w-3.5 h-3.5 text-[#505f76]" />
              </div>
              <div className="text-2xl font-bold text-[#191c1e]">
                {stats.totalExits} <span className="text-xs font-normal text-[#737686]">Exit</span>
              </div>
              <p className="text-[10px] text-[#434655]">
                1 Resignation (Relocation) across {stats.activeHeadcount} Active Headcount.
              </p>
            </div>
          </div>

          {/* Qualitative Turnover Note Interpretation */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#191c1e]">
                Qualitative Turnover &amp; Workforce Interpretation Note
              </label>
              <span className="text-[10px] text-[#737686]">Min 40 chars • Focus on strategic insights</span>
            </div>
            <Textarea
              value={turnoverNote}
              onChange={(e) => setTurnoverNote(e.target.value)}
              className="text-xs min-h-[85px] bg-[#f7f9fb] border-border rounded-lg leading-relaxed"
              placeholder="e.g. Interpret what the 12.5% absenteeism rate and 1 resignation suggest for management policy and proactive support..."
              required
            />
          </div>

          {/* Completion Celebration Card */}
          {isCompleted && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#dbe1ff]/60 to-[#dcfce7]/60 border border-[#b4c5ff] text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#00174b] font-bold text-sm">
                <GraduationCap className="w-5 h-5 text-[#004ac6]" />
                <span>NovaLink HR Practicum Curriculum Fully Completed!</span>
              </div>
              <p className="text-[#00174b] leading-relaxed text-[11.5px]">
                You have successfully navigated all 12 days of the employee lifecycle — from job analysis, talent acquisition, contracts, and onboarding, to probation, 360 appraisals, training needs, ACAS disciplinary due process, career development, and separation diagnostics.
              </p>
              <div className="pt-1">
                <Link href="/dashboard">
                  <Button size="sm" className="bg-[#004ac6] hover:bg-[#003899] text-white text-xs font-bold h-8 px-4 rounded-lg">
                    Return to Console &amp; Review Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#737686]">
            {!fileViewed ? (
              <span className="text-[#d97706] flex items-center gap-1">
                <Lock className="w-3 h-3" /> Audit the Employee File Timeline above to enable final submit
              </span>
            ) : (
              <span className="text-[#15803d] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> File Timeline Audited &amp; Ready
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting || isCompleted}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? 'Submitting Capstone...' : isCompleted ? 'Capstone Submitted ✓' : 'Submit Final Simulation Capstone'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
