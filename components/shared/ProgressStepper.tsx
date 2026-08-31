'use client'

import React from 'react'
import Link from 'next/link'
import { Check, Lock, Play, Award, Clock } from 'lucide-react'
import { ProgressStatus } from "@/lib/types"

export interface TimelineDay {
  dayNumber: number
  title: string
  status: ProgressStatus
  isUnlocked: boolean
  submittedAt?: Date | string | null
  feedback?: any | null
}

interface ProgressStepperProps {
  timeline: TimelineDay[]
  currentDay?: number
}

export function ProgressStepper({ timeline, currentDay }: ProgressStepperProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">12-Day Simulation Roadmap</h2>
          <p className="text-xs text-slate-500">Track your progress across the complete employee lifecycle simulation</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span> Current
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Locked
          </span>
        </div>
      </div>

      {/* Grid of 12 Days */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {timeline.map((day) => {
          const isCurrent = currentDay === day.dayNumber
          const isDone = day.status === ProgressStatus.SUBMITTED || day.status === ProgressStatus.GRADED
          const isLocked = !day.isUnlocked

          let cardStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
          let badgeBg = 'bg-slate-100 text-slate-700'

          if (isDone) {
            cardStyle = 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50/70'
            badgeBg = 'bg-emerald-600 text-white'
          } else if (isCurrent) {
            cardStyle = 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/30'
            badgeBg = 'bg-teal-700 text-white'
          } else if (isLocked) {
            cardStyle = 'border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed'
            badgeBg = 'bg-slate-200 text-slate-400'
          }

          const cardContent = (
            <div className={`p-4 rounded-lg border transition-all flex flex-col justify-between h-32 ${cardStyle}`}>
              <div className="flex items-start justify-between gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${badgeBg}`}>
                  {isDone ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    day.dayNumber
                  )}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Day {day.dayNumber}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                  {day.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 mt-auto">
                <span className="text-slate-500 font-medium">
                  {day.status === ProgressStatus.GRADED
                    ? 'Graded'
                    : day.status === ProgressStatus.SUBMITTED
                    ? 'Submitted'
                    : isLocked
                    ? 'Locked'
                    : 'In Progress'}
                </span>
                {!isLocked && (
                  <span className="text-teal-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition">
                    {isDone ? 'Review' : 'Enter'} &rarr;
                  </span>
                )}
              </div>
            </div>
          )

          if (isLocked) {
            return (
              <div key={day.dayNumber} title="Complete previous day to unlock">
                {cardContent}
              </div>
            )
          }

          return (
            <Link key={day.dayNumber} href={`/day/${day.dayNumber}`} className="group">
              {cardContent}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
