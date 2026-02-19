'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useApp } from '@/lib/context/AppContext'

export default function SigninPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { setUser } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    // Simulate sign in
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Set user as logged in
    setUser({
      id: '1',
      name: 'John Doe',
      email: formData.email,
      phone: '+1 555-0123',
      language: 'en'
    })
    
    router.push('/')
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <button onClick={() => router.back()} className="text-white mb-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">
          {language === 'am' ? 'ግባ' : 'Sign In'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {language === 'am' 
            ? 'መለያዎን ገብተው ይቀጥሉ' 
            : 'Welcome back! Please sign in to continue'}
        </p>
      </div>

      <div className="flex-1 px-5 py-6 -mt-4">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {language === 'am' ? 'ኢሜይል' : 'Email'}
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder={language === 'am' ? 'ኢሜይልህን አስገባ' : 'Enter your email'}
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {language === 'am' ? 'የይለፍ ቃል' : 'Password'}
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder={language === 'am' ? 'የይለፍ ቃልህን አስገባ' : 'Enter your password'}
                  required
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary-blue font-medium">
                {language === 'am' ? 'የይለፍ ቃል ረሱ?' : 'Forgot Password?'}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('common.loading')}
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  {language === 'am' ? 'ግባ' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {language === 'am' 
                ? 'አስቀድመህ መለያ የለህም?' 
                : "Don't have an account?"}{' '}
              <Link href="/signup" className="text-primary-blue font-semibold">
                {language === 'am' ? 'ይመዝገቡ' : 'Sign Up'}
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {language === 'am' ? 'ወይም' : 'or'}
              </span>
            </div>
          </div>

          {/* Guest Mode */}
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 font-medium hover:border-primary-blue hover:text-primary-blue transition-colors"
          >
            {language === 'am' ? 'እንደ እጅጉ ቀጥል' : 'Continue as Guest'}
          </button>
        </div>
      </div>
    </div>
  )
}
