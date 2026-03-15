'use client'
import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { RealisticToggle, SkeuomorphicBadge, TrustBadgeSet, SkeuomorphicPricingCard } from '@/components/ui'

export default function SkeuomorphismDemo() {
  const [billingPeriod, setBillingPeriod] = useState<string>('Monthly')

  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative min-h-screen px-4 py-32">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-light">
              Skeuomorphic Components
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Physical-inspired UI elements that bring depth and realism to digital interfaces
            </p>
          </div>

          {/* 1. Realistic Toggle */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light">1. Realistic Toggle Switch</h2>
              <p className="text-gray-400 font-light">
                Looks like a real metal toggle with sliding mechanism
              </p>
            </div>
            
            <div className="flex justify-center">
              <RealisticToggle
                options={['Monthly', 'Annual']}
                value={billingPeriod}
                onChange={setBillingPeriod}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Current selection: <span className="text-purple-400 font-semibold">{billingPeriod}</span>
              </p>
            </div>
          </section>

          {/* 2. Trust Badges */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light">2. Embossed Trust Badges</h2>
              <p className="text-gray-400 font-light">
                Physical gold seals with engraved text and metallic shine
              </p>
            </div>
            
            <TrustBadgeSet />
            
            <div className="text-center">
              <p className="text-sm text-gray-500 italic">
                Hover over badges to see the shine effect
              </p>
            </div>
          </section>

          {/* 3. Pricing Cards */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light">3. 3D Pricing Cards</h2>
              <p className="text-gray-400 font-light">
                Cards that look like they're sitting on a desk with realistic shadows
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <SkeuomorphicPricingCard
                tier="Starter"
                price={497}
                features={[
                  'Website template',
                  '5 pages included',
                  'Mobile responsive',
                  'Basic SEO setup',
                  '30-day support'
                ]}
                badge={
                  <div className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full shadow-sm">
                    BASIC
                  </div>
                }
              />
              
              <SkeuomorphicPricingCard
                tier="Professional"
                price={1997}
                features={[
                  'Custom development',
                  'Unlimited pages',
                  'Advanced animations',
                  'SEO optimization',
                  'AI chatbot integration',
                  '90-day support'
                ]}
                recommended={true}
                badge={
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    POPULAR
                  </div>
                }
              />
              
              <SkeuomorphicPricingCard
                tier="Enterprise"
                price={4997}
                features={[
                  'Everything in Pro',
                  'Dedicated developer',
                  'Priority support',
                  'Custom integrations',
                  'White-label solution',
                  '1-year support'
                ]}
                badge={
                  <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg">
                    PREMIUM
                  </div>
                }
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 italic">
                Hover over cards to see the 3D lift effect
              </p>
            </div>
          </section>

          {/* Usage Example */}
          <section className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-light">How to Use</h2>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-8 space-y-6 border border-white/10">
              <div>
                <h3 className="text-xl font-semibold mb-3">1. Import Components</h3>
                <pre className="bg-black/50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-purple-300">{`import { 
  RealisticToggle,
  SkeuomorphicBadge,
  TrustBadgeSet,
  SkeuomorphicPricingCard
} from '@/components/ui'`}</code>
                </pre>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">2. Use in Your Pages</h3>
                <pre className="bg-black/50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code className="text-green-300">{`<RealisticToggle
  options={['Monthly', 'Annual']}
  value={period}
  onChange={setPeriod}
/>

<TrustBadgeSet />

<SkeuomorphicPricingCard
  tier="Pro"
  price={1997}
  features={['Feature 1', 'Feature 2']}
  recommended={true}
/>`}</code>
                </pre>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
