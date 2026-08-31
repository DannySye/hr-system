'use client'

import React, { useState } from 'react'
import { CheckCircle2, Lock, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const FAIR_STEPS = [
  { id: 'step1', title: '1. Identify the Specific Issue', desc: 'Define the exact alleged misconduct/breach clearly in writing.' },
  { id: 'step2', title: '2. Establish the Objective Facts', desc: 'Gather and audit empirical evidence (attendance registers, logs, witness notes).' },
  { id: 'step3', title: '3. Provide Opportunity to Respond', desc: 'Conduct a formal hearing giving the employee a full right to be heard and present mitigating context.' },
  { id: 'step4', title: '4. Follow Standard Company Procedure', desc: 'Ensure right to accompaniment, proper advance notice, and non-discriminatory treatment.' },
  { id: 'step5', title: '5. Formulate Proportionate Decision', desc: 'Determine fair outcome (Written Warning, PIP, Suspension, Dismissal) reflecting context.' },
  { id: 'step6', title: '6. Formally Document & Provide Right of Appeal', desc: 'Issue written outcome letter detailing the decision and 7-day right of appeal.' },
]

export function FairProcessChecklist({
  onChecklistChange,
}: {
  onChecklistChange?: (checklist: Record<string, boolean>, allComplete: boolean) => void
}) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  })

  const toggleStep = (stepId: string, index: number) => {
    // Enforce strict order: Cannot check step N unless step N-1 is complete
    if (index > 0) {
      const prevStepId = FAIR_STEPS[index - 1].id
      if (!completedSteps[prevStepId]) {
        toast.error(`Procedural Order Required: Complete Step ${index} before unlocking Step ${index + 1}.`)
        return
      }
    }

    const currentVal = completedSteps[stepId]
    const updated = { ...completedSteps, [stepId]: !currentVal }

    // If unchecking a step, uncheck all subsequent steps to maintain invariant
    if (currentVal) {
      for (let i = index; i < FAIR_STEPS.length; i++) {
        updated[FAIR_STEPS[i].id] = false
      }
    }

    setCompletedSteps(updated)
    const allDone = FAIR_STEPS.every((s) => updated[s.id])
    if (onChecklistChange) onChecklistChange(updated, allDone)
  }

  return (
    <Card id="fair-process" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              ACAS Statutory Fair Process Ordered Stepper
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-teal-50 text-teal-800 border-teal-200">
            Strict Pedagogical Sequence
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Each step must be completed in exact sequence. Skipping ahead invalidates procedural fairness under UK employment law.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-2.5">
        {FAIR_STEPS.map((step, idx) => {
          const isDone = completedSteps[step.id]
          const isUnlocked = idx === 0 || completedSteps[FAIR_STEPS[idx - 1].id]

          return (
            <div
              key={step.id}
              onClick={() => isUnlocked && toggleStep(step.id, idx)}
              className={`p-3 rounded-lg border text-xs flex items-center justify-between transition cursor-pointer ${
                isDone
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium'
                  : isUnlocked
                  ? 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  : 'border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed text-slate-400'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                    isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </span>
                <div>
                  <h5 className="font-bold text-slate-900">{step.title}</h5>
                  <p className="text-[11px] text-slate-500">{step.desc}</p>
                </div>
              </div>

              {!isUnlocked && <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
