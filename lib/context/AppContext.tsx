'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  language: string
}

interface Transaction {
  id: string
  type: 'bank' | 'cash' | 'utility' | 'medical' | 'school' | 'gift' | 'donation' | 'rent'
  amount: number
  currency: string
  recipientName: string
  status: 'pending' | 'completed' | 'failed'
  date: string
  description?: string
  bankName?: string
  accountNumber?: string
  billerName?: string
  billType?: string
  exchangeRate?: number
  fee?: number
  recipientGets?: number
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'pending' | 'failed' | 'info'
  date: string
  transactionId?: string
  read: boolean
}

interface Recipient {
  id: string
  name: string
  phone: string
  bankAccount?: string
  bankName?: string
  relationship?: string
}

interface BankExchangeRate {
  bankId: string
  bankName: string
  usdRate: number
  eurRate: number
  gbpRate: number
  aedRate: number
}

export interface GiftPackage {
  id: string
  title: string
  titleAm: string
  description: string
  descriptionAm: string
  price: number
  icon: string
  items: string[]
  itemsAm: string[]
  color: string
  active: boolean
}

interface ExchangeRate {
  currency: string
  code: string
  rate: number
  change: number
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  loginAsGuest: () => void
  isGuest: boolean
  transactions: Transaction[]
  addTransaction: (tx: Transaction) => void
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  recipients: Recipient[]
  addRecipient: (recipient: Recipient) => void
  exchangeRates: ExchangeRate[]
  bankExchangeRates: BankExchangeRate[]
  giftPackages: GiftPackage[]
  updateGiftPackage: (pkg: GiftPackage) => void
  currentPage: string
  setCurrentPage: (page: string) => void
}

const defaultRates: ExchangeRate[] = [
  { currency: 'US Dollar', code: 'USD', rate: 131.50, change: 0.15 },
  { currency: 'Euro', code: 'EUR', rate: 142.80, change: -0.22 },
  { currency: 'British Pound', code: 'GBP', rate: 167.25, change: 0.45 },
  { currency: 'UAE Dirham', code: 'AED', rate: 35.80, change: 0.08 },
]

const bankRates: BankExchangeRate[] = [
  { bankId: '1', bankName: 'Commercial Bank of Ethiopia', usdRate: 132.50, eurRate: 143.80, gbpRate: 168.25, aedRate: 36.10 },
  { bankId: '2', bankName: 'Dashen Bank', usdRate: 131.80, eurRate: 143.20, gbpRate: 167.50, aedRate: 35.90 },
  { bankId: '3', bankName: 'Awash Bank', usdRate: 131.50, eurRate: 142.80, gbpRate: 167.25, aedRate: 35.80 },
  { bankId: '4', bankName: 'Bank of Abyssinia', usdRate: 132.00, eurRate: 143.50, gbpRate: 167.80, aedRate: 36.00 },
  { bankId: '5', bankName: 'United Bank', usdRate: 131.20, eurRate: 142.50, gbpRate: 166.90, aedRate: 35.70 },
  { bankId: '6', bankName: 'Cooperative Bank', usdRate: 131.90, eurRate: 143.10, gbpRate: 167.40, aedRate: 35.85 },
]

