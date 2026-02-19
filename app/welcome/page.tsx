'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle, Send, CreditCard, Gift, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'
import { useApp } from '@/lib/context/AppContext'

export default function WelcomePage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { user } = useApp()

  const features = [
    { icon: Send, label: t('home.sendMoney'), color: 'bg-primary-blue', path: '/send-money' },
    { icon: CreditCard, label: t('home.billPay'), color: 'bg-primary-green', path: '/bill-payment' },
    { icon: Gift, label: t('home.gifts'), color: 'bg-purple-500', path: '/gift-packages' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse-glow">
          <CheckCircle size={48} className="text-white" />
        </div>
        
        <h1 className="text-white text-2xl font-bold">
          {language === 'am' ? 'እንካን ወደ ቤርጅ ሪሚት!' : 'Welcome to Bridge Remit!'}
        </h1>
        
        <p className="text-blue-100 text-sm mt-2 max-w-xs">
          {language === 'am' 
            ? 'መለያዎ በተሳካ ሁኔታ ተፈጥሯል። አሁን ገንዘብ ለማስተላለፍ መጀመር ይችላሉ።'
            : 'Your account has been created successfully. Now you can start sending money to Ethiopia.'}
        </p>
        
        {user && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
            <p className="text-blue-100 text-xs">{language === 'am' ? 'ወደ እንነጋገር' : 'Signed in as'}</p>
            <p className="text-white font-bold text-lg">{user.name}</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-5 -mt-6 pb-6">
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 text-center">
            {language === 'am' ? 'ምን ማድረግ ይፈልጋሉ?' : 'What would you like to do?'}
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.label}
                  href={feature.path}
                  className="flex flex-col items-center py-4 hover:scale-105 transition-transform"
                >
                  <div className={`${feature.color} p-4 rounded-2xl`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-medium mt-2 text-gray-700 text-center">{feature.label}</span>
                </Link>
              )
            })}
          </div>
          
          <Link
            href="/"
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          >
            {language === 'am' ? 'ወደ ቤት ገጽ ተመለስ' : 'Go to Home'} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
