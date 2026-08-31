'use client'

import React, { useState } from 'react'
import { CheckSquare, Edit3, Save, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ProbationObjectiveSetter({
  employeeName = 'Riley Morgan',
  onSave,
}: {
  employeeName?: string
  onSave?: (objectives: string[]) => void
}) {
  const [objectives, setObjectives] = useState<string[]>([
    '1. Understand daily job responsibilities and departmental logistics workflows.',
    '2. Meet NovaLink attendance and punctuality standards (09:00 - 17:30).',
    '3. Learn and execute warehouse inventory management and tracking software.',
    '4. Demonstrate core delivery competence in daily vendor dispatches.',
    '5. Communicate and collaborate constructively with operations and customer teams.',
    '6. Comply fully with UK workplace health, safety, and data handling protocols.',
  ])

  const handleObjectiveChange = (index: number, val: string) => {
    const updated = [...objectives]
    updated[index] = val
    setObjectives(updated)
  }

  const handleSave = () => {
    toast.success(`Probation objectives locked for ${employeeName}`)
    if (onSave) onSave(objectives)
  }

  return (
    <Card id="probation-objectives" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Probation Objectives & Benchmark Setup
            </CardTitle>
          </div>
          <Button size="sm" onClick={handleSave} className="text-xs h-8 bg-teal-700 hover:bg-teal-800 text-white gap-1.5">
            <Save className="w-3.5 h-3.5" /> Save Objectives
          </Button>
        </div>
        <CardDescription className="text-xs">
          Set explicit, measurable probation benchmarks for {employeeName} to be evaluated across Week 1, Month 1, Month 2, and End of Probation.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {objectives.map((obj, idx) => (
          <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:ring-1 focus-within:ring-teal-600">
            <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 mt-1">
              {idx + 1}
            </span>
            <input
              type="text"
              value={obj}
              onChange={(e) => handleObjectiveChange(idx, e.target.value)}
              className="w-full text-xs bg-transparent border-0 focus:outline-none text-slate-800 py-1"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
