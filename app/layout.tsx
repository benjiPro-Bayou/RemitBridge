import type { Metadata, Viewport } from 'next'
import './globals.css'
import { BottomNav } from '@/components/layout/BottomNav'
import { AppProvider } from '@/lib/context/AppContext'
import { LanguageProvider } from '@/lib/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Bridge Remit - Send Money to Ethiopia',
  description: 'Secure remittance service to Ethiopia. Bank transfer, cash pickup, bill payments, and gift packages.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background min-h-screen flex justify-center">
        <AppProvider>
          <LanguageProvider>
            <div className="w-full max-w-[430px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] bg-background min-h-screen shadow-2xl md:shadow-none">
              {children}
              <BottomNav />
            </div>
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  )
}
