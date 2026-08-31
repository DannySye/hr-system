'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, UserCheck, MessageSquare, Award, Send } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function ProbationCheckin({
  employee = { id: 'emp-riley', name: 'Riley Morgan', roleTitle: 'Operations Associate' },
  persona,
  onSubmitCheckin,
}: {
  employee?: any
  persona?: any
  onSubmitCheckin?: (data: any) => void
}) {
  const [notes, setNotes] = useState(
    'Riley has settled in well with the team. Completed security induction and understands dispatch queues. Needs minor follow-up on inventory software workflows.'
  )
  const [outcome, setOutcome] = useState('CONFIRM')
  const [objectivesMet, setObjectivesMet] = useState({
    understandsJob: true,
    meetsAttendance: true,
    learnsProcedures: true,
    competence: true,
    collaboration: true,
    compliance: true,
  })

  const toggleObjective = (key: keyof typeof objectivesMet) => {
    setObjectivesMet((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    toast.success('Week 1 Probation Check-in record logged!')
    if (onSubmitCheckin) {
      onSubmitCheckin({ notes, outcome, objectivesMet })
    }
  }

  return (
    <div id="probation-checkin" className="space-y-6">
      {/* Voice Interview with Riley Morgan */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-700" />
              <CardTitle className="text-base font-bold">
                Week 1 Probation Check-in Consultation
              </CardTitle>
            </div>
            <Badge variant="default" className="bg-teal-700 text-[10px]">
              Checkpoint: Week 1
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Conduct a supportive check-in interview with {employee.name} to discuss settling-in progress and clarify any initial hurdles.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <VoiceInterviewRoom
            persona={
              persona || {
                name: 'Riley Morgan',
                personaType: PersonaType.EMPLOYEE,
                backgroundBrief: 'Newly hired Operations Associate completing Week 1 of probation.',
                personalityNotes: 'Eager, polite, mentions feeling welcomed but appreciates software guidance.',
              }
            }
            interviewType={InterviewType.PROBATION_CHECKIN}
            dayNumber={6}
          />
        </CardContent>
      </Card>

      {/* Structured Check-in Scoring & Notes */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Check-in Evaluation & Objectives Progress
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Assess objectives progress based on your check-in findings and document formal notes.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.entries({
              understandsJob: '1. Understands core job responsibilities',
              meetsAttendance: '2. Meets attendance & punctuality criteria',
              learnsProcedures: '3. Actively learns standard operating procedures',
              competence: '4. Demonstrates initial operational competence',
              collaboration: '5. Works constructively with colleagues',
              compliance: '6. Adheres to workplace safety & compliance',
            }).map(([key, label]) => {
              const isChecked = objectivesMet[key as keyof typeof objectivesMet]
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleObjective(key as keyof typeof objectivesMet)}
                  className={`p-3 rounded-lg border text-left text-xs flex items-center justify-between transition ${
                    isChecked
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-medium ring-1 ring-teal-500'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{label}</span>
                  {isChecked && <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />}
                </button>
              )
            })}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-700">Check-in Notes & Summary</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-xs min-h-[80px]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Week 1 status: <strong>Satisfactory Progress</strong>
            </span>
            <Button onClick={handleSave} className="bg-teal-700 hover:bg-teal-800 text-white text-xs h-8 px-4 gap-1.5">
              <Send className="w-3.5 h-3.5" /> Save Check-in Record
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
