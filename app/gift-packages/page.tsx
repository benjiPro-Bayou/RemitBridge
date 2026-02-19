'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Gift, 
  Heart, 
  PartyPopper, 
  Baby,
  Sparkles,
  CheckCircle,
  Clock,
  CreditCard,
  Send
} from 'lucide-react'

interface GiftPackage {
  id: string
  title: string
  description: string
  price: number
  icon: string
  items: string[]
  color: string
}

const giftPackages: GiftPackage[] = [
  {
    id: '1',
    title: 'Birthday Surprise',
    description: 'Make their birthday extra special with a delightful surprise package',
    price: 50,
    icon: '🎂',
    items: ['Custom cake', 'Fresh flowers', '$20 gift card', 'Personalized card'],
    color: 'from-pink-400 to-rose-600'
  },
  {
    id: '2',
    title: 'Holiday Joy',
    description: 'Spread holiday cheer to your loved ones in Ethiopia',
    price: 100,
    icon: '🎄',
    items: ['Holiday decorations', 'Gourmet treats', '$40 gift card', 'Festive basket'],
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: '3',
    title: 'Wedding Blessing',
    description: 'Send your blessings and joy to the happy couple',
    price: 200,
    icon: '💒',
    items: ['Gold jewelry', 'Champagne', 'Gift basket', 'Wedding card'],
    color: 'from-purple-400 to-violet-600'
  },
  {
    id: '4',
    title: 'New Baby Celebration',
    description: 'Celebrate the new arrival with a thoughtful gift package',
    price: 75,
    icon: '👶',
    items: ['Baby clothes', 'Toys', 'Baby care kit', 'Stuffed animal'],
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: '5',
    title: 'Anniversary Special',
    description: 'Celebrate their special day with a memorable gift',
    price: 150,
    icon: '💕',
    items: ['Romantic dinner', 'Flowers', 'Wine & chocolates', 'Couple massage'],
    color: 'from-red-400 to-pink-600'
  },
  {
    id: '6',
    title: 'Custom Gift',
    description: 'Create a personalized gift package for any occasion',
    price: 0,
    icon: '✨',
    items: ['Choose your items', 'Custom message', 'Flexible delivery', 'Any amount'],
    color: 'from-yellow-400 to-orange-500'
  },
]

export default function GiftPackagesPage() {
  const router = useRouter()
  const [selectedGift, setSelectedGift] = useState<GiftPackage | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const amount = selectedGift?.price || parseFloat(customAmount) || 0
  const fee = amount * 0.03 // 3% fee for gifts
  const totalAmount = amount + fee

  const handleSendGift = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="card text-center py-8 px-6 w-full max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Gift Sent Successfully!</h2>
          <p className="text-gray-500 mt-2">Your gift package is on its way to {recipientName}.</p>
          
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Gift</span>
              <span className="font-semibold">{selectedGift?.title}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Recipient</span>
              <span className="font-semibold">{recipientName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Phone</span>
              <span className="font-semibold">{recipientPhone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold text-primary-green">${amount.toFixed(2)}</span>
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
      {/* Header */}
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Gift Packages</h1>
        </div>
        <p className="text-blue-100 text-sm mt-2">Send thoughtful gifts to Ethiopia</p>
      </header>

      <div className="px-5 -mt-4">
        {/* Gift Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">Choose a gift package</p>
            <div className="grid grid-cols-1 gap-3">
              {giftPackages.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => setSelectedGift(gift)}
                  className={`card text-left p-4 transition-all hover:scale-[1.01] ${
                    selectedGift?.id === gift.id ? 'ring-2 ring-primary-blue' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gift.color} flex items-center justify-center text-3xl`}>
                      {gift.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">{gift.title}</h3>
                        <span className="text-primary-blue font-bold">${gift.price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{gift.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {gift.items.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selectedGift}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Custom Amount & Recipient */}
        {step === 2 && selectedGift && (
          <div className="space-y-4">
            {/* Selected Gift Summary */}
            <div className="card bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-2xl">
                  {selectedGift.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedGift.title}</h3>
                  <p className="text-sm text-gray-500">{selectedGift.items.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Custom Amount for Custom Gift */}
            {selectedGift.price === 0 && (
              <div className="card">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 text-xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>
            )}

            {/* Recipient Details */}
            <div className="card">
              <h3 className="font-semibold text-gray-800 mb-4">Recipient Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Full name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+251 911 123 456"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Personal Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="card bg-gray-50">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Gift Value</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">Service Fee (3%)</span>
                <span className="font-semibold">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold py-2">
                <span>Total</span>
                <span className="text-primary-blue">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600">
                Back
              </button>
              <button
                onClick={handleSendGift}
                disabled={!recipientName || !recipientPhone || amount <= 0 || isProcessing}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Clock size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Gift ${totalAmount.toFixed(2)}
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