const defaultGiftPackages: GiftPackage[] = [
  {
    id: '1',
    title: 'Birthday Surprise',
    titleAm: 'የልደት ስጦታ',
    description: 'Custom cake, fresh flowers, $20 gift card, personalized card',
    descriptionAm: 'በብጁ ኬክ፣ የአበባ እርሻ፣ $20 ስጦታ ካርድ፣ የብጁ ካርድ',
    price: 50,
    icon: '🎂',
    items: ['Custom cake', 'Fresh flowers', '$20 gift card', 'Personalized card'],
    itemsAm: ['በብጁ ኬክ', 'የአበባ እርሻ', '$20 ስጦታ ካርድ', 'የብጁ ካርድ'],
    color: 'from-pink-400 to-rose-600',
    active: true
  },
  {
    id: '2',
    title: 'Holiday Joy',
    titleAm: 'የበጋ ደስታ',
    description: 'Holiday decorations, gourmet treats, $40 gift card, festive basket',
    descriptionAm: 'የበጋ ማስጌጫዎች፣ ጣፋጭ ምግቦች፣ $40 ስጦታ ካርድ፣ በጋ ቅርጫት',
    price: 100,
    icon: '🎄',
    items: ['Holiday decorations', 'Gourmet treats', '$40 gift card', 'Festive basket'],
    itemsAm: ['የበጋ ማስጌጫ', 'ጣፋጭ ምግብ', '$40 ስጦታ ካርድ', 'በጋ ቅርጫት'],
    color: 'from-green-400 to-emerald-600',
    active: true
  },
  {
    id: '3',
    title: 'Wedding Blessing',
    titleAm: 'የጋብቻ ቡራኬ',
    description: 'Gold jewelry, champagne, gift basket, wedding card',
    descriptionAm: 'ወርቅ ጌጥ፣ ሻምፓን፣ ስጦታ ቅርጫት፣ የጋብቻ ካርድ',
    price: 200,
    icon: '💒',
    items: ['Gold jewelry', 'Champagne', 'Gift basket', 'Wedding card'],
    itemsAm: ['ወርቅ ጌጥ', 'ሻምፓን', 'ስጦታ ቅርጫት', 'የጋብቻ ካርድ'],
    color: 'from-purple-400 to-violet-600',
    active: true
  },
  {
    id: '4',
    title: 'New Baby Celebration',
    titleAm: 'የአዲስ ሕፃን በዓል',
    description: 'Baby clothes, toys, baby care kit, stuffed animal',
    descriptionAm: 'የሕፃን ልብስ፣ መጫወቻዎች፣ የሕፃን እንክብካቤ ኪት፣ የፍጡን እንስሳ',
    price: 75,
    icon: '👶',
    items: ['Baby clothes', 'Toys', 'Baby care kit', 'Stuffed animal'],
    itemsAm: ['ሕፃን ልብስ', 'መጫወቻ', 'ሕፃን እንክብካቤ', 'ፍጡን እንስሳ'],
    color: 'from-blue-400 to-cyan-600',
    active: true
  },
  {
    id: '5',
    title: 'Anniversary Special',
    titleAm: 'የዓመት በዓል ተለይቶ',
    description: 'Romantic dinner, flowers, wine & chocolates, couple massage',
    descriptionAm: 'ሮማንቲክ ምሽት፣ አበባዎች፣ ወይንና ቸኮላት፣ ባልደረባ ማሳጅ',
    price: 150,
    icon: '💕',
    items: ['Romantic dinner', 'Flowers', 'Wine & chocolates', 'Couple massage'],
    itemsAm: ['ሮማንቲክ ምሽት', 'አበባዎች', 'ወይንና ቸኮላት', 'ባልደረባ ማሳጅ'],
    color: 'from-red-400 to-pink-600',
    active: true
  },
  {
    id: '6',
    title: 'Custom Gift',
    titleAm: 'ብጁ ስጦታ',
    description: 'Create a personalized gift package for any occasion',
    descriptionAm: 'ለማንኛውም አጋጣሚ ብጁ የስጦታ ፓኬጅ ፍጠር',
    price: 0,
    icon: '✨',
    items: ['Choose your items', 'Custom message', 'Flexible delivery', 'Any amount'],
    itemsAm: ['እቃዎችን ምረጥ', 'ብጁ መልዕክት', 'ተለዋዋጭ ማድረሻ', 'ማንኛውም መጠን'],
    color: 'from-yellow-400 to-orange-500',
    active: true
  },
]

