'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e2e8f0] h-16 flex items-center justify-between px-4 sm:px-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#004ac6] flex items-center justify-center shadow-xs">
          <Image src="/images/logo.png" alt="NovaLink Logo" width={36} height={36} className="object-cover" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-base text-[#191c1e] tracking-tight">NovaLink Global</span>
          <span className="text-[10px] text-[#737686] font-medium tracking-wide">Network Infrastructure & HR</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#434655]">
        <Link href="/" className="hover:text-[#2563eb] transition">Home</Link>
        <Link href="/about" className="hover:text-[#2563eb] transition">About</Link>
        <Link href="/services" className="hover:text-[#2563eb] transition">Services</Link>
        <Link href="/careers" className="hover:text-[#2563eb] transition">Careers</Link>
      </nav>

      <div className="hidden md:flex items-center gap-2.5">
        <Link href="/careers">
          <Button variant="outline" size="sm" className="text-xs h-8 border-[#e2e8f0] text-[#191c1e] bg-white hover:bg-[#f7f9fb]">
            Open Roles
          </Button>
        </Link>
        <Link href="/login">
          <Button size="sm" className="text-xs h-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold shadow-xs">
            Training Portal
          </Button>
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 text-[#434655] hover:text-[#191c1e]"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#e2e8f0] p-4 space-y-3 shadow-md">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-[#191c1e] hover:text-[#2563eb] py-1"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-[#191c1e] hover:text-[#2563eb] py-1"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-[#191c1e] hover:text-[#2563eb] py-1"
          >
            Services
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-semibold text-[#191c1e] hover:text-[#2563eb] py-1"
          >
            Careers
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="w-full text-xs h-8 bg-[#2563eb] text-white font-semibold">
                Training Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
