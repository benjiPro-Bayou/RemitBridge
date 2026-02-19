'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  Wallet, 
  Zap, 
  Stethoscope, 
  GraduationCap, 
  Heart,
  ArrowRight,
  Search,
  Filter,
  Bell
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'

const transactionTypes = [
  { 
    id: 'bank', 
    icon: Building2, 
    title: 'Bank Transfer', 
    description: 'Send money directly to Ethiopian bank accounts',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    path: '/send-money?type=bank'
  },
  { 
    id: 'cash', 
    icon: Wallet, 
    title: 'Cash Pickup', 
    description: 'Cash pickup at designated locations in Ethiopia',
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    path: '/send-money?type=cash'
  },
  { 
    id: 'utility', 
    icon: Zap, 
    title: 'Utility Payment', 
    description: 'Pay electricity, water, and telecom bills',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    path: '/bill-payment?type=utility'
  },
  { 
    id: 'medical', 
    icon: Stethoscope, 
    title: 'Medical Payment', 
    description: 'Pay medical bills at hospitals and clinics',
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    path: '/bill-payment?type=medical'
  },
  { 
    id: 'school', 
    icon: GraduationCap, 
    title: 'School Fee', 
    description: 'Pay school fees for universities and schools',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    path: '/bill-payment?type=school'
  },
  { 
    id: 'donation', 
    icon: Heart, 
    title: 'Donation', 
    description: 'Support charitable organizations in Ethiopia',
    color: 'from-pink-500 to-pink-700',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    path: '/bill-payment?type=donation'
  },
]

export default function TransactionsPage() {
  const router = useRouter()
  const { transactions, notifications } = useApp()
  
  const unreadCount = notifications.filter(n => !n.read).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getTypeIcon = (type: string) => {
    const typeData = transactionTypes.find(t => t.id === type)
    if (typeData) {
      const Icon = typeData.icon
      return <Icon size={18} />
    }
    return <Building2 size={18} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Transactions</h1>
            <p className="text-blue-100 text-sm mt-1">Send money, pay bills & more</p>
          </div>
          <Link href="/notifications" className="relative">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bell size={20} className="text-white" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
        
        {/* Search */}
        <div className="mt-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </header>

      <div className="px-5 -mt-4">
        {/* Transaction Type Cards */}
        <div className="grid grid-cols-2 gap-3">
          {transactionTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => router.push(type.path)}
                className="card text-left hover:scale-[1.02] transition-transform p-4"
              >
                <div className={`${type.bgColor} w-12 h-12 rounded-xl flex items-center justify-center ${type.iconColor}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-800 mt-3">{type.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{type.description}</p>
              </button>
            )
          })}
        </div>

        {/* Transaction History */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">History</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500">
              <Filter size={14} /> Filter
            </button>
          </div>

          <div className="space-y-2 pb-6">
            {transactions.map((tx) => (
              <button 
                key={tx.id} 
                onClick={() => router.push(`/transactions/${tx.id}`)}
                className="w-full card flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{tx.recipientName}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-bold text-gray-800">${tx.amount.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
