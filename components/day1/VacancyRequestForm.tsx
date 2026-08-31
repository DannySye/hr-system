'use client'

import React, { useState } from 'react'
import { FileText, Save, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function VacancyRequestForm({
  onSave,
}: {
  onSave?: (data: any) => void
}) {
  const [positionTitle, setPositionTitle] = useState('Field Engineer')
  const [department, setDepartment] = useState('Network Operations')
  const [vacancyType, setVacancyType] = useState('NEW')
  const [reason, setReason] = useState(
    'Expansion of client optical data infrastructure across the Greater London hub requiring dedicated field deployment and maintenance coverage.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    toast.success('Vacancy Request Form saved.')
    if (onSave) onSave({ positionTitle, department, vacancyType, reason })
  }

  return (
    <Card id="vacancy-request" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Formal Vacancy Request Form</CardTitle>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500">Step 1: Authorization</span>
        </div>
        <CardDescription className="text-xs">
          Formally justify the headcount requisition before proceeding to job documentation.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Target Position</label>
              <Input
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Requesting Department</label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Requisition Type</label>
              <select
                value={vacancyType}
                onChange={(e) => setVacancyType(e.target.value)}
                className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
              >
                <option value="NEW">New Headcount (Business Case Justified)</option>
                <option value="REPLACEMENT">Replacement (Existing Headcount)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Business Reason & Workload Justification</label>
            <Textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setSaved(false)
              }}
              className="text-xs min-h-[60px]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`text-xs h-8 px-4 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Vacancy Approved & Saved' : 'Save Vacancy Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
