'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { InterviewType, PersonaType } from '@/lib/types'
import { MessageSquare, Users, Sparkles } from 'lucide-react'

export function CareerConversationCard() {
  const persona = {
    name: 'Jordan Hayes',
    personaType: PersonaType.EMPLOYEE,
    qualityTier: 'STRONG',
    backgroundBrief: 'Field Engineer with 6 months tenure at NovaLink. Rated Top 5% in H1 appraisal. Seeks advanced DWDM optical certifications and leadership development.',
    personalityNotes: 'Polite, ambitious, highly structured, values concrete technical growth and leadership opportunities.',
    voiceSettings: JSON.stringify({ pitch: 1.0, rate: 1.0 }),
  }

  return (
    <Card data-tutorial-target="career-conversation" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Live 1-on-1 Career Conversation Room
            </CardTitle>
          </div>
          <Badge variant="default" className="bg-[#004ac6] text-[10px]">
            Employee: Jordan Hayes
          </Badge>
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Conduct a structured career exploration dialogue with the storyline employee. Inquire about aspirations, technical enablement needs, and internal mobility.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <VoiceInterviewRoom
          persona={persona}
          interviewType={InterviewType.CAREER}
          dayNumber={11}
        />
      </CardContent>
    </Card>
  )
}
