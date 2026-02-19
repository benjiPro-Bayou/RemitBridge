'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Building2, 
  Wallet, 
  CreditCard, 
  CheckCircle,
  Clock,
  Send,
  Search,
  User,
  ArrowRight,
  ChevronDown
} from 'lucide-react'
import { useApp } from '@/lib/context/AppContext'

type DeliveryMethod = 'bank' | 'cash'

interface Bank {
  id: string
  name: string
  code: string
  logo?: string
}

interface Recipient {
  id: string
  name: string
  phone: string
  bankAccount?: string
  bankName?: string
  bank?: Bank
  relationship?: string
}

const banks: Bank[] = [
  { id: '1', name: 'Commercial Bank of Ethiopia', code: 'CBE' },
  { id: '2', name: 'Dashen Bank', code: 'DB' },
  { id: '3', name: 'Awash Bank', code: 'AB' },
  { id: '4', name: 'Bank of Abyssinia', code: 'BOA' },
  { id: '5', name: 'United Bank', code: 'UB' },
  { id: '6', name: 'Cooperative Bank of Ethiopia', code: 'COOP' },
]

const mockRecipients: Recipient[] = [
  { id: '1', name: 'Tadesse Bekele', phone: '+251 911 123 456', bankAccount: '1000123456789', bankName: 'Commercial Bank of Ethiopia', bank: banks[0] },
  { id: '2', name: 'Almaz Hailu', phone: '+251 922 234 567', bankAccount: '1000234567890', bankName: 'Dashen Bank', bank: banks[1] },
  { id: '3', name: 'Mekonnen Tadesse', phone: '+251 933 345 678', bankAccount: '1000345678901', bankName: 'Awash Bank', bank: banks[2] },
]

function SendMoneyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { exchangeRates, addTransaction, user, recipients } = useApp()
  const isGuest = !user || user.id === 'guest'
  
  const initialType = searchParams.get('type') as DeliveryMethod | null
  const [step, setStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(initialType || 'bank')
  const [amount, setAmount] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null)
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [lookupError, setLookupError] = useState('')
  const [showBankDropdown, setShowBankDropdown] = useState(false)
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const [newRecipientName, setNewRecipientName] = useState('')
  const [newRecipientPhone, setNewRecipientPhone] = useState('')
  const [newRecipientRelationship, setNewRecipientRelationship] = useState('Family')
  
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolderName, setCardHolderName] = useState('')

  const sendAmount = parseFloat(amount) || 0
  const exchangeRate = exchangeRates.find(r => r.code === 'USD')?.rate || 131.50
  const receiveAmount = sendAmount * exchangeRate
  const fee = sendAmount * 0.02
  const totalAmount = sendAmount + fee

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const handleAccountLookup = async () => {
    if (!selectedBank || !accountNumber) return
    
    setIsLookingUp(true)
    setLookupError('')
    setAccountName('')
    
    // Simulate account lookup API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful lookup
    const mockAccountNames: Record<string, string> = {
      '1000123456789': 'Tadesse Bekele',
      '1000234567890': 'Almaz Hailu',
      '1000345678901': 'Mekonnen Tadesse',
    }
    
    const foundName = mockAccountNames[accountNumber]
    if (foundName) {
      setAccountName(foundName)
    } else {
      // For demo, accept any 10+ digit number
      if (accountNumber.length >= 10) {
        setAccountName('Demo Account Holder')
      } else {
        setLookupError('Account not found. Please check the account number.')
      }
    }
    setIsLookingUp(false)
  }

  const handleProceedToConfirmation = () => {
    if (deliveryMethod === 'bank' && (!selectedBank || !accountNumber || !accountName)) {
      return
    }
    setStep(4) // Confirmation step
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newTx = {
      id: Date.now().toString(),
      type: deliveryMethod as 'bank' | 'cash',
      amount: sendAmount,
      currency: 'USD',
      recipientName: deliveryMethod === 'bank' ? accountName : selectedRecipient?.name || 'Unknown',
      status: 'completed' as const,
      date: new Date().toISOString().split('T')[0],
      description: deliveryMethod === 'bank' ? `Bank Transfer - ${selectedBank?.name}` : 'Cash Pickup',
    }
    
    addTransaction(newTx)
    setIsProcessing(false)
    setIsComplete(true)
  }

  const handleNewTransaction = () => {
    setStep(1)
    setDeliveryMethod('bank')
    setAmount('')
    setSelectedRecipient(null)
    setSelectedBank(null)
    setAccountNumber('')
    setAccountName('')
    setIsComplete(false)
  }

  const handleAddRecipient = () => {
    if (!newRecipientName || !newRecipientPhone) return
    
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: newRecipientName,
      phone: newRecipientPhone,
      relationship: newRecipientRelationship,
    }
    
    mockRecipients.unshift(newRecipient)
    setSelectedRecipient(newRecipient)
    setShowAddRecipientModal(false)
    setNewRecipientName('')
    setNewRecipientPhone('')
    setNewRecipientRelationship('Family')
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-5">
        <div className="card text-center py-8 px-6 w-full max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Your transfer has been processed successfully.</p>
          
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-left">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-sm">BR{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Amount Sent</span>
              <span className="font-semibold">${sendAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-gray-500">Recipient Gets</span>
              <span className="font-semibold">ETB {receiveAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Delivery Method</span>
              <span className="font-semibold capitalize">{deliveryMethod}</span>
            </div>
          </div>

          <button 
            onClick={handleNewTransaction}
            className="btn-primary w-full mt-6"
          >
            Send Another
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
          <h1 className="text-white text-xl font-bold">Send Money</h1>
        </div>
        <p className="text-blue-100 text-sm mt-2">Send to Ethiopia securely</p>
      </header>

      <div className="px-5 -mt-4">
        {/* Step Indicator */}
        <div className="card py-3 mb-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Amount' },
              { num: 2, label: 'Recipient' },
              { num: 3, label: 'Confirm' },
              { num: 4, label: 'Payment' },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= s.num ? 'bg-primary-blue text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`text-xs ${step >= s.num ? 'text-gray-800' : 'text-gray-400'} hidden sm:block`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && <div className="flex-1 h-0.5 bg-gray-200 mx-1" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="card">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Delivery Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryMethod('bank')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    deliveryMethod === 'bank' 
                      ? 'border-primary-blue bg-blue-50' 
                      : 'border-border hover:border-gray-300'
                  }`}
                >
                  <Building2 size={24} className={deliveryMethod === 'bank' ? 'text-primary-blue' : 'text-gray-500'} />
                  <span className={`font-medium ${deliveryMethod === 'bank' ? 'text-primary-blue' : 'text-gray-600'}`}>
                    Bank Transfer
                  </span>
                </button>
                <button
                  onClick={() => setDeliveryMethod('cash')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    deliveryMethod === 'cash' 
                      ? 'border-primary-green bg-green-50' 
                      : 'border-border hover:border-gray-300'
                  }`}
                >
                  <Wallet size={24} className={deliveryMethod === 'cash' ? 'text-primary-green' : 'text-gray-500'} />
                  <span className={`font-medium ${deliveryMethod === 'cash' ? 'text-primary-green' : 'text-gray-600'}`}>
                    Cash Pickup
                  </span>
                </button>
              </div>
            </div>

            <div className="card">
              <label className="text-sm font-medium text-gray-700 mb-2 block">You Send</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 text-3xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              
              {sendAmount > 0 && (
                <div className="mt-4 space-y-2 bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Exchange Rate</span>
                    <span className="text-gray-800">1 USD = ETB {exchangeRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fee (2%)</span>
                    <span className="text-gray-800">${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Recipient Gets</span>
                    <span className="font-bold text-primary-green">ETB {receiveAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!amount || sendAmount <= 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Recipient / Bank Details */}
        {step === 2 && (
          <div className="space-y-4">
            {deliveryMethod === 'bank' ? (
              <>
                {/* Bank Selection */}
                <div className="card">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Select Bank</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowBankDropdown(!showBankDropdown)}
                      className="w-full p-4 rounded-xl border border-border bg-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 size={20} className="text-gray-500" />
                        <span className={selectedBank ? 'text-gray-800' : 'text-gray-400'}>
                          {selectedBank?.name || 'Choose a bank'}
                        </span>
                      </div>
                      <ChevronDown size={20} className={`text-gray-400 transition-transform ${showBankDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showBankDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {banks.map((bank) => (
                          <button
                            key={bank.id}
                            onClick={() => {
                              setSelectedBank(bank)
                              setShowBankDropdown(false)
                              setAccountNumber('')
                              setAccountName('')
                            }}
                            className={`w-full p-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                              selectedBank?.id === bank.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <Building2 size={18} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-800">{bank.name}</p>
                              <p className="text-xs text-gray-500">{bank.code}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Number & Lookup */}
                {selectedBank && (
                  <div className="card">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Account Details</label>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Account Number</label>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => {
                            setAccountNumber(e.target.value)
                            setAccountName('')
                            setLookupError('')
                          }}
                          placeholder="Enter account number"
                          className="input-field"
                        />
                      </div>
                      
                      <button
                        onClick={handleAccountLookup}
                        disabled={!accountNumber || isLookingUp}
                        className="w-full py-3 rounded-xl border-2 border-primary-blue bg-blue-50 text-primary-blue font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLookingUp ? (
                          <>
                            <Clock size={18} className="animate-spin" />
                            Looking up...
                          </>
                        ) : (
                          <>
                            <Search size={18} />
                            Verify Account
                          </>
                        )}
                      </button>

                      {lookupError && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                          <Clock size={14} /> {lookupError}
                        </p>
                      )}

                      {accountName && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-green-600">Account Verified</p>
                            <p className="font-semibold text-gray-800">{accountName}</p>
                          </div>
                          <CheckCircle size={20} className="text-green-600 ml-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleProceedToConfirmation}
                  disabled={!selectedBank || !accountNumber || !accountName}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Confirmation <ArrowRight size={18} />
                </button>
              </>
            ) : (
              // Cash Pickup - Recipient Selection
              <>
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700">
                      {isGuest ? 'Enter Recipient Details' : 'Select Recipient'}
                    </label>
                    {!isGuest && (
                      <button 
                        onClick={() => setShowAddRecipientModal(true)}
                        className="text-primary-blue text-sm font-medium"
                      >
                        + Add New
                      </button>
                    )}
                  </div>

                  {isGuest ? (
                    // Guest Mode - Enter recipient details manually
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Recipient Name</label>
                        <input
                          type="text"
                          placeholder="Full name"
                          className="input-field"
                          onChange={(e) => setSelectedRecipient({
                            id: 'guest',
                            name: e.target.value,
                            phone: ''
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+251 911 123 456"
                          className="input-field"
                          onChange={(e) => setSelectedRecipient(prev => prev ? {...prev, phone: e.target.value} : null)}
                        />
                      </div>
                      <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                        ⚠️ Sign in to save recipients for faster transfers
                      </p>
                      <Link href="/signup" className="text-sm text-primary-blue underline">
                        Create Account / Sign In
                      </Link>
                    </div>
                  ) : (
                    // Logged in - Show saved recipients
                    <div className="space-y-2">
                      {recipients.map((recipient) => (
                        <button
                          key={recipient.id}
                          onClick={() => setSelectedRecipient(recipient)}
                          className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                            selectedRecipient?.id === recipient.id
                              ? 'border-primary-green bg-green-50'
                              : 'border-border hover:border-gray-300'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                            {recipient.name.charAt(0)}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-gray-800">{recipient.name}</p>
                            <p className="text-sm text-gray-500">{recipient.phone}</p>
                          </div>
                          {selectedRecipient?.id === recipient.id && (
                            <CheckCircle size={20} className="text-primary-green" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedRecipient || !selectedRecipient.name}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </>
            )}

            <button onClick={() => setStep(1)} className="w-full py-3 rounded-xl border border-border font-medium text-gray-600">
              Back
            </button>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={20} className="text-primary-blue" />
                <h3 className="font-semibold text-gray-800">Confirm Transfer Details</h3>
              </div>

              <div className="space-y-4">
                {/* Amount Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Amount Sending</span>
                    <span className="font-bold text-xl">${sendAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500">Recipient Gets</span>
                    <span className="font-bold text-primary-green text-lg">ETB {receiveAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                    <span className="text-gray-500">Fee (2%)</span>
                    <span className="font-semibold">${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 font-bold">
                    <span>Total</span>
                    <span className="text-primary-blue">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Recipient Details */}
                {deliveryMethod === 'bank' && (
                  <div className="border border-border rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Bank Transfer To</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building2 size={20} className="text-primary-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{accountName}</p>
                        <p className="text-sm text-gray-500">{selectedBank?.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{accountNumber}</p>
                      </div>
                    </div>
                  </div>
                )}

                {deliveryMethod === 'cash' && selectedRecipient && (
                  <div className="border border-border rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Cash Pickup</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <User size={20} className="text-primary-green" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{selectedRecipient.name}</p>
                        <p className="text-sm text-gray-500">{selectedRecipient.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(5)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Proceed to Payment <ArrowRight size={18} />
            </button>

            <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl border border-border font-medium text-gray-600">
              Back
            </button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Payment Details</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <CreditCard size={16} />
                  <span>Binisource Secure</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="input-field font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '')
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4)
                        setExpiryDate(v)
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="input-field font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="input-field font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    placeholder="JOHN DOE"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="card bg-gray-50">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold">${sendAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-gray-500">Fee</span>
                <span className="font-semibold">${fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary-blue">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600">
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={!cardNumber || !expiryDate || !cvv || !cardHolderName || isProcessing}
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
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Recipient Modal */}
      {showAddRecipientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowAddRecipientModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-5 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Recipient</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  placeholder="Enter full name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={newRecipientPhone}
                  onChange={(e) => setNewRecipientPhone(e.target.value)}
                  placeholder="+251 911 123 456"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Relationship</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Family', 'Friend', 'Business'].map((rel) => (
                    <button
                      key={rel}
                      onClick={() => setNewRecipientRelationship(rel)}
                      className={`py-2 rounded-xl border-2 font-medium transition-all ${
                        newRecipientRelationship === rel
                          ? 'border-primary-blue bg-blue-50 text-primary-blue'
                          : 'border-border text-gray-600'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button 
                onClick={() => setShowAddRecipientModal(false)}
                className="flex-1 py-3 rounded-xl border border-border font-medium text-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRecipient}
                disabled={!newRecipientName || !newRecipientPhone}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Add Recipient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SendMoneyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary-blue border-t-transparent rounded-full"></div></div>}>
      <SendMoneyContent />
    </Suspense>
  )
}
