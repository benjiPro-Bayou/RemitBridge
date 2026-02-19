'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Lock, 
  Globe, 
  FileText, 
  LogOut,
  ChevronRight,
  Camera,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'
import { useLanguage } from '@/lib/context/LanguageContext'

type SettingsItem = {
  icon: React.ElementType
  label: string
  onClick?: () => void
  hasToggle?: boolean
  value?: string
  path?: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { user, setUser, isGuest } = useApp()
  const { t, language, setLanguage } = useLanguage()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleLanguageChange = (code: string) => {
    setLanguage(code as 'en' | 'am')
    if (user) {
      setUser({ ...user, language: code })
    }
    setShowLanguageModal(false)
  }

  const handleLogout = () => {
    if (isGuest) {
      // For guest, just redirect to home without changes
      router.push('/')
    } else {
      setUser(null)
    }
  }

  const handleLogin = () => {
    router.push('/signup')
  }

  const settingsSections: { title: string; items: SettingsItem[] }[] = isGuest ? [
    {
      title: language === 'am' ? 'ምርጫዎች' : 'Preferences',
      items: [
        { icon: Globe, label: t('settings.language'), value: language === 'am' ? 'አማርኛ' : 'English', onClick: () => setShowLanguageModal(true) },
      ]
    },
    {
      title: language === 'am' ? 'ሕግና ፖሊሲ' : 'Legal',
      items: [
        { icon: FileText, label: t('settings.terms'), path: '/dashboard/terms' },
        { icon: Shield, label: t('settings.privacy'), path: '/dashboard/privacy' },
        { icon: HelpCircle, label: t('settings.help'), path: '/dashboard/help' },
      ]
    },
  ] : [
    {
      title: t('settings.title'),
      items: [
        { icon: User, label: t('settings.editProfile'), onClick: () => setShowProfileModal(true) },
        { icon: Lock, label: t('settings.changePassword'), onClick: () => setShowPasswordModal(true) },
        { icon: Bell, label: t('settings.notifications'), hasToggle: true },
      ]
    },
    {
      title: language === 'am' ? 'ምርጫዎች' : 'Preferences',
      items: [
        { icon: Globe, label: t('settings.language'), value: language === 'am' ? 'አማርኛ' : 'English', onClick: () => setShowLanguageModal(true) },
      ]
    },
    {
      title: language === 'am' ? 'ሕግና ፖሊሲ' : 'Legal',
      items: [
        { icon: FileText, label: t('settings.terms'), path: '/dashboard/terms' },
        { icon: Shield, label: t('settings.privacy'), path: '/dashboard/privacy' },
        { icon: HelpCircle, label: t('settings.help'), path: '/dashboard/help' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <h1 className="text-white text-xl font-bold">{t('settings.title')}</h1>
      </header>

      <div className="px-5 -mt-4">
        {/* Profile Card */}
        <div className="card p-5">
          {isGuest ? (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                👤
              </div>
              <h2 className="text-lg font-bold text-gray-800">
                {language === 'am' ? 'እንደ እጅጉ' : 'Guest User'}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {language === 'am' 
                  ? '��መላክ ይመዝገቡ ወይም እንደ እጅጉ ቀጥል' 
                  : 'Sign up to save recipients or continue as guest'}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleLogin}
                  className="flex-1 btn-primary"
                >
                  {language === 'am' ? 'ይመዝገቡ' : 'Sign Up'}
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600"
                >
                  {language === 'am' ? 'ቀጥል' : 'Continue'}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'G'}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white border-2 border-white">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-1">{user?.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Settings Sections */}
        <div className="mt-4 space-y-4 pb-6">
          {settingsSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                {section.title}
              </h3>
              <div className="card p-0 overflow-hidden">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={itemIdx}
                      href={item.path || '#'}
                      onClick={(e) => {
                        if (item.onClick && !item.path) {
                          e.preventDefault()
                          item.onClick()
                        }
                      }}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        itemIdx < section.items.length - 1 ? 'border-b border-border' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                          <Icon size={20} />
                        </div>
                        <span className="font-medium text-gray-800">{item.label}</span>
                      </div>
                      {item.hasToggle ? (
                        <div className="w-12 h-6 bg-primary-blue rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      ) : item.value ? (
                        <span className="text-sm text-gray-500">{item.value}</span>
                      ) : (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Logout / Back to Home */}
          {isGuest ? (
            <button
              onClick={() => router.push('/')}
              className="w-full card flex items-center justify-center gap-2 py-4 text-primary-blue hover:bg-blue-50"
            >
              <ChevronRight size={20} className="rotate-180" />
              <span className="font-semibold">
                {language === 'am' ? 'ወደ ቤት ተመለስ' : 'Back to Home'}
              </span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full card flex items-center justify-center gap-2 py-4 text-red-600 hover:bg-red-50"
            >
              <LogOut size={20} />
              <span className="font-semibold">{t('settings.logout')}</span>
            </button>
          )}

          {/* Version */}
          <p className="text-center text-xs text-gray-400">Bridge Remit v1.0.0</p>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowLanguageModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-5 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('settings.language')}</h3>
            <div className="space-y-2">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'am', name: 'Amharic', flag: '🇪🇹' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl ${
                    language === lang.code 
                      ? 'bg-blue-50 border-2 border-primary-blue' 
                      : 'bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-gray-800">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5" onClick={() => setShowProfileModal(false)}>
          <div className="bg-white w-full rounded-2xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('settings.editProfile')}</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                defaultValue={user?.name}
                placeholder={language === 'am' ? 'ሙሉ ስም' : 'Full Name'}
                className="input-field"
              />
              <input 
                type="email" 
                defaultValue={user?.email}
                placeholder="Email"
                className="input-field"
              />
              <input 
                type="tel" 
                defaultValue={user?.phone}
                placeholder={language === 'am' ? 'ስልክ' : 'Phone'}
                className="input-field"
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600"
              >
                {language === 'am' ? 'ተወው' : 'Cancel'}
              </button>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="flex-1 btn-primary"
              >
                {language === 'am' ? 'አስቀምጥ' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5" onClick={() => setShowPasswordModal(false)}>
          <div className="bg-white w-full rounded-2xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('settings.changePassword')}</h3>
            <div className="space-y-3">
              <input 
                type="password" 
                placeholder={language === 'am' ? 'አሁን ያለው የይለፍ ቃል' : 'Current Password'}
                className="input-field"
              />
              <input 
                type="password" 
                placeholder={language === 'am' ? 'አዲስ የይለፍ ቃል' : 'New Password'}
                className="input-field"
              />
              <input 
                type="password" 
                placeholder={language === 'am' ? 'አዲሱን አረጋግጥ' : 'Confirm New Password'}
                className="input-field"
              />
            </div>
            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600"
              >
                {language === 'am' ? 'ተወው' : 'Cancel'}
              </button>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 btn-primary"
              >
                {language === 'am' ? 'አስቀምጥ' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
