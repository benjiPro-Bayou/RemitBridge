'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Building2,
  TrendingUp,
  TrendingDown,
  Globe
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function DashboardExchangeRatesPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const { bankExchangeRates, exchangeRates } = useApp()

  // Sort by USD rate descending (highest first)
  const sortedBankRates = [...bankExchangeRates].sort((a, b) => b.usdRate - a.usdRate)
  const topBank = sortedBankRates[0]

  const currencies = [
    { code: 'USD', name: 'US Dollar', rateKey: 'usdRate' },
    { code: 'EUR', name: 'Euro', rateKey: 'eurRate' },
    { code: 'GBP', name: 'British Pound', rateKey: 'gbpRate' },
    { code: 'AED', name: 'UAE Dirham', rateKey: 'aedRate' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{t('dashboard.exchangeRates')}</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        {/* Top Bank Banner */}
        <div className="card bg-gradient-to-r from-green-500 to-emerald-600 text-white mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">{language === 'am' ? 'ከፍተኛ ተመን' : 'Best Rate'}</p>
              <h2 className="text-2xl font-bold mt-1">{topBank.bankName}</h2>
              <p className="text-3xl font-bold mt-2">ETB {topBank.usdRate.toFixed(2)}</p>
              <p className="text-white/80 text-sm">per 1 USD</p>
            </div>
            <TrendingUp size={48} className="text-white/50" />
          </div>
        </div>

        {/* Currency Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-white border border-border text-sm font-medium"
            >
              {curr.code}
            </button>
          ))}
        </div>

        {/* Bank Rates */}
        <div className="space-y-2">
          {sortedBankRates.map((bank, idx) => (
            <div 
              key={bank.bankId} 
              className={`card flex items-center justify-between py-4 ${
                idx === 0 ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  idx === 0 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Building2 size={24} className={idx === 0 ? 'text-green-600' : 'text-gray-500'} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{bank.bankName}</h3>
                    {idx === 0 && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                        {language === 'am' ? 'ከፍተኛ' : 'Best'}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-500">USD: {bank.usdRate}</span>
                    <span className="text-xs text-gray-500">EUR: {bank.eurRate}</span>
                    <span className="text-xs text-gray-500">GBP: {bank.gbpRate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary-green text-lg">ETB {bank.usdRate.toFixed(2)}</p>
                <p className="text-xs text-gray-500">per USD</p>
              </div>
            </div>
          ))}
        </div>

        {/* General Rates */}
        <div className="card mt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Globe size={18} />
            {language === 'am' ? 'አጠቃላይ ተመን' : 'General Exchange Rates'}
          </h3>
          <div className="space-y-3">
            {exchangeRates.map((rate) => (
              <div key={rate.code} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800">{rate.code}</span>
                  <span className="text-sm text-gray-500">{rate.currency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">ETB {rate.rate.toFixed(2)}</span>
                  <span className={`flex items-center text-xs ${rate.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {rate.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {rate.change >= 0 ? '+' : ''}{rate.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
