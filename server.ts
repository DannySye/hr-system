import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

// Initialize Next.js application
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

console.log(`[NovaLink Server] Starting server in ${dev ? 'DEVELOPMENT' : 'PRODUCTION'} mode...`)

app
  .prepare()
  .then(() => {
    const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const parsedUrl = parse(req.url || '/', true)
        const { pathname } = parsedUrl

        // Direct low-latency healthcheck endpoint for load balancers / container probes
        if (pathname === '/healthz' || pathname === '/livez') {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          })
          res.end(
            JSON.stringify({
              status: 'healthy',
              service: 'novalink-hr-lab',
              uptime: process.uptime(),
              timestamp: new Date().toISOString(),
              environment: process.env.NODE_ENV || 'development',
              memoryUsage: {
                rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
                heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
              },
            })
          )
          return
        }

        // Delegate all other requests to Next.js App Router & API handlers
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('[NovaLink Server] Request handling error:', err)
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Internal Server Error' }))
        }
      }
    })

    server.listen(port, hostname, () => {
      console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   🚀  NovaLink HR OS & Simulation Practicum Server Active            ║
║                                                                      ║
║   • Local:            http://localhost:${port}                         ║
║   • Network:          http://${hostname}:${port}                         ║
║   • Health Endpoint:  http://localhost:${port}/healthz                 ║
║   • Mode:             ${dev ? 'Development (Hot Reload)' : 'Production (Optimized)'}            ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
`)
    })

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      console.log(`\n[NovaLink Server] Received ${signal}. Initiating graceful shutdown...`)
      server.close(async () => {
        console.log('[NovaLink Server] Closed all pending HTTP connections.')
        try {
          const { prisma } = await import('./lib/prisma')
          await prisma.$disconnect()
          console.log('[NovaLink Server] Database connection pool closed.')
        } catch (dbErr) {
          // Prisma might not have been initialized; ignore gracefully
        }
        console.log('[NovaLink Server] Process terminated safely.')
        process.exit(0)
      })

      // Force shutdown after 10s if connections refuse to close
      setTimeout(() => {
        console.error('[NovaLink Server] Forced shutdown after timeout.')
        process.exit(1)
      }, 10000).unref()
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  })
  .catch((err) => {
    console.error('[NovaLink Server] Failed to bootstrap Next.js server:', err)
    process.exit(1)
  })

process.on('unhandledRejection', (reason, promise) => {
  console.error('[NovaLink Server] Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('[NovaLink Server] Uncaught Exception:', error)
})
