'use client'

import React from 'react'
import Link from 'next/link'

export function PricingClarity() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          Transparent Pricing. No Hidden Fees.
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16">
          Choose the plan that fits your needs
        </p>
        
        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Templates"
            price="$297-$997"
            delivery="1 week delivery"
            features={[
              'Industry-specific design',
              'Mobile responsive',
              'Contact forms & SEO',
              '30-day support',
              'Free stock photos',
              'SSL certificate'
            ]}
            ctaText="Browse Templates"
            ctaHref="/templates"
          />
          
          <PricingCard
            title="Custom"
            price="$1,997-$7,997"
            delivery="2-4 weeks delivery"
            features={[
              'Unlimited page count',
              'Custom features',
              'API integrations',
              '3 months support',
              'Unlimited revisions',
              'Admin dashboard'
            ]}
            ctaText="Start Project"
            ctaHref="/contact"
            highlighted
          />
          
          <PricingCard
            title="AI Receptionist"
            price="$1,997 + $297/mo"
            delivery="2 weeks setup"
            features={[
              'Natural voice AI',
              'Calendar integration',
              'Custom personality',
              'Unlimited calls',
              'Call analytics',
              'Priority support'
            ]}
            ctaText="Book Demo"
            ctaHref="/ai-receptionist"
          />
        </div>
        
        {/* Compare Plans CTA */}
        <div className="text-center mt-12">
          <Link href="/packages">
            <button className="text-gray-400 hover:text-white transition-colors">
              Compare All Plans in Detail →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  title: string
  price: string
  delivery: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
}

function PricingCard({ title, price, delivery, features, ctaText, ctaHref, highlighted }: PricingCardProps) {
  return (
    <div 
      className={`glass-card rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 ${
        highlighted ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/30' : ''
      }`}
    >
      {highlighted && (
        <div className="text-xs uppercase tracking-wide text-purple-400 font-semibold mb-4 text-center">
          Most Popular
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      
      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold gradient-text mb-2">{price}</div>
        <div className="text-sm text-gray-400">{delivery}</div>
      </div>
      
      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* CTA */}
      <Link href={ctaHref}>
        <button 
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            highlighted
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/50'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
          }`}
        >
          {ctaText}
        </button>
      </Link>
    </div>
  )
}
