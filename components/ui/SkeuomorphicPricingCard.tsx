'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SkeuomorphicPricingCardProps {
  tier: string
  price: number
  period?: string
  features: string[]
  recommended?: boolean
  ctaText?: string
  onCTAClick?: () => void
  badge?: ReactNode
}

export function SkeuomorphicPricingCard({ 
  tier, 
  price, 
  period = 'month',
  features, 
  recommended = false,
  ctaText = 'Get Started',
  onCTAClick,
  badge
}: SkeuomorphicPricingCardProps) {
  return (
    <div className="relative group perspective-1000">
      {/* Card shadow (on desk surface) */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 rounded-full blur-xl transition-all group-hover:blur-2xl group-hover:w-[95%]" />
      
      {/* Card body (thick paper/plastic) */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl overflow-hidden"
        style={{
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.8),
            0 20px 40px rgba(0,0,0,0.15),
            0 8px 16px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9)
          `,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Recommended ribbon */}
        {recommended && (
          <div className="absolute top-6 -right-12 rotate-45 bg-gradient-to-r from-purple-600 to-blue-600 px-16 py-2 text-white text-xs font-bold shadow-lg z-10">
            RECOMMENDED
          </div>
        )}
        
        {/* Custom badge (top-left corner) */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            {badge}
          </div>
        )}
        
        {/* Card content */}
        <div className="relative p-8 space-y-6">
          {/* Tier name (embossed) */}
          <h3 
            className="text-3xl font-bold text-gray-900"
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.1)' }}
          >
            {tier}
          </h3>
          
          {/* Price (raised numbers) */}
          <div className="flex items-baseline gap-2">
            <div 
              className="text-6xl font-bold bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))' }}
            >
              ${price}
            </div>
            <span className="text-gray-500 text-lg font-medium">/{period}</span>
          </div>
          
          {/* Features list */}
          <ul className="space-y-3 min-h-[200px]">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                {/* Checkmark (3D button style) */}
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
                  <svg className="w-3 h-3 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* Button (raised 3D) */}
          <motion.button
            whileTap={{ y: 2, scale: 0.98 }}
            onClick={onCTAClick}
            className="w-full py-4 px-6 bg-gradient-to-b from-purple-500 to-purple-700 rounded-xl text-white font-semibold shadow-[0_6px_0_rgb(109,40,217),0_8px_16px_rgba(139,92,246,0.4)] active:shadow-[0_2px_0_rgb(109,40,217),0_4px_8px_rgba(139,92,246,0.4)] transition-all"
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              transform: 'translateZ(20px)'
            }}
          >
            {ctaText}
          </motion.button>
        </div>
        
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
            mixBlendMode: 'multiply'
          }} 
        />
        
        {/* Edge lighting (top) */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
        
        {/* Edge shadow (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-gray-200/50 to-transparent" />
      </motion.div>
    </div>
  )
}
