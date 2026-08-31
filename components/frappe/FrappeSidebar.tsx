'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Briefcase,
  Award,
  BookOpen,
  HeartHandshake,
  AlertTriangle,
  FileCheck,
  Compass,
  Plus,
  HelpCircle,
  Settings,
  Sparkles,
  Lock,
  Check,
  Building2,
  GraduationCap,
  Star,
  FileText,
  UserCheck,
  Layers,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const SIMULATION_DAYS = [
  { day: 1, title: 'Workforce Planning', slug: 'workforce-planning' },
  { day: 2, title: 'Recruitment & Ads', slug: 'recruitment' },
  { day: 3, title: 'Shortlisting & Selection', slug: 'selection' },
  { day: 4, title: 'Hiring & Contracts', slug: 'hiring' },
  { day: 5, title: 'Onboarding & Setup', slug: 'onboarding' },
  { day: 6, title: 'Probation Checkpoints', slug: 'probation' },
  { day: 7, title: 'Performance 360', slug: 'performance-management' },
  { day: 8, title: 'Training & Development', slug: 'training-development' },
  { day: 9, title: 'Employee Welfare', slug: 'employee-welfare' },
  { day: 10, title: 'Disciplinary Process', slug: 'discipline' },
  { day: 11, title: 'Career Development', slug: 'career-development' },
  { day: 12, title: 'Separation & Capstone', slug: 'separation' },
]

export function FrappeSidebar() {
  const pathname = usePathname()
  const isHrMode = pathname.startsWith('/hr')
  const [timeline, setTimeline] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/simulation/progress')
      .then((res) => res.json())
      .then((data) => {
        if (data.timeline) {
          setTimeline(data.timeline)
        }
      })
      .catch((err) => console.error(err))
  }, [pathname])

  const handleLockedClick = (e: React.MouseEvent, day: number) => {
    e.preventDefault()
    toast.error(`Day ${day} is Locked`, {
      description: `You must complete and submit your deliverables for Day ${day - 1} before proceeding.`,
    })
  }

  return (
    <aside className="w-64 shrink-0 bg-[#f2f4f6] border-r border-border min-h-[calc(100vh-4rem)] flex flex-col justify-between py-4 px-3 select-none">
      <div className="space-y-4">
        {/* Primary Action Button */}
        <Link href={isHrMode ? '/hr' : '/day/1'}>
          <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all mb-2">
            <Plus className="w-4 h-4" />
            <span>{isHrMode ? 'HR Operations Action' : 'New Vacancy Request'}</span>
          </button>
        </Link>

        {/* Dynamic Sidebar Menus */}
        {isHrMode ? (
          /* Enterprise HR System Mode Navigation */
          <div className="space-y-1">
            <div className="px-3 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#737686]">
              <span>Enterprise HR Core</span>
              <Badge variant="outline" className="text-[9px] bg-white text-[#004ac6] border-[#b4c5ff] px-1 py-0">
                Live HR
              </Badge>
            </div>

            <Link
              href="/hr"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-colors bg-[#d0e1fb] text-[#0b1c30] shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-[#004ac6]" />
              <span>HR Operations Hub</span>
            </Link>

            <Link
              href="/careers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-[#505f76]" />
                <span>Public Careers Site</span>
              </div>
              <Badge variant="outline" className="text-[9px] bg-white text-[#2563eb] border-[#b4c5ff] px-1 py-0">
                Live
              </Badge>
            </Link>

            <div className="pt-3">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#737686]">
                Simulation Practicum
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-[#2563eb]" />
                <span>Switch to Training Lab</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Practicum Training Lab Mode Navigation */
          <>
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#737686]">
                Workspace
              </div>

              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  pathname === '/dashboard' || pathname.startsWith('/day')
                    ? 'bg-[#d0e1fb] text-[#0b1c30] font-bold shadow-2xs'
                    : 'text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#2563eb]" />
                <span>Training Lab Overview</span>
              </Link>

              <Link
                href="/hr"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-[#004ac6]" />
                  <span>Enterprise HR System</span>
                </div>
                <Badge variant="outline" className="text-[9px] bg-white text-[#004ac6] border-[#b4c5ff] px-1 py-0">
                  Core
                </Badge>
              </Link>

              <Link
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-4 h-4 text-[#505f76]" />
                  <span>Public Careers Site</span>
                </div>
                <Badge variant="outline" className="text-[9px] bg-white text-[#2563eb] border-[#b4c5ff] px-1 py-0">
                  Live
                </Badge>
              </Link>
            </div>

            {/* 12-Day Simulation Roadmap */}
            <div className="space-y-1">
              <div className="px-3 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#737686]">
                <span>Simulation Curriculum</span>
                <span className="text-[9px] font-mono text-[#2563eb]">12 Days</span>
              </div>

              <div className="space-y-0.5 max-h-[280px] overflow-y-auto pr-1">
                {SIMULATION_DAYS.map((item) => {
                  const isActive = pathname === `/day/${item.day}`
                  const dayStatus = timeline.find((t) => t.dayNumber === item.day)
                  const isUnlocked = dayStatus ? dayStatus.isUnlocked : item.day === 1
                  const isCompleted = dayStatus?.status === 'SUBMITTED' || dayStatus?.status === 'GRADED'

                  if (!isUnlocked) {
                    return (
                      <button
                        key={item.day}
                        onClick={(e) => handleLockedClick(e, item.day)}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#737686] opacity-60 hover:bg-[#e6e8ea]/50 transition-colors text-left cursor-not-allowed"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-4 h-4 rounded-full bg-[#e0e3e5] text-[#737686] flex items-center justify-center text-[10px] shrink-0">
                            <Lock className="w-2.5 h-2.5" />
                          </span>
                          <span className="truncate">{item.title}</span>
                        </div>
                        <span className="text-[9px] text-[#737686]">Locked</span>
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.day}
                      href={`/day/${item.day}`}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-[#d0e1fb] text-[#0b1c30] font-bold shadow-2xs'
                          : 'text-[#434655] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                            isCompleted
                              ? 'bg-[#004ac6] text-white font-bold'
                              : isActive
                              ? 'bg-[#2563eb] text-white font-bold'
                              : 'bg-[#e0e3e5] text-[#434655]'
                          }`}
                        >
                          {isCompleted ? <Check className="w-2.5 h-2.5" /> : item.day}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      {isCompleted && (
                        <span className="text-[9px] font-bold text-[#004ac6]">✓</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border pt-3 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#434655] hover:bg-[#e6e8ea] rounded-lg transition-colors"
        >
          <Compass className="w-4 h-4 text-[#505f76]" />
          <span>NovaLink Homepage</span>
        </Link>
        <Link
          href="/tutorials/workforce-planning"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#434655] hover:bg-[#e6e8ea] rounded-lg transition-colors"
        >
          <BookOpen className="w-4 h-4 text-[#505f76]" />
          <span>Statutory HR Manual</span>
        </Link>
        <div className="px-3 py-1 text-[10px] text-[#737686]">
          NovaLink HR OS • {isHrMode ? 'Enterprise HR Core' : 'Training Lab'}
        </div>
      </div>
    </aside>
  )
}
