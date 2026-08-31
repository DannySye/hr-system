'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Compass, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export function TrainingHrBridge() {
  const [appCount, setAppCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/simulation/applications')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.count === 'number') {
          setAppCount(data.count)
        }
      })
      .catch(() => setAppCount(null))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card className="border-[#b4c5ff] bg-gradient-to-r from-[#dbe1ff]/40 via-white to-[#f0f4ff] shadow-2xs rounded-2xl overflow-hidden">
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-[#191c1e]">
                Connected Ecosystem: Careers ➔ Day 2 ATS Matrix
              </span>
              <Badge variant="outline" className="text-[9px] bg-white text-[#004ac6] border-[#b4c5ff]">
                Live Pipeline
              </Badge>
            </div>
            <p className="text-xs text-[#434655] leading-relaxed">
              Applications submitted via the public careers portal automatically populate your Day 2 shortlisting & selection ATS queue.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <div className="text-right hidden md:block">
            <span className="text-[10px] uppercase font-bold text-[#737686] block">Portal Pipeline</span>
            <span className="text-xs font-bold text-[#004ac6]">
              {loading ? 'Checking...' : `${appCount ?? 0} Applications Registered`}
            </span>
          </div>
          <Link href="/careers" target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8 bg-white border-[#b4c5ff] text-[#004ac6] hover:bg-[#dbe1ff] font-semibold gap-1.5"
            >
              <span>Test Public Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
