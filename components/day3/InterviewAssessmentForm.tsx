'use client'

import React, { useState } from 'react'
import { Award, Send, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function InterviewAssessmentForm({
  candidateName = 'Jordan Hayes',
  onSaveAssessment,
}: {
  candidateName?: string
  onSaveAssessment?: (data: any) => void
}) {
  const [techScore, setTechScore] = useState(5)
  const [behavScore, setBehavScore] = useState(5)
  const [commScore, setCommScore] = useState(4)
  const [teamScore, setTeamScore] = useState(4)
  const [notes, setNotes] = useState(
    'Exceptional response to the fiber splicing attenuation scenario using OTDR diagnostics. STAR structure was concise and demonstrated strong autonomous field decision-making.'
  )
  const [recommendation, setRecommendation] = useState('PROCEED')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    toast.success(`Assessment logged for ${candidateName}`)
    if (onSaveAssessment) {
      onSaveAssessment({ techScore, behavScore, commScore, teamScore, notes, recommendation })
    }
  }

  return (
    <Card id="assessment-form" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Interview Evaluation Record ({candidateName})
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Post-Interview Evaluation
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Evaluate competency performance immediately following the interview to lock in evidence-based scoring.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">1. Technical (1-5)</label>
              <select
                value={techScore}
                onChange={(e) => setTechScore(Number(e.target.value))}
                className="w-full text-xs rounded border border-slate-200 p-1.5 bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} - Score</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">2. Behavioural (1-5)</label>
              <select
                value={behavScore}
                onChange={(e) => setBehavScore(Number(e.target.value))}
                className="w-full text-xs rounded border border-slate-200 p-1.5 bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} - Score</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">3. Communication (1-5)</label>
              <select
                value={commScore}
                onChange={(e) => setCommScore(Number(e.target.value))}
                className="w-full text-xs rounded border border-slate-200 p-1.5 bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} - Score</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">4. Teamwork (1-5)</label>
              <select
                value={teamScore}
                onChange={(e) => setTeamScore(Number(e.target.value))}
                className="w-full text-xs rounded border border-slate-200 p-1.5 bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} - Score</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Overall Interview Notes & Evidence</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Hiring Recommendation</label>
            <select
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
            >
              <option value="PROCEED">Proceed to Offer & Reference Check</option>
              <option value="HOLD">Hold — Secondary Reserve Candidate</option>
              <option value="REJECT">Reject — Does not meet essential technical threshold</option>
            </select>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Assessment Recorded' : 'Save Assessment Record'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
