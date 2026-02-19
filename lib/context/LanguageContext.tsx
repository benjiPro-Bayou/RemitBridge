'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'am'

interface Translations {
  [key: string]: {
    en: string
    am: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', am: 'ቤት' },
  'nav.transactions': { en: 'Transactions', am: 'ተላላኪዎች' },
  'nav.settings': { en: 'Settings', am: 'ማስተካከያዎች' },
  
  // Sign In / Sign Up
  'signin.title': { en: 'Sign In', am: 'ግባ' },
  'signin.subtitle': { en: 'Welcome back! Please sign in to continue', am: 'እንኳዕ ደንበኛ! ግባ እንደምን ቀጥል' },
  'signin.email': { en: 'Email', am: 'ኢሜይል' },
  'signin.password': { en: 'Password', am: 'የይለፍ ቃል' },
  'signin.forgot': { en: 'Forgot Password?', am: 'የይለፍ ቃል ረሱ?' },
  'signin.noAccount': { en: "Don't have an account?", am: 'አስቀድመህ መለያ የለህም?' },
  'signin.or': { en: 'or', am: 'ወይም' },
  
  // Home Page
  'home.welcome': { en: 'Welcome back,', am: 'እንኳዕ ደንበኛ,' },
  'home.sendMoney': { en: 'Send Money', am: '��ንዘብ ላክ' },
  'home.billPay': { en: 'Bill Pay', am: 'ክፍያዎች' },
  'home.gifts': { en: 'Gifts', am: 'ስጦታዎች' },
  'home.exchangeRates': { en: 'Exchange Rates', am: 'የገንዘብ ለውጥ ተመን' },
  'home.giftPackages': { en: 'Gift Packages', am: 'የስጦታ ፓኬጆች' },
  'home.recentTransactions': { en: 'Recent Transactions', am: 'ቅርብ ተላላኪዎች' },
  'home.viewAll': { en: 'View All', am: 'ሁሉንም ይመልከቱ' },
  'home.seeAll': { en: 'See All', am: 'ሁሉንም ይመልከቱ' },
  
  // Send Money
  'send.title': { en: 'Send Money', am: 'ገንዘብ ላክ' },
  'send.toEthiopia': { en: 'Send to Ethiopia securely', am: 'ወደ ኢትዮጵያ በደህና ላክ' },
  'send.deliveryMethod': { en: 'Delivery Method', am: 'የማድረሻ መንገድ' },
  'send.bankTransfer': { en: 'Bank Transfer', am: 'ባንክ ስታንስፈር' },
  'send.cashPickup': { en: 'Cash Pickup', am: 'ገንዘብ መቀበር' },
  'send.youSend': { en: 'You Send', am: '��ጠቃለህ' },
  'send.continue': { en: 'Continue', am: 'ቀጥል' },
  'send.selectBank': { en: 'Select Bank', am: 'ባንክ ምረጥ' },
  'send.accountNumber': { en: 'Account Number', am: 'መለያ ቁጥር' },
  'send.verifyAccount': { en: 'Verify Account', am: 'መለያ ማረጋገጥ' },
  'send.confirm': { en: 'Confirm Transfer Details', am: 'ስራውን አረጋግጥ' },
  'send.proceedPayment': { en: 'Proceed to Payment', am: 'ወደ ክፍያ ቀጥል' },
  
  // Transactions
  'tx.title': { en: 'Transactions', am: 'ተላላኪዎች' },
  'tx.history': { en: 'History', am: 'ታሪክ' },
  'tx.search': { en: 'Search transactions...', am: 'ተላላኪዎችን ፈልግ...' },
  'tx.filter': { en: 'Filter', am: 'አጣራ' },
  
  // Settings
  'settings.title': { en: 'Settings', am: 'ማስተካከያዎች' },
  'settings.editProfile': { en: 'Edit Profile', am: 'ፕሮፋይል አርትዕ' },
  'settings.changePassword': { en: 'Change Password', am: 'የይለፍ ቃል ቀይር' },
  'settings.notifications': { en: 'Notifications', am: 'ማሳወቂያዎች' },
  'settings.language': { en: 'Language', am: 'ቋንቋ' },
  'settings.terms': { en: 'Terms & Conditions', am: 'ውሎችና ሁኔታዎች' },
  'settings.privacy': { en: 'Privacy Policy', am: 'ግላዊነት ፖሊሲ' },
  'settings.help': { en: 'Help & Support', am: 'እርዳታና ድጋፍ' },
  'settings.logout': { en: 'Log Out', am: 'ውጣ' },
  
  // Gift Packages
  'gift.title': { en: 'Gift Packages', am: 'የስጦታ ፓኬጆች' },
  'gift.sendToEthiopia': { en: 'Send thoughtful gifts to Ethiopia', am: 'ለኢትዮጵያ ጥሩ ስጦታዎችን ላክ' },
  'gift.choosePackage': { en: 'Choose a gift package', am: 'የስጦታ ፓኬጅ ምረጥ' },
  'gift.continue': { en: 'Continue', am: 'ቀጥል' },
  
  // Bill Payment
  'bill.title': { en: 'Pay Bills', am: 'ክፍያዎች' },
  'bill.payUtilities': { en: 'Pay utilities, medical, school fees & more', am: 'አገልግሎቶችን፣ ሕክምና፣ ትምህርት ክፍያዎችን...' },
  'bill.selectType': { en: 'Select Bill Type', am: 'የክፍያ አይነት ምረጥ' },
  
  // Notifications
  'notif.title': { en: 'Notifications', am: 'ማሳወቂያዎች' },
  'notif.transferSuccess': { en: 'Transfer Successful', am: 'ስራው ተሳክቷል' },
  'notif.paymentComplete': { en: 'Payment Completed', am: 'ክፍያው ተጠናቅቷል' },
  
  // Signup
  'signup.title': { en: 'Create Account', am: 'መለያ ፍጠር' },
  'signup.subtitle': { en: 'Start sending money to Ethiopia today', am: 'ዛም ወደ ኢትዮጵያ ገንዘብ ለማምጣት ጀምር' },
  'signup.fullName': { en: 'Full Name', am: 'ሙሉ ስም' },
  'signup.email': { en: 'Email Address', am: 'ኢሜይል አድራሻ' },
  'signup.phone': { en: 'Phone Number', am: 'ስልክ ቁጥር' },
  'signup.password': { en: 'Password', am: 'የይለፍ ቃል' },
  'signup.confirmPassword': { en: 'Confirm Password', am: 'የይለፍ ቃል አረጋግጥ' },
  'signup.createAccount': { en: 'Create Account', am: 'መለያ ፍጠር' },
  'signup.alreadyHave': { en: 'Already have an account?', am: 'አስቀድሞ መለያ አለህ?' },
  'signup.signIn': { en: 'Sign In', am: 'ግባ' },
  
  // Dashboard
  'dashboard.title': { en: 'Dashboard', am: 'ዳሽቦርድ' },
  'dashboard.packages': { en: 'Gift Packages', am: 'የስጦታ ፓኬጆች' },
  'dashboard.terms': { en: 'Terms & Conditions', am: 'ውሎችና ሁኔታዎች' },
  'dashboard.privacy': { en: 'Privacy Policy', am: 'ግላዊነት ፖሊሲ' },
  'dashboard.help': { en: 'Help & Support', am: 'እርዳታና ድጋፍ' },
  'dashboard.exchangeRates': { en: 'Bank Exchange Rates', am: 'የባንክ የገንዘብ ለውጥ' },
  'dashboard.addPackage': { en: 'Add Package', am: 'ፓኬጅ ጨምር' },
  'dashboard.editPackage': { en: 'Edit Package', am: 'ፓኬጅ አርትዕ' },
  'dashboard.deletePackage': { en: 'Delete Package', am: 'ፓኬጅ ሰርዝ' },
  
  // Common
  'common.back': { en: 'Back', am: 'ተመለስ' },
  'common.next': { en: 'Next', am: 'ቀጥል' },
  'common.cancel': { en: 'Cancel', am: 'ተወው' },
  'common.save': { en: 'Save', am: 'አስቀምጥ' },
  'common.add': { en: 'Add', am: 'ጨምር' },
  'common.edit': { en: 'Edit', am: 'አርትዕ' },
  'common.delete': { en: 'Delete', am: 'ሰርዝ' },
  'common.loading': { en: 'Loading...', am: 'በመጫን ላይ...' },
  'common.success': { en: 'Success', am: 'ተሳክቷል' },
  'common.error': { en: 'Error', am: 'ስህተት' },
  'common.amount': { en: 'Amount', am: 'መጠን' },
  'common.fee': { en: 'Fee', am: 'ክፍያ' },
  'common.total': { en: 'Total', am: 'ጠቅላላ' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
