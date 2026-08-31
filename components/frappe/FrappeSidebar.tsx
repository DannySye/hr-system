'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Clock,
  Plane,
  Award,
  BookOpen,
  HeartHandshake,
  Scale,
  Compass,
  Layers,
  ChevronRight,
  Shield,
  Briefcase,
  FileCheck,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export function FrappeSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isTrainer = session?.user?.role === 'TRAINER'

  const navigationItems = [
    { label: 'HR Desk Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Simulation Roadmap', href: '/dashboard', icon: Layers },
    { label: 'Employees & Staff', href: '/dashboard', icon: Users },
    { label: 'Attendance & Clock-in', href: '/dashboard', icon: Clock },
    { label: 'Leaves & Balances', href: '/dashboard', icon: Plane },
    { label: 'Performance & 360', href: '/dashboard', icon: Award },
    { label: 'Training & Induction', href: '/dashboard', icon: BookOpen },
    { label: 'Welfare & Grievances', href: '/dashboard', icon: HeartHandshake },
    { label: 'Disciplinary Cases', href: '/dashboard', icon: Scale },
    { label: 'HR Policy Knowledge Hub', href: '/tutorials/workforce-planning', icon: Compass },
  ]

  return (
    <aside className="w-56 shrink-0 bg-slate-50/80 border-r border-slate-200 min-h-[calc(100vh-3rem)] p-3 text-xs hidden md:flex flex-col justify-between select-none">
      <div className="space-y-4">
        {/* Workspace Title */}
        <div className="px-2 pt-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Workspaces
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0.5">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition ${
                  isActive
                    ? 'bg-white text-teal-900 font-bold shadow-2xs border border-slate-200'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Trainer Console Section if applicable */}
        {isTrainer && (
          <div className="pt-2 border-t border-slate-200/80 space-y-1">
            <div className="px-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Administration
              </span>
            </div>
            <Link
              href="/trainer/dashboard"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              <Shield className="w-3.5 h-3.5 text-teal-700" />
              <span>Cohort Grading Center</span>
            </Link>
            <Link
              href="/trainer/seed"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-slate-700 hover:bg-slate-100"
            >
              <FileCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Database Reset Tool</span>
            </Link>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-white rounded-lg border border-slate-200 text-[10px] text-slate-500 space-y-1">
        <div className="font-bold text-slate-700">NovaLink HR v2.4</div>
        <div>Enterprise Simulation Engine</div>
        <div className="text-teal-700 font-semibold">Active Session</div>
      </div>
    </aside>
  )
}
