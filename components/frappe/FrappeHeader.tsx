'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Search,
  Plus,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Layers,
  Calendar,
  Users,
  Briefcase,
  BookOpen,
  UserCheck,
  Shield,
  ExternalLink,
  Sparkles,
  Settings,
  Building2,
  GraduationCap,
  Compass,
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export function FrappeHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  const isHrCore = pathname.startsWith('/hr')
  const isCareers = pathname.startsWith('/careers')

  const [searchQuery, setSearchQuery] = useState('')
  const [showQuickMenu, setShowQuickMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleQuickAction = (action: string) => {
    setShowQuickMenu(false)
    if (action === 'clockin') {
      toast.success('Simulation shift clock-in recorded for today!')
    } else if (action === 'leave') {
      toast.info('Navigate to Leaves & Holidays tab to submit leave request.')
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 text-sm select-none shadow-2xs">
      {/* Left: Brand & Mode Switcher */}
      <div className="flex items-center gap-4 shrink-0">
        <Link
          href={isHrCore ? '/hr' : user?.role === 'TRAINER' ? '/trainer/dashboard' : '/dashboard'}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-border bg-[#004ac6] flex items-center justify-center shadow-xs">
            <Image
              src="/images/logo.png"
              alt="NovaLink HR Logo"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-bold text-[#191c1e] text-base tracking-tight">
                NovaLink
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#004ac6] bg-[#dbe1ff] border border-[#b4c5ff] px-1.5 py-0.5 rounded">
                HR OS
              </span>
            </div>
            <span className="text-[10px] text-[#434655] font-medium tracking-wide uppercase">
              {isHrCore ? 'Enterprise HR Core' : 'Practicum Training Lab'}
            </span>
          </div>
        </Link>

        {/* System Environment Segmented Switcher */}
        {user && (
          <div className="hidden lg:flex items-center bg-[#f2f4f6] p-1 rounded-lg border border-border/80 text-xs font-semibold">
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                !isHrCore
                  ? 'bg-white text-[#004ac6] shadow-xs font-bold'
                  : 'text-[#434655] hover:text-[#191c1e]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Training Lab</span>
            </Link>

            <Link
              href="/hr"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition ${
                isHrCore
                  ? 'bg-white text-[#004ac6] shadow-xs font-bold'
                  : 'text-[#434655] hover:text-[#191c1e]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise HR</span>
            </Link>
          </div>
        )}
      </div>

      {/* Center: Global Search Bar */}
      {user && (
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
          <div className="relative w-full rounded-lg flex items-center bg-[#f7f9fb] border border-border focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:bg-white transition-all overflow-hidden">
            <Search className="w-4 h-4 text-[#737686] absolute left-3" />
            <input
              type="text"
              placeholder="Search staff, requisitions, dossiers (⌘K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-14 text-xs bg-transparent border-none text-[#191c1e] placeholder:text-[#737686] focus:outline-none"
            />
            <span className="absolute right-2.5 text-[9px] font-mono text-[#737686] border border-border bg-white px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </div>
        </div>
      )}

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Link
          href="/careers"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dbe1ff] hover:bg-[#b4c5ff] text-[#00174b] font-semibold text-xs transition border border-[#b4c5ff]/60"
        >
          <Compass className="w-3.5 h-3.5 text-[#004ac6]" />
          <span>Careers Portal</span>
          <ExternalLink className="w-3 h-3 text-[#004ac6]" />
        </Link>

        {user ? (
          <>
            {/* Quick Action (+) Button */}
            <div className="relative">
              <button
                onClick={() => setShowQuickMenu(!showQuickMenu)}
                className="w-9 h-9 rounded-lg border border-border hover:bg-[#f2f4f6] flex items-center justify-center text-[#434655] hover:text-[#004ac6] transition shadow-2xs"
                title="Quick Create"
              >
                <Plus className="w-4 h-4" />
              </button>

              {showQuickMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#737686]">
                    Quick Actions
                  </div>
                  <Link
                    href="/day/1"
                    onClick={() => setShowQuickMenu(false)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                  >
                    <Layers className="w-4 h-4 text-[#2563eb]" />
                    <span>New Vacancy Requisition</span>
                  </Link>
                  <button
                    onClick={() => handleQuickAction('clockin')}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                  >
                    <Calendar className="w-4 h-4 text-[#2563eb]" />
                    <span>Shift Attendance Clock-In</span>
                  </button>
                  <Link
                    href="/tutorials/workforce-planning"
                    onClick={() => setShowQuickMenu(false)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                  >
                    <BookOpen className="w-4 h-4 text-[#2563eb]" />
                    <span>Statutory HR Policy Hub</span>
                  </Link>
                </div>
              )}
            </div>

            {/* User Capsule */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-border hover:bg-[#f2f4f6] transition shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-semibold text-xs text-[#191c1e] max-w-[100px] truncate leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#737686] leading-tight">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-[#737686]" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3.5 py-2 border-b border-border/60">
                    <p className="font-bold text-[#191c1e]">{user.name}</p>
                    <p className="text-[11px] text-[#737686] truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Practicum Training Lab</span>
                  </Link>

                  <Link
                    href="/hr"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#004ac6]" />
                    <span>Enterprise HR Platform</span>
                  </Link>

                  {user.role === 'TRAINER' && (
                    <Link
                      href="/trainer/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#f2f4f6] flex items-center gap-2.5 text-[#191c1e]"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#434655]" />
                      <span>Cohort Administration</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      signOut({ callbackUrl: '/login' })
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-2.5 border-t border-border/60"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link href="/login">
            <button className="px-3.5 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold shadow-xs">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}
