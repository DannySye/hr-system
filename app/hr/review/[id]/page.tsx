'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  Award,
  FileText,
  Shield,
  Star,
  Send,
  Sparkles,
  AlertCircle,
  HelpCircle,
  GraduationCap,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ReviewTraineeDeliverablePage() {
  const params = useParams()
  const router = useRouter()
  const progressId = params.id as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submission, setSubmission] = useState<any>(null)

  // 4 Rubric dimensions (0-25 each = 100 total)
  const [rubricCompliance, setRubricCompliance] = useState<number>(23)
  const [rubricQuality, setRubricQuality] = useState<number>(24)
  const [rubricFramework, setRubricFramework] = useState<number>(22)
  const [rubricCommunication, setRubricCommunication] = useState<number>(23)
  const [comments, setComments] = useState('')

  const totalScore = rubricCompliance + rubricQuality + rubricFramework + rubricCommunication

  let gradeTier = 'Distinction (85-100)'
  let gradeBadgeColor = 'bg-[#004ac6] text-white'
  if (totalScore < 50) {
    gradeTier = 'Revision Required (<50)'
    gradeBadgeColor = 'bg-[#ffdad6] text-[#ba1a1a]'
  } else if (totalScore < 70) {
    gradeTier = 'Pass (50-69)'
    gradeBadgeColor = 'bg-[#d0e1fb] text-[#0b1c30]'
  } else if (totalScore < 85) {
    gradeTier = 'Merit (70-84)'
    gradeBadgeColor = 'bg-[#dbe1ff] text-[#00174b]'
  }

  useEffect(() => {
    fetch(`/api/simulation/progress`)
      .then((res) => res.json())
      .then((data) => {
        // Find by progressId or fallback
        setSubmission({
          id: progressId,
          traineeName: 'Alex Mercer (Trainee)',
          traineeEmail: 'trainee@novalink.com',
          dayNumber: 1,
          dayTitle: 'Workforce Planning & Job Analysis',
          submittedAt: new Date().toLocaleDateString(),
        })
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [progressId])

  const handleGradeSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/trainer/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traineeProgressId: progressId,
          rubricScores: {
            compliance: rubricCompliance,
            quality: rubricQuality,
            framework: rubricFramework,
            communication: rubricCommunication,
            total: totalScore,
            gradeTier,
          },
          comments: comments || 'Deliverable demonstrates thorough mastery of statutory framework and operational requirements.',
          status: totalScore >= 50 ? 'GRADED' : 'REVISION_REQUESTED',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to submit grade.')
        return
      }

      toast.success('Grade & feedback successfully applied to the simulation!')
      router.push('/hr')
      router.refresh()
    } catch (err) {
      toast.error('An unexpected error occurred.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link
            href="/hr"
            className="flex items-center gap-2 text-xs font-semibold text-[#434655] hover:text-[#191c1e]"
          >
            <ArrowLeft className="w-4 h-4" /> Return to HR System Queue
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#737686]">Assessment ID:</span>
            <span className="text-xs font-mono font-bold text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded">
              HR-ASSESS-{progressId.slice(-6).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Trainee Submission Dossier Overview */}
        <Card className="border-border shadow-2xs bg-white rounded-2xl">
          <CardHeader className="border-b border-border/70 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dbe1ff] text-[#004ac6] font-bold text-sm flex items-center justify-center">
                  AM
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-[#191c1e]">
                    Practicum Review: Alex Mercer
                  </CardTitle>
                  <CardDescription className="text-xs text-[#737686]">
                    Day 1: Workforce Planning & Job Analysis • Submitted Deliverables
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={`${gradeBadgeColor} text-xs px-2.5 py-1 font-bold`}>
                  {gradeTier}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Deliverable Content Display */}
            <div className="p-4 rounded-xl bg-[#f7f9fb] border border-border text-xs space-y-3">
              <div className="flex items-center justify-between font-bold text-[#191c1e] border-b border-border/60 pb-2">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#2563eb]" /> Submitted Job Description (Field Engineer)
                </span>
                <span className="text-[10px] text-[#737686]">Statutory Alignment: Equality Act 2010</span>
              </div>

              <div className="space-y-2 text-[#434655] leading-relaxed font-sans text-xs">
                <div>
                  <strong className="text-[#191c1e]">Core Purpose & Deliverables:</strong>
                  <p className="mt-0.5">
                    Deploy, configure, and maintain mission-critical optical infrastructure and distributed network cutovers across EMEA enterprise sites.
                  </p>
                </div>
                <div>
                  <strong className="text-[#191c1e]">Essential Qualifications:</strong>
                  <p className="mt-0.5">
                    BSc Computer Systems or relevant networking certifications (Cisco CCNP/CCNA), valid UK driving license, demonstrated OTDR diagnostic experience.
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Dimension Statutory Rubric */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-sm text-[#191c1e] flex items-center gap-2">
                <Star className="w-4 h-4 text-[#2563eb]" /> 4-Dimension CIPD Rubric Scoring
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dim 1 */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#191c1e]">1. Statutory & Legal Compliance</span>
                    <span className="font-mono font-bold text-[#004ac6]">{rubricCompliance} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubricCompliance}
                    onChange={(e) => setRubricCompliance(parseInt(e.target.value, 10))}
                    className="w-full accent-[#2563eb]"
                  />
                  <p className="text-[10px] text-[#737686]">Equality Act 2010 compliance and non-discriminatory criteria.</p>
                </div>

                {/* Dim 2 */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#191c1e]">2. Professional Thoroughness</span>
                    <span className="font-mono font-bold text-[#004ac6]">{rubricQuality} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubricQuality}
                    onChange={(e) => setRubricQuality(parseInt(e.target.value, 10))}
                    className="w-full accent-[#2563eb]"
                  />
                  <p className="text-[10px] text-[#737686]">Clear technical duties, KPIs, and operational deliverables.</p>
                </div>

                {/* Dim 3 */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#191c1e]">3. CIPD Framework Alignment</span>
                    <span className="font-mono font-bold text-[#004ac6]">{rubricFramework} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubricFramework}
                    onChange={(e) => setRubricFramework(parseInt(e.target.value, 10))}
                    className="w-full accent-[#2563eb]"
                  />
                  <p className="text-[10px] text-[#737686]">Core behaviors, situational judgment, and competency linkage.</p>
                </div>

                {/* Dim 4 */}
                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#191c1e]">4. Strategic HR Communication</span>
                    <span className="font-mono font-bold text-[#004ac6]">{rubricCommunication} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={rubricCommunication}
                    onChange={(e) => setRubricCommunication(parseInt(e.target.value, 10))}
                    className="w-full accent-[#2563eb]"
                  />
                  <p className="text-[10px] text-[#737686]">Manager stakeholder alignment and professional clarity.</p>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 rounded-xl bg-[#dbe1ff]/60 border border-[#b4c5ff] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#00174b] block">Total Assessment Score</span>
                  <span className="text-[11px] text-[#004ac6]">Synchronizes directly to the trainee practicum profile</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#004ac6] font-mono">{totalScore} / 100</span>
                </div>
              </div>

              {/* Assessor Feedback */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#191c1e]">
                  Assessor Feedback & Guidance Comments:
                </label>
                <Textarea
                  placeholder="Provide constructive feedback highlighting strengths and statutory compliance points..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="text-xs min-h-[90px] bg-[#f7f9fb] border-border rounded-lg"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-border/60">
              <Link href="/hr">
                <Button variant="outline" size="sm" className="text-xs h-9">
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={handleGradeSubmit}
                disabled={submitting}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-6 gap-2 shadow-xs rounded-lg"
              >
                <Send className="w-3.5 h-3.5" />
                {submitting ? 'Applying Grade & Syncing...' : 'Approve & Apply Grade to Simulation'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
