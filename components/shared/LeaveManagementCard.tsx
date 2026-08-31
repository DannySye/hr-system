'use client'

import React, { useState, useEffect } from 'react'
import { Plane, PlusCircle, Check, X, Clock, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function LeaveManagementCard() {
  const [balances, setBalances] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [leaveTypes, setLeaveTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Request form state
  const [selectedEmp, setSelectedEmp] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [daysCount, setDaysCount] = useState('3')
  const [submitting, setSubmitting] = useState(false)

  const fetchLeaveData = async () => {
    try {
      const res = await fetch('/api/simulation/leave')
      if (res.ok) {
        const data = await res.json()
        setBalances(data.balances || [])
        setRequests(data.requests || [])
        setLeaveTypes(data.leaveTypes || [])
        if (data.balances?.length > 0 && !selectedEmp) {
          setSelectedEmp(data.balances[0].employeeId)
        }
        if (data.leaveTypes?.length > 0 && !selectedType) {
          setSelectedType(data.leaveTypes[0].id)
        }
      }
    } catch (err) {
      console.error('Failed to fetch leave data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveData()
  }, [])

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/simulation/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'REQUEST',
          employeeId: selectedEmp,
          leaveTypeId: selectedType,
          days: daysCount,
        }),
      })

      if (res.ok) {
        toast.success('Leave request submitted')
        setShowModal(false)
        await fetchLeaveData()
      } else {
        toast.error('Failed to submit leave request')
      }
    } catch (err) {
      toast.error('Error submitting leave request')
    } finally {
      setSubmitting(false)
    }
  }

  const handleApproveReject = async (requestId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      const res = await fetch('/api/simulation/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, requestId }),
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(data.message || `Request ${action.toLowerCase()}d`)
        await fetchLeaveData()
      } else {
        toast.error(data.error || 'Failed action')
      }
    } catch (err) {
      toast.error('Error handling leave request')
    }
  }

  return (
    <div className="space-y-5">
      {/* Balances Summary Grid */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-teal-700" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Employee Leave Entitlements
          </h4>
        </div>
        <Button
          id="leave-request"
          size="sm"
          onClick={() => setShowModal(true)}
          className="text-xs h-7 gap-1 bg-teal-700 hover:bg-teal-800 text-white font-semibold"
        >
          <PlusCircle className="w-3.5 h-3.5" /> Request Leave
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {balances.slice(0, 4).map((b) => (
          <div key={b.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-500 block">
              {b.leaveType?.name} Leave
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-900">{b.balance}d</span>
              <span className="text-[10px] text-slate-400">/ {b.entitled}d</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate">{b.employee?.name}</p>
          </div>
        ))}
      </div>

      {/* Pending Requests & Approvals */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-teal-700" />
          Leave Approval Queue (HR Action)
        </h5>

        <div className="space-y-2">
          {requests.length > 0 ? (
            requests.slice(0, 5).map((req) => (
              <div
                key={req.id}
                className="p-3 rounded-lg border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{req.employee?.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {req.leaveType?.name} • {req.days} days
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {new Date(req.startDate).toLocaleDateString()} to{' '}
                    {new Date(req.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'REQUESTED' ? (
                    <>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleApproveReject(req.id, 'APPROVE')}
                        className="text-xs h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                      >
                        <Check className="w-3 h-3" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleApproveReject(req.id, 'REJECT')}
                        className="text-xs h-7 px-2.5 gap-1"
                      >
                        <X className="w-3 h-3" /> Reject
                      </Button>
                    </>
                  ) : (
                    <Badge
                      variant={req.status === 'APPROVED' ? 'success' : 'destructive'}
                      className="text-[10px]"
                    >
                      {req.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic p-3 text-center border rounded-lg bg-slate-50">
              No leave requests currently in queue.
            </p>
          )}
        </div>
      </div>

      {/* Modal Dialog for Requesting Leave */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">Submit Simulated Leave Request</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Select Employee</label>
                <select
                  value={selectedEmp}
                  onChange={(e) => setSelectedEmp(e.target.value)}
                  className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
                >
                  {balances
                    .filter((v, i, a) => a.findIndex((t) => t.employeeId === v.employeeId) === i)
                    .map((b) => (
                      <option key={b.employeeId} value={b.employeeId}>
                        {b.employee?.name} ({b.employee?.departmentName})
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Leave Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs rounded-md border border-slate-200 bg-white p-2"
                >
                  {leaveTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Entitlement: {t.defaultEntitlement} days)
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Number of Days</label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={daysCount}
                  onChange={(e) => setDaysCount(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={submitting} className="bg-teal-700 hover:bg-teal-800 text-white text-xs">
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
