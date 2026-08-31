'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Award, Star, CheckCircle2, Sparkles, Gift } from 'lucide-react'
import { toast } from 'sonner'

interface RecognitionPromptPanelProps {
  employeeId?: string
}

const RECOGNITION_TYPES = [
  { id: 'EMPLOYEE_OF_MONTH', label: 'Employee of the Month Award' },
  { id: 'CERTIFICATE', label: 'Excellence in Engineering Certificate' },
  { id: 'APPRECIATION', label: 'Formal Peer & Leadership Appreciation' },
  { id: 'OTHER', label: 'Special Infrastructure Milestone Award' },
]

export function RecognitionPromptPanel({ employeeId = 'emp-100' }: RecognitionPromptPanelProps) {
  const [enabled, setEnabled] = useState(true)
  const [type, setType] = useState('EMPLOYEE_OF_MONTH')
  const [notes, setNotes] = useState(
    'Awarded for outstanding operational excellence during the H1 2026 London core network cutover, achieving 100% SLA compliance and zero downtime.'
  )
  const [submitting, setSubmitting] = useState(false)
  const [recorded, setRecorded] = useState(false)

  const handleSaveRecognition = async (e: React.FormEvent) => {
    e.preventDefault()

    // Soft check: notes must reference concrete evidence tokens (e.g. scores, dates, milestones)
    const evidenceTokens = ['h1', '2026', 'sla', '99.98', 'cutover', 'appraisal', 'probation', 'shoreditch', '100%']
    const lowerNotes = notes.toLowerCase()
    const hasEvidenceToken = evidenceTokens.some((t) => lowerNotes.includes(t))

    if (!hasEvidenceToken) {
      toast.error(
        'Evidence Missing: Recognition notes must cite specific documented evidence (e.g. H1 2026 appraisal rating, SLA uptime score, or Shoreditch cutover milestone).'
      )
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/day11/recognition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, type, notes }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to record recognition.')
        return
      }

      setRecorded(true)
      toast.success('Recognition record officially issued and logged to master HR file!')
    } catch (err) {
      toast.error('An error occurred while saving recognition.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card data-tutorial-target="recognition-prompt" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#d97706]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Evidence-Based Recognition & Total Reward Panel
            </CardTitle>
          </div>
          {recorded && (
            <Badge className="text-[9px] bg-[#fef3c7] text-[#b45309] border-[#fde68a] font-bold">
              ✓ Recognition Logged
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Has this employee earned formal recognition based on verified performance and probation data?
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSaveRecognition}>
        <CardContent className="p-5 space-y-4 text-xs">
          {/* Recognition Type Picker */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">Recognition Category</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RECOGNITION_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition flex items-center gap-2.5 ${
                    type === t.id
                      ? 'border-[#d97706] bg-[#fffbeb] text-[#92400e] font-bold shadow-2xs'
                      : 'border-border bg-[#f7f9fb] text-[#434655] hover:bg-[#f2f4f6]'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Evidence-Based Justification Notes */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#191c1e]">
                Documented Evidence Justification & Citation
              </label>
              <span className="text-[10px] text-[#737686]">Must cite empirical outcomes/dates</span>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-xs min-h-[75px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Cited H1 2026 appraisal ratings, 100% SLA metrics on London core backbone cutovers..."
              required
            />
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t border-border/60 flex justify-end gap-3">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
          >
            <Star className="w-3.5 h-3.5" />
            {submitting ? 'Logging Award...' : recorded ? 'Update Recognition' : 'Formally Issue Recognition'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
