'use client'

import React, { useState } from 'react'
import { Network, UserCheck, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function OrgChartAssignment({
  employeeName = 'Jordan Hayes',
  onAssignSupervisor,
}: {
  employeeName?: string
  onAssignSupervisor?: (supervisor: string) => void
}) {
  const [selectedSupervisor, setSelectedSupervisor] = useState('Marcus Chen (Head of Network Operations)')
  const [assigned, setAssigned] = useState(false)

  const handleAssign = () => {
    setAssigned(true)
    toast.success(`Assigned ${selectedSupervisor} as direct supervisor for ${employeeName}.`)
    if (onAssignSupervisor) onAssignSupervisor(selectedSupervisor)
  }

  return (
    <Card id="org-chart" className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-teal-700" />
            <CardTitle className="text-base font-bold">
              Organizational Hierarchy & Supervisor Assignment
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px]">
            Reporting Line
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Connect the new hire into NovaLink&apos;s supervisory structure to establish clear reporting accountability for Day 6 probation.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Visual Mini Tree */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center space-y-2 text-xs">
          <div className="p-2.5 rounded-lg bg-teal-800 text-white font-bold shadow-xs text-center">
            <div>Marcus Chen</div>
            <div className="text-[10px] font-normal text-teal-200">Head of Network Operations</div>
          </div>
          <div className="w-0.5 h-4 bg-slate-300"></div>
          <div className="p-2.5 rounded-lg bg-white border border-teal-500 font-bold shadow-xs text-center text-slate-900">
            <div>{employeeName}</div>
            <div className="text-[10px] font-normal text-teal-700">Field Engineer (New Hire)</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Assign Line Manager / Direct Supervisor</label>
          <select
            value={selectedSupervisor}
            onChange={(e) => {
              setSelectedSupervisor(e.target.value)
              setAssigned(false)
            }}
            className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
          >
            <option value="Marcus Chen (Head of Network Operations)">
              Marcus Chen — Head of Network Operations (Recommended: Day 1 scoping match)
            </option>
            <option value="Sarah Jenkins (Operations Lead)">
              Sarah Jenkins — Operations Lead
            </option>
          </select>
        </div>

        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAssign}
            className={`text-xs h-8 px-5 gap-1.5 font-semibold ${
              assigned ? 'bg-emerald-600' : 'bg-teal-700 hover:bg-teal-800'
            } text-white`}
          >
            <Check className="w-3.5 h-3.5" />
            {assigned ? 'Hierarchy Locked' : 'Confirm Supervisor Assignment'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
