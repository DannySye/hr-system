'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, Check } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function OrientationLogger({
  employeeName = 'Jordan Hayes',
  onSaveOrientation,
}: {
  employeeName?: string
  onSaveOrientation?: (data: any) => void
}) {
  const [sessionNotes, setSessionNotes] = useState(
    'Conducted Day 1 formal orientation session. Jordan received the employee handbook, reviewed the on-call schedule with Marcus Chen, tested field diagnostic laptop access, and completed IT security credentialing.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success('Orientation session notes recorded.')
    if (onSaveOrientation) onSaveOrientation({ sessionNotes })
  }

  return (
    <Card id="orientation-log" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Day 1 Induction Session & Welcome Call
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            New Hire Welcome
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Conduct a welcome consultation with {employeeName} to answer first-day questions and document formal induction notes.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <VoiceInterviewRoom
          persona={{
            name: employeeName,
            personaType: PersonaType.EMPLOYEE,
            qualityTier: 'STRONG',
            backgroundBrief: 'Newly hired Field Engineer completing Day 1 induction and tool provisioning.',
            personalityNotes: 'Eager, polite, confirms receipt of field equipment, and clarifies on-call emergency escalation workflows.',
          }}
          interviewType={InterviewType.PROBATION_CHECKIN}
          dayNumber={5}
        />

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <label className="text-xs font-semibold text-slate-700">Official Orientation Session Log</label>
          <Textarea
            value={sessionNotes}
            onChange={(e) => {
              setSessionNotes(e.target.value)
              setSaved(false)
            }}
            className="text-xs min-h-[60px] bg-white"
          />
          <div className="flex justify-end pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              className={`text-xs h-7 px-4 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3 h-3" />
              {saved ? 'Session Logged' : 'Save Orientation Log'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
