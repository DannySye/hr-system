'use client'

import React, { useState } from 'react'
import { Calendar, Clock, UserCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function InterviewScheduler() {
  const [slots] = useState([
    { candidate: 'Jordan Hayes', time: '10:00 - 10:45 AM', format: 'Voice / Video Room', status: 'CONFIRMED' },
    { candidate: 'Casey Rivera', time: '11:15 - 12:00 PM', format: 'Voice / Video Room', status: 'CONFIRMED' },
  ])

  return (
    <Card id="interview-scheduler" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Interview Timetable & Question Bank</CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            {slots.length} Scheduled
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Assigned candidate slots for today&apos;s structured competency interviews.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slots.map((s, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{s.candidate}</span>
                <Badge variant="success" className="text-[9px] bg-emerald-600">
                  {s.status}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {s.time}
              </p>
              <span className="text-[10px] text-slate-500">{s.format}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs space-y-1 text-teal-950">
          <span className="font-bold block">Competency Question Bank (STAR Framework):</span>
          <ul className="list-disc list-inside text-[11px] text-teal-900 space-y-0.5">
            <li><strong>Technical:</strong> &quot;Describe a time you encountered signal loss on a newly spliced fiber line. How did you isolate the attenuation point?&quot;</li>
            <li><strong>Behavioural (STAR):</strong> &quot;Tell me about an emergency network outage during an on-call shift. What action did you take to restore client uptime?&quot;</li>
            <li><strong>Teamwork:</strong> &quot;How do you coordinate with central Network Operations when an on-site installation schedule is delayed?&quot;</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
