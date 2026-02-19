'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText } from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function TermsPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const termsEn = `
**Last Updated: January 2024**

1. **Acceptance of Terms**
By accessing and using Bridge Remit, you accept and agree to be bound by the terms and provision of this agreement.

2. **Description of Service**
Bridge Remit provides money transfer services to Ethiopia, including bank transfers, cash pickups, bill payments, and gift packages.

3. **User Responsibilities**
- You must provide accurate and complete information
- You are responsible for maintaining the confidentiality of your account
- You agree to use the service for lawful purposes only

4. **Transfer Limits**
- Minimum transfer: $10 USD
- Maximum transfer: $10,000 USD per transaction
- Daily limit: $25,000 USD

5. **Fees and Charges**
- Bank Transfer: 2% fee
- Cash Pickup: 2% fee
- Bill Payment: 1% fee
- Gift Packages: 3% fee

6. **Delivery Times**
- Bank Transfers: 1-2 business days
- Cash Pickup: Within 24 hours
- Bill Payments: Instant to 24 hours

7. **Refund Policy**
Refunds are processed within 5-7 business days for failed transactions.

8. **Contact Information**
For questions about these terms, contact support@bridgeremit.com
  `

  const termsAm = `
**መጨረሻ የተሻሻለው: ጥር 2014**

1. **የቃሎች ተቀባይነት**
በቤርጅ ሪሚት በመድረስ እና በመጠቀም በእነዚህ ውሎች እና ሁኔታዎች መስማማትዎን ትቀበላሉ።

2. **የአገልግሎት ገለፃ**
ቤርጅ ሪሚት ወደ ኢትዮጵያ ገንዘብ ማስተላለፍ አገልግሎትን ይሰጣል።

3. **የተጠቃሚ ኃላፊነቶች**
- ትክክለኛ እና ሙሉ መረጃ መስጠት አለብዎት
- የመለያዎት ጽሁፍ ማስቀመጥ ኃላፊነት አለብዎት

4. **የማስተላለፍ ገደቦች**
- አነስተኛ: $10 USD
- ከፍተኛ: $10,000 USD በአንድ ስራ

5. **ክፍያዎች**
- ባንክ ስታንስፈር: 2%
- ገንዘብ መቀበር: 2%
- ክፍያዎች: 1%

6. **የማድረሻ ጊዜያት**
- ባንክ ስታንስፈር: 1-2 የስራ ቀናት
- ገንዘብ መቀበር: 24 ሰዓት ውስጥ

7. **የመመለስ ፖሊሲ**
የተሳካላቸው ስራዎች በ5-7 የስራ ቀናት ውስጥ ይመለሳሉ።
  `

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{t('dashboard.terms')}</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText size={24} className="text-primary-blue" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{t('dashboard.terms')}</h2>
              <p className="text-sm text-gray-500">Last Updated: January 2024</p>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">
            {language === 'am' ? termsAm : termsEn}
          </div>
        </div>
      </div>
    </div>
  )
}
