'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckSquare, Save, CheckCircle2, AlertTriangle, ShieldCheck, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface ExitChecklistProps {
  employeeId?: string
  onChecklistCompleted?: () => void
}

export function ExitChecklist({
  employeeId = 'emp-103',
  onChecklistCompleted,
}: ExitChecklistProps) {
  const [noticeDate, setNoticeDate] = useState('2026-08-20')
  const [handoverNotes, setHandoverNotes] = useState(
    'Transferred regional network telemetry dashboards and DWDM cutover scripts to Jordan Hayes. Completed administrative handover of data center access credentials.'
  )
  const [propertyReturned, setPropertyReturned] = useState(true)
  const [finalPayrollNote, setFinalPayrollNote] = useState(
    'Final payroll processed with 14.5 accrued unused annual leave days payout. Pension and P45 generation authorized.'
  )
  const [submitting, setSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSaveChecklist = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation: 4 fields
    if (!noticeDate) {
      toast.error('Please specify the official Notice Date.')
      return
    }

    if (handoverNotes.trim().length < 30) {
      toast.error('Handover notes must contain at least 30 characters detailing asset & knowledge transfer.')
      return
    }

    if (!finalPayrollNote.trim()) {
      toast.error('Please specify final payroll and holiday pay calculations.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/day12/exit/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          exitReason: 'RESIGNATION',
          noticeDate: new Date(noticeDate),
          handoverNotes,
          propertyReturned,
          finalPayrollNote,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Failed to save exit checklist.')
        return
      }

      setIsCompleted(true)
      toast.success('Exit checklist completed! Exit interview unlocked.')
      if (onChecklistCompleted) onChecklistCompleted()
    } catch (err) {
      toast.error('An error occurred while saving the exit checklist.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card data-tutorial-target="exit-checklist" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#2563eb]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Statutory Exit &amp; Handover Governance Checklist
            </CardTitle>
          </div>
          {isCompleted && (
            <Badge className="text-[9px] bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold">
              ✓ Checklist Complete
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Verify notice, knowledge handover documentation, company property return, and final payroll calculations.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSaveChecklist}>
        <CardContent className="p-5 space-y-4 text-xs">
          {/* Notice Date */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">1. Formal Notice Date Received</label>
            <Input
              type="date"
              value={noticeDate}
              onChange={(e) => setNoticeDate(e.target.value)}
              className="text-xs h-9 bg-[#f7f9fb] border-border rounded-lg"
              required
            />
          </div>

          {/* Handover Notes */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-bold text-[#191c1e]">
                2. Operational Handover Documentation &amp; Knowledge Transfer
              </label>
              <span className="text-[10px] text-[#737686]">Min 30 characters</span>
            </div>
            <Textarea
              value={handoverNotes}
              onChange={(e) => setHandoverNotes(e.target.value)}
              className="text-xs min-h-[75px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Handover of server keys, telemetry scripts, ongoing support tickets..."
              required
            />
          </div>

          {/* Company Property Returned Toggle */}
          <div className="p-3.5 rounded-xl border border-border bg-[#f7f9fb] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#191c1e] block text-xs">
                3. Company Property &amp; Security Pass Returned
              </span>
              <span className="text-[11px] text-[#737686]">
                Corporate laptop, building RFID badge, VPN token, and optical splicing kit.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={propertyReturned}
                onChange={(e) => setPropertyReturned(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#e2e8f0] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#16a34a]"></div>
            </label>
          </div>

          {/* Final Payroll Note */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#191c1e]">
              4. Final Payroll, Accrued Leave &amp; Statutory P45 Authorisation
            </label>
            <Textarea
              value={finalPayrollNote}
              onChange={(e) => setFinalPayrollNote(e.target.value)}
              className="text-xs min-h-[70px] bg-[#f7f9fb] border-border rounded-lg"
              placeholder="e.g. Final salary with 14.5 days unused leave payout..."
              required
            />
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t border-border/60 flex justify-end gap-3">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg"
          >
            <Save className="w-3.5 h-3.5" />
            {submitting ? 'Saving Checklist...' : isCompleted ? 'Update Checklist' : 'Complete Exit Checklist'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
