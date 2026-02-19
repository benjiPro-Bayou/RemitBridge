'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Building2,
  Wallet,
  Zap,
  Heart,
  GraduationCap,
  Stethoscope,
  Gift,
  ArrowRight,
  Download,
  Share2,
  Copy,
  CreditCard
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'

export default function TransactionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { transactions } = useApp()
  
  const transactionId = params.id as string
  const transaction = transactions.find(t => t.id === transactionId)

  if (!transaction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Transaction not found</p>
          <Link href="/transactions" className="text-primary-blue mt-2 inline-block">
            Back to Transactions
          </Link>
        </div>
      </div>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Building2 size={24} />
      case 'cash': return <Wallet size={24} />
      case 'utility': return <Zap size={24} />
      case 'medical': return <Stethoscope size={24} />
      case 'school': return <GraduationCap size={24} />
      case 'donation': return <Heart size={24} />
      case 'gift': return <Gift size={24} />
      default: return <CreditCard size={24} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'bg-green-50', text: 'text-green-600', icon: <CheckCircle size={16} /> }
      case 'pending': return { bg: 'bg-yellow-50', text: 'text-yellow-600', icon: <Clock size={16} /> }
      case 'failed': return { bg: 'bg-red-50', text: 'text-red-600', icon: <AlertCircle size={16} /> }
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', icon: <Clock size={16} /> }
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'bank': return 'Bank Transfer'
      case 'cash': return 'Cash Pickup'
      case 'utility': return 'Utility Payment'
      case 'medical': return 'Medical Payment'
      case 'school': return 'School Fee'
      case 'donation': return 'Donation'
      case 'gift': return 'Gift Package'
      default: return 'Payment'
    }
  }

  const status = getStatusColor(transaction.status)
  const exchangeRate = transaction.exchangeRate || 131.50

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Transaction Details</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        {/* Status Card */}
        <div className="card text-center py-6">
          <div className={`w-16 h-16 rounded-full ${status.bg} flex items-center justify-center mx-auto ${status.text}`}>
            {getTypeIcon(transaction.type)}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">{getTypeLabel(transaction.type)}</h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} ${status.text} mt-2`}>
            {status.icon}
            <span className="font-medium capitalize">{transaction.status}</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-4">${transaction.amount.toFixed(2)}</p>
          <p className="text-gray-500 text-sm mt-1">{transaction.date}</p>
        </div>

        {/* Transaction ID */}
        <div className="card mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="font-mono text-sm font-semibold">BR{transaction.id.padStart(8, '0')}</p>
            </div>
            <button 
              onClick={() => copyToClipboard(`BR${transaction.id.padStart(8, '0')}`)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Copy size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="card mt-4">
          <h3 className="font-semibold text-gray-800 mb-4">Transaction Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Amount Sent</span>
              <span className="font-semibold">${transaction.amount.toFixed(2)} {transaction.currency}</span>
            </div>
            
            {transaction.recipientGets && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">Recipient Gets</span>
                <span className="font-semibold text-primary-green">ETB {transaction.recipientGets.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Exchange Rate</span>
              <span className="font-semibold">1 USD = ETB {exchangeRate.toFixed(2)}</span>
            </div>

            {transaction.fee !== undefined && (
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">Fee</span>
                <span className="font-semibold">${transaction.fee.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between py-2">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-primary-blue">${(transaction.amount + (transaction.fee || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Recipient/Biller Info */}
        <div className="card mt-4">
          <h3 className="font-semibold text-gray-800 mb-4">
            {transaction.type === 'bank' || transaction.type === 'cash' ? 'Recipient' : 'Biller'}
          </h3>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                transaction.type === 'bank' ? 'bg-blue-100' : 
                transaction.type === 'cash' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {getTypeIcon(transaction.type)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{transaction.recipientName}</p>
                <p className="text-sm text-gray-500">{transaction.description}</p>
              </div>
            </div>

            {(transaction.bankName || transaction.accountNumber) && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-gray-500 mb-1">Bank Details</p>
                <p className="font-medium text-gray-800">{transaction.bankName}</p>
                {transaction.accountNumber && (
                  <p className="text-sm text-gray-600 font-mono">{transaction.accountNumber}</p>
                )}
              </div>
            )}

            {transaction.billerName && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-gray-500 mb-1">Biller</p>
                <p className="font-medium text-gray-800">{transaction.billerName}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 btn-primary flex items-center justify-center gap-2">
            <Download size={18} />
            Download Receipt
          </button>
          <button className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600 flex items-center justify-center gap-2">
            <Share2 size={18} />
            Share
          </button>
        </div>

        {/* Help */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-primary-blue font-medium">Need Help?</p>
          <p className="text-xs text-gray-600 mt-1">Contact our support team if you have any questions about this transaction.</p>
          <Link href="/settings" className="text-xs text-primary-blue font-medium mt-2 inline-block">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  )
}
