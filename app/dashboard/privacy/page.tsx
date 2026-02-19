'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function PrivacyPage() {
  const router = useRouter()
  const { t, language } = useLanguage()

  const privacyEn = `
**Last Updated: January 2024**

1. **Information We Collect**
We collect personal information that you provide directly, including:
- Name and contact information
- Payment information
- Transaction history
- Device and usage information

2. **How We Use Your Information**
- To process your transactions
- To provide customer support
- To comply with legal obligations
- To improve our services

3. **Data Security**
We implement appropriate security measures to protect your personal information.

4. **Information Sharing**
We do not sell your personal information. We may share information with:
- Service providers who assist in our operations
- Financial institutions for transaction processing
- Legal authorities when required by law

5. **Your Rights**
- Access to your personal information
- Correction of inaccurate data
- Deletion of your data (subject to legal requirements)
- Opt-out of marketing communications

6. **Data Retention**
We retain your information as long as your account is active or as needed to provide services.

7. **Contact Us**
For privacy concerns, contact privacy@bridgeremit.com
  `

  const privacyAm = `
**መጨረሻ የተሻሻለው: ጥር 2014**

1. **መረጃ እንሰበስባለን**
በቀጥታ የሚሰጡንን የግል መረጃ እንሰበስባለን።

2. **መረጃውን እንዴት እንጠቀምበታል**
- ስራዎችን ለማስተካከል
- የደንበኛ ድጋፍ ለመስጠት
- ከሕግ ጋር ለመሳም

3. **ደህንነት**
የግል መረጃዎትን ለመጠበቅ ተገቢ የሆነ የደህንነት እርምጃዎችን እንወስዳለን።

4. **መረጃ ማካልኪያዎች**
የግል መረጃዎን አናሸራቅም። ሊከፋፈል ይችላል።

5. **መብቶችዎ**
- የግል መረጃዎትን ለማግኘት
- ትክክል ያልሆነውን ለማረም
- ውሂብዎን ለመሰረዝ
  `

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{t('dashboard.privacy')}</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <Shield size={24} className="text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{t('dashboard.privacy')}</h2>
              <p className="text-sm text-gray-500">Last Updated: January 2024</p>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">
            {language === 'am' ? privacyAm : privacyEn}
          </div>
        </div>
      </div>
    </div>
  )
}
