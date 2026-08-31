'use client'

import React, { useState } from 'react'
import { CheckSquare, Plus, Trash2, Check, Sparkles } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface ChecklistItem {
  id: string
  text: string
  done: boolean
}

export function OnboardingChecklistBuilder({
  employeeName = 'Jordan Hayes',
  onSaveChecklist,
}: {
  employeeName?: string
  onSaveChecklist?: (checklist: any) => void
}) {
  const [companyInfo, setCompanyInfo] = useState<ChecklistItem[]>([
    { id: 'c1', text: 'NovaLink mission, global matrix structure & culture overview', done: true },
    { id: 'c2', text: 'Executive team introductions & key departmental liaisons', done: true },
    { id: 'c3', text: 'Health, safety & emergency evacuation procedure walkthrough', done: true },
  ])

  const [jobInfo, setJobInfo] = useState<ChecklistItem[]>([
    { id: 'j1', text: 'Review Job Description & Day 1-90 milestone deliverables', done: true },
    { id: 'j2', text: 'Hardware handoff: Field test laptop, OTDR fiber kit & toolbag', done: true },
    { id: 'j3', text: 'Assign pair buddy (Marcus Chen / Senior Field Tech) for Week 1', done: true },
  ])

  const [workplaceRules, setWorkplaceRules] = useState<ChecklistItem[]>([
    { id: 'w1', text: 'Standard working hours & 1-in-4 on-call escalation protocols', done: true },
    { id: 'w2', text: 'Leave request submission process & sickness notification SOP', done: true },
    { id: 'w3', text: 'UK GDPR data handling, client confidentiality & code of conduct', done: true },
  ])

  const toggleItem = (category: 'company' | 'job' | 'rules', id: string) => {
    const updateList = (list: ChecklistItem[]) =>
      list.map((item) => (item.id === id ? { ...item, done: !item.done } : item))

    if (category === 'company') setCompanyInfo(updateList(companyInfo))
    if (category === 'job') setJobInfo(updateList(jobInfo))
    if (category === 'rules') setWorkplaceRules(updateList(workplaceRules))
  }

  const handleSave = () => {
    toast.success(`Onboarding checklist saved for ${employeeName}`)
    if (onSaveChecklist) {
      onSaveChecklist({ companyInfo, jobInfo, workplaceRules })
    }
  }

  return (
    <Card id="onboarding-checklist" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              3-Pillar Onboarding Matrix ({employeeName})
            </CardTitle>
          </div>
          <Button size="sm" onClick={handleSave} className="text-xs h-8 bg-teal-700 hover:bg-teal-800 text-white gap-1.5">
            <Check className="w-3.5 h-3.5" /> Save Checklist
          </Button>
        </div>
        <CardDescription className="text-xs">
          Structure orientation across three distinct pillars: Company Culture, Job Architecture, and Statutory Workplace Rules.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pillar 1: Company Info */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2.5">
            <div className="flex items-center justify-between border-b pb-1.5">
              <h5 className="font-bold text-xs text-slate-900">1. About Company</h5>
              <Badge variant="secondary" className="text-[9px]">Culture & Setup</Badge>
            </div>
            <div className="space-y-1.5">
              {companyInfo.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem('company', item.id)}
                  className={`p-2 rounded border text-xs flex items-start gap-2 cursor-pointer transition ${
                    item.done ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200'
                  }`}
                >
                  <input type="checkbox" checked={item.done} readOnly className="mt-0.5 rounded text-teal-700" />
                  <span className="text-[11px] leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Job Info */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2.5">
            <div className="flex items-center justify-between border-b pb-1.5">
              <h5 className="font-bold text-xs text-slate-900">2. About the Job</h5>
              <Badge variant="secondary" className="text-[9px]">Tools & Role</Badge>
            </div>
            <div className="space-y-1.5">
              {jobInfo.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem('job', item.id)}
                  className={`p-2 rounded border text-xs flex items-start gap-2 cursor-pointer transition ${
                    item.done ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200'
                  }`}
                >
                  <input type="checkbox" checked={item.done} readOnly className="mt-0.5 rounded text-teal-700" />
                  <span className="text-[11px] leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 3: Workplace Rules */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2.5">
            <div className="flex items-center justify-between border-b pb-1.5">
              <h5 className="font-bold text-xs text-slate-900">3. Workplace Rules</h5>
              <Badge variant="secondary" className="text-[9px]">SOP & Conduct</Badge>
            </div>
            <div className="space-y-1.5">
              {workplaceRules.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem('rules', item.id)}
                  className={`p-2 rounded border text-xs flex items-start gap-2 cursor-pointer transition ${
                    item.done ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200'
                  }`}
                >
                  <input type="checkbox" checked={item.done} readOnly className="mt-0.5 rounded text-teal-700" />
                  <span className="text-[11px] leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
