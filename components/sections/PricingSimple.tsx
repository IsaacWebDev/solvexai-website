'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'
import { Check } from 'lucide-react'

const packages = [
  {
    label: "Launch Fast",
    name: "Templates",
    tagline: "Industry-proven automation. Deployed in days.",
    price: "$53",
    priceNote: "One-time payment",
    
    // Detailed info
    description: "Pre-built automation workflows designed for your industry. Perfect for businesses that need results fast without custom development.",
    
    includes: [
      "8 proven industry templates",
      "Deploy in 24-48 hours",
      "Online ordering & booking systems",
      "Email automation",
      "CRM integration"
    ],
    
    ideal: "Restaurants, Gyms, Real Estate, Law Firms",
    timeline: "Live in 2 days",
    support: "Email support",
    
    cta: "Explore Templates",
    accent: "purple-400",
    href: "/templates"
  },
  {
    label: "Build Perfect",
    name: "Custom",
    tagline: "Tailored AI workforce. Designed for your exact needs.",
    price: "$1,997",
    priceNote: "One-time setup",
    
    // Detailed info
    description: "Fully customized automation built from scratch for your unique business processes. Unlimited workflows, priority development, white-glove service.",
    
    includes: [
      "Fully custom AI workflows",
      "Unlimited automation tasks",
      "Priority development queue",
      "Dedicated success manager",
      "90-day optimization period"
    ],
    
    ideal: "E-Commerce, SaaS, Healthcare, Finance",
    timeline: "Live in 7-10 days",
    support: "Priority support + dedicated manager",
    
    cta: "Start Discovery",
    accent: "blue-400",
    highlight: true,
    href: "/contact"
  },
  {
    label: "Always Available",
    name: "AI Receptionist",
    tagline: "24/7 customer support that never sleeps.",
    price: "$997",
    priceNote: "Per month",
    
    // Detailed info
    description: "AI-powered phone and chat support that handles 200+ customer interactions daily. Natural conversations, instant responses, perfect for high-volume support.",
    
    includes: [
      "200+ calls/chats per day",
      "Multi-language support (10+ languages)",
      "CRM & calendar integration",
      "Call transcription & analytics",
      "Custom voice & personality"
    ],
    
    ideal: "Medical offices, Law firms, Service businesses",
    timeline: "Live in 3-5 days",
    support: "24/7 monitoring + monthly optimization",
    
    cta: "See Demo",
    accent: "cyan-400",
    href: "/contact"
  }
]

export const PricingSimple = () => {
  return (
    <section className="pt-16 pb-32 px-6 relative z-10 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col items-center">
        
        {/* Header - Centered */}
        <div className="text-center mb-24 w-full">
          <h2 className="text-6xl md:text-7xl font-light mb-6">
            Choose Your Path
          </h2>
          <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
            Templates for speed. Custom for precision. AI for support.
          </p>
        </div>
        
        {/* Centered Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full" style={{ perspective: '1000px' }}>
          
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <LiquidGlassCard
                intensity="medium"
                className={`h-full flex flex-col p-10 text-center border transition-all relative ${
                  pkg.highlight 
                    ? 'border-blue-400/70 scale-105 shadow-2xl shadow-blue-500/20' 
                    : 'border-gray-500/30 hover:border-purple-400/50'
                }`}
              >
              {/* Featured badge */}
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              {/* Label */}
              <div className={`text-sm text-${pkg.accent} uppercase tracking-wider mb-4 font-semibold`}>
                {pkg.label}
              </div>
              
              {/* Name */}
              <h3 className="text-4xl md:text-5xl font-light mb-4">
                {pkg.name}
              </h3>
              
              {/* Tagline */}
              <p className="text-gray-400 font-light mb-6 leading-relaxed">
                {pkg.tagline}
              </p>
              
              {/* Price */}
              <div className="mb-2">
                <div className="text-5xl md:text-6xl font-light">
                  {pkg.price}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {pkg.priceNote}
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-b border-gray-500/20 my-8" />
              
              {/* Description */}
              <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                {pkg.description}
              </p>
              
              {/* What's Included */}
              <div className="text-left mb-6 flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">
                  What's Included
                </div>
                <ul className="space-y-3">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Ideal For */}
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Ideal For
                </div>
                <div className="text-sm text-purple-400">
                  {pkg.ideal}
                </div>
              </div>
              
              {/* Timeline + Support */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                <div>
                  <div className="text-gray-500 mb-1">Timeline</div>
                  <div className="text-white font-medium">{pkg.timeline}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Support</div>
                  <div className="text-white font-medium">{pkg.support}</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Link href={pkg.href}>
                <button className={`w-full py-4 rounded-full transition-all font-semibold ${
                  pkg.highlight
                    ? 'bg-white text-black hover:scale-105 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10'
                }`}>
                  {pkg.cta}
                </button>
              </Link>
            </LiquidGlassCard>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  )
}
