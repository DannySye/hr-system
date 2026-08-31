'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Shield,
  UserCheck,
  ArrowRight,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { toast } from 'sonner'
import { Role } from '@/lib/types'

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Sign Up State
  const [regFullName, setRegFullName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regRole, setRegRole] = useState<Role>(Role.TRAINEE)
  const [regLoading, setRegLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      toast.error('Please enter both email and password.')
      return
    }

    setLoginLoading(true)
    try {
      const res = await signIn('credentials', {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      })

      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success('Successfully logged in')
        if (loginEmail.toLowerCase().includes('trainer')) {
          router.push('/trainer/dashboard')
        } else {
          router.push('/dashboard')
        }
        router.refresh()
      }
    } catch (err) {
      toast.error('An unexpected error occurred.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regFullName || !regEmail || !regPassword) {
      toast.error('Please fill in your full name, email, and password.')
      return
    }

    setRegLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: regFullName,
          email: regEmail,
          password: regPassword,
          role: regRole,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to create account.')
        return
      }

      toast.success(`Account created for ${regFullName}! Logging you in...`)

      // Auto sign-in immediately
      const loginRes = await signIn('credentials', {
        email: regEmail,
        password: regPassword,
        redirect: false,
      })

      if (loginRes?.ok) {
        if (regRole === Role.TRAINER) {
          router.push('/trainer/dashboard')
        } else {
          router.push('/dashboard')
        }
        router.refresh()
      } else {
        setActiveTab('login')
        setLoginEmail(regEmail)
      }
    } catch (err) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setRegLoading(false)
    }
  }

  const handleQuickLogin = async (demoEmail: string, demoPass: string) => {
    setLoginEmail(demoEmail)
    setLoginPassword(demoPass)
    setLoginLoading(true)
    try {
      const res = await signIn('credentials', {
        email: demoEmail,
        password: demoPass,
        redirect: false,
      })

      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success(`Logged in as ${demoEmail}`)
        if (demoEmail.includes('trainer')) {
          router.push('/trainer/dashboard')
        } else {
          router.push('/dashboard')
        }
        router.refresh()
      }
    } catch (err) {
      toast.error('Quick login failed')
    } finally {
      setLoginLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-md">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            NovaLink HR Simulation Lab
          </h1>
          <p className="text-xs text-slate-500">
            Interactive Practicum Platform for Human Resource Management Interns & Trainers
          </p>
        </div>

        <Card className="shadow-lg border-slate-200 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as 'login' | 'register')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full rounded-none border-b border-slate-100 bg-slate-50 p-1">
              <TabsTrigger value="login" className="text-xs font-semibold py-2.5">
                <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="text-xs font-semibold py-2.5 text-teal-800">
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Create New Account
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SIGN IN */}
            <TabsContent value="login" className="p-0">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-xs">
                  Enter your email and password to access your simulation dashboard.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleLogin}>
                <CardContent className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> Work / University Email
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. your.name@university.edu"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={loginLoading}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loginLoading}
                      className="text-xs"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2 pb-5">
                  <Button
                    type="submit"
                    className="w-full text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white h-9"
                    disabled={loginLoading}
                  >
                    {loginLoading ? 'Authenticating...' : 'Sign In to Workspace'}
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>

                  <p className="text-[11px] text-center text-slate-500">
                    Don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Create one in 10 seconds
                    </button>
                  </p>
                </CardFooter>
              </form>

              {/* Seed Test Logins */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Quick Demo Logins
                  </span>
                  <Badge variant="outline" className="text-[9px]">
                    Pre-seeded
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('trainee@novalink.com', 'trainee123')}
                    disabled={loginLoading}
                    className="text-[11px] h-8 justify-start gap-1.5 border-teal-200 hover:bg-teal-50 text-teal-900 bg-white"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-teal-700" />
                    <span>Alex (Trainee)</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('trainer@novalink.com', 'trainer123')}
                    disabled={loginLoading}
                    className="text-[11px] h-8 justify-start gap-1.5 border-slate-300 hover:bg-slate-100 text-slate-800 bg-white"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-600" />
                    <span>Eleanor (Trainer)</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: REGISTER (CREATE NEW ACCOUNT) */}
            <TabsContent value="register" className="p-0">
              <CardHeader className="pb-3 pt-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-slate-900">
                    Create Custom Account
                  </CardTitle>
                  <Badge variant="default" className="bg-teal-700 text-[10px]">
                    Instant Access
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Register as an HR Intern or Lead Trainer with your own name and credentials.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleRegister}>
                <CardContent className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Your Full Name (Practitioner / Instructor)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Jordan Miller or Dr. Evelyn Harper"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      disabled={regLoading}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. j.miller@university.edu"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      disabled={regLoading}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      disabled={regLoading}
                      className="text-xs"
                      required
                    />
                  </div>

                  {/* Role Selector Card Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-slate-700">Select Platform Role</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setRegRole(Role.TRAINEE)}
                        className={`p-3 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                          regRole === Role.TRAINEE
                            ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-600'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <GraduationCap className="w-4 h-4 text-teal-700" />
                          <span>HR Trainee / Intern</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-normal">
                          12-day employee lifecycle simulation, tutorials & AI interview rooms.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegRole(Role.TRAINER)}
                        className={`p-3 rounded-lg border text-left text-xs transition flex flex-col justify-between ${
                          regRole === Role.TRAINER
                            ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-600'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Shield className="w-4 h-4 text-teal-700" />
                          <span>Lead HR Trainer</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-normal">
                          Cohort dashboard, rubric grading, progress matrix & cohort invites.
                        </p>
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
                  <Button
                    type="submit"
                    className="w-full text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white h-9 gap-1.5"
                    disabled={regLoading}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {regLoading ? 'Creating Account & Workspace...' : 'Register & Enter Workspace'}
                  </Button>

                  <p className="text-[11px] text-center text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Sign In to existing account
                    </button>
                  </p>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
