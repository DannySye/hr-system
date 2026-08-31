'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import {
  Search,
  Bell,
  Plus,
  Grid,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Sparkles,
  Layers,
  Calendar,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function FrappeHeader() {
  const { data: session } = useSession()
  const user = session?.user
  const [searchQuery, setSearchQuery] = useState('')
  const [showQuickMenu, setShowQuickMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleQuickAction = (action: string) => {
    setShowQuickMenu(false)
    if (action === 'clockin') {
      toast.success('Simulation clock-in recorded for today!')
    } else if (action === 'leave') {
      toast.info('Navigate to Leaves & Holidays tab to request leave.')
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 h-12 flex items-center justify-between px-3 sm:px-4 text-xs select-none">
      {/* Left: Brand & App Switcher */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={user?.role === 'TRAINER' ? '/trainer/dashboard' : '/dashboard'}
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 bg-teal-900 flex items-center justify-center shadow-xs">
            <Image
              src="/images/logo.png"
              alt="NovaLink HR Logo"
              width={28}
              height={28}
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-sm">
              NovaLink
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-1 py-0.2 rounded">
              HR Desk
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Global Search Bar */}
      {user && (
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search or type a command (Ctrl + G)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-7 pl-8 pr-12 text-xs bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 transition"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-400 border border-slate-200 bg-white px-1 py-0.2 rounded">
              Ctrl + K
            </span>
          </div>
        </div>
      )}

      {/* Right: Actions & User Capsule */}
      <div className="flex items-center gap-2 shrink-0">
        {user ? (
          <>
            {/* Quick Action (+) Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowQuickMenu(!showQuickMenu)}
                className="w-7 h-7 rounded-md border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
                title="Create New Document"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {showQuickMenu && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quick Create
                  </div>
                  <Link
                    href="/day/1"
                    onClick={() => setShowQuickMenu(false)}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Layers className="w-3.5 h-3.5 text-teal-700" />
                    <span>Vacancy Requisition</span>
                  </Link>
                  <button
                    onClick={() => handleQuickAction('clockin')}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    <span>Daily Shift Clock-In</span>
                  </button>
                  <Link
                    href="/tutorials/workforce-planning"
                    onClick={() => setShowQuickMenu(false)}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                    <span>HR Policy Manual</span>
                  </Link>
                </div>
              )}
            </div>

            {/* User Avatar Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100 transition"
              >
                <div className="w-6 h-6 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="font-semibold text-slate-800 hidden sm:inline text-xs">
                  {user.name || user.email}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <Badge variant="outline" className="mt-1 text-[9px]">
                      {user.role === 'TRAINER' ? 'Lead HR Trainer' : 'Junior HR Trainee'}
                    </Badge>
                  </div>

                  {user.role === 'TRAINER' ? (
                    <Link
                      href="/trainer/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>Trainer Cohort Center</span>
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>My Workspace Desk</span>
                    </Link>
                  )}

                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link href="/login">
            <Button size="sm" className="h-7 text-xs bg-teal-700 hover:bg-teal-800 text-white font-semibold">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
