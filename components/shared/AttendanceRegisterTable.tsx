'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Play, User, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export function AttendanceRegisterTable() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [advancing, setAdvancing] = useState(false)

  const fetchAttendance = async () => {
    try {
      const res = await fetch('/api/simulation/attendance')
      if (res.ok) {
        const data = await res.json()
        setRecords(data.records || [])
      }
    } catch (err) {
      console.error('Failed to fetch attendance:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendance()
  }, [])

  const handleSimulateDay = async () => {
    setAdvancing(true)
    try {
      const res = await fetch('/api/simulation/attendance', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Advanced simulation to ${data.simulatedDate}. New attendance records logged!`)
        await fetchAttendance()
      } else {
        toast.error(data.error || 'Failed to advance simulation day')
      }
    } catch (err) {
      toast.error('Simulation error')
    } finally {
      setAdvancing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-700" />
          <span className="text-xs font-bold text-slate-900">
            Continuous Live Attendance Log
          </span>
          <span className="text-[11px] text-slate-500">
            ({records.length} total entries)
          </span>
        </div>

        <Button
          id="simulate-day"
          size="sm"
          onClick={handleSimulateDay}
          disabled={advancing}
          className="bg-teal-700 hover:bg-teal-800 text-white text-xs h-8 px-3 gap-1.5 shadow-sm font-semibold"
        >
          <Play className={`w-3 h-3 fill-current ${advancing ? 'animate-spin' : ''}`} />
          {advancing ? 'Simulating Daily Clock-ins...' : 'Simulate Next Working Day'}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-200 overflow-x-auto max-h-[360px] overflow-y-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-100 text-slate-700 sticky top-0 uppercase text-[10px] tracking-wider z-10 border-b border-slate-200">
            <tr>
              <th className="p-3 font-semibold">Employee</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Time In / Out</th>
              <th className="p-3 font-semibold text-center">Status</th>
              <th className="p-3 font-semibold">Remarks & Incident Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.length > 0 ? (
              records.map((rec) => {
                const isLate = rec.status === 'LATE'
                const isAbsent = rec.status === 'ABSENT'

                let statusBadge = (
                  <Badge variant="success" className="text-[9px] bg-emerald-600">
                    Present
                  </Badge>
                )
                if (isLate) {
                  statusBadge = (
                    <Badge variant="warning" className="text-[9px] bg-amber-500">
                      Late
                    </Badge>
                  )
                } else if (isAbsent) {
                  statusBadge = (
                    <Badge variant="destructive" className="text-[9px] bg-red-600">
                      Absent
                    </Badge>
                  )
                }

                return (
                  <tr
                    key={rec.id}
                    className={`hover:bg-slate-50 transition ${
                      isLate ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rec.employee?.name || 'Staff Member'}</span>
                    </td>
                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {new Date(rec.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {rec.timeIn} - {rec.timeOut}
                    </td>
                    <td className="p-3 text-center">{statusBadge}</td>
                    <td className="p-3 text-slate-600 text-[11px] max-w-xs truncate" title={rec.remarks}>
                      {rec.remarks}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-400 italic">
                  {loading ? 'Loading attendance records...' : 'No records yet. Click "Simulate Next Working Day".'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
