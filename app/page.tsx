'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Send, 
  CreditCard, 
  Gift, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  Building2,
  Wallet,
  Zap,
  Stethoscope,
  Heart,
  GraduationCap,
  ChevronRight,
  X,
  CheckCircle
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function HomePage() {
  const router = useRouter()
  const { user, exchangeRates, transactions, giftPackages, bankExchangeRates, isGuest } = useApp()
  const { t, language } = useLanguage()
  const [showGiftPopup, setShowGiftPopup] = useState(false)
  const [selectedGift, setSelectedGift] = useState<any>(null)
  const [showTxDetail, setShowTxDetail] = useState(false)
  const [selectedTx, setSelectedTx] = useState<any>(null)

  // Sort bank rates by USD rate (highest first)
  const sortedBankRates = [...bankExchangeRates].sort((a, b) => b.usdRate - a.usdRate)
  const topBank = sortedBankRates[0]

  const quickActions = [
    { icon: Send, label: t('home.sendMoney'), color: 'bg-primary-blue', path: '/send-money' },
    { icon: CreditCard, label: t('home.billPay'), color: 'bg-primary-green', path: '/bill-payment' },
    { icon: Gift, label: t('home.gifts'), color: 'bg-purple-500', path: '/gift-packages' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Building2 size={16} />
      case 'cash': return <Wallet size={16} />
      case 'utility': return <Zap size={16} />
      case 'medical': return <Stethoscope size={16} />
      case 'school': return <GraduationCap size={16} />
      case 'donation': return <Heart size={16} />
      default: return <CreditCard size={16} />
    }
  }

  const handleGiftClick = (gift: any) => {
    setSelectedGift(gift)
    setShowGiftPopup(true)
  }

  const handleContinueGift = () => {
    setShowGiftPopup(false)
    router.push(`/gift-packages?gift=${selectedGift.id}`)
  }

  const handleTxClick = (tx: any) => {
    setSelectedTx(tx)
    setShowTxDetail(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">{t('home.welcome')}</p>
            <h1 className="text-white text-xl font-bold mt-1">{user?.name || 'Guest'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white">🔔</span>
              </div>
            </Link>
            {isGuest ? (
              <div className="flex gap-2">
                <Link 
                  href="/signin"
                  className="px-3 py-1.5 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30"
                >
                  {language === 'am' ? 'ግባ' : 'Sign In'}
                </Link>
                <Link 
                  href="/signup"
                  className="px-3 py-1.5 bg-white text-primary-blue text-sm rounded-lg font-medium"
                >
                  {language === 'am' ? 'ይመዝገቡ' : 'Sign Up'}
                </Link>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {user?.name?.charAt(0) || 'G'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        {/* Quick Action Cards */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.path}
                className="card flex flex-col items-center py-5 hover:scale-105 transition-transform"
              >
                <div className={`${action.color} p-4 rounded-2xl`}>
                  <Icon size={28} className="text-white" />
                </div>
                <span className="text-sm font-semibold mt-3 text-gray-800">{action.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Bank Exchange Rates - Sorted by highest */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">{t('home.exchangeRates')}</h2>
            <Link href="/dashboard/exchange-rates" className="text-primary-blue text-sm font-medium">
              {t('home.viewAll')} →
            </Link>
          </div>
          
          {/* Top Bank Highlight */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs">🏆 {language === 'am' ? 'ከፍተኛ ተመን' : 'Best Rate'}</p>
                <p className="font-bold text-lg mt-1">{topBank.bankName}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">ETB {topBank.usdRate.toFixed(2)}</p>
                <p className="text-white/80 text-xs">per 1 USD</p>
              </div>
            </div>
          </div>

          {/* Other Banks */}
          <div className="space-y-2">
            {sortedBankRates.slice(1, 4).map((rate) => (
              <div key={rate.bankId} className="card flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Building2 size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{rate.bankName}</p>
                    <p className="text-xs text-gray-500">{language === 'am' ? 'ETB' : 'ETB'} {rate.usdRate.toFixed(2)}</p>
                  </div>
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Gift Packages */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">{t('home.giftPackages')}</h2>
            <Link href="/gift-packages" className="text-primary-blue text-sm font-medium">
              {t('home.viewAll')} →
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {giftPackages.filter(p => p.active).map((gift) => (
              <button
                key={gift.id}
                onClick={() => handleGiftClick(gift)}
                className="flex-shrink-0 w-40 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 text-left hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-2">{gift.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">
                  {language === 'am' ? gift.titleAm : gift.title}
                </p>
                <p className="text-primary-blue font-bold mt-2">${gift.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">{t('home.recentTransactions')}</h2>
            <Link href="/transactions" className="text-primary-blue text-sm font-medium">
              {t('home.seeAll')} →
            </Link>
          </div>
          <div className="space-y-2">
            {transactions.slice(0, 3).map((tx) => (
              <button 
                key={tx.id}
                onClick={() => handleTxClick(tx)}
                className="w-full card flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{tx.recipientName}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-bold text-gray-800">${tx.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gift Package Popup */}
      {showGiftPopup && selectedGift && (
        <div className="popup-overlay" onClick={() => setShowGiftPopup(false)}>
          <div className="popup-content p-6" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowGiftPopup(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedGift.color} flex items-center justify-center text-4xl mx-auto mb-4`}>
              {selectedGift.icon}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {language === 'am' ? selectedGift.titleAm : selectedGift.title}
            </h3>
            <p className="text-gray-500 text-center mt-2">
              {language === 'am' ? selectedGift.descriptionAm : selectedGift.description}
            </p>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {language === 'am' ? 'እቃዎች:' : 'Includes:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(language === 'am' ? selectedGift.itemsAm : selectedGift.items).map((item: string, idx: number) => (
                  <span key={idx} className="text-xs bg-white px-3 py-1 rounded-full text-gray-600">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="text-2xl font-bold text-primary-blue text-center mt-4">
              ${selectedGift.price}
            </p>
            
            <button
              onClick={handleContinueGift}
              className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
            >
              {t('gift.continue')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Transaction Detail Popup */}
      {showTxDetail && selectedTx && (
        <div className="popup-overlay" onClick={() => setShowTxDetail(false)}>
          <div className="popup-content p-6" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowTxDetail(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-500" />
            </button>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedTx.description || selectedTx.type}
              </h3>
              <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedTx.status)}`}>
                {selectedTx.status}
              </span>
            </div>
            
            <p className="text-3xl font-bold text-gray-800 text-center my-4">
              ${selectedTx.amount.toFixed(2)}
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">{language === 'am' ? 'ተቀባይ' : 'Recipient'}</span>
                <span className="font-medium">{selectedTx.recipientName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">{language === 'am' ? 'ቀን' : 'Date'}</span>
                <span className="font-medium">{selectedTx.date}</span>
              </div>
              {selectedTx.bankName && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-gray-500">{language === 'am' ? 'ባንክ' : 'Bank'}</span>
                  <span className="font-medium">{selectedTx.bankName}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-gray-500">ID</span>
                <span className="font-mono text-xs">BR{selectedTx.id.padStart(8, '0')}</span>
              </div>
            </div>
            
            <button
              onClick={() => {
                setShowTxDetail(false)
                router.push(`/transactions/${selectedTx.id}`)
              }}
              className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
            >
              {language === 'am' ? 'ተጠናቅቶ ይመልከቱ' : 'View Full Details'} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
