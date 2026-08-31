'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { InterviewType, PersonaType } from '@/lib/types'
import { MessageSquare, Save, CheckCircle2, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface ExitInterviewFormProps {
  employeeId?: string
  isUnlocked?: boolean
}

export function ExitInterviewForm({
  employeeId = 'emp-103',
  isUnlocked = true,
}: ExitInterviewFormProps) {
  const [whyLeaving, setWhyLeaving] = useState(
    'Relocating to Frankfurt for family reasons and taking an international telecoms architecture role.'
  )
  const [whatEnjoyed, setWhatEnjoyed] = useState(
    'Strong collaborative culture in the Network Operations team, supportive leadership from Marcus Chen, and cutting-edge optical infrastructure projects.'
  )
  const [challenges, setChallenges] = useState(
    'Occasional weekend on-call rota fatigue during major regional fiber cutovers, and legacy ticket system delays.'
  )
  const [managementFeedback, setManagementFeedback] = useState(
    'Marcus is technically brilliant and fair. Encouraged more structured 1-on-1 check-ins for newer field technicians.'
  )
  const [improvementSuggestions, setImprovementSuggestions] = useState(
    'Automate optical cutover testing scripts and provide more cross-training between field engineers and software telemetry teams.'
  )
  const [wouldRecommend, setWouldRecommend] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const personaElena = {
    name: 'Elena Rostova',
    personaType: PersonaType.EMPLOYEE,
    qualityTier: 'STRONG',
    backgroundBrief: 'Network Systems Specialist who has been with NovaLink for 2.5 years. Resigning due to family relocation to Frankfurt.',
    personalityNotes: 'Professional, appreciative of NovaLink team, constructive about documentation bottlenecks, eager to ensure a smooth transition.',
    voiceSettings: JSON.stringify({ pitch: 1.05, rate: 1.0 }),
  }

  const handleSaveInterview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!whyLeaving.trim() || !whatEnjoyed.trim() || !challenges.trim() || !managementFeedback.trim() || !improvementSuggestions.trim()) {
      toast.error('All 6 structured exit interview fields must be completed.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/day12/exit/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          whyLeaving,
          whatEnjoyed,
          challenges,
          managementFeedback,
          improvementSuggestions,
          wouldRecommend,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to record exit interview.')
        return
      }

      setSaved(true)
      toast.success('Structured exit interview saved to separation case file!')
    } catch (err) {
      toast.error('An error occurred while saving the exit interview.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div data-tutorial-target="exit-interview" className="space-y-6">
      {/* 1. Voice/Text Interview Room */}
      <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/70 p-5 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2563eb]" />
              <CardTitle className="text-sm font-bold text-[#191c1e]">
                Live Exit Interview Dialogue Room
              </CardTitle>
            </div>
            <Badge variant="default" className="bg-[#004ac6] text-[10px]">
              Departing Employee: Elena Rostova
            </Badge>
          </div>
          <CardDescription className="text-xs text-[#737686]">
            Conduct an empathetic, constructive exit consultation. Probe for genuine organizational intelligence and leadership feedback.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5">
          <VoiceInterviewRoom
            persona={personaElena}
            interviewType={InterviewType.EXIT}
            dayNumber={12}
          />
        </CardContent>
      </Card>

      {/* 2. Structured 6-Field Exit Assessment Form */}
      <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/70 p-5 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Structured Exit Diagnostics &amp; Organizational Feedback Form
            </CardTitle>
            {saved && (
              <Badge className="text-[9px] bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold">
                ✓ 6/6 Dimensions Documented
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs text-[#737686]">
            Contemporaneous capture across primary reason, positives, challenges, management review, and employer recommendation.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSaveInterview}>
          <CardContent className="p-5 space-y-4 text-xs">
            {/* 1. Why Leaving */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#191c1e]">1. Primary Reason for Departure</label>
              <Textarea
                value={whyLeaving}
                onChange={(e) => setWhyLeaving(e.target.value)}
                className="text-xs min-h-[60px] bg-[#f7f9fb] border-border rounded-lg"
                required
              />
            </div>

            {/* 2. What Enjoyed */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#191c1e]">2. What Did You Most Enjoy About Working at NovaLink?</label>
              <Textarea
                value={whatEnjoyed}
                onChange={(e) => setWhatEnjoyed(e.target.value)}
                className="text-xs min-h-[60px] bg-[#f7f9fb] border-border rounded-lg"
                required
              />
            </div>

            {/* 3. Challenges */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#191c1e]">3. Key Operational &amp; Cultural Challenges Encountered</label>
              <Textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                className="text-xs min-h-[60px] bg-[#f7f9fb] border-border rounded-lg"
                required
              />
            </div>

            {/* 4. Management Feedback */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#191c1e]">4. Direct Line Management &amp; Leadership Feedback</label>
              <Textarea
                value={managementFeedback}
                onChange={(e) => setManagementFeedback(e.target.value)}
                className="text-xs min-h-[60px] bg-[#f7f9fb] border-border rounded-lg"
                required
              />
            </div>

            {/* 5. Improvement Suggestions */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#191c1e]">5. Organizational Improvement &amp; Retention Recommendations</label>
              <Textarea
                value={improvementSuggestions}
                onChange={(e) => setImprovementSuggestions(e.target.value)}
                className="text-xs min-h-[60px] bg-[#f7f9fb] border-border rounded-lg"
                required
              />
            </div>

            {/* 6. Would Recommend Employer */}
            <div className="p-3.5 rounded-xl border border-border bg-[#f7f9fb] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#191c1e] block text-xs">
                  6. Would You Recommend NovaLink Global as an Employer of Choice?
                </span>
                <span className="text-[11px] text-[#737686]">
                  Net Promoter Score (eNPS) indicator.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setWouldRecommend(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    wouldRecommend
                      ? 'bg-[#dcfce7] text-[#15803d] border border-[#86efac] shadow-2xs'
                      : 'bg-white text-[#737686] border border-border'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Yes (Promoter)
                </button>
                <button
                  type="button"
                  onClick={() => setWouldRecommend(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    !wouldRecommend
                      ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ffb4ab] shadow-2xs'
                      : 'bg-white text-[#737686] border border-border'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" /> No (Detractor)
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0 border-t border-border/60 flex justify-end gap-3">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
            >
              <Save className="w-3.5 h-3.5" />
              {submitting ? 'Saving Interview...' : saved ? 'Update Exit Record' : 'Save Exit Interview Record'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
