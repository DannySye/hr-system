import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const startTime = Date.now()
  let dbStatus = 'disconnected'
  let dbLatencyMs: number | null = null
  let dbError: string | null = null

  try {
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    dbLatencyMs = Date.now() - dbStart
    dbStatus = 'connected'
  } catch (error: any) {
    dbStatus = 'unreachable'
    dbError = error?.message || 'Database connection error'
  }

  const isHealthy = dbStatus === 'connected'
  const totalResponseTimeMs = Date.now() - startTime

  const healthData = {
    status: isHealthy ? 'healthy' : 'degraded',
    service: 'NovaLink HR OS & Simulation Practicum',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
      ...(dbError && { error: dbError }),
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    },
    responseTimeMs: totalResponseTimeMs,
  }

  return NextResponse.json(healthData, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
