'use client'

import React, { useState } from 'react'
import { UserCheck, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function PersonSpecBuilder({
  onSave,
}: {
  onSave?: (data: any) => void
}) {
  const [essential, setEssential] = useState(
    '1. Valid UK Driving License (Bona Fide occupational requirement for on-site client deployments).\n2. Proven hands-on experience in fiber optical and Ethernet network hardware cabling.\n3. Basic IP subnetting and routing troubleshooting competence.\n4. Clear verbal and written English communication for client handover sign-offs.'
  )
  const [desirable, setDesirable] = useState(
    '1. Cisco CCNA or CompTIA Network+ certification.\n2. Prior experience working in tier-3 enterprise data centers.\n3. Certified optical fiber fusion splicing qualification.'
  )
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    toast.success('Person Specification recorded.')
    if (onSave) onSave({ essentialCriteria: essential, desirableCriteria: desirable })
  }

  return (
    <Card id="person-spec" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Person Specification (PS) — Essential vs. Desirable</CardTitle>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-500">Equality Act Compliant</span>
        </div>
        <CardDescription className="text-xs">
          Define the human attributes and competencies required. Essential criteria must be non-discriminatory and strictly job-necessary.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 p-3.5 rounded-lg border border-teal-200 bg-teal-50/40">
              <label className="text-xs font-bold text-teal-950 flex items-center justify-between">
                <span>Essential Criteria (Must-Have)</span>
                <span className="text-[10px] font-normal text-teal-800">Filters out candidates</span>
              </label>
              <Textarea
                value={essential}
                onChange={(e) => setEssential(e.target.value)}
                className="text-xs min-h-[110px] bg-white border-teal-300"
              />
            </div>

            <div className="space-y-1.5 p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Desirable Criteria (Bonus)</span>
                <span className="text-[10px] font-normal text-slate-500">Differentiates candidates</span>
              </label>
              <Textarea
                value={desirable}
                onChange={(e) => setDesirable(e.target.value)}
                className="text-xs min-h-[110px] bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
              } text-white`}
            >
              <Check className="w-3.5 h-3.5" />
              {saved ? 'Person Specification Saved' : 'Save Person Specification'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
