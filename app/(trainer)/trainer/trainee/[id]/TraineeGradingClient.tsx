'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Lock, Star, Award, Send, AlertTriangle, ShieldAlert, BookOpen, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { ProgressStatus } from "@/lib/types"

interface TraineeGradingClientProps {
  trainee: any
  progressRecords: any[]
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
}

export function TraineeGradingClient({ trainee, progressRecords }: TraineeGradingClientProps) {
  const router = useRouter()
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
            criterion1: score1,
            criterion2: score2,
            criterion3: score3,
            overallAverage: ((score1 + score2 + score3) / 3).toFixed(1),
          },
          comments,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(`Grade submitted for Day ${selectedDay}`)
        router.refresh()
      } else {
        toast.error(data.error || 'Failed to submit grade')
      }
    } catch (err) {
      toast.error('An error occurred while grading.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 12 Days Selector */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Simulation Day Deliverables
        </h3>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((day) => {
          const rec = progressRecords.find((p) => p.dayNumber === day)
          const isSelected = selectedDay === day
          const status = rec?.status ?? ProgressStatus.LOCKED

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs transition ${
                isSelected
                  ? 'border-teal-700 bg-teal-50 text-teal-950 font-bold shadow-xs ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                  {day}
                </span>
                <span>Day {day} Module</span>
              </div>
              <Badge
                variant={
                  status === ProgressStatus.GRADED
                    ? 'success'
                    : status === ProgressStatus.SUBMITTED
                    ? 'warning'
                    : 'secondary'
                }
                className="text-[9px]"
              >
                {status}
              </Badge>
            </button>
          )
        })}
      </div>

      {/* Day Review & Grading Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">
                  Day {selectedDay} Deliverable Evaluation & Rubric
                </CardTitle>
                <CardDescription className="text-xs">
                  Trainee: {trainee.fullName} ({trainee.email})
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px]">
                Status: {currentRecord?.status || 'LOCKED'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5">
            {/* Submission metadata */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-600">
              <span>
                <strong>Submitted At:</strong>{' '}
                {currentRecord?.submittedAt
                  ? new Date(currentRecord.submittedAt).toLocaleString()
                  : 'Pending trainee submission'}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Tutorial Engaged
              </span>
            </div>

            {/* Rubric Evaluation */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-teal-700" /> Rubric Competency Scores (1 to 5)
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-md bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800">{currentRubric.c1}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setScore1(val)}
                        className={`w-7 h-7 rounded text-xs font-bold transition ${
                          score1 === val
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800">{currentRubric.c2}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setScore2(val)}
                        className={`w-7 h-7 rounded text-xs font-bold transition ${
                          score2 === val
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-md bg-white border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-800">{currentRubric.c3}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setScore3(val)}
                        className={`w-7 h-7 rounded text-xs font-bold transition ${
                          score3 === val
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Qualitative Comments */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700">
                  Trainer Feedback & Pedagogical Coaching Comments
                </label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide qualitative feedback on the intern's HR decisions..."
                  className="text-xs min-h-[90px]"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Flipping status to <strong>GRADED</strong> records scores on the intern dashboard.
            </span>
            <Button
              onClick={handleGradeSubmit}
              disabled={submitting || !currentRecord}
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs h-9 px-5 gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Submitting Grade...' : 'Save & Grade Day ' + selectedDay}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
