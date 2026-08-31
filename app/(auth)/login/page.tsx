'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  UserCheck,
  ArrowRight,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  Sparkles,
  GraduationCap,
  Building,
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
    <div className="min-h-[90vh] flex items-center justify-center p-4 sm:p-6 bg-[#F8F9FA]">
      <div className="max-w-md w-full space-y-5">
        {/* Brand Header with Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-slate-200 bg-teal-900 flex items-center justify-center shadow-md">
            <Image
              src="/images/logo.png"
              alt="NovaLink HR Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            NovaLink Human Resources
          </h1>
          <p className="text-xs text-slate-500">
            Enterprise People Operations & Simulation Desk
          </p>
        </div>

        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white rounded-xl">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as 'login' | 'register')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full rounded-none border-b border-slate-200 bg-slate-50/80 p-1">
              <TabsTrigger value="login" className="text-xs font-semibold py-2">
                <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="text-xs font-semibold py-2 text-teal-800">
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Create Account
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SIGN IN */}
            <TabsContent value="login" className="p-0 m-0">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-3.5 pt-5 pb-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="user@novalink.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={loginLoading}
                      className="text-xs h-8 bg-slate-50 border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loginLoading}
                      className="text-xs h-8 bg-slate-50 border-slate-200"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2.5 pb-4">
                  <Button
                    type="submit"
                    className="w-full text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white h-8"
                    disabled={loginLoading}
                  >
                    {loginLoading ? 'Authenticating...' : 'Sign In'}
                  </Button>

                  <p className="text-[11px] text-center text-slate-500">
                    Need an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </CardFooter>
              </form>

              {/* Seed Demo Quick Logins */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Testing Accounts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('trainee@novalink.com', 'trainee123')}
                    disabled={loginLoading}
                    className="text-[11px] h-7 justify-start gap-1.5 border-slate-200 text-slate-700 bg-white"
                  >
                    <UserCheck className="w-3 h-3 text-teal-700" />
                    <span>Alex (Trainee)</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin('trainer@novalink.com', 'trainer123')}
                    disabled={loginLoading}
                    className="text-[11px] h-7 justify-start gap-1.5 border-slate-200 text-slate-700 bg-white"
                  >
                    <Shield className="w-3 h-3 text-slate-600" />
                    <span>Eleanor (Trainer)</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: REGISTER */}
            <TabsContent value="register" className="p-0 m-0">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-3 pt-5 pb-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Jordan Miller"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      disabled={regLoading}
                      className="text-xs h-8 bg-slate-50 border-slate-200"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. j.miller@novalink.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      disabled={regLoading}
                      className="text-xs h-8 bg-slate-50 border-slate-200"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      disabled={regLoading}
                      className="text-xs h-8 bg-slate-50 border-slate-200"
                      required
                    />
                  </div>

                  {/* Role Selector */}
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-semibold text-slate-700">Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole(Role.TRAINEE)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition ${
                          regRole === Role.TRAINEE
                            ? 'border-teal-700 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
                          <span>HR Trainee</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-normal">
                          12-Day Simulation
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegRole(Role.TRAINER)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition ${
                          regRole === Role.TRAINER
                            ? 'border-teal-700 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          <Shield className="w-3.5 h-3.5 text-teal-700" />
                          <span>HR Trainer</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-normal">
                          Cohort & Grading
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2.5 pb-5">
                  <Button
                    type="submit"
                    className="w-full text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white h-8"
                    disabled={regLoading}
                  >
                    {regLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>

                  <p className="text-[11px] text-center text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-teal-700 font-semibold hover:underline"
                    >
                      Sign In
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
