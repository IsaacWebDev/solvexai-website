import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { LiquidCursor, LiquidScrollProgress } from '@/components/ui'
import AIChatWidget from '@/components/AIChatWidget'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solvexai.com'),
  title: {
    default: 'SolveXAI - Automate 20+ Hours of Work Every Week with AI',
    template: '%s | SolveXAI'
  },
  description: 'Let AI handle the repetitive tasks while you focus on growth. Website templates, custom development, and AI receptionist solutions starting at $297.',
  keywords: ['AI automation', 'website development', 'AI receptionist', 'business automation', 'custom development', 'website templates'],
  authors: [{ name: 'SolveXAI' }],
  creator: 'SolveXAI',
  publisher: 'SolveXAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solvexai.com',
    title: 'SolveXAI - Automate 20+ Hours of Work Every Week with AI',
    description: 'Let AI handle the repetitive tasks while you focus on growth.',
    siteName: 'SolveXAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SolveXAI - AI Automation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveXAI - Automate 20+ Hours of Work Every Week with AI',
    description: 'Let AI handle the repetitive tasks while you focus on growth.',
    images: ['/og-image.png'],
    creator: '@solvexai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <SmoothScroll />
        <LiquidCursor />
        <LiquidScrollProgress />
        <AIChatWidget />
        <ExitIntentPopup />
        {children}
      </body>
    </html>
  )
}
