'use client'

import React, { useState } from 'react'
import { Megaphone, ArrowDownToLine, Eye, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function AdvertisementBuilder({
  onSave,
}: {
  onSave?: (data: any) => void
}) {
  const [adText, setAdText] = useState(
    `# Field Engineer — NovaLink Global
**Location:** London Hub & Greater London (Hybrid)
**Salary:** £42,000 - £52,000 per annum + on-call allowance + benefits

### About the Role
NovaLink Global is expanding its mission-critical optical infrastructure network. We are seeking a proactive **Field Engineer** to deploy, terminate, and commission high-speed fiber networks across our enterprise client sites.

### Key Responsibilities
- Install, terminate, and test fiber optic (single-mode/multi-mode) and copper Ethernet cabling.
- Rack, configure, and troubleshoot Cisco and Juniper switching/routing hardware.
- Perform optical signal loss diagnostics using OTDR and power meters.
- Collaborate with central Network Operations to ensure 99.99% uptime.

### What We're Looking For
- 2+ years of hands-on field telecommunications or data center networking experience.
- Valid UK Driving License.
- CCNA or network certification strongly preferred.
- Customer-focused attitude with strong troubleshooting tenacity.

### How to Apply
Submit your CV and brief cover statement before **September 15, 2026** via the NovaLink Careers Portal.`
  )
  const [closingDate, setClosingDate] = useState('2026-09-15')
  const [showPreview, setShowPreview] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInsertFromJD = () => {
    toast.success('Inserted structured job parameters from Day 1 Job Description!')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    toast.success('Job Advertisement formatted and saved.')
    if (onSave) onSave({ adText, closingDate })
  }

  return (
    <Card id="ad-builder" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Public Job Advertisement Builder</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleInsertFromJD}
              className="text-xs h-8 gap-1.5 text-teal-800 border-teal-200 bg-teal-50 hover:bg-teal-100"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" /> Insert from Job Description
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs h-8 gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> {showPreview ? 'Edit Text' : 'Live Preview'}
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs">
          Craft an engaging, inclusive, and legally compliant vacancy advertisement.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          {showPreview ? (
            <div className="p-5 rounded-lg border border-slate-200 bg-slate-50 prose prose-sm max-w-none text-xs text-slate-800 whitespace-pre-wrap font-sans">
              {adText}
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Advertisement Copy (Markdown Supported)</label>
              <Textarea
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                className="text-xs min-h-[220px] font-mono leading-relaxed"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Application Closing Date</label>
              <Input
                type="date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
                  saved ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
                } text-white`}
              >
                <Check className="w-3.5 h-3.5" />
                {saved ? 'Ad Saved & Ready' : 'Save Advertisement'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
