import React from 'react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { isDayUnlocked } from '@/lib/day-gating'
import { Lock, ArrowLeft, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DayLockGuardProps {
  dayNumber: number
  children: React.ReactNode
}

export async function DayLockGuard({ dayNumber, children }: DayLockGuardProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  // Trainers always have preview access
  if (session.user.role === 'TRAINER') {
    return (
      <div className="relative">
        <div className="bg-[#ffede6] border-b border-[#ffb596] px-4 py-2 text-xs text-[#7d2d00] flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-[#bc4800]" /> Trainer Preview Mode (Day {dayNumber})
          </span>
          <Link href="/trainer/dashboard" className="text-[#004ac6] hover:underline font-bold">
            Return to Trainer Dashboard &rarr;
          </Link>
        </div>
        {children}
      </div>
    )
  }

  const { unlocked, reason } = await isDayUnlocked(session.user.id, dayNumber)

  if (!unlocked) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6 bg-[#f7f9fb]">
        <div className="max-w-md w-full rounded-2xl border border-border bg-white p-8 text-center shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#191c1e] mb-1">Day {dayNumber} is Locked</h2>
            <p className="text-xs text-[#434655] leading-relaxed">
              {reason || `You must complete and submit your deliverables for Day ${dayNumber - 1} before proceeding to Day ${dayNumber}.`}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Link href={`/day/${Math.max(1, dayNumber - 1)}`} className="w-full inline-block">
              <Button className="w-full text-xs font-bold bg-[#2563eb] hover:bg-[#1d4ed8] text-white h-9 rounded-lg shadow-xs">
                Go to Day {Math.max(1, dayNumber - 1)} &rarr;
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full inline-block">
              <Button variant="outline" className="w-full text-xs font-semibold h-9 rounded-lg border-border text-[#191c1e] gap-1.5 hover:bg-[#f2f4f6]">
                <ArrowLeft className="w-3.5 h-3.5" /> Return to HR Console
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
