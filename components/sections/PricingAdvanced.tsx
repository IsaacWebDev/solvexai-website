'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ClayCard } from '@/components/ui/ClayCard'
import { ClayButton } from '@/components/ui/ClayButton'
import { Check, X } from 'lucide-react'

const pricingTiers = [
  {
    name: 'Free',
    description: 'Perfect for trying out SolveXAI',
    priceMonthly: 0,
    priceAnnual: 0,
    cta: 'Get Started',
    href: '/signup',
    popular: false,
    features: {
      problems: '5 problems/month',
      fileSize: '10MB max file size',
      export: 'Basic export formats',
      support: 'Community support',
      ai: 'Standard AI models',
      history: '30-day history',
      collaboration: false,
      api: false,
      priority: false,
      customModels: false,
    },
  },
  {
    name: 'Pro',
    description: 'For professionals who need more power',
    priceMonthly: 29,
    priceAnnual: 23, // ~20% discount
    cta: 'Start Pro Trial',
    href: '/signup?plan=pro',
    popular: true,
    features: {
      problems: 'Unlimited problems',
      fileSize: '100MB max file size',
      export: 'All export formats',
      support: 'Priority email support',
      ai: 'Advanced AI models',
      history: 'Unlimited history',
      collaboration: true,
      api: 'API access (10k req/month)',
      priority: 'Priority processing',
      customModels: false,
    },
  },
  {
    name: 'Enterprise',
    description: 'For teams and organizations',
    priceMonthly: null,
    priceAnnual: null,
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
    features: {
      problems: 'Unlimited problems',
      fileSize: 'Unlimited file size',
      export: 'All formats + custom',
      support: 'Dedicated support manager',
      ai: 'Custom AI models',
      history: 'Unlimited history',
      collaboration: 'Team collaboration',
      api: 'Unlimited API access',
      priority: 'Highest priority processing',
      customModels: 'Custom model training',
    },
  },
]

const featureCategories = [
  {
    name: 'Usage',
    features: [
      { key: 'problems', label: 'Problems per month' },
      { key: 'fileSize', label: 'Max file size' },
      { key: 'priority', label: 'Priority processing' },
    ],
  },
  {
    name: 'Features',
    features: [
      { key: 'ai', label: 'AI models' },
      { key: 'export', label: 'Export formats' },
      { key: 'history', label: 'History retention' },
      { key: 'collaboration', label: 'Team collaboration' },
    ],
  },
  {
    name: 'Support & API',
    features: [
      { key: 'support', label: 'Support level' },
      { key: 'api', label: 'API access' },
      { key: 'customModels', label: 'Custom models' },
    ],
  },
]

export function PricingAdvanced() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-lg font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
            className="relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-purple-500/20"
            aria-label="Toggle billing cycle"
          >
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 bg-purple-600 rounded-full shadow-lg"
              animate={{
                x: billingCycle === 'annual' ? 32 : 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={`text-lg font-medium transition-colors ${
              billingCycle === 'annual'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Annual
          </span>
          <span className="ml-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold rounded-full">
            Save 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <ClayCard
              key={tier.name}
              elevation={tier.popular ? 'lg' : 'md'}
              variant="soft"
              className={`p-8 relative ${
                tier.popular ? 'ring-2 ring-purple-500 shadow-2xl scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-1 rounded-full font-semibold shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {tier.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                {tier.priceMonthly === null ? (
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    Custom
                  </div>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-900 dark:text-white">
                      $
                      {billingCycle === 'monthly'
                        ? tier.priceMonthly
                        : tier.priceAnnual}
                    </div>
                    {tier.priceMonthly > 0 && (
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        per month{billingCycle === 'annual' && ', billed annually'}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* CTA Button */}
              <Link href={tier.href}>
                <ClayButton
                  variant={tier.popular ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                  className="mb-6"
                >
                  {tier.cta}
                </ClayButton>
              </Link>

              {/* Quick Feature List */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {tier.features.problems}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {tier.features.fileSize}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {tier.features.support}
                  </span>
                </div>
              </div>
            </ClayCard>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Compare Features
          </h3>
          <ClayCard elevation="md" variant="soft" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                      Feature
                    </th>
                    {pricingTiers.map((tier) => (
                      <th
                        key={tier.name}
                        className="text-center p-4 font-semibold text-gray-900 dark:text-white"
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureCategories.map((category) => (
                    <>
                      <tr key={category.name}>
                        <td
                          colSpan={pricingTiers.length + 1}
                          className="p-4 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white"
                        >
                          {category.name}
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr
                          key={feature.key}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="p-4 text-gray-700 dark:text-gray-300">
                            {feature.label}
                          </td>
                          {pricingTiers.map((tier) => {
                            const value = tier.features[feature.key as keyof typeof tier.features]
                            return (
                              <td key={tier.name} className="p-4 text-center">
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <Check className="w-6 h-6 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="w-6 h-6 text-gray-300 dark:text-gray-600 mx-auto" />
                                  )
                                ) : (
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {value}
                                  </span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </ClayCard>
        </div>
      </div>
    </section>
  )
}

export default PricingAdvanced
