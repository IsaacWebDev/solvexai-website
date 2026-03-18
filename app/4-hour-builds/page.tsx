'use client'

import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'
import { motion } from 'framer-motion'
import { Clock, Zap, Shield, Award, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import './styles.css'

export default function FourHourBuildsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '4-Hour Website Builds',
    provider: {
      '@type': 'Organization',
      name: 'SolveXAI',
      url: 'https://solvexai-website.vercel.app'
    },
    serviceType: 'Web Development',
    description: 'Production-ready website development in 4 hours using 10-agent parallel execution system',
    offers: {
      '@type': 'Offer',
      price: '5000-10000',
      priceCurrency: 'USD',
      description: 'Fixed-price website development with quality guarantees'
    },
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://solvexai-website.vercel.app/contact'
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main id="main-content" className="relative px-4 py-32 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Proven: Montrez Site Rebuilt in 4 Hours</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Production-Ready Sites<br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text" role="text">
                in 4 Hours, Not 4 Weeks
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Luxury brands, urgent launches, emergency rebuilds. We deliver in 1 day 
              what your competitors promise in 1 month.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg" className="group">
                  Book Your 4-Hour Build
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </LiquidGlassButton>
              </Link>
              <Link href="#case-study">
                <LiquidGlassButton variant="secondary" size="lg">
                  See Montrez Case Study
                </LiquidGlassButton>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">4 hrs</div>
                <div className="text-sm text-gray-400">Average Build Time</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">10x</div>
                <div className="text-sm text-gray-400">Faster Than Industry</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-green-400 mb-2">90+</div>
                <div className="text-sm text-gray-400">Files Delivered</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-sm text-gray-400">Production Ready</div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Comparison */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              Traditional vs. 4-Hour Build
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional */}
              <LiquidGlassCard intensity="medium" className="p-8 border-2 border-red-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-400">Traditional</h3>
                    <p className="text-sm text-gray-400">Industry Standard</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 mt-1">❌</div>
                    <div>
                      <div className="font-medium text-red-300">2-4 Weeks Timeline</div>
                      <div className="text-sm text-gray-400">Multiple revision cycles</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 mt-1">❌</div>
                    <div>
                      <div className="font-medium text-red-300">$5K-15K Cost</div>
                      <div className="text-sm text-gray-400">Hidden fees & overruns</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 mt-1">❌</div>
                    <div>
                      <div className="font-medium text-red-300">No Quality Guarantees</div>
                      <div className="text-sm text-gray-400">Hope for the best</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 mt-1">❌</div>
                    <div>
                      <div className="font-medium text-red-300">Slow Communication</div>
                      <div className="text-sm text-gray-400">Days between updates</div>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
              
              {/* 4-Hour Build */}
              <LiquidGlassCard intensity="heavy" className="p-8 border-2 border-green-500/30 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">4-Hour Build</h3>
                    <p className="text-sm text-gray-400">SolveXAI System</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-300">4 Hours to Production</div>
                      <div className="text-sm text-gray-400">Same-day delivery</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-300">$5K-10K Fixed Price</div>
                      <div className="text-sm text-gray-400">No surprises, no overruns</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-300">10 Quality Gates</div>
                      <div className="text-sm text-gray-400">Security, performance, brand audits</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-green-300">Real-Time Updates</div>
                      <div className="text-sm text-gray-400">Watch it build live</div>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </motion.div>
          
          {/* Case Study */}
          <motion.div
            id="case-study"
            className="mb-32 scroll-mt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              Real Results: Montrez Site Rebuild
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Luxury streetwear brand needed complete e-commerce rebuild. 
              We delivered production-ready site in 4 hours.
            </p>
            
            <LiquidGlassCard intensity="heavy" className="p-12 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Challenge */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold">
                      1
                    </div>
                    Challenge
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p>Montrez, a luxury European streetwear brand, needed:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Complete site rebuild with new branding
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        8-product e-commerce catalog
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Password-protected entrance flow
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Email verification system
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        Luxury brand aesthetic
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Solution */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
                      2
                    </div>
                    Solution
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p>10-agent parallel execution system:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        Wave 1: Frontend, Backend, UI, UX, Content
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        Wave 2: Brand, Accessibility, Performance, Security
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        Quality gates caught brand violations
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        Real-time fixes during build
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                        Production-ready in 4 hours
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Results */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  Results
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">4 hrs</div>
                    <div className="text-sm text-gray-400">Build Time</div>
                    <div className="text-xs text-gray-500 mt-1">vs 2-4 weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">90+</div>
                    <div className="text-sm text-gray-400">Files Created</div>
                    <div className="text-xs text-gray-500 mt-1">Full codebase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">342 KB</div>
                    <div className="text-sm text-gray-400">Bundle Size</div>
                    <div className="text-xs text-gray-500 mt-1">108 KB gzipped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">10</div>
                    <div className="text-sm text-gray-400">Quality Gates</div>
                    <div className="text-xs text-gray-500 mt-1">All passed ✓</div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <a 
                    href="https://montrez-site.vercel.app" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    aria-label="View Montrez live site (opens in new tab)"
                  >
                    View Live Site
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
          
          {/* How It Works */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              How the 10-Agent System Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <LiquidGlassCard intensity="medium" className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Parallel Execution</h3>
                <p className="text-gray-400 text-sm">
                  10 specialist agents work simultaneously: frontend, backend, UI, UX, content, 
                  brand, accessibility, performance, security, and reality-check.
                </p>
              </LiquidGlassCard>
              
              <LiquidGlassCard intensity="medium" className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Gates</h3>
                <p className="text-gray-400 text-sm">
                  Each agent validates specific criteria. Brand-guardian ensures consistency, 
                  security catches vulnerabilities, performance optimizes speed.
                </p>
              </LiquidGlassCard>
              
              <LiquidGlassCard intensity="medium" className="p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Real-Time Fixes</h3>
                <p className="text-gray-400 text-sm">
                  Issues caught immediately. No waiting for revisions. Fixes applied 
                  during build process. Production-ready output guaranteed.
                </p>
              </LiquidGlassCard>
            </div>
          </motion.div>
          
          {/* Pricing */}
          <motion.div
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Fixed price, no hidden fees, production-ready guaranteed
            </p>
            
            <LiquidGlassCard intensity="heavy" className="p-12 max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                  $5K-10K
                </div>
                <div className="text-gray-400">Based on complexity</div>
              </div>
              
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">4-hour production-ready build</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">10 quality gate audits</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Security & performance optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">Full source code ownership</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">30-day support included</span>
                </div>
              </div>
              
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg" className="w-full">
                  Book Your Build Now
                </LiquidGlassButton>
              </Link>
              
              <p className="text-sm text-gray-400 mt-4">
                50% up-front, 50% on delivery
              </p>
            </LiquidGlassCard>
          </motion.div>
          
          {/* Final CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <LiquidGlassCard intensity="heavy" className="p-12 max-w-4xl mx-auto">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to Launch in 4 Hours?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join luxury brands who refuse to wait 4 weeks for what can be done in 1 day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <LiquidGlassButton variant="primary" size="lg">
                    Book Your 4-Hour Build
                  </LiquidGlassButton>
                </Link>
                <a 
                  href="https://montrez-site.vercel.app" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="See Montrez site live (opens in new tab)"
                >
                  <LiquidGlassButton variant="secondary" size="lg">
                    See Montrez Site Live
                  </LiquidGlassButton>
                </a>
              </div>
            </LiquidGlassCard>
          </motion.div>
          
        </div>
      </main>
    </>
  )
}
