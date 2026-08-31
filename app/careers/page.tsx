'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Building,
  ShieldCheck,
  Globe,
  ChevronRight,
  Search,
  CheckCircle2,
  Users,
  Award,
  Zap,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CareersPage() {
  const [positions, setPositions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('ALL')

  useEffect(() => {
    fetch('/api/careers/positions')
      .then((res) => res.json())
      .then((data) => {
        if (data.positions) {
          setPositions(data.positions)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Static deadlines and requirements for realistic corporate presentation
  const defaultPositions = [
    {
      id: 'field-engineer',
      title: 'Field Engineer (Optical & Network Infrastructure)',
      department: { name: 'Network Operations' },
      location: 'Hybrid / London EMEA Hub',
      salaryBand: '£42,000 - £52,000',
      workingHours: '40 hrs/week',
      deadline: '2026-09-15',
      deadlineLabel: '15 Sep 2026 (15 Days Left)',
      jobPurpose: 'Deploy, configure, and maintain mission-critical optical infrastructure and distributed network cutovers across EMEA enterprise sites.',
      urgent: true,
    },
    {
      id: 'hr-specialist',
      title: 'HR People Operations Specialist',
      department: { name: 'Human Resources' },
      location: 'London Hub / Remote Flex',
      salaryBand: '£38,000 - £46,000',
      workingHours: '37.5 hrs/week',
      deadline: '2026-09-20',
      deadlineLabel: '20 Sep 2026 (20 Days Left)',
      jobPurpose: 'Administer end-to-end recruitment pipelines, manage employee relations, statutory compliance, and onboarding programs.',
      urgent: false,
    },
    {
      id: 'systems-architect',
      title: 'Senior Distributed Systems Architect',
      department: { name: 'Engineering' },
      location: 'Frankfurt / London Hub',
      salaryBand: '£75,000 - £90,000',
      workingHours: '40 hrs/week',
      deadline: '2026-09-30',
      deadlineLabel: '30 Sep 2026 (30 Days Left)',
      jobPurpose: 'Architect low-latency distributed networks, high-availability telemetry pipelines, and cloud interconnects.',
      urgent: false,
    },
  ]

  const displayPositions = positions.length > 0 ? positions.map((p, idx) => ({
    ...p,
    deadline: p.deadline || (idx === 0 ? '2026-09-15' : '2026-09-25'),
    deadlineLabel: idx === 0 ? '15 Sep 2026 (15 Days Left)' : '25 Sep 2026 (25 Days Left)',
    urgent: idx === 0,
  })) : defaultPositions

  const filteredPositions = displayPositions.filter((pos) => {
    const matchesSearch =
      pos.title.toLowerCase().includes(search.toLowerCase()) ||
      pos.department?.name?.toLowerCase().includes(search.toLowerCase())
    const matchesDept = selectedDept === 'ALL' || pos.department?.name === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col justify-between">
      {/* Public Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-8 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-border bg-[#004ac6] flex items-center justify-center shadow-xs">
            <Image src="/images/logo.png" alt="NovaLink Logo" width={36} height={36} className="object-cover" />
          </div>
          <div>
            <span className="font-bold text-base text-[#191c1e] tracking-tight">NovaLink Global</span>
            <span className="text-[10px] text-[#004ac6] font-bold bg-[#dbe1ff] px-1.5 py-0.5 rounded border border-[#b4c5ff] ml-2 uppercase">
              Careers & Culture
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#434655]">
          <a href="#about" className="hover:text-[#004ac6] transition">About Us</a>
          <a href="#culture" className="hover:text-[#004ac6] transition">Culture & Benefits</a>
          <a href="#vacancies" className="hover:text-[#004ac6] transition">Open Opportunities</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" variant="outline" className="text-xs h-8 border-border text-[#191c1e] bg-white hover:bg-[#f2f4f6]">
              Internal HR Login &rarr;
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#0b1c30] via-[#191c1e] to-[#004ac6] text-white py-16 sm:py-24 px-4 sm:px-8 text-center space-y-5 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge className="bg-[#2563eb] text-white text-[11px] uppercase font-bold tracking-wider px-3.5 py-1 shadow-xs">
            Global Talent Acquisition 2026
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Build Mission-Critical Global Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-[#eff1f3] max-w-2xl mx-auto leading-relaxed">
            NovaLink Global designs, deploys, and orchestrates enterprise optical fiber and distributed network backbones across EMEA and North America. Join our high-impact engineering and operations teams.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a href="#vacancies">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-10 px-5 gap-2 shadow-md rounded-lg">
                Explore Open Positions ({displayPositions.length}) <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#culture">
              <Button variant="outline" className="text-xs h-10 px-4 border-white/20 text-white bg-white/10 hover:bg-white/20 rounded-lg">
                Why NovaLink?
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Company Overview & Culture Highlights */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-border shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e]">Global Distributed Reach</h3>
            <p className="text-xs text-[#434655] leading-relaxed">
              Operating across 4 primary international hubs (London, Frankfurt, Singapore, and New York) supporting tier-1 telecoms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e]">Statutory Transparency</h3>
            <p className="text-xs text-[#434655] leading-relaxed">
              Transparent salary bands, structured STAR competency interviews, and objective evaluation under Equality Act 2010.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#191c1e]">Continuous Growth & CIPD</h3>
            <p className="text-xs text-[#434655] leading-relaxed">
              Dedicated professional development budgets, Cisco/optical certification sponsorship, and structured milestone mentoring.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div id="culture" className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl font-bold text-[#191c1e] tracking-tight">Comprehensive Benefits & Total Reward</h2>
            <p className="text-xs text-[#737686]">We invest heavily in the wellbeing, health, and career longevity of our staff.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#f7f9fb] border border-border space-y-1">
              <div className="font-bold text-[#191c1e]">🏖️ 28 Days Leave</div>
              <div className="text-[#737686] text-[11px]">Plus statutory bank holidays and birthday flex day.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f7f9fb] border border-border space-y-1">
              <div className="font-bold text-[#191c1e]">🏥 Private Medical</div>
              <div className="text-[#737686] text-[11px]">Full healthcare, dental, optical, and EAP mental health.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f7f9fb] border border-border space-y-1">
              <div className="font-bold text-[#191c1e]">💻 Hybrid Flexibility</div>
              <div className="text-[#737686] text-[11px]">Flexible work-from-home policy with home office stipends.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f7f9fb] border border-border space-y-1">
              <div className="font-bold text-[#191c1e]">📈 Pension Matching</div>
              <div className="text-[#737686] text-[11px]">Up to 8% employer matched retirement contribution.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Vacancies Section */}
      <main id="vacancies" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#191c1e] tracking-tight">Open Opportunities & Requisitions</h2>
            <p className="text-xs text-[#737686]">Submit your application directly to NovaLink HR before the posted deadlines.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#737686] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search job titles or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs pl-8 h-8 bg-white border-border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Department Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['ALL', 'Network Operations', 'Engineering', 'Operations', 'Human Resources'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedDept === d
                  ? 'bg-[#2563eb] text-white shadow-xs'
                  : 'bg-white text-[#434655] border border-border hover:bg-[#f2f4f6]'
              }`}
            >
              {d === 'ALL' ? 'All Opportunities' : d}
            </button>
          ))}
        </div>

        {/* Vacancies Grid with Deadlines */}
        <div className="space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs text-[#737686]">Loading active opportunities...</div>
          ) : filteredPositions.length > 0 ? (
            filteredPositions.map((pos) => (
              <div
                key={pos.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-border shadow-2xs hover:border-[#2563eb] hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-[#191c1e] group-hover:text-[#004ac6] transition">
                      {pos.title}
                    </h3>
                    <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                      {pos.department?.name || 'Operations'}
                    </Badge>
                    {pos.urgent && (
                      <Badge className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold border-[#ffb596]">
                        Urgent Hire
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-[#434655] line-clamp-2 max-w-2xl">
                    {pos.jobPurpose || 'Deploy, configure, and maintain mission-critical optical infrastructure and distributed network cutovers across EMEA enterprise sites.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#737686] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#737686]" /> {pos.location || 'Hybrid / London Hub'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#737686]" /> {pos.salaryBand || '£42,000 - £52,000'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#737686]" /> {pos.workingHours || '40 hrs/week'}
                    </span>
                    <span className="flex items-center gap-1 text-[#ba1a1a] font-bold bg-[#ffede6] px-2 py-0.5 rounded border border-[#ffb596]/60">
                      <Calendar className="w-3.5 h-3.5 text-[#bc4800]" /> Closes: {pos.deadlineLabel || '15 Sep 2026'}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:items-end gap-2">
                  <Link href={`/careers/${pos.id}`}>
                    <Button size="sm" className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-lg">
                      Apply Now & Assessment <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <span className="text-[10px] text-[#737686]">Estimated time: 3 mins</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-[#737686] bg-white rounded-2xl border border-border">
              No positions matching &quot;{search}&quot;.
            </div>
          )}
        </div>
      </main>

      {/* Corporate Public Footer */}
      <footer className="bg-white border-t border-border py-8 px-4 text-center text-xs text-[#737686] space-y-2">
        <div className="flex items-center justify-center gap-6 text-xs font-semibold text-[#434655]">
          <Link href="/careers" className="hover:underline">Careers</Link>
          <Link href="/login" className="hover:underline">Internal HR Login</Link>
          <a href="#" className="hover:underline">Statutory Privacy Policy</a>
          <a href="#" className="hover:underline">Equality & Inclusion</a>
        </div>
        <p>© 2026 NovaLink Global Infrastructure Ltd. All rights reserved. Registered in England & Wales.</p>
        <p className="text-[10px] text-[#737686]">Empowering Next-Generation Enterprise Telecoms and HR Operational Excellence.</p>
      </footer>
    </div>
  )
}
