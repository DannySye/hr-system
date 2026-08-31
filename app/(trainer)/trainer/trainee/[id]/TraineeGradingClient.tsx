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
              const isSelected = selectedDay === day
              const isComplete = rec?.status === ProgressStatus.GRADED
              const isPending = rec?.status === ProgressStatus.SUBMITTED

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'border-[#2563eb] bg-[#d0e1fb] text-[#0b1c30] font-bold shadow-2xs'
                      : 'border-border bg-white text-[#434655] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isComplete
                          ? 'bg-[#004ac6] text-white'
                          : isPending
                          ? 'bg-[#fef3c7] text-[#b45309]'
                          : 'bg-[#e2e8f0] text-[#737686]'
                      }`}
                    >
                      {day}
                    </span>
                    <span>Day {day} Milestone</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[9px] ${
                      isComplete
                        ? 'bg-[#dbe1ff] text-[#004ac6] border-[#b4c5ff]'
                        : isPending
                        ? 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]'
                        : 'bg-[#f7f9fb] text-[#737686]'
                    }`}
                  >
                    {isComplete ? 'Graded' : isPending ? 'Submitted' : 'In Progress'}
                  </Badge>
                </button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Grading Panel & Rubric */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-border shadow-2xs bg-white rounded-2xl">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-[#191c1e]">
                  Day {selectedDay} Deliverable Assessment & Rubric
                </CardTitle>
                <CardDescription className="text-xs text-[#737686]">
                  Assessing {trainee.fullName} against statutory benchmarks
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                Day {selectedDay}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Status overview */}
            <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563eb]" />
                <span className="font-semibold text-[#191c1e]">Submission Status:</span>
                <span className="text-[#434655]">{currentRecord?.status || 'NOT_STARTED'}</span>
              </div>
              {currentRecord?.submittedAt && (
                <span className="text-[#737686] text-[11px]">
                  Submitted: {new Date(currentRecord.submittedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Rubric Criteria */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#191c1e] uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#2563eb]" /> Statutory Assessment Criteria (1-5 Scale)
              </h4>

              {/* Criterion 1 */}
              <div className="p-4 rounded-xl border border-border bg-white space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#191c1e]">{currentRubric.c1}</span>
                  <span className="font-mono font-bold text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded">
                    {score1} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={score1}
                  onChange={(e) => setScore1(parseInt(e.target.value))}
                  className="w-full accent-[#2563eb]"
                />
              </div>

              {/* Criterion 2 */}
              <div className="p-4 rounded-xl border border-border bg-white space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#191c1e]">{currentRubric.c2}</span>
                  <span className="font-mono font-bold text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded">
                    {score2} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={score2}
                  onChange={(e) => setScore2(parseInt(e.target.value))}
                  className="w-full accent-[#2563eb]"
                />
              </div>

              {/* Criterion 3 */}
              <div className="p-4 rounded-xl border border-border bg-white space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#191c1e]">{currentRubric.c3}</span>
                  <span className="font-mono font-bold text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded">
                    {score3} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={score3}
                  onChange={(e) => setScore3(parseInt(e.target.value))}
                  className="w-full accent-[#2563eb]"
                />
              </div>
            </div>

            {/* Written Feedback */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#191c1e]">
                Trainer Feedback & Guidance Notes
              </label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="text-xs min-h-[90px] bg-[#f7f9fb] border-border rounded-lg"
              />
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 border-t border-border flex justify-end gap-3">
            <Button
              onClick={handleGradeSubmit}
              disabled={submitting || !currentRecord}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? 'Submitting Grade...' : 'Save & Issue Official Feedback'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
