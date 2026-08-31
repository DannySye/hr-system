'use client'

import React from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { InterviewType, PersonaType } from "@/lib/types"

export function DepartmentManagerChat({
  managerName = 'Marcus Chen',
  department = 'Network Operations',
}: {
  managerName?: string
  department?: string
}) {
  return (
    <Card id="manager-chat" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Hiring Manager Scoping Consultation ({managerName})
            </CardTitle>
          </div>
          <Badge variant="default" className="bg-teal-700 text-[10px]">
            {department}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Interview Marcus to understand why the Field Engineer vacancy arose, critical daily responsibilities, and required optical networking competencies.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <VoiceInterviewRoom
          persona={{
            name: managerName,
            personaType: PersonaType.MANAGER,
            qualityTier: 'STRONG',
            backgroundBrief: 'Head of Network Operations scoping an urgent Field Engineer role for regional hub expansion.',
            personalityNotes: 'Direct, crisp, emphasizes fiber splicing certifications and on-call willingness.',
          }}
          interviewType={InterviewType.SCOPING}
          dayNumber={1}
        />
      </CardContent>
    </Card>
  )
}
