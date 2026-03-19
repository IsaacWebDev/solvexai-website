'use client'

import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Zap, Shield, Award, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function FourHourBuildsPage() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Accessible animation variants that respect motion preferences
  const fadeInUp = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      }

  const pulse = prefersReducedMotion
    ? {}
    : {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 2, repeat: Infinity }
      }

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
      >
        Skip to main content
      </a>

      <Navigation />
      <AnimatedGradientMesh aria-hidden="true" />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black via-black to-transparent pt-4 pb-6 px-4 z-40">
        <Link href="/contact" className="w-full block">
          <LiquidGlassButton variant="primary" size="lg" className="w-full">
            Book 4-Hour Build
          </LiquidGlassButton>
        </Link>
      </div>
      
      <main
        id="main-content"
        data-no-padding
        className="relative px-4 md:px-8 py-32 md:py-40 flex justify-center pb-24 md:pb-0"
        role="main"
      >
        <div className="w-full max-w-6xl flex flex-col gap-20">

          {/* Hero Section */}
          <section className="py-16 flex justify-center">
          <motion.div
            className="text-center max-w-5xl w-full"
            {...(prefersReducedMotion ? {} : fadeInUp)}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6"
              {...pulse}
              role="status"
              aria-label="Proven achievement: Montrez site rebuilt in 4 hours"
            >
              <Zap className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span className="text-sm text-blue-400 font-medium">Proven: Montrez Site Rebuilt in 4 Hours</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Production-Ready Sites
              </span>
              <br />
              <span className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                in 4 Hours, Not 4 Weeks
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Luxury brands, urgent launches, emergency rebuilds. We deliver in 1 day
              what your competitors promise in 1 month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Call to action buttons">
              <Link href="/contact" className="focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg">
                <LiquidGlassButton variant="primary" size="lg" className="group">
                  Book Your 4-Hour Build
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </LiquidGlassButton>
              </Link>
              <Link href="#case-study" className="focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg">
                <LiquidGlassButton variant="secondary" size="lg">
                  See Montrez Case Study
                </LiquidGlassButton>
              </Link>
            </div>

            {/* Statistics with improved semantics and contrast */}
            <section
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              aria-label="Key performance metrics"
            >
              <motion.div
                className="text-center"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-blue-300 mb-2" role="text">
                  <span aria-label="4 hours">4 hrs</span>
                </div>
                <div className="text-sm text-gray-300 font-medium">Average Build Time</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-purple-300 mb-2" role="text">
                  <span aria-label="10 times">10x</span>
                </div>
                <div className="text-sm text-gray-300 font-medium">Faster Than Industry</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-green-300 mb-2" role="text">
                  <span aria-label="Over 90">90+</span>
                </div>
                <div className="text-sm text-gray-300 font-medium">Files Delivered</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? {} : { delay: 0.5 }}
              >
                <div className="text-4xl font-bold text-orange-300 mb-2" role="text">
                  <span aria-label="100 percent">100%</span>
                </div>
                <div className="text-sm text-gray-300 font-medium">Production Ready</div>
              </motion.div>
            </section>
          </motion.div>
          </section>

          {/* Comparison Section */}
          <section className="py-16">
          <motion.div
            className="flex justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className="w-full max-w-5xl">
            <h2 id="comparison-heading" className="text-4xl font-bold text-center mb-12">
              Traditional vs. 4-Hour Build
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional - Improved contrast and semantics */}
              <LiquidGlassCard
                intensity="medium"
                className="p-8 border-2 border-red-500/30"
                role="article"
                aria-label="Traditional approach disadvantages"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Clock className="w-6 h-6 text-red-300" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-300">Traditional</h3>
                    <p className="text-sm text-gray-300">Industry Standard</p>
                  </div>
                </div>

                <ul className="space-y-4" role="list">
                  <li className="flex items-start gap-3">
                    <span className="text-red-300 mt-1 text-xl" aria-label="Disadvantage" role="img">❌</span>
                    <div>
                      <div className="font-medium text-red-200">2-4 Weeks Timeline</div>
                      <div className="text-sm text-gray-300">Multiple revision cycles</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-300 mt-1 text-xl" aria-label="Disadvantage" role="img">❌</span>
                    <div>
                      <div className="font-medium text-red-200">$5K-15K Cost</div>
                      <div className="text-sm text-gray-300">Hidden fees & overruns</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-300 mt-1 text-xl" aria-label="Disadvantage" role="img">❌</span>
                    <div>
                      <div className="font-medium text-red-200">No Quality Guarantees</div>
                      <div className="text-sm text-gray-300">Hope for the best</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-300 mt-1 text-xl" aria-label="Disadvantage" role="img">❌</span>
                    <div>
                      <div className="font-medium text-red-200">Slow Communication</div>
                      <div className="text-sm text-gray-300">Days between updates</div>
                    </div>
                  </li>
                </ul>
              </LiquidGlassCard>

              {/* 4-Hour Build - Improved contrast and semantics */}
              <LiquidGlassCard
                intensity="heavy"
                className="p-8 border-2 border-green-500/40 relative overflow-hidden"
                role="article"
                aria-label="4-Hour Build advantages - recommended option"
              >
                <div
                  className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                  role="status"
                  aria-label="Recommended option"
                >
                  RECOMMENDED
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-300">4-Hour Build</h3>
                    <p className="text-sm text-gray-300">SolveXAI System</p>
                  </div>
                </div>

                <ul className="space-y-4" role="list">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" aria-label="Advantage" />
                    <div>
                      <div className="font-medium text-green-200">4 Hours to Production</div>
                      <div className="text-sm text-gray-300">Same-day delivery</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" aria-label="Advantage" />
                    <div>
                      <div className="font-medium text-green-200">$5K-10K Fixed Price</div>
                      <div className="text-sm text-gray-300">No surprises, no overruns</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" aria-label="Advantage" />
                    <div>
                      <div className="font-medium text-green-200">10 Quality Gates</div>
                      <div className="text-sm text-gray-300">Security, performance, brand audits</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" aria-label="Advantage" />
                    <div>
                      <div className="font-medium text-green-200">Real-Time Updates</div>
                      <div className="text-sm text-gray-300">Watch it build live</div>
                    </div>
                  </li>
                </ul>
              </LiquidGlassCard>
            </div>
          </div>
          </motion.div>
          </section>

          {/* Case Study Section */}
          <section id="case-study" className="py-16 scroll-mt-32">
          <motion.div
            className="flex justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className="w-full max-w-5xl">
            <h2 id="case-study-heading" className="text-4xl font-bold text-center mb-4">
              Real Results: Montrez Site Rebuild
            </h2>
            <p className="text-gray-200 text-center mb-12 max-w-2xl mx-auto">
              Luxury streetwear brand needed complete e-commerce rebuild.
              We delivered production-ready site in 4 hours.
            </p>

            <LiquidGlassCard intensity="heavy" className="p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Challenge */}
                <article aria-labelledby="challenge-heading">
                  <h3 id="challenge-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 text-sm font-bold"
                      aria-hidden="true"
                    >
                      1
                    </div>
                    Challenge
                  </h3>
                  <div className="space-y-4 text-gray-200">
                    <p>Montrez, a luxury European streetwear brand, needed:</p>
                    <ul className="space-y-2" role="list">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400" aria-hidden="true">•</span>
                        Complete site rebuild with new branding
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400" aria-hidden="true">•</span>
                        8-product e-commerce catalog
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400" aria-hidden="true">•</span>
                        Password-protected entrance flow
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400" aria-hidden="true">•</span>
                        Email verification system
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400" aria-hidden="true">•</span>
                        Luxury brand aesthetic
                      </li>
                    </ul>
                  </div>
                </article>

                {/* Solution */}
                <article aria-labelledby="solution-heading">
                  <h3 id="solution-heading" className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 text-sm font-bold"
                      aria-hidden="true"
                    >
                      2
                    </div>
                    Solution
                  </h3>
                  <div className="space-y-4 text-gray-200">
                    <p>10-agent parallel execution system:</p>
                    <ul className="space-y-2" role="list">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300 mt-1" aria-hidden="true" />
                        Wave 1: Frontend, Backend, UI, UX, Content
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300 mt-1" aria-hidden="true" />
                        Wave 2: Brand, Accessibility, Performance, Security
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300 mt-1" aria-hidden="true" />
                        Quality gates caught brand violations
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300 mt-1" aria-hidden="true" />
                        Real-time fixes during build
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-300 mt-1" aria-hidden="true" />
                        Production-ready in 4 hours
                      </li>
                    </ul>
                  </div>
                </article>
              </div>

              {/* Results */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-yellow-300" aria-hidden="true" />
                  Results
                </h3>

                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                  role="list"
                  aria-label="Project results and metrics"
                >
                  <div className="text-center" role="listitem">
                    <div className="text-4xl font-bold text-green-300 mb-2" aria-label="4 hours build time">4 hrs</div>
                    <div className="text-sm text-gray-300">Build Time</div>
                    <div className="text-xs text-gray-400 mt-1">vs 2-4 weeks</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-4xl font-bold text-blue-300 mb-2" aria-label="Over 90 files">90+</div>
                    <div className="text-sm text-gray-300">Files Created</div>
                    <div className="text-xs text-gray-400 mt-1">Full codebase</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-4xl font-bold text-purple-300 mb-2" aria-label="342 kilobytes">342 KB</div>
                    <div className="text-sm text-gray-300">Bundle Size</div>
                    <div className="text-xs text-gray-400 mt-1">108 KB gzipped</div>
                  </div>
                  <div className="text-center" role="listitem">
                    <div className="text-4xl font-bold text-orange-300 mb-2" aria-label="10 quality gates">10</div>
                    <div className="text-sm text-gray-300">Quality Gates</div>
                    <div className="text-xs text-gray-400 mt-1">All passed ✓</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="https://montrez-site.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg px-3 py-2"
                    aria-label="View live Montrez site (opens in new window)"
                  >
                    View Live Site
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
          </motion.div>
          </section>

          {/* How It Works Section */}
          <section className="py-16">
          <motion.div
            className="flex justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className="w-full max-w-6xl">
            <h2 id="how-it-works-heading" className="text-4xl font-bold text-center mb-12">
              How the 10-Agent System Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8" role="list">
              <LiquidGlassCard intensity="medium" className="p-6" role="listitem">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Parallel Execution</h3>
                <p className="text-gray-200 text-sm">
                  10 specialist agents work simultaneously: frontend, backend, UI, UX, content,
                  brand, accessibility, performance, security, and reality-check.
                </p>
              </LiquidGlassCard>

              <LiquidGlassCard intensity="medium" className="p-6" role="listitem">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Gates</h3>
                <p className="text-gray-200 text-sm">
                  Each agent validates specific criteria. Brand-guardian ensures consistency,
                  security catches vulnerabilities, performance optimizes speed.
                </p>
              </LiquidGlassCard>

              <LiquidGlassCard intensity="medium" className="p-6" role="listitem">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Real-Time Fixes</h3>
                <p className="text-gray-200 text-sm">
                  Issues caught immediately. No waiting for revisions. Fixes applied
                  during build process. Production-ready output guaranteed.
                </p>
              </LiquidGlassCard>
            </div>
          </div>
          </motion.div>
          </section>

          {/* Pricing Section */}
          <section className="py-16">
          <motion.div
            className="flex justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className="w-full max-w-2xl text-center">
            <h2 id="pricing-heading" className="text-4xl font-bold text-center mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-200 text-center mb-12">
              Fixed price, no hidden fees, production-ready guaranteed
            </p>

            <LiquidGlassCard
              intensity="heavy"
              className="p-12"
              role="article"
              aria-label="Pricing details"
            >
              <div className="mb-8">
                <div
                  className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2"
                  role="text"
                  aria-label="$5,000 to $10,000"
                >
                  $5K-10K
                </div>
                <div className="text-gray-300 mb-6">Based on complexity</div>
                
                {/* Pricing Breakdown */}
                <div className="bg-white/5 rounded-lg p-6 space-y-3 text-left">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Package Tiers</h3>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300 text-sm">Basic: Branding refresh</span>
                    <span className="text-green-400 font-bold">$5K</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-300 text-sm">Standard: E-commerce + auth</span>
                    <span className="text-green-400 font-bold">$7K</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-300 text-sm">Premium: Custom integrations</span>
                    <span className="text-green-400 font-bold">$10K</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 text-left mb-8" role="list">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-200">4-hour production-ready build</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-200">10 quality gate audits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-200">Security & performance optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-200">Full source code ownership</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-200">30-day support included</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg inline-block w-full"
              >
                <LiquidGlassButton variant="primary" size="lg" className="w-full">
                  Book Your Build Now
                </LiquidGlassButton>
              </Link>

              <p className="text-sm text-gray-300 mt-4">
                50% up-front, 50% on delivery
              </p>
            </LiquidGlassCard>
          </div>
          </motion.div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16">
          <motion.div
            className="flex justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
          >
          <div className="w-full max-w-4xl text-center">
            <LiquidGlassCard intensity="heavy" className="p-12">
              <Shield className="w-16 h-16 text-blue-300 mx-auto mb-6" aria-hidden="true" />
              <h2 id="final-cta-heading" className="text-4xl font-bold mb-4">
                Ready to Launch in 4 Hours?
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join luxury brands who refuse to wait 4 weeks for what can be done in 1 day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Final call to action">
                <Link
                  href="/contact"
                  className="focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg"
                >
                  <LiquidGlassButton variant="primary" size="lg">
                    Book Your 4-Hour Build
                  </LiquidGlassButton>
                </Link>
                <a
                  href="https://montrez-site.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-lg"
                  aria-label="See Montrez site live (opens in new window)"
                >
                  <LiquidGlassButton variant="secondary" size="lg">
                    See Montrez Site Live
                  </LiquidGlassButton>
                </a>
              </div>
            </LiquidGlassCard>
          </div>
          </motion.div>
          </section>

        </div>
      </main>
    </>
  )
}
