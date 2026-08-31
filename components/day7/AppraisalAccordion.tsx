'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Users, Shield, Sparkles, Send, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function AppraisalAccordion({
  employee = { name: 'Riley Morgan', roleTitle: 'Operations Associate' },
  supervisor = { name: 'Marcus Chen', roleTitle: 'Head of Engineering / Ops' },
  colleague = { name: 'Taylor Vance', roleTitle: 'Senior Peer Engineer' },
  onSaveSynthesis,
}: {
  employee?: any
  supervisor?: any
  colleague?: any
  onSaveSynthesis?: (data: any) => void
}) {
  const [strengths, setStrengths] = useState(
    'Strong attention to logistics detail, rapid mastery of inventory workflows, and proactive communication with peers.'
  )
  const [weaknesses, setWeaknesses] = useState(
    'Occasional hesitation when escalating system tool blockers; could participate more actively during sprint retrospectives.'
  )
  const [trainingNeeds, setTrainingNeeds] = useState(
    'Advanced Distributed Microservices & Performance Optimization, plus Cross-Functional Communication Workshop.'
  )
  const [futureObjectives, setFutureObjectives] = useState(
    'Achieve 99% dispatch accuracy and lead quarterly warehouse inventory audits autonomously.'
  )

  const handleGenerateDraft = () => {
    toast.success('AI Synthesis draft generated from the 360° feedback interviews!')
  }

  const handleSave = () => {
    toast.success('Performance Appraisal synthesis logged successfully!')
    if (onSaveSynthesis) {
      onSaveSynthesis({ strengths, weaknesses, trainingNeeds, futureObjectives })
    }
  }

  return (
    <div id="appraisal-form" className="space-y-6">
      {/* 360 Feedback Interviews Tabs */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-700" />
              <CardTitle className="text-base font-bold">
                360-Degree Appraisal Feedback Multi-View
              </CardTitle>
            </div>
            <Badge variant="default" className="bg-teal-700 text-[10px]">
              Tri-Perspective Feedback
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Interview the employee, their direct supervisor, and a peer colleague to capture holistic performance insights.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5">
          <Tabs defaultValue="self" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-slate-100 p-1 mb-4">
              <TabsTrigger value="self" className="text-xs font-semibold">
                <User className="w-3.5 h-3.5 mr-1.5" /> 1. Self (Riley)
              </TabsTrigger>
              <TabsTrigger value="supervisor" className="text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 mr-1.5" /> 2. Manager (Marcus)
              </TabsTrigger>
              <TabsTrigger value="colleague" className="text-xs font-semibold">
                <Users className="w-3.5 h-3.5 mr-1.5" /> 3. Peer (Taylor)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="self">
              <VoiceInterviewRoom
                persona={{
                  name: employee.name,
                  personaType: PersonaType.EMPLOYEE,
                  backgroundBrief: 'Self-assessment of operational goals and team collaboration.',
                  personalityNotes: 'Reflective, enthusiastic, highlights recent dispatch wins.',
                }}
                interviewType={InterviewType.APPRAISAL_360}
                dayNumber={7}
              />
            </TabsContent>

            <TabsContent value="supervisor">
              <VoiceInterviewRoom
                persona={{
                  name: supervisor.name,
                  personaType: PersonaType.MANAGER,
                  backgroundBrief: 'Supervisor performance review of target throughput and reliability.',
                  personalityNotes: 'Direct, focused on KPIs and proactive problem escalation.',
                }}
                interviewType={InterviewType.APPRAISAL_360}
                dayNumber={7}
              />
            </TabsContent>

            <TabsContent value="colleague">
              <VoiceInterviewRoom
                persona={{
                  name: colleague.name,
                  personaType: PersonaType.COLLEAGUE,
                  backgroundBrief: 'Peer evaluation on teamwork, communication, and mutual sprint support.',
                  personalityNotes: 'Collaborative, praises helpfulness, notes team meeting silence.',
                }}
                interviewType={InterviewType.APPRAISAL_360}
                dayNumber={7}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Synthesis Form */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-700" />
              <CardTitle className="text-base font-bold">
                Appraisal Synthesis & Development Action Plan
              </CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateDraft}
              className="text-xs h-8 gap-1.5 text-teal-800 border-teal-200 bg-teal-50 hover:bg-teal-100"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-700" /> Auto-Draft from Interviews
            </Button>
          </div>
          <CardDescription className="text-xs">
            Synthesize the 3 perspectives into clear strengths, developmental weaknesses, and tangible training needs.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Core Strengths Identified</label>
              <Textarea
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                className="text-xs min-h-[75px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Areas for Growth & Weaknesses</label>
              <Textarea
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                className="text-xs min-h-[75px]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Identified Training & Development Needs (Carries over to Day 8)
            </label>
            <Textarea
              value={trainingNeeds}
              onChange={(e) => setTrainingNeeds(e.target.value)}
              placeholder="Specify the exact courses or workshops needed..."
              className="text-xs min-h-[60px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Next Cycle Objectives</label>
            <Textarea
              value={futureObjectives}
              onChange={(e) => setFutureObjectives(e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button onClick={handleSave} className="bg-teal-700 hover:bg-teal-800 text-white text-xs h-8 px-5 gap-1.5 font-semibold">
              <Send className="w-3.5 h-3.5" /> Save 360° Appraisal Synthesis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