const defaultTransactions: Transaction[] = [
  { id: '1', type: 'bank', amount: 500, currency: 'USD', recipientName: 'Tadesse Bekele', status: 'completed', date: '2024-01-15', description: 'Bank Transfer', bankName: 'Commercial Bank of Ethiopia', accountNumber: '1000123456789', exchangeRate: 131.50, fee: 10, recipientGets: 65750 },
  { id: '2', type: 'utility', amount: 150, currency: 'USD', recipientName: 'Ethio Telecom', status: 'completed', date: '2024-01-14', description: 'Airtime Top-up', billerName: 'Ethio Telecom', exchangeRate: 131.50, fee: 1.50, recipientGets: 150 },
  { id: '3', type: 'cash', amount: 200, currency: 'USD', recipientName: 'Almaz Hailu', status: 'pending', date: '2024-01-13', description: 'Cash Pickup', exchangeRate: 131.50, fee: 4, recipientGets: 26200 },
  { id: '4', type: 'gift', amount: 100, currency: 'USD', recipientName: 'Mekonnen Family', status: 'completed', date: '2024-01-10', description: 'Birthday Surprise', exchangeRate: 131.50, fee: 3, recipientGets: 100 },
  { id: '5', type: 'donation', amount: 50, currency: 'USD', recipientName: 'Ethiopia Red Cross', status: 'completed', date: '2024-01-08', description: 'Donation', billerName: 'Ethiopia Red Cross', exchangeRate: 131.50, fee: 0.50, recipientGets: 50 },
]

const defaultNotifications: Notification[] = [
  { id: '1', title: 'Transfer Successful', message: 'Your transfer of $500 to Tadesse Bekele has been completed.', type: 'success', date: '2024-01-15 14:30', transactionId: '1', read: false },
  { id: '2', title: 'Payment Completed', message: 'Your bill payment of $150 to Ethio Telecom was successful.', type: 'success', date: '2024-01-14 10:15', transactionId: '2', read: false },
  { id: '3', title: 'Pending Transfer', message: 'Your cash pickup of $200 to Almaz Hailu is being processed.', type: 'pending', date: '2024-01-13 09:00', transactionId: '3', read: true },
  { id: '4', title: 'Gift Delivered', message: 'Your birthday gift package has been delivered.', type: 'success', date: '2024-01-12 16:45', transactionId: '4', read: true },
]

const defaultRecipients: Recipient[] = [
  { id: '1', name: 'Tadesse Bekele', phone: '+251 911 123 456', bankAccount: '1000123456789', bankName: 'Commercial Bank of Ethiopia', relationship: 'Family' },
  { id: '2', name: 'Almaz Hailu', phone: '+251 922 234 567', bankAccount: '1000234567890', bankName: 'Dashen Bank', relationship: 'Friend' },
  { id: '3', name: 'Mekonnen Tadesse', phone: '+251 933 345 678', bankAccount: '1000345678901', bankName: 'Awash Bank', relationship: 'Family' },
  { id: '4', name: 'Sofia Ahmed', phone: '+251 944 456 789', relationship: 'Friend' },
]

const defaultUser: User | null = null // Start as guest (not logged in)

const guestUser: User = {
  id: 'guest',
  name: 'Guest User',
  email: '',
  phone: '',
  language: 'en',
  avatar: undefined,
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser)
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions)
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)
  const [recipients, setRecipients] = useState<Recipient[]>(defaultRecipients)
  const [exchangeRates] = useState<ExchangeRate[]>(defaultRates)
  const [bankExchangeRates] = useState<BankExchangeRate[]>(bankRates)
  const [giftPackages, setGiftPackages] = useState<GiftPackage[]>(defaultGiftPackages)
  const [currentPage, setCurrentPage] = useState('home')

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev])
    
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: tx.status === 'completed' ? 'Transfer Successful' : 'Transfer Pending',
      message: tx.status === 'completed' 
        ? `Your transfer of $${tx.amount} to ${tx.recipientName} has been completed.`
        : `Your transfer of $${tx.amount} to ${tx.recipientName} is being processed.`,
      type: tx.status === 'completed' ? 'success' : 'pending',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      transactionId: tx.id,
      read: false,
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const addRecipient = (recipient: Recipient) => {
    setRecipients(prev => [...prev, { ...recipient, id: Date.now().toString() }])
  }

  const updateGiftPackage = (pkg: GiftPackage) => {
    setGiftPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p))
  }

  const loginAsGuest = () => {
    setUser(guestUser)
  }

  const isGuest = user?.id === 'guest' || user === null

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      loginAsGuest,
      isGuest,
      transactions,
      addTransaction,
      notifications,
      markNotificationRead,
      recipients: isGuest ? [] : recipients,
      addRecipient,
      exchangeRates,
      bankExchangeRates,
      giftPackages,
      updateGiftPackage,
      currentPage,
      setCurrentPage,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
