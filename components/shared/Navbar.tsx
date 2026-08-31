'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Building2,
  LogOut,
  UserCheck,
  Shield,
  BookOpen,
  Search,
  PlusCircle,
  Bell,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  Users,
  Compass,
} from 'lucide-react'
import { toast } from 'sonner'

export function Navbar() {
  const { data: session } = useSession()
  const user = session?.user
  const [searchQuery, setSearchQuery] = useState('')
  const [showQuickMenu, setShowQuickMenu] = useState(false)

  const handleQuickAction = (action: string) => {
    setShowQuickMenu(false)
    if (action === 'clockin') {
      toast.success('Simulation clock-in recorded for today!')
    } else if (action === 'leave') {
      toast.info('Navigate to Continuous Threads tab on your dashboard to request leave.')
    } else if (action === 'requisition') {
      toast.info('Opening Day 1 Workforce Planning requisition builder.')
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Organization Switcher */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href={user?.role === 'TRAINER' ? '/trainer/dashboard' : '/dashboard'}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-900 transition">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  NovaLink
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded">
                  HR Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                EMEA Operations • Global Matrix
              </p>
            </div>
          </Link>
        </div>

        {/* Global Search Bar (Enterprise Look) */}
        {user && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search employees, policies, requisitions, or cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-9 pr-12 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 transition"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 border border-slate-200 bg-white px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </div>
          </div>
        )}

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {user ? (
            <>
              {/* Quick Actions Dropdown */}
              <div className="relative">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowQuickMenu(!showQuickMenu)}
                  className="text-xs h-8 px-2.5 sm:px-3 gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-teal-700" />
                  <span className="hidden sm:inline font-semibold">Quick Action</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </Button>

                {showQuickMenu && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Standard HR Workflows
                    </div>
                    <Link
                      href="/day/1"
                      onClick={() => setShowQuickMenu(false)}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                    >
                      <Layers className="w-3.5 h-3.5 text-teal-700" />
                      <span>Create Vacancy Requisition</span>
                    </Link>
                    <button
                      onClick={() => handleQuickAction('clockin')}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                    >
                      <Calendar className="w-3.5 h-3.5 text-teal-700" />
                      <span>Log Daily Simulation Clock-in</span>
                    </button>
                    <Link
                      href="/tutorials/workforce-planning"
                      onClick={() => setShowQuickMenu(false)}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                      <span>Open HR Policy Knowledge Hub</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              {user.role === 'TRAINER' ? (
                <div className="hidden lg:flex items-center gap-1.5 text-xs">
                  <Link
                    href="/trainer/dashboard"
                    className="px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Cohort Matrix
                  </Link>
                  <Link
                    href="/trainer/seed"
                    className="px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Database Seed
                  </Link>
                  <Link
                    href="/trainer/tutorial-editor"
                    className="px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Curriculum
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-1.5 text-xs">
                  <Link
                    href="/dashboard"
                    className="px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Workspace Dashboard
                  </Link>
                  <Link
                    href="/tutorials/workforce-planning"
                    className="px-2.5 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5 text-teal-700" />
                    Knowledge Hub
                  </Link>
                </div>
              )}

              {/* User Profile Capsule */}
              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-200">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>

                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                    {user.name || user.email}
                  </p>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {user.role === 'TRAINER' ? 'Lead HR Trainer' : 'Junior HR Trainee'}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  title="Sign out of HR portal"
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
