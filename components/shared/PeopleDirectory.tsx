'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Users,
  Search,
  Building,
  Mail,
  Shield,
  FileText,
  UserCheck,
  X,
  ExternalLink,
  Briefcase,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const EMPLOYEES_DIRECTORY = [
  {
    id: 'emp-1',
    code: 'HR-EMP-001',
    name: 'Riley Morgan',
    role: 'Operations Associate',
    department: 'Operations',
    manager: 'Sarah Jenkins',
    email: 'riley.morgan@novalink.com',
    status: 'Present',
    statusType: 'present',
    startDate: '10 Aug 2026',
    probationStatus: 'Week 1 Review Active',
    avatar: '/images/avatars/riley-morgan.jpg',
  },
  {
    id: 'emp-2',
    code: 'HR-EMP-002',
    name: 'Jordan Reed',
    role: 'Logistics Associate',
    department: 'Operations',
    manager: 'Sarah Jenkins',
    email: 'jordan.reed@novalink.com',
    status: 'Late (4 Flags)',
    statusType: 'late',
    startDate: '01 Aug 2026',
    probationStatus: 'Confirmed — Case Under Review',
    avatar: '/images/avatars/jordan-hayes.jpg', // candidate/employee portrait
  },
  {
    id: 'emp-3',
    code: 'HR-EMP-082',
    name: 'Marcus Chen',
    role: 'Head of Network Operations',
    department: 'Network Operations',
    manager: 'Eleanor Vance',
    email: 'marcus.chen@novalink.com',
    status: 'Present',
    statusType: 'present',
    startDate: '15 Mar 2024',
    probationStatus: 'Confirmed Executive',
    avatar: '/images/avatars/marcus-chen.jpg',
  },
  {
    id: 'emp-4',
    code: 'HR-EMP-095',
    name: 'Samira Khan',
    role: 'Customer Operations Lead',
    department: 'Customer Success',
    manager: 'David Okafor',
    email: 'samira.khan@novalink.com',
    status: 'Remote',
    statusType: 'remote',
    startDate: '10 Jan 2025',
    probationStatus: 'Confirmed — Welfare Review',
    avatar: null,
  },
  {
    id: 'emp-5',
    code: 'HR-EMP-104',
    name: 'Taylor Vance',
    role: 'Senior Peer Engineer',
    department: 'Engineering',
    manager: 'Marcus Chen',
    email: 'taylor.vance@novalink.com',
    status: 'Present',
    statusType: 'present',
    startDate: '01 Aug 2024',
    probationStatus: 'Confirmed Senior Staff',
    avatar: null,
  },
  {
    id: 'emp-6',
    code: 'HR-CAN-001',
    name: 'Jordan Hayes',
    role: 'Field Engineer (Candidate / Offer)',
    department: 'Network Operations',
    manager: 'Marcus Chen',
    email: 'jordan.hayes@example.com',
    status: 'Onboarding Pipeline',
    statusType: 'pipeline',
    startDate: '01 Sep 2026',
    probationStatus: 'Employment Contract Drafted',
    avatar: '/images/avatars/jordan-hayes.jpg',
  },
]

export function PeopleDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('ALL')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const filteredEmployees = EMPLOYEES_DIRECTORY.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="space-y-3">
      {/* Frappe Filter & Search Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-lg border border-slate-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by name, ID, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs pl-8 h-7 bg-slate-50 border-slate-200 rounded-md"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto text-xs pb-1 sm:pb-0">
          {['ALL', 'Operations', 'Network Operations', 'Engineering', 'Customer Success'].map(
            (dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                  selectedDept === dept
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept === 'ALL' ? 'All Departments' : dept}
              </button>
            )
          )}
        </div>
      </div>

      {/* Frappe List / Table View */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">ID Code</th>
              <th className="p-3">Department</th>
              <th className="p-3">Reporting Manager</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEmployees.map((emp) => {
              let statusBadge = (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Present
                </span>
              )
              if (emp.statusType === 'late') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Late Flagged
                  </span>
                )
              } else if (emp.statusType === 'remote') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Remote
                  </span>
                )
              } else if (emp.statusType === 'pipeline') {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Offer Stage
                  </span>
                )
              }

              return (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="hover:bg-slate-50/80 cursor-pointer transition"
                >
                  <td className="p-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        {emp.avatar ? (
                          <Image
                            src={emp.avatar}
                            alt={emp.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[11px] font-bold text-slate-600">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 hover:text-teal-700">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-600 text-[11px]">{emp.code}</td>
                  <td className="p-3 text-slate-700">{emp.department}</td>
                  <td className="p-3 text-slate-700 font-medium">{emp.manager}</td>
                  <td className="p-3">{statusBadge}</td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" className="h-6 text-xs text-teal-700 hover:bg-teal-50 px-2 font-medium">
                      View Master &rarr;
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Frappe Employee Master Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  {selectedEmployee.avatar ? (
                    <Image
                      src={selectedEmployee.avatar}
                      alt={selectedEmployee.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs text-slate-700">
                      {selectedEmployee.name.split(' ').map((n: any) => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{selectedEmployee.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedEmployee.code}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Designation</span>
                  <p className="font-bold text-slate-900">{selectedEmployee.role}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Department</span>
                  <p className="font-bold text-slate-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Reports To</span>
                  <p className="font-bold text-slate-900">{selectedEmployee.manager}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Date of Joining</span>
                  <p className="font-bold text-slate-900">{selectedEmployee.startDate}</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-teal-950 space-y-1">
                <span className="font-bold text-[11px] block">Lifecycle Status:</span>
                <p className="text-xs text-teal-900">{selectedEmployee.probationStatus}</p>
              </div>

              <div className="text-slate-600 text-[11px] space-y-0.5">
                <div><strong>Email:</strong> {selectedEmployee.email}</div>
                <div><strong>Employment Legal Type:</strong> Full-Time Regular (UK Statutory Contract)</div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button
                size="sm"
                onClick={() => setSelectedEmployee(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-7"
              >
                Close Master
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
