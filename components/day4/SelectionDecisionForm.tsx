'use client'

import React, { useState } from 'react'
import { UserCheck, Check, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function SelectionDecisionForm({
  onSaveDecision,
}: {
  onSaveDecision?: (data: any) => void
}) {
  const [candidate, setCandidate] = useState('Jordan Hayes')
  const [justification, setJustification] = useState(
    'Jordan Hayes achieved the highest technical score (5/5) during Day 3 selection interviews, demonstrated exemplary STAR behavioral responses in fiber optic diagnostics, and received an outstanding employment reference from Dr. Arthur Sterling confirming 4 years of impeccable on-call reliability.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (justification.trim().length < 80) {
      toast.error('Justification too brief: please provide at least 80 characters of evidence-based reasoning.')
      return
    }

    setSaved(true)
    toast.success('Selection Decision Record formally documented.')
    if (onSaveDecision) onSaveDecision({ chosenCandidate: candidate, justification })
  }

  return (
    <Card id="selection-decision" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Formal Selection Decision Record</CardTitle>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500">Defensible Paper Trail</span>
        </div>
        <CardDescription className="text-xs">
          Document the evidence-based rationale justifying why this candidate was selected over other applicants.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Selected Candidate</label>
            <select
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
              className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
            >
              <option value="Jordan Hayes">Jordan Hayes (Highest Interview & Reference Score)</option>
              <option value="Casey Rivera">Casey Rivera (Borderline Secondary Candidate)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Evidence-Based Selection Justification</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {justification.length} / 80 min chars
              </span>
            </label>
            <Textarea
              value={justification}
              onChange={(e) => {
                setJustification(e.target.value)
                setSaved(false)
              }}
              className="text-xs min-h-[85px]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Decision Record Locked' : 'Save Selection Decision'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
