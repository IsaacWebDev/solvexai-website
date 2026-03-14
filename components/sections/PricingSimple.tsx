'use client'

import Link from 'next/link'
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard'

const packages = [
  {
    label: "Launch Fast",
    name: "Templates",
    description: "Industry-proven automation. Deployed in days.",
    price: "$497",
    features: ["8 proven templates", "Deploy in 24-48 hours", "Online ordering & booking"],
    cta: "Explore Templates",
    accent: "purple-400",
    href: "/templates"
  },
  {
    label: "Build Perfect",
    name: "Custom",
    description: "Tailored AI workforce. Designed for your exact needs.",
    price: "$1,997",
    features: ["Fully custom build", "Unlimited workflows", "Priority support"],
    cta: "Start Discovery",
    accent: "blue-400",
    highlight: true,
    href: "/contact"
  },
  {
    label: "Always Available",
    name: "AI Receptionist",
    description: "24/7 customer support that never sleeps.",
    price: "$997/mo",
    features: ["200+ calls/day", "Multi-language", "CRM integration"],
    cta: "See Demo",
    accent: "cyan-400",
    href: "/contact"
  }
]

export const PricingSimple = () => {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Centered */}
        <div className="text-center mb-24">
          <h2 className="text-6xl font-light mb-6">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Templates for speed. Custom for precision. AI for support.
          </p>
        </div>
        
        {/* 3 Packages - Grid with liquid glass */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {packages.map((pkg, i) => (
            <LiquidGlassCard
              key={i}
              intensity="medium"
              className={`p-10 text-center border transition-all ${
                pkg.highlight 
                  ? 'border-blue-400/70 scale-105' 
                  : 'border-gray-500/30 hover:border-purple-400/50'
              }`}
            >
              <div className={`text-sm text-${pkg.accent} uppercase tracking-wider mb-4`}>
                {pkg.label}
              </div>
              
              <h3 className="text-4xl font-light mb-4">
                {pkg.name}
              </h3>
              
              <p className="text-gray-400 font-light mb-6 leading-relaxed">
                {pkg.description}
              </p>
              
              <div className="text-5xl font-light mb-6">
                {pkg.price}
              </div>
              
              <ul className="space-y-3 mb-8 text-left">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link href={pkg.href}>
                <button className={`w-full py-4 rounded-full transition-all ${
                  pkg.highlight
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/5 hover:bg-white/10'
                }`}>
                  {pkg.cta}
                </button>
              </Link>
            </LiquidGlassCard>
          ))}
          
        </div>
      </div>
    </section>
  )
}
