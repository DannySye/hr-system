'use client'

import React from 'react'
import { FileText, Clock, User, CheckCircle, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface RecordEvent {
  id: string
  dayNumber: number
  title: string
  type: string
  description: string
  date: string
}

export function EmployeeFileTimeline({
  candidateName = 'Jordan Hayes',
  roleTitle = 'Senior Backend Engineer',
  events = [
    {
      id: 'e-1',
      dayNumber: 1,
      title: 'Job Scoping & Requirements Document Created',
      type: 'Workforce Planning',
      description: 'Defined essential Golang/microservices competencies with Hiring Manager Marcus Chen.',
      date: 'Simulated Day 1',
    },
  ],
}: {
  candidateName?: string
  roleTitle?: string
  events?: RecordEvent[]
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">{candidateName} — Dossier</h3>
            <p className="text-[11px] text-slate-500">{roleTitle}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Personnel Record
        </Badge>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((evt) => (
          <div key={evt.id} className="relative group">
            <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white shadow-xs"></div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-900">{evt.title}</span>
                <span className="text-slate-400">{evt.date}</span>
              </div>
              <p className="text-xs text-slate-600">{evt.description}</p>
              <Badge variant="secondary" className="text-[9px] mt-1">
                {evt.type}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
