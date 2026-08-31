import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/shared/Providers'
import { FrappeHeader } from '@/components/frappe/FrappeHeader'

export const metadata: Metadata = {
  title: 'NovaLink HR System',
  description: 'Enterprise Human Resources Management & Practitioner Simulation System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-slate-900 antialiased">
        <Providers>
          <FrappeHeader />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
