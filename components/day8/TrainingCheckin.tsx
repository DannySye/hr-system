'use client'

import React from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare } from 'lucide-react'
import { InterviewType, PersonaType } from "@/lib/types"

export function TrainingCheckin({
  employee = { name: 'Riley Morgan', roleTitle: 'Operations Associate' },
}: {
  employee?: any
}) {
  return (
    <Card id="training-checkin" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Post-Training Effectiveness Review
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Kirkpatrick Level 3 Evaluation
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Conduct a brief follow-up call with {employee.name} to evaluate whether the training session successfully addressed the identified workplace communication gap.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <VoiceInterviewRoom
          persona={{
            name: employee.name,
            personaType: PersonaType.EMPLOYEE,
            backgroundBrief: 'Follow-up consultation after attending the Cross-Functional Communication Workshop.',
            personalityNotes: 'Enthusiastic about practical frameworks learned, shares practical examples of speaking up in recent retrospectives.',
          }}
          interviewType={InterviewType.PROBATION_CHECKIN}
          dayNumber={8}
        />
      </CardContent>
    </Card>
  )
}
