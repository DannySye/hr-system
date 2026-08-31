'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  User,
  Bot,
  Sparkles,
  PhoneOff,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { InterviewType, PersonaType } from "@/lib/types"

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

interface VoiceInterviewRoomProps {
  persona: {
    id?: string
    name: string
    personaType: PersonaType
    qualityTier?: string | null
    backgroundBrief: string
    personalityNotes: string
  }
  interviewType?: InterviewType
  dayNumber?: number
  onComplete?: (transcript: Message[]) => void
}

export function VoiceInterviewRoom({
  persona,
  interviewType = InterviewType.SELECTION,
  dayNumber = 1,
  onComplete,
}: VoiceInterviewRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I'm ${persona.name}. Thank you for scheduling this session. I'm ready whenever you are.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAiSpeaking])

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event: any) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
          }
          setInputText(transcript)
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsRecording(false)
          if (event.error !== 'no-speech') {
            toast.error(`Microphone error: ${event.error}`)
          }
        }

        recognition.onend = () => {
          setIsRecording(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  // Web Speech Synthesis (Speak text)
  const speakText = (text: string) => {
    if (!voiceOutputEnabled || typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel() // Stop previous speech
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = persona.personaType === PersonaType.MANAGER ? 0.95 : 1.05

    utterance.onstart = () => setIsAiSpeaking(true)
    utterance.onend = () => setIsAiSpeaking(false)
    utterance.onerror = () => setIsAiSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error('Web Speech API is not supported in this browser. Please use Chrome/Edge or type directly.')
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      setInputText('')
      recognitionRef.current.start()
      setIsRecording(true)
      toast.info('Listening... Speak into your microphone')
    }
  }

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend ?? inputText).trim()
    if (!content || isLoading) return

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInputText('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/persona-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          persona,
          personaId: persona.id,
          interviewType,
          dayNumber,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate response')
      }

      // Stream text reader
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantReply = ''

      const assistantMsgId = `ai-${Date.now()}`
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: '...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const rawChunk = decoder.decode(value, { stream: true })
          
          // Parse data stream text chunks formatted as 0:"text"
          const lines = rawChunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const textChunk = JSON.parse(line.slice(2))
                assistantReply += textChunk
              } catch {
                assistantReply += line.slice(2).replace(/^"/, '').replace(/"$/, '')
              }
            } else if (line && !line.startsWith('d:') && !line.startsWith('e:') && !line.startsWith('f:')) {
              if (!line.includes(':')) {
                assistantReply += line
              }
            }
          }

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, content: assistantReply || '...' } : msg
            )
          )
        }
      }

      if (assistantReply) {
        speakText(assistantReply)
      }
    } catch (err) {
      console.error('Chat error:', err)
      toast.error('Simulation response error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[640px] rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {/* Room Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
              {persona.name.slice(0, 2).toUpperCase()}
            </div>
            {isAiSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">{persona.name}</h3>
              <Badge variant="default" className="text-[10px] bg-teal-600">
                {persona.personaType}
              </Badge>
            </div>
            <p className="text-[11px] text-slate-400">{interviewType} Session • Day {dayNumber}</p>
          </div>
        </div>

        {/* Audio Output Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
            className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs h-8 gap-1.5"
            title={voiceOutputEnabled ? 'Mute AI voice synthesis' : 'Enable AI voice synthesis'}
          >
            {voiceOutputEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] hidden sm:inline">Voice: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span className="text-[11px] hidden sm:inline">Voice: Off</span>
              </>
            )}
          </Button>

          {onComplete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onComplete(messages)}
              className="text-xs h-8 gap-1.5"
            >
              <PhoneOff className="w-3.5 h-3.5" /> End Interview
            </Button>
          )}
        </div>
      </div>

      {/* Persona Briefing Strip */}
      <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span className="line-clamp-1 italic">
          <strong>Context:</strong> {persona.backgroundBrief}
        </span>
        <span className="text-[11px] text-slate-500 font-medium shrink-0 ml-2">
          {persona.qualityTier ? `Tier: ${persona.qualityTier}` : ''}
        </span>
      </div>

      {/* Messages Transcript Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user'
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-teal-700 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[10px] opacity-75">
                  <span className="font-semibold">{isUser ? 'You (HR Trainee)' : persona.name}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          )
        })}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
            {persona.name} is responding...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice / Text Input Dock */}
      <div className="p-3 bg-white border-t border-slate-200">
        {isRecording && (
          <div className="mb-2 p-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between animate-pulse">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Listening via Microphone...
            </span>
            <span className="text-[11px] text-teal-700">Click mic again or press Send when finished</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Voice Dictation Button */}
          <Button
            type="button"
            variant={isRecording ? 'destructive' : 'outline'}
            size="icon"
            onClick={toggleRecording}
            className={`h-10 w-10 shrink-0 ${isRecording ? 'animate-bounce' : 'text-slate-700 hover:text-teal-700'}`}
            title={isRecording ? 'Stop recording' : 'Speak using microphone'}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder={isRecording ? 'Listening...' : 'Type your question or interview prompt...'}
            className="flex-1 h-10 px-3.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
          />

          {/* Send Button */}
          <Button
            type="button"
            variant="default"
            size="icon"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="h-10 w-10 shrink-0"
            title="Send prompt"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
