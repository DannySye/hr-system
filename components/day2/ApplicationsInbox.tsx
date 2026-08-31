'use client'

import React, { useState } from 'react'
import { Inbox, User, FileText, X, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const SEEDED_APPLICATIONS = [
  {
    id: 'app-1',
    name: 'Jordan Hayes',
    email: 'jordan.hayes@example.com',
    phone: '+44 7700 900123',
    experience: '6 years telecom & field deployment',
    cv: 'BSc Computer Systems & Networking. 6 years field engineering experience at British Telecom and Cloudflare. Certified Cisco CCNP, fiber optical splicing, Linux sysadmin. Highly structured STAR communicator with excellent troubleshooting track record.',
  },
  {
    id: 'app-2',
    name: 'Casey Rivera',
    email: 'casey.rivera@example.com',
    phone: '+44 7700 900456',
    experience: '3 years junior telecom tech',
    cv: 'HND Electrical Engineering. 3 years junior telecom technician. Basic router configuration, hardware rack assembly, valid UK driving license. Enthusiastic but lacks advanced protocol diagnostics and team leadership experience.',
  },
  {
    id: 'app-3',
    name: 'Sam Taylor',
    email: 'sam.taylor@example.com',
    phone: '+44 7700 900789',
    experience: '1 year retail support',
    cv: 'High school diploma. 1 year consumer retail electronics support. Looking to transition into enterprise networking. No direct cabling or router configuration experience.',
  },
  {
    id: 'app-4',
    name: 'Morgan Blake',
    email: 'morgan.blake@example.com',
    phone: '+44 7700 900331',
    experience: '5 years data center racking',
    cv: 'BEng Electronic Engineering. 5 years network field ops. Specialist in data center racking, power distribution units, and zero-downtime cutovers.',
  },
]

export function ApplicationsInbox() {
  const [selectedApp, setSelectedApp] = useState<any>(null)

  return (
    <Card id="applications-inbox" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">Applications Inbox (Simulated Inflow)</CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200">
            {SEEDED_APPLICATIONS.length} New Candidates
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Incoming applicant stream triggered by publishing the vacancy advertisement. Click any candidate to preview their CV.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {SEEDED_APPLICATIONS.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="p-4 hover:bg-slate-50/80 transition flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                  {app.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition">
                    {app.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{app.experience} • {app.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 group-hover:text-teal-700 flex items-center gap-1">
                  Preview CV <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* CV Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-sm text-slate-900">Curriculum Vitae: {selectedApp.name}</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div><strong>Contact:</strong> {selectedApp.email} | {selectedApp.phone}</div>
              <div><strong>Summary & Experience:</strong></div>
              <p className="text-slate-700 leading-relaxed">{selectedApp.cv}</p>
            </div>

            <div className="flex justify-end">
              <Button size="sm" onClick={() => setSelectedApp(null)} className="bg-teal-700 hover:bg-teal-800 text-white text-xs">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
