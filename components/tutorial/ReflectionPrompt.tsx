'use client'

import React, { useState, useEffect } from 'react'
import { BookOpen, Check } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export interface ReflectionPromptProps {
  question: string
  phaseSlug?: string
  initialText?: string
}

export function ReflectionPrompt({
  question,
  phaseSlug = 'workforce-planning',
  initialText = '',
}: ReflectionPromptProps) {
  const [reflection, setReflection] = useState(initialText)
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleBlur = async () => {
    if (!reflection.trim()) return
    setIsSaving(true)
    try {
      const res = await fetch('/api/tutorial/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phaseSlug,
          reflectionText: reflection,
          type: 'REFLECTION',
        }),
      })

      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error('Failed to save reflection:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
            Personal Reflection (Ungraded)
          </span>
        </div>
        {saved && (
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Saved
          </span>
        )}
      </div>

      <p className="text-xs text-slate-600 mb-3">{question}</p>

      <Textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        onBlur={handleBlur}
        placeholder="Type your personal insights here... (auto-saves on blur)"
        className="text-xs min-h-[80px] bg-white border-slate-200 focus-visible:ring-teal-600"
      />
    </div>
  )
}
