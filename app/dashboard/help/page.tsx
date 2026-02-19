'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react'
import { useLanguage } from '@/lib/context/LanguageContext'

export default function HelpPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const faqs = [
    {
      question: language === 'am' ? 'ገንዘብ ለማስተላለፍ ምን ያህል ጊዜ ይወስዳል?' : 'How long does it take to send money?',
      answer: language === 'am' 
        ? 'ባንክ ስታንስፈር 1-2 የስራ ቀናት ይወስዳል። ገንዘብ መቀበር 24 ሰዓት ውስጥ።'
        : 'Bank transfers take 1-2 business days. Cash pickup is within 24 hours.'
    },
    {
      question: language === 'am' ? 'ክፍያዎች ስንት ናቸው?' : 'What are the fees?',
      answer: language === 'am'
        ? 'ባንክ ስታንስፈር 2%፣ ገንዘብ መቀበር 2%፣ ክፍያዎች 1%።'
        : 'Bank transfers: 2%, Cash pickup: 2%, Bill payments: 1%'
    },
    {
      question: language === 'am' ? 'ስራው ተሳካ ካልሆነ ምን ማድረግ አለብኝ?' : 'What if my transfer fails?',
      answer: language === 'am'
        ? 'ተሳካላቸው ስራዎች በ5-7 የስራ ቀናት ውስጥ ይመለሳሉ። ድጋፍ ይጠይቁ።'
        : 'Failed transactions are refunded within 5-7 business days. Contact support.'
    },
    {
      question: language === 'am' ? 'ኢትዮጵያ ውስጥ ማን ሊቀበል ይችላል?' : 'Who can receive money in Ethiopia?',
      answer: language === 'am'
        ? 'ማንኛውም የኢትዮጵያ ዜጋ ባንክ መለያ ያለው ወይም ገንዘብ ለመቀበል ፈልጎ የሚያውቅ ሰው መቀበል ይችላል።'
        : 'Any Ethiopian citizen with a bank account or valid ID can receive money.'
    }
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return
    alert(language === 'am' ? 'መልዕክትዎ ተላክቷል!' : 'Message sent!')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-bg px-5 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">{t('dashboard.help')}</h1>
        </div>
      </header>

      <div className="px-5 -mt-4 pb-6">
        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button className="card flex flex-col items-center py-4">
            <MessageCircle size={24} className="text-primary-blue" />
            <span className="text-xs mt-2 text-gray-600">Chat</span>
          </button>
          <button className="card flex flex-col items-center py-4">
            <Phone size={24} className="text-primary-green" />
            <span className="text-xs mt-2 text-gray-600">{language === 'am' ? 'ይደውሉ' : 'Call'}</span>
          </button>
          <button className="card flex flex-col items-center py-4">
            <Mail size={24} className="text-purple-600" />
            <span className="text-xs mt-2 text-gray-600">Email</span>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle size={20} />
            FAQ
          </h3>
          
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
                  {expandedFaq === idx ? (
                    <ChevronUp size={18} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Form */}
        <div className="card mt-4">
          <h3 className="font-bold text-gray-800 mb-4">
            {language === 'am' ? 'መልዕክት ላክ' : 'Send us a message'}
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === 'am' ? 'መልዕክትዎን ይፃፉ...' : 'Write your message...'}
            rows={4}
            className="input-field resize-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="btn-primary w-full mt-3 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {language === 'am' ? 'ላክ' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
