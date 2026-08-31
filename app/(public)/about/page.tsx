import React from 'react'
import Link from 'next/link'
import { PublicNavbar } from '@/components/public/PublicNavbar'
import { PublicFooter } from '@/components/public/PublicFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Users, ShieldCheck, Zap, ArrowRight, Award } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#191c1e] flex flex-col justify-between">
      <PublicNavbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-gradient-to-br from-[#001233] via-[#0b1c30] to-[#004ac6] text-white py-16 sm:py-24 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <Badge className="bg-[#2563eb] text-white text-[11px] uppercase font-bold tracking-wider px-3 py-1">
              About NovaLink Global
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Pioneering Enterprise Telecoms & Human-Centric Operations
            </h1>
            <p className="text-sm sm:text-base text-[#b8c9e8] leading-relaxed max-w-2xl">
              We design, construct, and manage mission-critical optical infrastructure and distributed systems across EMEA and North America, supported by a rigorous, modern HR operating model.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#f7f9fb] border border-[#e2e8f0] space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">Our Mission</span>
              <h2 className="text-2xl font-bold text-[#191c1e]">Connecting Enterprise Scale with Human Empathy</h2>
              <p className="text-xs text-[#434655] leading-relaxed">
                To build resilient, zero-downtime distributed infrastructure while establishing a workplace culture characterized by procedural fairness, transparent reward structures, and continuous technical mastery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#f7f9fb] border border-[#e2e8f0] space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">Our Vision</span>
              <h2 className="text-2xl font-bold text-[#191c1e]">The Benchmark for Global Infrastructure Teams</h2>
              <p className="text-xs text-[#434655] leading-relaxed">
                A world where complex network engineering and world-class HR operations operate in complete harmony, driving innovation without compromising on employee welfare or statutory standards.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-[#191c1e]">Our Operating Pillars</h2>
              <p className="text-xs text-[#737686] mt-1">The values guiding our engineering cutovers and HR decisions daily.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-2xs space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#2563eb]" />
                <h3 className="font-bold text-sm text-[#191c1e]">Statutory Compliance & Fairness</h3>
                <p className="text-xs text-[#434655]">Strict adherence to ACAS guidelines, Equality Act 2010, and objective merit-based advancement.</p>
              </div>

              <div className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-2xs space-y-2">
                <Globe className="w-6 h-6 text-[#2563eb]" />
                <h3 className="font-bold text-sm text-[#191c1e]">Global Distributed Agility</h3>
                <p className="text-xs text-[#434655]">4 international hubs collaborating seamlessly across timezones with unified SLAs and culture.</p>
              </div>

              <div className="p-6 rounded-xl border border-[#e2e8f0] bg-white shadow-2xs space-y-2">
                <Award className="w-6 h-6 text-[#2563eb]" />
                <h3 className="font-bold text-sm text-[#191c1e]">Continuous Professional Mastery</h3>
                <p className="text-xs text-[#434655]">Empowering staff with certifications, CIPD frameworks, and hands-on simulation training.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-[#001233] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg">Interested in joining our team?</h3>
              <p className="text-xs text-[#b8c9e8] mt-1">Explore current openings across our engineering and operations divisions.</p>
            </div>
            <Link href="/careers">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-10 px-5 gap-1.5 rounded-xl">
                View Careers Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
