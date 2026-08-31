'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserX, Building2, Calendar, MapPin, CheckCircle2, Shield } from 'lucide-react'

export function ExitCaseSelector() {
  return (
    <Card data-tutorial-target="exit-case-selector" className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/70 p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserX className="w-4 h-4 text-[#ba1a1a]" />
            <CardTitle className="text-sm font-bold text-[#191c1e]">
              Active Separation &amp; Resignation Case File
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab] font-bold">
            Resignation Case
          </Badge>
        </div>
        <CardDescription className="text-xs text-[#737686]">
          Secondary pre-existing employee exit dossier (distinct from Jordan Hayes storyline).
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <div className="p-4 rounded-xl border border-border bg-[#f7f9fb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffede6] text-[#bc4800] border border-[#ffb596] flex items-center justify-center font-bold text-sm shrink-0">
              ER
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#191c1e] text-sm">Elena Rostova</h3>
                <span className="text-[10px] font-mono text-[#737686]">NL-1003</span>
              </div>
              <p className="text-xs text-[#434655] font-medium">
                Network Systems Specialist • Network Operations
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#737686] mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#2563eb]" /> Tenure: 2.5 Years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#505f76]" /> Reason: Relocation (Frankfurt)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803d] bg-[#dcfce7] border border-[#86efac] px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Notice Formally Received
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
