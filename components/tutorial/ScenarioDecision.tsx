'use client'

import React, { useState } from 'react'
import { GitBranch, Check, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'

export interface ScenarioOption {
  id: string
  label: string
  consequence: string
}

export interface ScenarioDecisionProps {
  id: string
  phaseSlug?: string
  prompt: string
  options: ScenarioOption[]
}

export function ScenarioDecision({
  id,
  phaseSlug = 'workforce-planning',
  prompt,
  options,
}: ScenarioDecisionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelect = async (optionId: string) => {
    setSelectedId(optionId)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/tutorial/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phaseSlug,
          scenarioChoice: optionId,
          type: 'SCENARIO',
        }),
      })

      if (res.ok) {
        toast.success('Scenario decision recorded.')
      }
    } catch (err) {
      console.error('Failed to record scenario choice:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const chosenOption = options.find((o) => o.id === selectedId)

  return (
    <div className="my-6 rounded-xl border border-slate-300 bg-slate-50/70 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <GitBranch className="w-5 h-5 text-teal-700" />
        <h4 className="font-semibold text-slate-900 text-base">Practical HR Scenario Decision</h4>
      </div>

      <p className="text-sm font-medium text-slate-800 mb-4">{prompt}</p>

      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs flex flex-col gap-1.5 ${
                isSelected
                  ? 'border-teal-700 bg-teal-50/80 shadow-sm ring-1 ring-teal-600 text-teal-950 font-medium'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-teal-700 shrink-0" />}
              </div>
            </button>
          )
        })}
      </div>

      {chosenOption && (
        <div className="mt-4 p-4 rounded-lg bg-teal-900 text-teal-50 border border-teal-800 text-xs animate-in fade-in duration-200">
          <div className="font-semibold text-teal-200 mb-1 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Outcome Analysis & Consequence
          </div>
          <p className="leading-relaxed">{chosenOption.consequence}</p>
        </div>
      )}
    </div>
  )
}
