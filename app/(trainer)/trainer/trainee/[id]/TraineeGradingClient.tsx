'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { EmployeeFileTimeline } from '@/components/shared/EmployeeFileTimeline'
import {
  CheckCircle,
  Clock,
  Lock,
  Star,
  Award,
  Send,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Layers,
  FileCheck,
  TrendingUp,
} from 'lucide-react'
import { toast } from 'sonner'
import { ProgressStatus } from "@/lib/types"

interface TraineeGradingClientProps {
  trainee: any
  progressRecords: any[]
  tutorialProgress?: any[]
}

const RUBRIC_CRITERIA_BY_DAY: Record<number, { c1: string; c2: string; c3: string; flagDesc?: string }> = {
  1: {
    c1: '1. Scoping & Job Requirement Alignment',
    c2: '2. Legal & Equality Standards Compliance (Bona Fide Criteria)',
    c3: '3. Person Specification Distinction (Essential vs. Desirable)',
  },
  2: {
    c1: '1. Channel Sourcing Strategy Fit (Field Engineering Demographic)',
    c2: '2. Public Job Advert Copy Clarity & Statutory Elements',
    c3: '3. Candidate Pipeline Inflow Review & Screening Rigor',
  },
  3: {
    c1: '1. Criteria Consistency in Shortlisting Scoring Matrix',
    c2: '2. STAR Competency Voice Interview Execution',
    c3: '3. Evidence-Based Assessment Notes & Probing Quality',
  },
  4: {
    c1: '1. Reference Verification Rigor & Employment Checks',
    c2: '2. Selection Decision Justification (Cited Evidence vs. Gut Feel)',
    c3: '3. Statutory Contract Terms Completeness (ERA 1996 Compliance)',
  },
  5: {
    c1: '1. 3-Pillar Onboarding Matrix Balance (Company, Job, Rules)',
    c2: '2. First-Day Induction Session & Role Orientation Notes',
    c3: '3. Supervisory Hierarchy & Reporting Line Alignment',
  },
  6: {
    c1: '1. Objective Benchmark Specificity & Observability',
    c2: '2. Week 1 Check-in Engagement & Note Quality',
    c3: '3. Continuous Attendance Register Awareness',
  },
  7: {
    c1: '1. KPI Measurability & Role Fit',
    c2: '2. Tri-Perspective 360° Interview Quality (Self, Manager, Peer)',
    c3: '3. Synthesis & Development Action Plan Depth',
  },
  8: {
    c1: '1. Appraisal-to-Training Need Linkage',
    c2: '2. Catalog Register Accuracy & Duration',
    c3: '3. Kirkpatrick Level 3 On-the-Job Application Review',
  },
  9: {
    c1: '1. Active Listening & Empathy in Grievance Handling',
    c2: '2. Root-Cause Problem Identification (Workload vs. Policy)',
    c3: '3. Feasibility of Proposed Resolution Plan',
  },
  10: {
    c1: '1. Strict ACAS Statutory Process Sequence',
    c2: '2. Evidence Linkage to Live Attendance Register',
    c3: '3. Decision Proportionality & Right of Appeal',
    flagDesc: 'Audited attendance evidence citations (checks for >= 2 attendance record citations).',
  },
  11: {
    c1: '1. Appraisal & Historical Evidence Triangulation (SLA/Uptime cited)',
    c2: '2. Career Plan Specificity (Role grounded in org chart, non-generic skills)',
    c3: '3. Evidence-Based Recognition Soundness & Justification',
  },
  12: {
    c1: '1. Exit Governance & Handover Checklist Rigor (Notice, Property, Payroll)',
    c2: '2. Structured 6-Dimension Exit Diagnostics Depth',
    c3: '3. Capstone Analytics Strategic Interpretation (>= 40 chars qualitative)',
  },
}

