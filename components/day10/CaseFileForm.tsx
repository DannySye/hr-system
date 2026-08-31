'use client'

import React, { useState } from 'react'
import { FileCheck, Shield, Send, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function CaseFileForm({
  employeeName = 'Jordan Reed',
  allFairStepsComplete = false,
  onSaveCase,
}: {
  employeeName?: string
  allFairStepsComplete?: boolean
  onSaveCase?: (caseData: any) => void
}) {
  const [issueType, setIssueType] = useState('LATENESS')
  const [factsEstablished, setFactsEstablished] = useState(
    'Employee accumulated 4 unnotified lateness incidents across an 8-day operating period (averaging 45 mins late per incident), triggering ACAS punctuality review.'
  )
  const [employeeResponse, setEmployeeResponse] = useState(
    'Employee explained that severe signaling failures on the central commuter train line caused the delays. Acknowledged failure to phone manager beforehand due to subway dead zones, and committed to using an earlier bus route.'
  )
  const [decision, setDecision] = useState(
    'Formal First Written Warning issued (valid for 6 months). Agreed 30-day punctuality monitoring plan established with zero unnotified delays.'
  )
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allFairStepsComplete) {
      toast.error('All 6 Fair Process checklist steps must be completed before logging the formal disciplinary decision.')
      return
    }

    setSaved(true)
    toast.success('Disciplinary Case File recorded.')
    if (onSaveCase) {
      onSaveCase({ issueType, factsEstablished, employeeResponse, decision })
    }
  }

  return (
    <Card id="case-file" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Formal Case File & Outcome Documentation
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Final Legal Record
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Document the facts, employee statement, and proportionate disciplinary decision for {employeeName}.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Breach Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
            >
              <option value="LATENESS">Persistent Unexcused Lateness</option>
              <option value="UNAUTHORISED_ABSENCE">Unauthorised Absence (AWOL)</option>
              <option value="PROCEDURE_FAILURE">Failure to Follow Reporting SOP</option>
              <option value="MISCONDUCT">General Misconduct</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">1. Facts Established by HR</label>
            <Textarea
              value={factsEstablished}
              onChange={(e) => setFactsEstablished(e.target.value)}
              className="text-xs min-h-[65px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              2. Employee Response & Mitigating Context
            </label>
            <Textarea
              value={employeeResponse}
              onChange={(e) => setEmployeeResponse(e.target.value)}
              className="text-xs min-h-[65px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              3. Proportionate Decision & Sanction
            </label>
            <Textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="text-xs min-h-[65px]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 italic">
              Outcome letter includes standard 7-day right of appeal.
            </span>
            <Button
              type="submit"
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Case File Saved' : 'Save Formal Case File'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
