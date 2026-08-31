import React from 'react'
import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PublicFooter } from '@/components/public/PublicFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Network, Server, Wifi, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ServicesPage() {
  const services = [
    {
      icon: <Network className="w-8 h-8 text-[#2563eb]" />,
      title: 'Optical Fibre & DWDM Infrastructure',
      badge: 'Core Infrastructure',
      desc: 'Turnkey optical backbone deployment, dense wavelength division multiplexing (DWDM), and ROADM orchestration connecting high-density data centres across Western Europe and the UK.',
      points: [
        'Multi-terabit dark fibre routes with ultra-low latency cutovers',
        '24/7 OTDR testing and proactive fiber degradation analytics',
        'Enterprise SLA commitments up to 99.999% network availability',
      ],
    },
    {
      icon: <Server className="w-8 h-8 text-[#2563eb]" />,
      title: 'Distributed Systems & Edge Architecture',
      badge: 'Systems Engineering',
      desc: 'Engineering resilient edge node clusters, high-availability telemetry pipelines, and containerized microservices for mission-critical industrial and telecommunication workloads.',
      points: [
        'Zero-trust network architecture (ZTNA) and mutual TLS encryption',
        'Kubernetes edge orchestration and automated canary rollouts',
        'Distributed tracing and automated real-time incident diagnostics',
      ],
    },
    {
      icon: <Wifi className="w-8 h-8 text-[#2563eb]" />,
      title: '24/7 NOC & Network Operations',
      badge: 'Managed Services',
      desc: 'Follow-the-sun Network Operations Center (NOC) coverage spanning London and Frankfurt, monitoring fiber integrity, packet latency, and hardware lifecycle health.',
      points: [
        'Tier-1 to Tier-3 escalation pathways with <15 min MTTR targets',
        'Continuous environmental, power, and thermal monitoring',
        'Multi-vendor hardware sparing and on-site field dispatch',
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-[#2563eb]" />,
      title: 'Enterprise People Operations & HROS',
      badge: 'HR & Talent',
      desc: 'Modern HR operating framework delivering competency-based recruitment, objective 360 appraisals, statutory compliance, and realistic practitioner training labs.',
      points: [
        '12-day immersive simulation practicum for HR practitioners',
        'Full lifecycle management from vacancy scoping to exit synthesis',
        'Equality Act 2010 and ACAS statutory alignment',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-[#191c1e] flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-gradient-to-br from-[#001233] via-[#0b1c30] to-[#004ac6] text-white py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <Badge className="bg-[#2563eb] text-white text-[11px] uppercase font-bold tracking-wider px-3 py-1">
              Capabilities & Solutions
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              End-to-End Telecoms Engineering & HR Systems
            </h1>
            <p className="text-sm sm:text-base text-[#b8c9e8] leading-relaxed max-w-2xl">
              From dark fibre provisioning in London to automated talent acquisition pipelines — explore our enterprise service offerings.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-16 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs hover:border-[#2563eb] hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-[#dbe1ff]">{s.icon}</div>
                    <Badge variant="outline" className="text-[10px] bg-[#f7f9fb] text-[#004ac6] border-[#b4c5ff]">
                      {s.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#191c1e]">{s.title}</h3>
                  <p className="text-xs text-[#434655] leading-relaxed">{s.desc}</p>
                </div>

                <div className="border-t border-[#e2e8f0] pt-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#737686]">Key Highlights</span>
                  <ul className="space-y-1 text-xs text-[#434655]">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Training CTA */}
          <div className="p-8 rounded-2xl bg-[#f0f4ff] border border-[#b4c5ff]/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-base text-[#191c1e]">Experience the HR Training Practicum</h3>
              <p className="text-xs text-[#434655] mt-1">
                Learn how NovaLink HR orchestrates workforce planning, hiring, and performance across all 4 divisions.
              </p>
            </div>
            <Link href="/login">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 rounded-xl">
                Open Training Lab
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
