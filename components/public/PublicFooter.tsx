import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#e2e8f0] bg-[#004ac6] flex items-center justify-center">
              <Image src="/images/logo.png" alt="NovaLink Logo" width={32} height={32} className="object-cover" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#191c1e]">NovaLink Global</span>
              <p className="text-[10px] text-[#737686]">Network Infrastructure & HR Operations</p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#434655]">
            <Link href="/" className="hover:text-[#2563eb] transition">Home</Link>
            <Link href="/about" className="hover:text-[#2563eb] transition">About</Link>
            <Link href="/services" className="hover:text-[#2563eb] transition">Services</Link>
            <Link href="/careers" className="hover:text-[#2563eb] transition">Careers</Link>
            <Link href="/login" className="hover:text-[#2563eb] transition">HR Training Portal</Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#737686]">
          <p>© 2026 NovaLink Global Infrastructure Ltd. All rights reserved. Registered in England & Wales.</p>
          <p className="text-[10px]">Empowering Next-Generation Enterprise Telecoms and HR Operational Excellence.</p>
        </div>
      </div>
    </footer>
  )
}
