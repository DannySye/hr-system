'use client'

import React, { useState } from 'react'
import { Target, Plus, Trash2, Save } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function KpiBuilder({
  positionTitle = 'Operations Associate',
  initialKpis = [
    { name: 'Daily Vendor Dispatch Accuracy', target: '98%', unit: 'Percentage' },
    { name: 'Inventory Audit Resolution Time', target: '< 24 hours', unit: 'Hours' },
    { name: 'SOP Process Adherence & Compliance', target: '100%', unit: 'Percentage' },
  ],
  onSave,
}: {
  positionTitle?: string
  initialKpis?: { name: string; target: string; unit: string }[]
  onSave?: (kpis: any[]) => void
}) {
  const [kpis, setKpis] = useState(initialKpis)

  const handleAddKpi = () => {
    setKpis([...kpis, { name: 'New Target Metric', target: '95%', unit: 'Percentage' }])
  }

  const handleRemoveKpi = (idx: number) => {
    setKpis(kpis.filter((_, i) => i !== idx))
  }

  const handleUpdateKpi = (idx: number, field: string, val: string) => {
    const updated = [...kpis]
    updated[idx] = { ...updated[idx], [field]: val }
    setKpis(updated)
  }

  const handleSave = () => {
    toast.success(`KPIs saved for ${positionTitle}`)
    if (onSave) onSave(kpis)
  }

  return (
    <Card id="kpi-builder" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              KPI & Performance Benchmark Builder
            </CardTitle>
          </div>
          <Button size="sm" onClick={handleSave} className="text-xs h-8 bg-teal-700 hover:bg-teal-800 text-white gap-1.5">
            <Save className="w-3.5 h-3.5" /> Save KPIs
          </Button>
        </div>
        <CardDescription className="text-xs">
          Establish measurable performance metrics aligned with the {positionTitle} job description.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
              {idx + 1}
            </span>
            <Input
              value={kpi.name}
              onChange={(e) => handleUpdateKpi(idx, 'name', e.target.value)}
              placeholder="KPI Name"
              className="text-xs flex-1 bg-white"
            />
            <Input
              value={kpi.target}
              onChange={(e) => handleUpdateKpi(idx, 'target', e.target.value)}
              placeholder="Target Benchmark"
              className="text-xs w-28 bg-white"
            />
            <Input
              value={kpi.unit}
              onChange={(e) => handleUpdateKpi(idx, 'unit', e.target.value)}
              placeholder="Unit"
              className="text-xs w-28 bg-white"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveKpi(idx)}
              className="h-8 w-8 text-slate-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddKpi}
          className="text-xs h-8 gap-1.5 border-dashed border-slate-300 w-full hover:bg-slate-50 text-slate-700"
        >
          <Plus className="w-3.5 h-3.5" /> Add KPI Metric
        </Button>
      </CardContent>
    </Card>
  )
}
