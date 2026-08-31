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
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Trainer Preview Mode (Day {dayNumber})
          </span>
          <Link href="/trainer/dashboard" className="text-teal-700 hover:underline font-semibold">
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
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Day {dayNumber} is Locked</h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            {reason || `You must complete and submit your work for Day ${dayNumber - 1} before proceeding to Day ${dayNumber}.`}
          </p>

          <div className="space-y-2">
            <Link href={`/day/${Math.max(1, dayNumber - 1)}`} className="w-full">
              <Button variant="default" className="w-full text-xs">
                Go to Day {Math.max(1, dayNumber - 1)} &rarr;
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full inline-block">
              <Button variant="outline" className="w-full text-xs gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
