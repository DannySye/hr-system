'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Send, Check } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function ReferenceCheckPanel({
  candidateName = 'Jordan Hayes',
  refereeName = 'Dr. Arthur Sterling',
  onSaveReference,
}: {
  candidateName?: string
  refereeName?: string
  onSaveReference?: (data: any) => void
}) {
  const [employmentVerified, setEmploymentVerified] = useState(true)
  const [notes, setNotes] = useState(
    'Referee verified 4 years of continuous service as Field Operations Specialist. Praised Jordan for 100% on-call reliability, technical fiber precision, and strong interpersonal ethics.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success('Employment Reference verification logged.')
    if (onSaveReference) {
      onSaveReference({ employmentVerified, notes })
    }
  }

  return (
    <Card id="reference-check" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Pre-Employment Reference Verification ({refereeName})
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Candidate: {candidateName}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Conduct a structured background verification call with {candidateName}&apos;s previous supervisor to verify employment history and workplace conduct.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <VoiceInterviewRoom
          persona={{
            name: refereeName,
            personaType: PersonaType.REFEREE,
            qualityTier: 'STRONG',
            backgroundBrief: `Former Engineering Director providing an employment reference for ${candidateName}.`,
            personalityNotes: 'Professional, articulate, affirms strong workplace integrity and reliable emergency response.',
          }}
          interviewType={InterviewType.REFERENCE}
          dayNumber={4}
        />

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Employment Dates & Duties Verified</span>
            <input
              type="checkbox"
              checked={employmentVerified}
              onChange={(e) => setEmploymentVerified(e.target.checked)}
              className="w-4 h-4 text-teal-700 rounded"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Reference Notes & Findings</label>
            <Textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                setSaved(false)
              }}
              className="text-xs min-h-[60px] bg-white"
            />
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleSave}
              className={`text-xs h-7 px-4 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3 h-3" />
              {saved ? 'Reference Logged' : 'Save Reference Check'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
