'use client'

import React, { useState } from 'react'
import { VoiceInterviewRoom } from '@/components/shared/VoiceInterviewRoom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, ShieldAlert, Send, Check } from 'lucide-react'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

export function GrievanceHandler({
  employee = { name: 'Samira Khan', roleTitle: 'Customer Operations Specialist' },
  onSaveGrievance,
}: {
  employee?: any
  onSaveGrievance?: (data: any) => void
}) {
  const [concernType, setConcernType] = useState('WORKLOAD')
  const [factsNotes, setFactsNotes] = useState(
    'Samira reported severe burnout resulting from two unreplaced teammate departures. She has been working 12-hour shifts without adjusted sprint targets for 3 consecutive weeks.'
  )
  const [resolutionPlan, setResolutionPlan] = useState(
    '1. Acknowledged workload distress.\n2. Scheduled immediate sprint re-scoping with Marcus Chen.\n3. Approved 2 days compensatory rest leave.\n4. Initiating temp support onboarding.'
  )
  const [status, setStatus] = useState('OPEN')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success('Formal grievance record and resolution plan documented.')
    if (onSaveGrievance) {
      onSaveGrievance({ concernType, factsNotes, resolutionPlan, status })
    }
  }

  return (
    <Card id="grievance" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-base font-bold">
              Formal Grievance Investigation & De-escalation
            </CardTitle>
          </div>
          <Badge variant="destructive" className="text-[10px]">
            Active Grievance
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Interview {employee.name} to hear her formal workload complaint. Apply empathetic, active listening before formulating a structured resolution.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <VoiceInterviewRoom
          persona={{
            name: employee.name,
            personaType: PersonaType.EMPLOYEE,
            qualityTier: 'BORDERLINE',
            backgroundBrief: 'Customer Operations specialist raising a serious workload grievance after teammate reallocations.',
            personalityNotes: 'Strained, passionate, feeling unappreciated. Responds well once HR validates her exhaustion and offers concrete capacity support.',
          }}
          interviewType={InterviewType.WELFARE}
          dayNumber={9}
        />

        <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Grievance Category</label>
              <select
                value={concernType}
                onChange={(e) => setConcernType(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
              >
                <option value="WORKLOAD">Excessive Workload & Capacity Imbalance</option>
                <option value="RELATIONSHIP">Interpersonal Friction & Managerial Communication</option>
                <option value="SAFETY">Workplace Ergonomics & Safety</option>
                <option value="GRIEVANCE">Policy Misapplication / Contract Breach</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Investigation Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
              >
                <option value="OPEN">Action Plan Open — Under HR Follow-up</option>
                <option value="RESOLVED">Resolved — Agreed Action Plan Executed</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Facts Established & Employee Statement</label>
            <Textarea
              value={factsNotes}
              onChange={(e) => {
                setFactsNotes(e.target.value)
                setSaved(false)
              }}
              className="text-xs min-h-[70px] bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Agreed Action & Resolution Protocol</label>
            <Textarea
              value={resolutionPlan}
              onChange={(e) => {
                setResolutionPlan(e.target.value)
                setSaved(false)
              }}
              className="text-xs min-h-[70px] bg-white"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Grievance Documented' : 'Save Grievance Record'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
