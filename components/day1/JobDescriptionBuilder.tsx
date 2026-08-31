'use client'

import React, { useState } from 'react'
import { Briefcase, Sparkles, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function JobDescriptionBuilder({
  onSave,
}: {
  onSave?: (data: any) => void
}) {
  const [duties, setDuties] = useState(
    '• Install, terminate, and test fiber optic and copper network cabling at client enterprise sites.\n• Configure and rack Cisco/Juniper routing, switching, and firewall hardware.\n• Conduct on-site signal attenuation tests using OTDR meters.\n• Participate in 1-in-4 on-call emergency escalation response roster.'
  )
  const [qualifications, setQualifications] = useState(
    '• BEng/BSc or HND in Computer Systems, Telecommunications, or Electrical Engineering.\n• Cisco Certified Network Associate (CCNA) or equivalent industry credential.'
  )
  const [experience, setExperience] = useState(
    '• 2+ years hands-on experience in telecommunications field installation or data center ops.'
  )
  const [skills, setSkills] = useState(
    '• Fiber optic fusion splicing and OTDR diagnostic analysis.\n• Linux command line networking tools (tcpdump, netstat, iperf).'
  )
  const [workingConditions, setWorkingConditions] = useState(
    'Hybrid: 70% client field sites (Greater London), 30% London hub lab. Clean UK driving license required.'
  )
  const [kpis, setKpis] = useState(
    '• 99.5% on-time deployment milestone completion.\n• Zero safety infractions during on-site installations.\n• Average incident resolution time < 90 minutes.'
  )
  const [saved, setSaved] = useState(false)

  const handleAiDraftAssist = () => {
    toast.success('AI Draft Assist populated standard NovaLink Job Description template!')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    toast.success('Job Description recorded.')
    if (onSave) onSave({ duties, qualifications, experience, skills, workingConditions, kpis })
  }

  return (
    <Card id="job-description-builder" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Standard Job Description (JD) Builder</CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAiDraftAssist}
            className="text-xs h-8 gap-1.5 text-teal-800 border-teal-200 bg-teal-50 hover:bg-teal-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-700" /> AI Draft Assist
          </Button>
        </div>
        <CardDescription className="text-xs">
          Draft the duties, KPIs, and operational deliverables of the Field Engineer role.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Core Duties & Deliverables (Action Bullets)</label>
            <Textarea
              value={duties}
              onChange={(e) => setDuties(e.target.value)}
              className="text-xs min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Educational Qualifications</label>
              <Textarea
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="text-xs min-h-[60px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Relevant Industry Experience</label>
              <Textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="text-xs min-h-[60px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Technical Skills</label>
              <Textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="text-xs min-h-[60px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Working Conditions & Travel</label>
              <Textarea
                value={workingConditions}
                onChange={(e) => setWorkingConditions(e.target.value)}
                className="text-xs min-h-[60px]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Performance Metrics & Initial KPIs</label>
            <Textarea
              value={kpis}
              onChange={(e) => setKpis(e.target.value)}
              className="text-xs min-h-[60px]"
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
              {saved ? 'Job Description Saved' : 'Save Job Description'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
