'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Phone,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useApp } from '@/lib/context/AppContext'

export default function SignupPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { setUser } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'am' ? 'የይለፍ ቃሎቹ አይዛመዱም' : 'Passwords do not match')
      return
    }
    
    setIsLoading(true)
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Set user as logged in
    setUser({
      id: '1',
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      language: 'en'
    })
    
    router.push('/welcome')
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
        <h1 className="text-white text-2xl font-bold">{t('signup.title')}</h1>
        <p className="text-blue-100 text-sm mt-1">{t('signup.subtitle')}</p>
      </div>

      <div className="flex-1 px-5 py-6 -mt-4">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('signup.fullName')}</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder={language === 'am' ? 'ሙሉ ስምህን አስገባ' : 'Enter your full name'}
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('signup.email')}</label>
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

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('signup.phone')}</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder={language === 'am' ? 'ስልክ ቁጥርህን አስገባ' : 'Enter your phone number'}
                  required
                  className="input-field pl-11"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('signup.password')}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder={language === 'am' ? 'የይለፍ ቃል አስገባ' : 'Create a password'}
                  required
                  minLength={6}
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

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('signup.confirmPassword')}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder={language === 'am' ? 'የይለፍ ቃልህን አረጋግጥ' : 'Confirm your password'}
                  required
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 text-primary-blue rounded border-gray-300"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                {language === 'am' 
                  ? 'ውሎችና ሁኔታዎችን አስረዱኩዋልና ተስማምቻለሁ'
                  : 'I agree to the Terms & Conditions'}
              </label>
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
                  {t('signup.createAccount')}
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('signup.alreadyHave')}{' '}
              <Link href="/" className="text-primary-blue font-semibold">
                {t('signup.signIn')}
              </Link>
            </p>
          </div>

          {/* Guest Mode */}
          <div className="mt-4 pt-4 border-t border-border">
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 font-medium hover:border-primary-blue hover:text-primary-blue transition-colors"
            >
              {language === 'am' ? 'እንደ እጅጉ ቀጥል' : 'Continue as Guest'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              {language === 'am' ? 'ሰዎችን ማስተላለፍ አስችሎ በቀጥታ ይጀምሩ' : 'Start sending right away without an account'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
