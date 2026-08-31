'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inbox, User, FileText, X, ArrowRight, Globe, Sparkles, RefreshCw, ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const SEEDED_FALLBACK = [
  {
    id: 'app-1',
    name: 'Jordan Hayes',
    email: 'jordan.hayes@example.com',
    phone: '+44 7700 900123',
    experience: '6 years telecom & field deployment',
    cv: 'BSc Computer Systems & Networking. 6 years field engineering experience at British Telecom and Cloudflare. Certified Cisco CCNP, fiber optical splicing, Linux sysadmin. Highly structured STAR communicator with excellent troubleshooting track record.',
    source: 'SEEDED',
  },
  {
    id: 'app-2',
    name: 'Casey Rivera',
    email: 'casey.rivera@example.com',
    phone: '+44 7700 900456',
    experience: '3 years junior telecom tech',
    cv: 'HND Electrical Engineering. 3 years junior telecom technician. Basic router configuration, hardware rack assembly, valid UK driving license. Enthusiastic but lacks advanced protocol diagnostics and team leadership experience.',
    source: 'SEEDED',
  },
  {
    id: 'app-3',
    name: 'Sam Taylor',
    email: 'sam.taylor@example.com',
    phone: '+44 7700 900789',
    experience: '1 year retail support',
    cv: 'High school diploma. 1 year consumer retail electronics support. Looking to transition into enterprise networking. No direct cabling or router configuration experience.',
    source: 'SEEDED',
  },
  {
    id: 'app-4',
    name: 'Morgan Blake',
    email: 'morgan.blake@example.com',
    phone: '+44 7700 900331',
    experience: '5 years data center racking',
    cv: 'BEng Electronic Engineering. 5 years network field ops. Specialist in data center racking, power distribution units, and zero-downtime cutovers.',
    source: 'SEEDED',
  },
]

export function ApplicationsInbox() {
  const [applications, setApplications] = useState<any[]>(SEEDED_FALLBACK)
  const [loading, setLoading] = useState(false)
  const [selectedApp, setSelectedApp] = useState<any>(null)

  const fetchLiveApplications = () => {
    setLoading(true)
    fetch('/api/applications')
      .then((res) => res.json())
      .then((data) => {
        if (data.applications && data.applications.length > 0) {
          const formatted = data.applications.map((app: any) => ({
            id: app.id,
            name: app.candidate?.fullName || 'Candidate',
            email: app.candidate?.email || 'N/A',
            phone: app.candidate?.phone || 'N/A',
            position: app.position?.title || 'Field Engineer',
            experience: `${app.candidate?.qualityTier || 'STRONG'} Candidate`,
            cv: app.candidate?.cvText || 'CV text available.',
            source: app.candidate?.cvText?.includes('[Cover Letter]') ? 'PORTAL' : 'SEEDED',
            dateReceived: new Date(app.dateReceived).toLocaleDateString(),
          }))
          setApplications(formatted)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchLiveApplications()
  }, [])

  return (
    <Card id="applications-inbox" className="border-slate-200 shadow-sm bg-white rounded-xl">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-teal-700" />
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Live Applications Inbox & Ingestion Feed
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Real-time applicant stream from the public careers site and sourcing campaigns.
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/careers" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 gap-1 text-teal-800 border-teal-200 bg-teal-50 hover:bg-teal-100 font-semibold"
              >
                <Globe className="w-3.5 h-3.5" /> Test Public Careers Portal <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              onClick={fetchLiveApplications}
              disabled={loading}
              className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900"
              title="Refresh Inflow"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </Button>

            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 font-bold">
              {applications.length} Candidates In Queue
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="p-3.5 hover:bg-slate-50/80 transition flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-200">
                  {app.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition">
                      {app.name}
                    </h4>
                    {app.source === 'PORTAL' ? (
                      <Badge className="bg-teal-700 text-white text-[9px] px-1.5 py-0">
                        🌐 Public Portal
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[9px] text-slate-500 px-1 py-0">
                        Campaign Pool
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {app.experience} • {app.email} {app.phone ? `• ${app.phone}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 group-hover:text-teal-700 flex items-center gap-1">
                  Inspect CV & Cover Letter <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Full CV & Cover Letter Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-sm text-slate-900">
                  Candidate Dossier: {selectedApp.name}
                </h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Email</span>
                  <p className="font-bold text-slate-900">{selectedApp.email}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Phone</span>
                  <p className="font-bold text-slate-900">{selectedApp.phone}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Target Position</span>
                  <p className="font-bold text-slate-900">{selectedApp.position || 'Field Engineer'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Source</span>
                  <p className="font-bold text-teal-800">
                    {selectedApp.source === 'PORTAL' ? 'Public Careers Site' : 'Direct Sourcing'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Submitted CV & Profile:</span>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto font-sans text-[11px]">
                  {selectedApp.cv}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">
                Eligible for Day 3 Shortlisting & STAR Interview
              </span>
              <Button size="sm" onClick={() => setSelectedApp(null)} className="bg-teal-700 hover:bg-teal-800 text-white text-xs">
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
