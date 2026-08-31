'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export interface TryItNowProps {
  label: string
  href: string
}

export function TryItNow({ label, href }: TryItNowProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('#') || href.includes('#')) {
      const anchorId = href.split('#')[1]
      if (anchorId) {
        const target = document.getElementById(anchorId)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
          target.classList.add('animate-pulse-outline')
          setTimeout(() => {
            target.classList.remove('animate-pulse-outline')
          }, 1600)
        }
      }
    }
  }

  return (
    <div className="my-4 p-3 rounded-lg border border-teal-300 bg-teal-50/60 flex items-center justify-between gap-3">
      <span className="text-xs font-medium text-teal-900">{label}</span>
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-teal-700 text-white hover:bg-teal-800 transition shadow-sm shrink-0"
      >
        Try It Now
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}
