'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  CreditCard,
  Building2,
  Wallet,
  Zap,
  Heart,
  GraduationCap,
  Stethoscope,
  Gift
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'

export default function NotificationsPage() {
  const router = useRouter()
  const { notifications, markNotificationRead, transactions } = useApp()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-600" />
      case 'pending': return <Clock size={20} className="text-yellow-600" />
      case 'failed': return <AlertCircle size={20} className="text-red-600" />
      default: return <Bell size={20} className="text-blue-600" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-50'
      case 'pending': return 'bg-yellow-50'
      case 'failed': return 'bg-red-50'
      default: return 'bg-blue-50'
    }
  }

  const handleNotificationClick = (notification: any) => {
    markNotificationRead(notification.id)
    if (notification.transactionId) {
      router.push(`/transactions/${notification.transactionId}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Notifications</h1>
        </div>
        <p className="text-blue-100 text-sm mt-2">{notifications.length} notifications</p>
      </header>

      <div className="px-5 -mt-4 pb-6">
        <div className="card p-0 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification, idx) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                  idx < notifications.length - 1 ? 'border-b border-border' : ''
                } ${!notification.read ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{notification.title}</p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary-blue rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                </div>
                {notification.transactionId && (
                  <ArrowRight size={18} className="text-gray-400" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
