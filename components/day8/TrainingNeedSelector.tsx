'use client'

import React, { useState } from 'react'
import { BookOpen, Check, Edit2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function TrainingNeedSelector({
  initialNeed = 'Cross-Functional Communication & Conflict De-escalation Workshop',
  onConfirmNeed,
}: {
  initialNeed?: string
  onConfirmNeed?: (need: string) => void
}) {
  const [needText, setNeedText] = useState(initialNeed)
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
    toast.success('Training need confirmed for scheduling')
    if (onConfirmNeed) onConfirmNeed(needText)
  }

  return (
    <Card id="training-need" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Identified Training Need Verification
            </CardTitle>
          </div>
          <span className="text-[10px] uppercase font-bold text-teal-700 px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
            Carried from Day 7 Appraisal
          </span>
        </div>
        <CardDescription className="text-xs">
          Review the developmental gap identified during yesterday&apos;s 360 appraisal before scheduling catalog courses.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Target Skill / Knowledge Gap</label>
          <Textarea
            value={needText}
            onChange={(e) => {
              setNeedText(e.target.value)
              setConfirmed(false)
            }}
            className="text-xs min-h-[60px]"
          />
        </div>

        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleConfirm}
            className={`text-xs h-8 px-4 gap-1.5 font-semibold ${
              confirmed ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-teal-700 hover:bg-teal-800'
            } text-white`}
          >
            <Check className="w-3.5 h-3.5" />
            {confirmed ? 'Training Need Verified' : 'Confirm Training Need'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
