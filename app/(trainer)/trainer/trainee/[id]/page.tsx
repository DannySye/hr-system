import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { TraineeGradingClient } from './TraineeGradingClient'
import { ArrowLeft, UserCheck, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function TraineeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'TRAINER') {
    redirect('/login')
  }

  const trainee = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      traineeProgress: {
        include: { feedback: true },
        orderBy: { dayNumber: 'asc' },
      },
      tutorialProgress: true,
    },
  })

  if (!trainee) {
    redirect('/trainer/dashboard')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/trainer/dashboard">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Trainer Dashboard
          </Button>
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{trainee.fullName}</h1>
            <p className="text-xs text-slate-500">{trainee.email} • Enrolled Trainee</p>
          </div>
        </div>
      </div>

      <TraineeGradingClient
        trainee={trainee}
        progressRecords={trainee.traineeProgress}
        tutorialProgress={trainee.tutorialProgress || []}
      />
    </div>
  )
}
