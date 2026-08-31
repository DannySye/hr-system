'use client'

import React from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Scale } from 'lucide-react'
import { InterviewType, PersonaType } from "@/lib/types"

export function DisciplinaryHearing({
  employee = { name: 'Jordan Reed', roleTitle: 'Logistics Associate' },
}: {
  employee?: any
}) {
  return (
    <Card id="hearing" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Formal Disciplinary Hearing Room
            </CardTitle>
          </div>
          <Badge variant="destructive" className="text-[10px]">
            Statutory Hearing
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Examine the facts with {employee.name}. Hear his explanation regarding the 4 lateness incidents and assess mitigating circumstances.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <VoiceInterviewRoom
          persona={{
            name: employee.name,
            personaType: PersonaType.EMPLOYEE,
            qualityTier: 'BORDERLINE',
            backgroundBrief: 'Logistics Associate participating in a formal hearing regarding chronic morning lateness.',
            personalityNotes: 'Explains railway signaling disruptions calmly, admits failure to notify manager in advance, agrees to adjust route.',
          }}
          interviewType={InterviewType.DISCIPLINARY}
          dayNumber={10}
        />
      </CardContent>
    </Card>
  )
}
