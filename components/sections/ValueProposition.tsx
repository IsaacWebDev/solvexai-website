'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function ValueProposition() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          Three Ways We Transform Your Business
        </h2>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="🎨"
            title="Pre-Built Website Templates"
            headline="Launch in Days, Not Months"
            description="Professional websites designed for your industry. Restaurant menus, law firm portfolios, gym booking systems—ready to deploy with your branding."
            price="Starting at $297"
            features={[
              'Mobile responsive',
              'Contact forms',
              'SEO optimized',
              '1-week setup'
            ]}
            ctaText="Browse Templates →"
            ctaHref="/templates"
          />
          
          <ServiceCard
            icon="⚙️"
            title="Custom Development"
            headline="Built Exactly How You Want It"
            description="Complex e-commerce, custom CRMs, integrations with your existing tools. We build what templates can't."
            price="Starting at $1,997"
            features={[
              'Unlimited revisions',
              'Custom integrations',
              'Ongoing support',
              '2-4 week delivery'
            ]}
            ctaText="Start a Project →"
            ctaHref="/contact"
          />
          
          <ServiceCard
            icon="🤖"
            title="AI Receptionist"
            headline="Never Miss a Customer Again"
            description="AI answers calls, books appointments, answers FAQs in your brand's voice. Works 24/7, costs less than a part-time employee."
            price="$297/mo + $1,997 setup"
            features={[
              'Natural voice AI',
              'Calendar integration',
              'Custom personality',
              'Call analytics'
            ]}
            ctaText="Hear Demo →"
            ctaHref="/ai-receptionist"
          />
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  icon: string
  title: string
  headline: string
  description: string
  price: string
  features: string[]
  ctaText: string
  ctaHref: string
}

function ServiceCard({ icon, title, headline, description, price, features, ctaText, ctaHref }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="glass-card rounded-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Icon */}
      <div className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-2">
        {title}
      </h3>
      
      {/* Headline */}
      <h4 className="text-2xl font-bold mb-4 gradient-text">
        {headline}
      </h4>
      
      {/* Description */}
      <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
        {description}
      </p>
      
      {/* Price */}
      <div className="text-xl font-semibold text-white mb-4">
        {price}
      </div>
      
      {/* Features - Visible on hover */}
      <div 
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isHovered ? '200px' : '0',
          opacity: isHovered ? 1 : 0
        }}
      >
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      {/* CTA */}
      <Link href={ctaHref}>
        <button className="w-full py-3 rounded-lg font-semibold bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
          {ctaText}
        </button>
      </Link>
    </div>
  )
}
