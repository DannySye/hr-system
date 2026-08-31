'use client'

import React, { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const CHANNELS = [
  { id: 'JOB_BOARD', label: 'Technical Job Boards (CWJobs, Stack Overflow, Indeed Tech)', desc: 'Reaches active tech practitioners' },
  { id: 'SOCIAL', label: 'Professional Social Media (LinkedIn Talent Solutions)', desc: 'Broad reach & passive sourcing' },
  { id: 'UNIVERSITY', label: 'University & Technical College Partnerships', desc: 'Direct access to certified telecom graduates' },
  { id: 'REFERRAL', label: 'Employee Referral Scheme', desc: 'High cultural retention & fast onboarding' },
  { id: 'AGENCY', label: 'Specialist Telecom Recruitment Agency', desc: 'Higher cost, specialized vetted pool' },
  { id: 'INTERNAL', label: 'NovaLink Internal Mobility Intranet', desc: 'Promotes internal career pathways' },
]

export function ChannelSelector({
  onSelectChannels,
}: {
  onSelectChannels?: (channels: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>(['JOB_BOARD', 'UNIVERSITY', 'REFERRAL'])
  const [saved, setSaved] = useState(false)

  const toggleChannel = (id: string) => {
    const next = selected.includes(id) ? selected.filter((c) => c !== id) : [...selected, id]
    setSelected(next)
    setSaved(false)
  }

  const handleSave = () => {
    if (selected.length === 0) {
      toast.error('Please select at least one recruitment channel.')
      return
    }
    setSaved(true)
    toast.success(`Selected ${selected.length} recruitment channels for publication.`)
    if (onSelectChannels) onSelectChannels(selected)
  }

  return (
    <Card id="channel-selector" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Recruitment Sourcing Channels</CardTitle>
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-500">{selected.length} Selected</span>
        </div>
        <CardDescription className="text-xs">
          Select target distribution channels aligned with Field Engineering candidate demographics.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CHANNELS.map((ch) => {
            const isChecked = selected.includes(ch.id)
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => toggleChannel(ch.id)}
                className={`p-3 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                  isChecked
                    ? 'border-teal-600 bg-teal-50 text-teal-950 font-medium ring-1 ring-teal-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold">{ch.label}</span>
                  {isChecked && <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />}
                </div>
                <span className="text-[10px] text-slate-500 font-normal">{ch.desc}</span>
              </button>
            )
          })}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            onClick={handleSave}
            className={`text-xs h-8 px-4 gap-1.5 font-semibold ${
              saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
            } text-white`}
          >
            <Check className="w-3.5 h-3.5" />
            {saved ? 'Channels Confirmed' : 'Confirm Channel Selection'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
