'use client'
import { ReactNode } from 'react'
import { Check, Lock, Zap, Star } from 'lucide-react'

interface SkeuomorphicBadgeProps {
  icon: ReactNode
  title: string
  subtitle?: string
}

export function SkeuomorphicBadge({ icon, title, subtitle }: SkeuomorphicBadgeProps) {
  return (
    <div className="group relative w-32 h-32">
      {/* Outer rim (metal bezel) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_8px_16px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)]" />
      
      {/* Inner face (embossed surface) */}
      <div className="relative m-2 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.3)]">
        <div className="flex flex-col items-center justify-center h-full p-4">
          {/* Icon with emboss effect */}
          <div 
            className="text-3xl mb-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]" 
            style={{ filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.5))' }}
          >
            {icon}
          </div>
          
          {/* Text engraved */}
          <div 
            className="text-[10px] font-bold text-amber-900 uppercase tracking-wider text-center leading-tight"
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.2)' }}
          >
            {title}
          </div>
          
          {subtitle && (
            <div 
              className="text-[8px] font-semibold text-amber-800 uppercase text-center mt-1"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.2)' }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      
      {/* Shine/glare overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Rotating shine effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.4) 45deg, transparent 90deg, transparent 360deg)',
        }}
      />
    </div>
  )
}

// Preset trust badges
export function TrustBadgeSet() {
  return (
    <div className="flex flex-wrap gap-6 justify-center items-center">
      <SkeuomorphicBadge
        icon={<Check className="w-8 h-8 text-green-600" />}
        title="30-Day Guarantee"
        subtitle="Money Back"
      />
      <SkeuomorphicBadge
        icon={<Lock className="w-8 h-8 text-blue-600" />}
        title="Enterprise Security"
        subtitle="SSL Encrypted"
      />
      <SkeuomorphicBadge
        icon={<Zap className="w-8 h-8 text-yellow-600" />}
        title="AI-Powered"
        subtitle="Latest Tech"
      />
      <SkeuomorphicBadge
        icon={<Star className="w-8 h-8 fill-purple-600 text-purple-600" />}
        title="2-Year Track Record"
        subtitle="127+ Clients"
      />
    </div>
  )
}
