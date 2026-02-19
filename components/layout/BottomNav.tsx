'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ArrowLeftRight, Settings } from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'

export function BottomNav() {
  const pathname = usePathname()
  const { t, language } = useLanguage()

  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home'), path: '/' },
    { id: 'transactions', icon: ArrowLeftRight, label: t('nav.transactions'), path: '/transactions' },
    { id: 'settings', icon: Settings, label: t('nav.settings'), path: '/settings' },
  ]

  const getCurrentPath = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/transactions')) return 'transactions'
    if (pathname.startsWith('/settings')) return 'settings'
    return 'home'
  }

  const current = getCurrentPath()

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-center max-w-md mx-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = current === item.id
          
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 px-8 md:px-12 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-primary-blue bg-blue-50' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-blue-100' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'text-primary-blue' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
