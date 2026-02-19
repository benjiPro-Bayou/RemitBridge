'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Zap, 
  Wifi, 
  Stethoscope, 
  GraduationCap, 
  Heart,
  Home,
  CheckCircle,
  Clock,
  Building2,
  CreditCard
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'

type BillType = 'utility' | 'medical' | 'school' | 'rent' | 'donation'

interface Biller {
  id: string
  name: string
  type: BillType
  icon: React.ElementType
}

const billers: Biller[] = [
  { id: '1', name: 'Ethio Telecom', type: 'utility', icon: Wifi },
  { id: '2', name: 'EEPCO Electricity', type: 'utility', icon: Zap },
  { id: '3', name: 'Addis Ababa Water', type: 'utility', icon: Home },
  { id: '4', name: 'Tikur Anbessa Hospital', type: 'medical', icon: Stethoscope },
  { id: '5', name: 'St. Paul Hospital', type: 'medical', icon: Stethoscope },
  { id: '6', name: 'Addis Ababa University', type: 'school', icon: GraduationCap },
  { id: '7', name: 'International School of Addis', type: 'school', icon: GraduationCap },
]

const donationOrgs = [
  { id: '1', name: 'Ethiopia Red Cross', category: 'donation' },
  { id: '2', name: 'Orphans Relief Fund', category: 'donation' },
  { id: '3', name: 'Education for All', category: 'donation' },
  { id: '4', name: 'Clean Water Initiative', category: 'donation' },
]

function BillPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addTransaction } = useApp()
  
  const initialType = searchParams.get('type') as BillType | null
  const [step, setStep] = useState(1)
  const [billType, setBillType] = useState<BillType>(initialType || 'utility')
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const sendAmount = parseFloat(amount) || 0
  const fee = sendAmount * 0.01
  const totalAmount = sendAmount + fee

  const filteredBillers = billers.filter(b => b.type === billType)

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newTx = {
      id: Date.now().toString(),
      type: billType,
      amount: sendAmount,
      currency: 'USD',
      recipientName: selectedBiller?.name || 'Unknown',
      status: 'completed' as const,
      date: new Date().toISOString().split('T')[0],
      description: `${billType} Payment`,
    }
    
    addTransaction(newTx)
    setIsProcessing(false)
    setIsComplete(true)
  }

  const getBillTypeIcon = (type: BillType) => {
    switch (type) {
      case 'utility': return Zap
      case 'medical': return Stethoscope
      case 'school': return GraduationCap
      case 'rent': return Home
      case 'donation': return Heart
      default: return Building2
    }
  }

  const getBillTypeLabel = (type: BillType) => {
    switch (type) {
      case 'utility': return 'Utility Bills'
      case 'medical': return 'Medical Bills'
      case 'school': return 'School Fees'
      case 'rent': return 'Rent Payment'
      case 'donation': return 'Donations'
      default: return 'Bills'
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="card text-center py-8 px-6 w-full max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Your bill payment has been processed.</p>
          
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-sm">BR{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Biller</span>
              <span className="font-semibold">{selectedBiller?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Account</span>
              <span className="font-semibold">{accountNumber}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-primary-green">${sendAmount.toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={() => router.push('/transactions')}
            className="btn-primary w-full mt-6"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white" title="Go back">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Pay Bills</h1>
        </div>
        <p className="text-blue-100 text-sm mt-2">Pay utilities, medical, school fees & more</p>
      </header>

      <div className="px-5 -mt-4">
        {step === 1 && (
          <div className="space-y-4">
            <div className="card">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Select Bill Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'utility', icon: Zap, label: 'Utilities' },
                  { type: 'medical', icon: Stethoscope, label: 'Medical' },
                  { type: 'school', icon: GraduationCap, label: 'School Fee' },
                  { type: 'donation', icon: Heart, label: 'Donation' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.type}
                      onClick={() => setBillType(item.type as BillType)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                        billType === item.type 
                          ? 'border-primary-blue bg-blue-50' 
                          : 'border-border hover:border-gray-300'
                      }`}
                    >
                      <Icon size={24} className={billType === item.type ? 'text-primary-blue' : 'text-gray-500'} />
                      <span className={`font-medium ${billType === item.type ? 'text-primary-blue' : 'text-gray-600'}`}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="card">
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Select {getBillTypeLabel(billType)}
              </label>
              <div className="space-y-2">
                {(billType === 'donation' ? donationOrgs : filteredBillers).map((biller: any) => (
                  <button
                    key={biller.id}
                    onClick={() => {
                      setSelectedBiller({
                        id: biller.id,
                        name: biller.name,
                        type: billType,
                        icon: getBillTypeIcon(billType)
                      })
                    }}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                      selectedBiller?.id === biller.id
                        ? 'border-primary-blue bg-blue-50'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      {React.createElement(getBillTypeIcon(billType), { size: 20, className: 'text-gray-600' })}
                    </div>
                    <span className="font-medium text-gray-800">{biller.name}</span>
                    {selectedBiller?.id === biller.id && (
                      <CheckCircle size={20} className="text-primary-blue ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedBiller}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-blue/10 to-primary-green/10 rounded-xl mb-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                  {selectedBiller && React.createElement(getBillTypeIcon(billType), { size: 24, className: 'text-white' })}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{selectedBiller?.name}</p>
                  <p className="text-xs text-gray-500">{getBillTypeLabel(billType)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Account/ID Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="input-field"
                  />
                </div>
                
                {/* Amount Section - More Attractive */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Amount to Pay</label>
                  <div className="relative">
                    <div className="absolute left-0 top-0 w-full h-24 bg-gradient-to-br from-primary-blue/5 to-primary-green/5 rounded-2xl -z-10"></div>
                    <div className="flex items-center justify-center py-6">
                      <span className="text-4xl font-bold text-gray-300">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        className="w-32 text-center text-5xl font-bold border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Amounts - More Attractive */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Quick Amounts</label>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 100, 200].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${
                      amount === quickAmount.toString()
                        ? 'border-primary-blue bg-primary-blue text-white shadow-lg shadow-primary-blue/30'
                        : 'border-gray-200 text-gray-600 hover:border-primary-blue hover:bg-primary-blue/5'
                    }`}
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600">🎁</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Custom Amount</p>
                  <p className="text-xs text-gray-500">Enter any amount</p>
                </div>
              </div>
            </div>

            {sendAmount > 0 && (
              <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-gray-800">${sendAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Fee (1%)</span>
                  <span className="font-semibold text-gray-800">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t border-green-200 mt-2">
                  <span className="text-gray-800">Total to Pay</span>
                  <span className="text-primary-blue text-xl">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600">
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={!accountNumber || !amount || sendAmount <= 0 || isProcessing}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Clock size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BillPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full"></div></div>}>
      <BillPaymentContent />
    </Suspense>
  )
}
