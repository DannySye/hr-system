import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { buildPersonaSystemPrompt, generateOfflinePersonaReply } from '@/lib/ai-persona'
import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { InterviewType, PersonaType, QualityTier } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      persona,
      personaId,
      message,
      history = [],
      interviewType = InterviewType.SCOPING,
      dayNumber = 1,
    } = await req.json()

    let targetPersona = persona

    if (!targetPersona && personaId) {
      const dbPersona = await prisma.aiPersona.findUnique({
        where: { id: personaId },
      })
      if (dbPersona) {
        targetPersona = {
          name: dbPersona.name,
          personaType: dbPersona.personaType as PersonaType,
          backgroundBrief: dbPersona.backgroundBrief,
          personalityNotes: dbPersona.personalityNotes,
          qualityTier: (dbPersona.qualityTier as QualityTier) || QualityTier.STRONG,
        }
      }
    }

    if (!targetPersona) {
      targetPersona = {
        name: 'Marcus Chen',
        personaType: PersonaType.MANAGER,
        backgroundBrief: 'Head of Engineering at NovaLink scoping a backend engineer vacancy.',
        personalityNotes: 'Direct, technical, values system throughput.',
        qualityTier: QualityTier.STRONG,
      }
    }

    const systemPrompt = buildPersonaSystemPrompt(targetPersona, interviewType, dayNumber)

    // Option A: Free Google Gemini Flash-Lite API if key exists in env
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      try {
        const modelName = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite'
        const result = await streamText({
          model: google(modelName),
          system: systemPrompt,
          messages: [
            ...history.map((h: any) => ({
              role: h.role === 'user' ? 'user' : 'assistant',
              content: h.content,
            })),
            { role: 'user', content: message },
          ],
          temperature: 0.7,
        })

        return result.toDataStreamResponse()
      } catch (geminiError) {
        console.warn('Gemini Flash-Lite API call failed, falling back to local simulation engine:', geminiError)
      }
    }

    // Option B: Zero-Cost Built-in Local Offline Streaming Engine
    const simulatedResponse = generateOfflinePersonaReply(
      targetPersona,
      interviewType,
      dayNumber,
      message,
      history.length + 1
    )

    // Stream the simulated response formatted for Vercel AI SDK data stream
    const encoder = new TextEncoder()
    const customStream = new ReadableStream({
      async start(controller) {
        const words = simulatedResponse.split(' ')
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? ' ' : '')
          // Format as AI SDK Data Stream protocol chunk: 0:"<text>"\n
          const payload = `0:${JSON.stringify(chunk)}\n`
          controller.enqueue(encoder.encode(payload))
          // Realistic speech pacing delay
          await new Promise((resolve) => setTimeout(resolve, 35))
        }
        controller.close()
      },
    })

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    })
  } catch (error: any) {
    console.error('Persona Chat Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
