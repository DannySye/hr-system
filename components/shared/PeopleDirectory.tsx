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
    probationStatus: 'Confirmed — Disciplinary File',
    avatar: '/images/avatars/jordan-hayes.jpg',
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
    startDate: '15 Jan 2024',
    probationStatus: 'Senior Department Manager',
    avatar: '/images/avatars/marcus-chen.jpg',
  },
  {
    id: 'emp-4',
    code: 'HR-EMP-104',
    name: 'Jordan Hayes',
    role: 'Field Engineer (Target Hire)',
    department: 'Network Operations',
    manager: 'Marcus Chen',
    email: 'jordan.hayes@candidate.novalink.com',
    status: 'Sourcing / Day 3 Selection',
    statusType: 'candidate',
    startDate: 'Simulated Day 5 Hire',
    probationStatus: 'Subject to 3-Month Probation',
    avatar: '/images/avatars/jordan-hayes.jpg',
  },
]

interface PeopleDirectoryProps {
  employees?: any[]
}

export function PeopleDirectory({ employees }: PeopleDirectoryProps) {
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('ALL')
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  const filtered = EMPLOYEES_DIRECTORY.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.code.toLowerCase().includes(search.toLowerCase())
    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <Card className="border-border shadow-2xs bg-white rounded-xl">
      <CardHeader className="pb-3 border-b border-border/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-[#191c1e]">
                Enterprise Personnel Master
              </CardTitle>
              <CardDescription className="text-xs text-[#737686]">
                Employee records, role assignments, department structures, and live attendance statuses.
              </CardDescription>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#737686] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search staff name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs pl-8 h-8 bg-[#f7f9fb] border-border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 pt-2">
          {['ALL', 'Operations', 'Network Operations'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                selectedDept === dept
                  ? 'bg-[#2563eb] text-white shadow-2xs'
                  : 'bg-[#f2f4f6] text-[#434655] hover:bg-[#e6e8ea]'
              }`}
            >
              {dept === 'ALL' ? 'All Staff (4)' : dept}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-[#f7f9fb] text-[#434655] font-semibold">
                <th className="py-2.5 px-4">Employee ID & Name</th>
                <th className="py-2.5 px-4">Position Title</th>
                <th className="py-2.5 px-4">Department</th>
                <th className="py-2.5 px-4">Shift Status</th>
                <th className="py-2.5 px-4">Probation / Progression</th>
                <th className="py-2.5 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="hover:bg-[#f7f9fb] transition cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-[#f2f4f6] shrink-0">
                        <Image
                          src={emp.avatar}
                          alt={emp.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#191c1e] group-hover:text-[#004ac6] transition block">
                          {emp.name}
                        </span>
                        <span className="text-[10px] text-[#737686] font-mono">{emp.code}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-[#191c1e] font-medium">{emp.role}</td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[#434655]">
                      <Building className="w-3 h-3 text-[#737686]" />
                      {emp.department}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {emp.statusType === 'present' && (
                      <Badge className="bg-[#dbe1ff] text-[#00174b] border border-[#b4c5ff] text-[10px] font-semibold">
                        ● Present
                      </Badge>
                    )}
                    {emp.statusType === 'late' && (
                      <Badge className="bg-[#ffdad6] text-[#93000a] border border-[#ffb596] text-[10px] font-semibold">
                        ▲ Late (Flagged)
                      </Badge>
                    )}
                    {emp.statusType === 'candidate' && (
                      <Badge className="bg-[#ffede6] text-[#7d2d00] border border-[#ffdbcd] text-[10px] font-semibold">
                        ◆ Target Hire
                      </Badge>
                    )}
                  </td>

                  <td className="py-3 px-4 text-[#434655] text-[11px]">
                    {emp.probationStatus}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button className="text-[11px] font-semibold text-[#004ac6] hover:underline">
                      View File &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Personnel Dossier Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-border space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-[#f2f4f6]">
                  <Image
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#191c1e]">{selectedEmployee.name}</h3>
                  <p className="text-xs text-[#737686]">{selectedEmployee.code} • {selectedEmployee.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-[#737686] hover:text-[#191c1e] p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#f7f9fb] border border-border">
                <span className="text-[10px] text-[#737686] uppercase font-bold">Department</span>
                <p className="font-bold text-[#191c1e] mt-0.5">{selectedEmployee.department}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#f7f9fb] border border-border">
                <span className="text-[10px] text-[#737686] uppercase font-bold">Reporting Manager</span>
                <p className="font-bold text-[#191c1e] mt-0.5">{selectedEmployee.manager}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#f7f9fb] border border-border">
                <span className="text-[10px] text-[#737686] uppercase font-bold">Official Email</span>
                <p className="font-bold text-[#191c1e] mt-0.5">{selectedEmployee.email}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#f7f9fb] border border-border">
                <span className="text-[10px] text-[#737686] uppercase font-bold">Start Date</span>
                <p className="font-bold text-[#191c1e] mt-0.5">{selectedEmployee.startDate}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#dbe1ff]/40 border border-[#b4c5ff] text-xs text-[#00174b] space-y-1">
              <span className="font-bold block">Statutory Case Status & Milestones:</span>
              <p className="text-[11px] leading-relaxed">
                {selectedEmployee.probationStatus}. Employee files are synchronized with Day 1–12 simulation progression and statutory HR records.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                onClick={() => setSelectedEmployee(null)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold"
              >
                Close Dossier
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
