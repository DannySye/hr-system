import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const role = token?.role

    // 1. Role-based routing protection
    if (path.startsWith('/trainer') && role !== 'TRAINER') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if ((path === '/dashboard' || path.startsWith('/day')) && role === 'TRAINER') {
      // Optional: Trainers default to trainer dashboard unless specifically previewing
      if (req.nextUrl.searchParams.get('preview') !== 'true' && path === '/dashboard') {
        return NextResponse.redirect(new URL('/trainer/dashboard', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        // Public paths — accessible without authentication
        if (
          path === '/' ||
          path === '/login' ||
          path === '/register' ||
          path === '/about' ||
          path === '/services' ||
          path.startsWith('/careers') ||
          path.startsWith('/api/careers') ||
          path.startsWith('/api/auth') ||
          path.startsWith('/api/simulation/applications') ||
          path.startsWith('/_next') ||
          path.startsWith('/favicon.ico') ||
          path.startsWith('/images')
        ) {
          return true
        }
        // Require active token for protected paths
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }

)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/day/:path*',
    '/hr/:path*',
    '/tutorials/:path*',
    '/trainer/:path*',
    '/api/tutorial/:path*',
    '/api/ai/:path*',
  ],
}
