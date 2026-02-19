'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Package, 
  FileText, 
  Shield, 
  HelpCircle,
  TrendingUp,
  Globe,
  Settings,
  ChevronRight,
  Edit,
  Trash2
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function DashboardPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { giftPackages, updateGiftPackage } = useApp()

  const menuItems = [
    { 
      icon: Package, 
      label: language === 'am' ? 'የስጦታ ፓኬጆች' : 'Gift Packages', 
      path: '/dashboard/packages',
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      icon: TrendingUp, 
      label: language === 'am' ? 'የባንክ የገንዘብ ለውጥ' : 'Bank Exchange Rates', 
      path: '/dashboard/exchange-rates',
      color: 'bg-green-100 text-green-600'
    },
    { 
      icon: FileText, 
      label: language === 'am' ? 'ውሎችና ሁኔታዎች' : 'Terms & Conditions', 
      path: '/dashboard/terms',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: Shield, 
      label: language === 'am' ? 'ግላዊነት ፖሊሲ' : 'Privacy Policy', 
      path: '/dashboard/privacy',
      color: 'bg-red-100 text-red-600'
    },
    { 
      icon: HelpCircle, 
      label: language === 'am' ? 'እርዳታና ድጋፍ' : 'Help & Support', 
      path: '/dashboard/help',
      color: 'bg-yellow-100 text-yellow-600'
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{t('dashboard.title')}</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        <div className="card">
          <div className="space-y-2">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <span className="font-semibold text-gray-800">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
