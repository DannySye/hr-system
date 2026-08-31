'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmployeeFileTimeline } from '@/components/shared/EmployeeFileTimeline'
import { FileCheck, BookOpen, CheckCircle2, Eye, Sparkles } from 'lucide-react'

interface EmployeeFileClosureCardProps {
  onFileViewed?: () => void
}

export function EmployeeFileClosureCard({ onFileViewed }: EmployeeFileClosureCardProps) {
  const [viewed, setViewed] = useState(false)

  const handleMarkViewed = () => {
    setViewed(true)
    if (onFileViewed) onFileViewed()
  }

  return (
    <div data-tutorial-target="file-timeline" className="space-y-4">
      <Card className="border-border shadow-2xs bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border/70 p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#2563eb]" />
                <CardTitle className="text-sm font-bold text-[#191c1e]">
                  Comprehensive 12-Day Employee Master File &amp; Audit Timeline
                </CardTitle>
              </div>
              <p className="text-xs text-[#737686] mt-0.5">
                Full chronological lifecycle dossier for Jordan Hayes (Field Engineer) from Day 1 Workforce Scoping to Day 11 Career Development.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {viewed ? (
                <Badge className="text-[9px] bg-[#dcfce7] text-[#15803d] border-[#86efac] font-bold">
                  ✓ Master File Audited
                </Badge>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleMarkViewed}
                  className="h-8 text-xs font-semibold gap-1.5 border-border bg-white text-[#191c1e] hover:bg-[#f2f4f6]"
                >
                  <Eye className="w-3.5 h-3.5 text-[#2563eb]" /> Mark as Read &amp; Verified
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div
            onScroll={() => {
              if (!viewed) handleMarkViewed()
            }}
            className="max-h-[500px] overflow-y-auto pr-2 space-y-4"
          >
            <EmployeeFileTimeline
              candidateName="Jordan Hayes"
              roleTitle="Field Engineer (Optical Infrastructure)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
