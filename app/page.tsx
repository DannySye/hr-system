import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import {
  Globe,
  ShieldCheck,
  Zap,
  ArrowRight,
  MapPin,
  Briefcase,
  Calendar,
  ChevronRight,
  GraduationCap,
  Users,
  Award,
  Network,
  Wifi,
  Server,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const STATIC_POSITIONS = [
  {
    id: 'field-engineer',
    title: 'Field Engineer (Optical & Network Infrastructure)',
    department: { name: 'Network Operations' },
    location: 'Hybrid / London EMEA Hub',
    salaryBand: '£42,000 – £52,000',
    deadline: '15 Sep 2026',
    urgent: true,
  },
  {
    id: 'hr-specialist',
    title: 'HR People Operations Specialist',
    department: { name: 'Human Resources' },
    location: 'London Hub / Remote Flex',
    salaryBand: '£38,000 – £46,000',
    deadline: '20 Sep 2026',
    urgent: false,
  },
  {
    id: 'systems-architect',
    title: 'Senior Distributed Systems Architect',
    department: { name: 'Engineering' },
    location: 'Frankfurt / London Hub',
    salaryBand: '£75,000 – £90,000',
    deadline: '30 Sep 2026',
    urgent: false,
  },
]

export default async function HomePage() {
  // Try to pull live positions; gracefully fall back to static
  let openRoles = STATIC_POSITIONS
  try {
    const dbPositions = await prisma.position.findMany({
      include: { department: true },
      take: 3,
    })
    if (dbPositions.length > 0) {
      openRoles = dbPositions.map((p, idx) => ({
        id: p.id,
        title: p.title,
        department: { name: p.department?.name ?? 'Operations' },
        location: 'Hybrid / London Hub',
        salaryBand: '£42,000 – £65,000',
        deadline: idx === 0 ? '15 Sep 2026' : `${20 + idx * 5} Sep 2026`,
        urgent: idx === 0,
      }))
    }
  } catch {
    // DB fallback
  }

  return (
    <div className="min-h-screen bg-white text-[#191c1e] flex flex-col">
      {/* Public Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e2e8f0] h-16 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#004ac6] flex items-center justify-center shadow-xs">
            <Image src="/images/logo.png" alt="NovaLink Logo" width={36} height={36} className="object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-base text-[#191c1e] tracking-tight">NovaLink Global</span>
            <span className="text-[10px] text-[#737686] font-medium tracking-wide">Network Infrastructure & HR</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#434655]">
          <a href="#about" className="hover:text-[#2563eb] transition">About</a>
          <a href="#services" className="hover:text-[#2563eb] transition">Services</a>
          <a href="#careers" className="hover:text-[#2563eb] transition">Careers</a>
          <a href="#culture" className="hover:text-[#2563eb] transition">Culture</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <Link href="/careers">
            <Button variant="outline" size="sm" className="text-xs h-8 border-[#e2e8f0] text-[#191c1e] bg-white hover:bg-[#f7f9fb] hidden sm:flex">
              Open Roles
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="text-xs h-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold shadow-xs">
              Training Portal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001233] via-[#0b1c30] to-[#004ac6] text-white">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 flex flex-col items-start gap-7">
          <Badge className="bg-[#2563eb] text-white text-[11px] uppercase font-bold tracking-wider px-3 py-1 shadow-xs">
            EMEA Enterprise Infrastructure
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08] max-w-3xl">
            Building the Networks<br />
            <span className="text-[#93b4ff]">That Connect the World</span>
          </h1>

          <p className="text-sm sm:text-base text-[#b8c9e8] max-w-2xl leading-relaxed">
            NovaLink Global designs, deploys, and orchestrates enterprise optical fibre and distributed network backbones across EMEA and North America — with world-class HR and people operations at our core.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/careers">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold h-11 px-6 gap-2 shadow-lg rounded-xl">
                Explore Open Roles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#about">
              <Button variant="outline" className="text-sm h-11 px-5 border-white/25 text-white bg-white/10 hover:bg-white/20 rounded-xl">
                Who We Are
              </Button>
            </a>
            <Link href="/login">
              <Button variant="outline" className="text-sm h-11 px-5 border-white/25 text-white bg-white/10 hover:bg-white/20 rounded-xl gap-2">
                <GraduationCap className="w-4 h-4" />
                HR Training Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#f7f9fb] border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '1,200+', label: 'Global Employees', icon: <Users className="w-5 h-5" /> },
              { value: '4 Hubs', label: 'London · Frankfurt · Singapore · NYC', icon: <Globe className="w-5 h-5" /> },
              { value: '99.97%', label: 'Network Uptime SLA', icon: <Wifi className="w-5 h-5" /> },
              { value: '12', label: 'Day HR Practicum', icon: <Award className="w-5 h-5" /> },
            ].map(({ value, label, icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#2563eb] flex items-center justify-center">
                  {icon}
                </div>
                <span className="text-2xl font-black text-[#191c1e] tracking-tight">{value}</span>
                <span className="text-[11px] text-[#737686] font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 space-y-10 w-full">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">About NovaLink</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#191c1e] tracking-tight mt-2 leading-tight">
            Enterprise People Operations<br />Meets Next-Gen Infrastructure
          </h2>
          <p className="mt-4 text-sm text-[#434655] leading-relaxed">
            Founded to bridge the gap between telecoms excellence and human-centric operations, NovaLink Global is one of EMEA&apos;s fastest-growing distributed network infrastructure companies. We pair world-class engineering with a deeply invested people operations function — and we build the future HR professionals who will run it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Global Distributed Reach',
              desc: 'Operating across 4 primary international hubs supporting tier-1 telecoms and enterprise connectivity clients.',
              color: 'bg-[#dbe1ff] text-[#2563eb]',
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: 'Statutory Transparency',
              desc: 'Transparent salary bands, structured STAR competency interviews, and objective evaluation under the Equality Act 2010.',
              color: 'bg-[#dcfce7] text-[#15803d]',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Continuous Growth Culture',
              desc: 'Dedicated professional development budgets, Cisco/optical certification sponsorship, and structured milestone mentoring.',
              color: 'bg-[#fef3c7] text-[#b45309]',
            },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs space-y-3 hover:shadow-card-hover transition-all">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${color}`}>
                {icon}
              </div>
              <h3 className="font-bold text-sm text-[#191c1e]">{title}</h3>
              <p className="text-xs text-[#434655] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#f7f9fb] border-y border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 space-y-10 w-full">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">What We Do</span>
            <h2 className="text-3xl font-black text-[#191c1e] tracking-tight">Core Services & Capabilities</h2>
            <p className="text-sm text-[#737686]">From fibre deployment to workforce analytics — we operate end-to-end.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Network className="w-5 h-5" />, title: 'Optical Fibre Networks', desc: 'DWDM, ROADM, and OTN provisioning at scale across EMEA enterprise corridors.', badge: 'Core' },
              { icon: <Server className="w-5 h-5" />, title: 'Distributed Systems', desc: 'Fault-tolerant architecture, edge computing deployment, and low-latency telemetry pipelines.', badge: 'Eng' },
              { icon: <Wifi className="w-5 h-5" />, title: 'Network Operations', desc: '24/7 NOC monitoring, SLA management, and enterprise cutover operations.', badge: 'Ops' },
              { icon: <Users className="w-5 h-5" />, title: 'HR & People Ops', desc: 'Full-spectrum HR: recruitment, onboarding, performance, training, wellbeing, and strategic workforce planning.', badge: 'HR' },
            ].map(({ icon, title, desc, badge }) => (
              <div key={title} className="p-5 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs space-y-3 hover:border-[#2563eb] hover:shadow-card-hover transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] text-[#2563eb] flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#004ac6] bg-[#dbe1ff] border border-[#b4c5ff] px-2 py-0.5 rounded uppercase tracking-wider">
                    {badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#191c1e] group-hover:text-[#2563eb] transition">{title}</h3>
                <p className="text-xs text-[#434655] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Preview */}
      <section id="careers" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">Join the Team</span>
            <h2 className="text-3xl font-black text-[#191c1e] tracking-tight mt-1">Current Open Opportunities</h2>
            <p className="text-sm text-[#737686] mt-1">Submit your application directly to NovaLink HR before the posted deadlines.</p>
          </div>
          <Link href="/careers">
            <Button variant="outline" className="text-xs font-semibold border-[#e2e8f0] text-[#2563eb] hover:bg-[#f0f4ff] gap-1.5 shrink-0">
              View All Roles
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {openRoles.map((pos) => (
            <div
              key={pos.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs hover:border-[#2563eb] hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#191c1e] group-hover:text-[#2563eb] transition">
                    {pos.title}
                  </h3>
                  <Badge variant="outline" className="text-[10px] bg-[#dbe1ff] text-[#00174b] border-[#b4c5ff]">
                    {pos.department.name}
                  </Badge>
                  {pos.urgent && (
                    <Badge className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] border-[#ffb596]">
                      Urgent Hire
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#737686]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {pos.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> {pos.salaryBand}
                  </span>
                  <span className="flex items-center gap-1 text-[#ba1a1a] font-semibold bg-[#ffede6] px-2 py-0.5 rounded border border-[#ffb596]/50">
                    <Calendar className="w-3.5 h-3.5 text-[#bc4800]" />
                    Closes: {pos.deadline}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link href={`/careers/${pos.id}`}>
                  <Button size="sm" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-xl">
                    Apply Now & Assessment
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/careers">
            <Button variant="outline" className="text-sm font-semibold border-[#e2e8f0] text-[#2563eb] hover:bg-[#f0f4ff] gap-2 h-10 px-6 rounded-xl">
              See All Open Positions & Careers Portal
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits & Total Reward */}
      <section id="culture" className="bg-[#001233] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 space-y-10 w-full">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#93b4ff]">Why NovaLink</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Benefits & Total Reward</h2>
            <p className="text-sm text-[#b8c9e8]">We invest heavily in the wellbeing, health, and career longevity of every team member.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {[
              { emoji: '🏖️', title: '28 Days Leave', desc: 'Plus bank holidays and a flex birthday day off' },
              { emoji: '🏥', title: 'Private Medical', desc: 'Full healthcare, dental, optical, and EAP mental health' },
              { emoji: '💻', title: 'Hybrid Flexibility', desc: 'Home office stipends and flexible work-from-home policy' },
              { emoji: '📈', title: '8% Pension Match', desc: 'Generous employer-matched retirement contributions' },
              { emoji: '🎓', title: 'Learning Budget', desc: 'Annual £2,000 professional development allowance' },
              { emoji: '🌐', title: 'Global Mobility', desc: 'Internal transfer pathways across all four hub offices' },
              { emoji: '⚡', title: 'Certification Funded', desc: 'Cisco, CIPD, and optical engineering sponsorships' },
              { emoji: '🤝', title: 'D&I First', desc: 'Equality Act compliant, LGBTQ+ inclusive, lived-experience panels' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1.5 hover:bg-white/15 transition">
                <div className="text-xl">{emoji}</div>
                <div className="font-bold text-white text-xs">{title}</div>
                <div className="text-[#b8c9e8] text-[11px] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HR Training Portal Callout */}
      <section className="bg-[#f0f4ff] border-y border-[#b4c5ff]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shadow-md shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#191c1e]">NovaLink HR Practicum Training Lab</h3>
              <p className="text-xs text-[#434655] mt-0.5">
                A 12-day gated simulation for HR professionals. Hire, onboard, manage, and exit — with real tools and AI personas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login">
              <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold h-9 px-5 gap-1.5 shadow-xs rounded-xl">
                Access Training Portal
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e2e8f0] py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#004ac6] flex items-center justify-center">
                <Image src="/images/logo.png" alt="NovaLink Logo" width={32} height={32} className="object-cover" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#191c1e]">NovaLink Global</span>
                <p className="text-[10px] text-[#737686]">Network Infrastructure & HR Operations</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#434655]">
              <Link href="/careers" className="hover:text-[#2563eb] transition">Careers</Link>
              <a href="#about" className="hover:text-[#2563eb] transition">About</a>
              <a href="#services" className="hover:text-[#2563eb] transition">Services</a>
              <Link href="/login" className="hover:text-[#2563eb] transition">HR Training Portal</Link>
              <a href="#culture" className="hover:text-[#2563eb] transition">Equality & Inclusion</a>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#737686]">
            <p>© 2026 NovaLink Global Infrastructure Ltd. All rights reserved. Registered in England & Wales.</p>
            <p className="text-[10px]">Empowering Next-Generation Enterprise Telecoms and HR Operational Excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