const ALL_PHASES = [
  { slug: 'workforce-planning', name: 'Day 1: Workforce Planning' },
  { slug: 'recruitment', name: 'Day 2: Recruitment & Adverts' },
  { slug: 'selection', name: 'Day 3: Selection & STAR' },
  { slug: 'hiring', name: 'Day 4: Hiring & Contracts' },
  { slug: 'onboarding', name: 'Day 5: 3-Pillar Onboarding' },
  { slug: 'probation', name: 'Day 6: Probation Benchmarks' },
  { slug: 'performance-management', name: 'Day 7: SMART KPIs & 360°' },
  { slug: 'training-development', name: 'Day 8: TNA & Kirkpatrick' },
  { slug: 'employee-welfare', name: 'Day 9: Welfare & Grievance' },
  { slug: 'discipline', name: 'Day 10: ACAS Disciplinary' },
  { slug: 'career-development', name: 'Day 11: Career Development' },
  { slug: 'separation', name: 'Day 12: Separation & Capstone' },
]

export function TraineeGradingClient({
  trainee,
  progressRecords,
  tutorialProgress = [],
}: TraineeGradingClientProps) {
  const router = useRouter()
  const isDay12Submitted = progressRecords.some((p) => p.dayNumber === 12 && (p.status === 'SUBMITTED' || p.status === 'GRADED'))
  const [viewMode, setViewMode] = useState<'daily' | 'capstone-rollup'>(
    isDay12Submitted ? 'capstone-rollup' : 'daily'
  )
  const [selectedDay, setSelectedDay] = useState(1)
  const [score1, setScore1] = useState(4)
  const [score2, setScore2] = useState(5)
  const [score3, setScore3] = useState(4)
  const [comments, setComments] = useState(
    'Demonstrated strong practitioner competence. Maintained objective neutrality and complied with statutory employment standards.'
  )
  const [submitting, setSubmitting] = useState(false)

  const currentRecord = progressRecords.find((p) => p.dayNumber === selectedDay)
  const currentRubric = RUBRIC_CRITERIA_BY_DAY[selectedDay] || {
    c1: '1. Core Deliverable Quality',
    c2: '2. Policy & Equality Compliance',
    c3: '3. Practical Depth & Reasoning',
  }

  // Calculate Roll-up metrics across all 12 days
  const gradedRecords = progressRecords.filter((p) => p.feedback?.rubricScores)
  let totalScoreSum = 0
  let totalPossibleSum = 0

  gradedRecords.forEach((p) => {
    try {
      const scores = JSON.parse(p.feedback.rubricScores)
      const t = scores.total || (scores.score1 + scores.score2 + scores.score3)
      totalScoreSum += t
      totalPossibleSum += 15
    } catch (e) {
      // fallback
    }
  })

  const averageScoreOutOf15 =
    gradedRecords.length > 0 ? (totalScoreSum / gradedRecords.length).toFixed(1) : 'N/A'
  const overallPercentage =
    totalPossibleSum > 0 ? Math.round((totalScoreSum / totalPossibleSum) * 100) : 0

  const handleGradeSubmit = async () => {
    if (!currentRecord) {
      toast.error('No progress record for this day yet.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/trainer/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traineeProgressId: currentRecord.id,
          rubricScores: {
            score1,
            score2,
            score3,
            total: score1 + score2 + score3,
          },
          comments,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit grade.')
        return
      }

      toast.success(`Day ${selectedDay} graded successfully! Feedback saved.`)
      router.refresh()
    } catch (err) {
      toast.error('Failed to submit grade.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top View Mode Selector & Rollup Banner */}
      <div className="bg-white p-4 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'daily'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'bg-[#f7f9fb] text-[#434655] border border-border hover:bg-[#f2f4f6]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Daily Rubric Grading
          </button>
          <button
            type="button"
            onClick={() => setViewMode('capstone-rollup')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'capstone-rollup'
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'bg-[#f7f9fb] text-[#434655] border border-border hover:bg-[#f2f4f6]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Whole-Simulation Review &amp; Roll-up
          </button>
        </div>

        {/* Aggregate Rollup Badge */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#737686]">
            <span>Graded:</span>
            <strong className="text-[#191c1e] font-mono">{gradedRecords.length}/12 Days</strong>
          </div>
          <div className="flex items-center gap-1.5 bg-[#dbe1ff] text-[#00174b] px-3 py-1 rounded-full font-bold">
            <Award className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Overall Grade: {averageScoreOutOf15}/15 ({overallPercentage}%)</span>
          </div>
        </div>
      </div>

      {viewMode === 'capstone-rollup' ? (
        /* Whole-Simulation Review Mode (Full Timeline & Rollup Detail) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Area (7 cols): Full 12-Day Employee File Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/70 p-5 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#2563eb]" />
                  <CardTitle className="text-sm font-bold text-[#191c1e]">
                    12-Day Master Employee File Audit Timeline
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-[#737686]">
                  Complete chronological arc for Jordan Hayes across all 12 simulation modules.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 max-h-[700px] overflow-y-auto">
                <EmployeeFileTimeline candidateName="Jordan Hayes" roleTitle="Field Engineer" />
              </CardContent>
            </Card>
          </div>

          {/* Right Area (5 cols): 12-Day Rubric Roll-up & Tutorial Conceptual History */}
          <div className="lg:col-span-5 space-y-6">
            {/* Rubric Score Rollup Card */}
            <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/70 p-5 pb-3">
                <CardTitle className="text-sm font-bold text-[#191c1e] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d97706]" /> 12-Day Rubric Roll-Up Summary
                </CardTitle>
                <CardDescription className="text-xs text-[#737686]">
                  Preserves every day&apos;s individual scores and qualitative comments.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-3 max-h-[350px] overflow-y-auto">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((day) => {
                  const rec = progressRecords.find((p) => p.dayNumber === day)
                  let scoreText = 'Not Graded'
                  let commentsText = ''
                  if (rec?.feedback?.rubricScores) {
                    try {
                      const sc = JSON.parse(rec.feedback.rubricScores)
                      scoreText = `${sc.total || sc.score1 + sc.score2 + sc.score3}/15`
                      commentsText = rec.feedback.comments || ''
                    } catch (e) {}
                  }

                  return (
                    <div key={day} className="p-3 rounded-xl border border-border bg-[#f7f9fb] space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#191c1e]">Day {day} Rubric</span>
                        <Badge
                          variant="outline"
                          className={
                            rec?.status === 'GRADED'
                              ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold text-[10px]'
                              : 'bg-[#f2f4f6] text-[#737686] text-[10px]'
                          }
                        >
                          {scoreText}
                        </Badge>
                      </div>
                      {commentsText && (
                        <p className="text-[11px] text-[#434655] line-clamp-2 italic">
                          &ldquo;{commentsText}&rdquo;
                        </p>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* 12-Phase Tutorial Engagement History */}
            <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-border/70 p-5 pb-3">
                <CardTitle className="text-sm font-bold text-[#191c1e] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2563eb]" /> 12-Phase Tutorial &amp; Concept History
                </CardTitle>
                <CardDescription className="text-xs text-[#737686]">
                  Verification of scenario decisions, knowledge check quizzes, and reflections.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-2 max-h-[300px] overflow-y-auto text-xs">
                {ALL_PHASES.map((ph, idx) => {
                  const tProg = tutorialProgress.find(
                    (tp: any) => tp.phaseSlug === ph.slug || tp.phaseSlug === ph.slug.replace('-interviews', '')
                  )
                  const isEngaged = Boolean(tProg?.engagedAt)

                  return (
                    <div
                      key={ph.slug}
                      className="p-2.5 rounded-xl border border-border bg-[#f7f9fb] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#191c1e] text-[11.5px] block">{ph.name}</span>
                        <span className="text-[10px] text-[#737686]">
                          {isEngaged ? `Quiz Score: ${tProg?.quizScore ?? 2}/${tProg?.quizTotal ?? 2}` : 'Not completed'}
                        </span>
                      </div>
                      <Badge
                        className={`text-[9px] font-bold ${
                          isEngaged
                            ? 'bg-[#dcfce7] text-[#15803d] border-[#86efac]'
                            : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab]'
                        }`}
                      >
                        {isEngaged ? 'Engaged ✓' : 'Pending'}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Daily Grading Mode (Standard Per-Day Evaluator) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 12-Day Selector */}
          <div className="space-y-4">
            <Card className="border-border shadow-2xs bg-white rounded-2xl">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-sm font-bold text-[#191c1e]">Simulation Timeline</CardTitle>
                <CardDescription className="text-xs text-[#737686]">Select a day to review deliverables</CardDescription>
              </CardHeader>
              <CardContent className="p-3 space-y-1.5">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((day) => {
                  const rec = progressRecords.find((p) => p.dayNumber === day)
                  const isGraded = rec?.status === ProgressStatus.GRADED
                  const isSubmittedDay = rec?.status === ProgressStatus.SUBMITTED
                  const isSelected = selectedDay === day

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#d0e1fb] border border-[#b4c5ff] text-[#0b1c30] font-bold shadow-2xs'
                          : 'bg-[#f7f9fb] border border-border/60 text-[#434655] hover:bg-[#f2f4f6]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-mono font-bold">
                          {day}
                        </span>
                        <span>Day {day} Module</span>
                      </span>
                      {isGraded ? (
                        <Badge variant="outline" className="bg-[#dcfce7] text-[#15803d] border-[#86efac] text-[9px] font-bold">
                          Graded
                        </Badge>
                      ) : isSubmittedDay ? (
                        <Badge variant="outline" className="bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff] text-[9px] font-bold">
                          Submitted
                        </Badge>
                      ) : (
                        <span className="text-[10px] text-[#737686]">In Progress</span>
                      )}
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right Column (2 cols): Rubric & Grading Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-2xs bg-white rounded-2xl">
              <CardHeader className="border-b border-border/70 p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold text-[#191c1e]">
                    Day {selectedDay} Rubric Evaluation
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff] font-bold text-xs"
                  >
                    Score: {score1 + score2 + score3} / 15
                  </Badge>
                </div>
                <CardDescription className="text-xs text-[#737686]">
                  Assess statutory compliance, evidentiary justification, and professional competency.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-5 text-xs">
                {/* Rubric Criteria Sliders */}
                <div className="space-y-4">
                  {/* Criterion 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#191c1e]">{currentRubric.c1}</span>
                      <span className="font-mono text-[#004ac6] font-bold">{score1} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={score1}
                      onChange={(e) => setScore1(Number(e.target.value))}
                      className="w-full accent-[#2563eb]"
                    />
                  </div>

                  {/* Criterion 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#191c1e]">{currentRubric.c2}</span>
                      <span className="font-mono text-[#004ac6] font-bold">{score2} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={score2}
                      onChange={(e) => setScore2(Number(e.target.value))}
                      className="w-full accent-[#2563eb]"
                    />
                  </div>

                  {/* Criterion 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#191c1e]">{currentRubric.c3}</span>
                      <span className="font-mono text-[#004ac6] font-bold">{score3} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={score3}
                      onChange={(e) => setScore3(Number(e.target.value))}
                      className="w-full accent-[#2563eb]"
                    />
                  </div>
                </div>

                {/* Trainer Feedback Comments */}
                <div className="space-y-1.5 pt-2">
                  <label className="font-bold text-[#191c1e]">Trainer Feedback &amp; Development Directives</label>
                  <Textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="text-xs min-h-[90px] bg-[#f7f9fb] border-border rounded-lg"
                    placeholder="Provide constructive feedback citing specific strengths and statutory areas for improvement..."
                  />
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 border-t border-border/60 flex justify-end gap-3">
                <Button
                  onClick={handleGradeSubmit}
                  disabled={submitting}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Submitting Grade...' : `Save Day ${selectedDay} Evaluation`}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
