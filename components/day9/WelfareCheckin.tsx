'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Heart, Send, Check } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function WelfareCheckin({
  employee = { name: 'Riley Morgan', roleTitle: 'Operations Associate' },
  onSaveWelfare,
}: {
  employee?: any
  onSaveWelfare?: (data: any) => void
}) {
  const [notes, setNotes] = useState(
    'Conducted general wellbeing review. Employee feels physically comfortable in the hybrid workstation setup, reports manageable workload, and has positive relationships across operations.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success('General welfare check-in log saved.')
    if (onSaveWelfare) onSaveWelfare({ notes, concernType: 'WORKLOAD' })
  }

  return (
    <Card id="welfare-checkin" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            <CardTitle className="text-base font-bold">
              Routine Staff Welfare & Wellbeing Consultation
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Proactive HR Check-in
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Open conversation exploring workload sustainability, physical ergonomics, and overall team morale.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <VoiceInterviewRoom
          persona={{
            name: employee.name,
            personaType: PersonaType.EMPLOYEE,
            backgroundBrief: 'Routine check-in on employee wellbeing, workload balance, and hybrid workplace setup.',
            personalityNotes: 'Warm, positive, expresses satisfaction with workload balance and team culture.',
          }}
          interviewType={InterviewType.WELFARE}
          dayNumber={9}
        />

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <label className="text-xs font-semibold text-slate-700">Welfare Observation Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value)
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
              {saved ? 'Welfare Logged' : 'Save Welfare Notes'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
