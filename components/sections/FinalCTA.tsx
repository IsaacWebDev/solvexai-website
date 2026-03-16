'use client'

import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Ready to Automate Your Business?
        </h2>
        
        {/* Split CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <CTAButton
            text="I want a template"
            subtitle="Fast & affordable"
            href="/templates"
          />
          <CTAButton
            text="I need custom work"
            subtitle="Built exactly for you"
            href="/contact"
            highlighted
          />
          <CTAButton
            text="Show me AI demo"
            subtitle="24/7 receptionist"
            href="/ai-receptionist"
          />
        </div>
        
        {/* Footer Trust Signals */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
          <TrustSignal text="No hidden fees" />
          <TrustSignal text="30-day support" />
          <TrustSignal text="Money-back guarantee" />
        </div>
      </div>
    </section>
  )
}

interface CTAButtonProps {
  text: string
  subtitle: string
  href: string
  highlighted?: boolean
}

function CTAButton({ text, subtitle, href, highlighted }: CTAButtonProps) {
  return (
    <Link href={href}>
      <div 
        className={`glass-card rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
          highlighted ? 'ring-2 ring-purple-500 shadow-xl shadow-purple-500/30' : ''
        }`}
      >
        <div className="text-xl font-bold mb-2">{text}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>
    </Link>
  )
}

function TrustSignal({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-green-400" />
      <span>{text}</span>
    </div>
  )
}
