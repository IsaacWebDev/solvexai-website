'use client'

import { Shield, Zap, Award, TrendingUp } from 'lucide-react'
import { ClayCard } from '@/components/ui/ClayCard'

const badges = [
  {
    icon: Award,
    title: '30-Day Money-Back',
    subtitle: 'Guarantee',
    description: 'Risk-free trial period',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade',
    subtitle: 'Security',
    description: 'Bank-level encryption',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Zap,
    title: 'AI-Powered',
    subtitle: 'Intelligence',
    description: 'Advanced ML algorithms',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: TrendingUp,
    title: '2-Year Track',
    subtitle: 'Record',
    description: '10,000+ problems solved',
    color: 'from-orange-500 to-red-600',
  },
]

export function TrustBadges() {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <ClayCard
                key={index}
                elevation="md"
                variant="soft"
                className="p-6 text-center group"
              >
                {/* Icon with gradient background */}
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
                  />
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {badge.title}
                </h3>
                <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {badge.subtitle}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {badge.description}
                </p>

                {/* Decorative bottom bar */}
                <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 rounded-full" />
              </ClayCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
