'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, LogOut, UserCheck, Shield, BookOpen } from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href={user?.role === 'TRAINER' ? '/trainer/dashboard' : '/dashboard'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-sm group-hover:bg-teal-800 transition">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-1.5">
                NovaLink <span className="text-teal-700 font-semibold text-xs px-1.5 py-0.5 bg-teal-50 border border-teal-200 rounded">HR Lab</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium">12-Day Simulation Suite</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links & User Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'TRAINER' ? (
                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <Link
                    href="/trainer/dashboard"
                    className="px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Trainer Dashboard
                  </Link>
                  <Link
                    href="/trainer/seed"
                    className="px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Seed Console
                  </Link>
                  <Link
                    href="/trainer/tutorial-editor"
                    className="px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Tutorial Preview
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <Link
                    href="/dashboard"
                    className="px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition"
                  >
                    Simulation Roadmap
                  </Link>
                  <Link
                    href="/tutorials/workforce-planning"
                    className="px-3 py-1.5 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                    Knowledge Hub
                  </Link>
                </div>
              )}

              {/* User Profile Pill */}
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name || user.email}</p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <Badge
                      variant={user.role === 'TRAINER' ? 'default' : 'secondary'}
                      className="text-[10px] py-0 px-1.5 h-4"
                    >
                      {user.role === 'TRAINER' ? (
                        <span className="flex items-center gap-1">
                          <Shield className="w-2.5 h-2.5" /> Trainer
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-2.5 h-2.5" /> Trainee
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  title="Sign out"
                  className="text-slate-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="default" className="text-xs">
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
