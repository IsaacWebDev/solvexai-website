'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { motion } from 'framer-motion'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Zap, Globe, ShoppingCart, Users, QrCode, BarChart3 } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// --- Client Projects ---

const clientProjects = [
  {
    id: 'leafway',
    isLive: true,
    label: 'Live Project',
    labelColor: 'bg-green-500/20 text-green-400 border border-green-500/30',
    name: 'Leafway',
    tagline: 'Cannabis Membership Platform',
    description:
      'Full-stack membership management system for a premium cannabis dispensary. Includes QR-code access control, member portal, admin dashboard, inventory tracking, and PayFast payment integration.',
    industry: 'Cannabis / Retail',
    stack: ['Next.js 14', 'Supabase', 'TypeScript', 'PayFast', 'QR Access'],
    results: [
      { icon: <QrCode className="w-5 h-5" />, stat: 'QR Access', label: 'Seamless entry' },
      { icon: <Users className="w-5 h-5" />, stat: 'Member Portal', label: 'Self-service' },
      { icon: <BarChart3 className="w-5 h-5" />, stat: 'Admin Dashboard', label: 'Full control' },
    ],
    features: [
      'Membership sign-up with payment',
      'QR code generation + scanner app',
      'Admin dashboard (members, inventory, revenue)',
      'Member self-service portal',
      'Email notifications & confirmations',
      'Mobile-first design'
    ],
    gradient: 'from-green-600/20 to-emerald-600/10',
    accentColor: 'text-green-400',
    borderColor: 'border-green-500/20',
    url: 'https://leafway.vercel.app',
    imageAlt: 'Leafway cannabis membership platform'
  },
  {
    id: 'montrez',
    isLive: false,
    label: 'In Production',
    labelColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    name: 'Montrez',
    tagline: 'Luxury Streetwear E-Commerce',
    description:
      'Premium e-commerce platform for a South African luxury streetwear brand. Features a château-style entrance, full product catalog, cart system, and payment integration — built to feel as exclusive as the brand.',
    industry: 'Luxury Fashion / E-Commerce',
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'PayFast', 'TailwindCSS'],
    results: [
      { icon: <ShoppingCart className="w-5 h-5" />, stat: '8 Products', label: 'Full catalog' },
      { icon: <Globe className="w-5 h-5" />, stat: 'Custom UX', label: 'Château entrance' },
      { icon: <Zap className="w-5 h-5" />, stat: 'R38k–56k', label: 'Project value' },
    ],
    features: [
      'Château-style password-gated entrance',
      'Luxury product catalog (8 SKUs)',
      'Shopping cart with session persistence',
      'Email verification & order system',
      'PayFast payment integration',
      'Order management dashboard'
    ],
    gradient: 'from-purple-600/20 to-violet-600/10',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    url: null,
    imageAlt: 'Montrez luxury streetwear e-commerce platform'
  }
]

// --- Template Showcase ---

const templates = [
  { name: 'Restaurant Delight', industry: 'Restaurants', image: '/template-mockups/restaurant-delight-mockup.png', color: 'from-orange-500 to-red-600' },
  { name: 'Law Firm Authority', industry: 'Law Firms', image: '/template-mockups/law-firm-authority-mockup.png', color: 'from-blue-800 to-blue-900' },
  { name: 'Fitness Studio Energy', industry: 'Fitness', image: '/template-mockups/fitness-studio-energy-mockup.png', color: 'from-yellow-500 to-orange-600' },
  { name: 'E-Commerce Clean', industry: 'E-Commerce', image: '/template-mockups/ecommerce-clean-mockup.png', color: 'from-slate-600 to-slate-800' },
  { name: 'Medical Practice Care', industry: 'Medical', image: '/template-mockups/medical-practice-mockup.png', color: 'from-teal-500 to-cyan-600' },
  { name: 'Law Firm Authority', industry: 'Construction', image: '/template-mockups/construction-pro-mockup.png', color: 'from-amber-600 to-yellow-700' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'clients' | 'templates'>('all')

  const showClients = activeFilter === 'all' || activeFilter === 'clients'
  const showTemplates = activeFilter === 'all' || activeFilter === 'templates'

  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />

      <main className="relative px-4 md:px-8 py-32 md:py-40 flex justify-center">
        <div className="max-w-6xl w-full flex flex-col gap-24">

          {/* HERO */}
          <section className="flex justify-center">
            <motion.div
              className="text-center max-w-4xl w-full"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest text-purple-400 mb-6 font-medium">
              Our Work
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-light leading-tight mb-8">
              Built for<br />Real Businesses
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Every project we deliver is production-ready, mobile-first, and built to generate revenue.
              Here's a selection of what we've shipped.
            </motion.p>

            {/* See Our Work CTA */}
            <motion.div variants={fadeUp} className="mt-8 flex justify-center">
              <button
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span className="text-sm font-medium">See Our Work</span>
                <svg 
                  className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>

            {/* Filter tabs */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-10">
              {[
                { key: 'all', label: 'All Work' },
                { key: 'clients', label: 'Client Projects' },
                { key: 'templates', label: 'Templates' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key as typeof activeFilter)}
                  className={`px-6 py-3 rounded-full font-light text-sm transition-all duration-200 ${
                    activeFilter === key
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400 hover:text-white border border-transparent hover:border-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          </motion.div>
          </section>

          {/* CLIENT PROJECTS */}
          {showClients && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="mb-10 w-full text-center">
                <h2 className="text-2xl font-light text-white/60 mb-1">Client Projects</h2>
                <div className="h-px bg-white/10 w-full max-w-4xl mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {clientProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  >
                    <LiquidGlassCard intensity="medium" className={`relative p-8 md:p-12 border ${project.borderColor}`}>
                      {project.isLive && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 z-10">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          LIVE PROJECT
                        </div>
                      )}
                      <div className="grid grid-cols-1 gap-10 items-start">

                        {/* LEFT: Project Info */}
                        <div className="flex flex-col gap-6">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.labelColor}`}>
                              {project.label}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">{project.industry}</span>
                          </div>

                          <div>
                            <h3 className={`text-4xl md:text-5xl font-light mb-3 ${project.accentColor}`}>
                              {project.name}
                            </h3>
                            <p className="text-lg text-gray-300 font-light">{project.tagline}</p>
                          </div>

                          <p className="text-gray-400 font-light leading-relaxed text-base">
                            {project.description}
                          </p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-4 pt-2">
                            {project.url ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group"
                              >
                                View Live Site
                                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              </a>
                            ) : (
                              <span className="text-sm text-gray-500 font-light italic">Client site — private preview</span>
                            )}
                          </div>
                        </div>

                        {/* Stats + Features */}
                        <div className="flex flex-col gap-8">
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4">
                            {project.results.map((r) => (
                              <div
                                key={r.stat}
                                className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
                              >
                                <div className={`flex justify-center mb-2 ${project.accentColor}`}>{r.icon}</div>
                                <div className="text-sm font-semibold text-white">{r.stat}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{r.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Features */}
                          <div>
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">What We Built</p>
                            <ul className="space-y-2.5">
                              {project.features.map((f) => (
                                <li key={f} className="flex items-start gap-3">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${project.accentColor} bg-current`} />
                                  <span className="text-sm text-gray-300 font-light">{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                      </div>
                    </LiquidGlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* TEMPLATES */}
          {showTemplates && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: showClients ? 0.2 : 0 }}
              className="flex flex-col items-center"
            >
              <div className="mb-10 w-full text-center">
                <h2 className="text-2xl font-light text-white/60 mb-1">Template Library</h2>
                <div className="h-px bg-white/10 w-full max-w-4xl mx-auto" />
              </div>

              <div className="mb-6 text-center">
                <p className="text-gray-400 font-light text-base">
                  Pre-built, ready-to-deploy templates for 7+ industries.
                  Launch in 48 hours, not 4 weeks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, i) => (
                  <motion.div
                    key={template.name + i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="group cursor-pointer"
                  >
                    <LiquidGlassCard intensity="light" className="overflow-hidden h-full border border-white/10 hover:border-white/20 transition-all">
                      {/* Placeholder visual */}
                      <div className={`h-36 md:h-44 bg-gradient-to-br ${template.color} relative flex items-center justify-center`}>
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="relative text-white font-semibold text-lg">{template.name.split(' ')[0]}</span>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-white">{template.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{template.industry}</p>
                      </div>
                    </LiquidGlassCard>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <Link href="/templates">
                  <LiquidGlassButton variant="secondary" size="md">
                    <span className="flex items-center gap-2">
                      View All Templates
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </LiquidGlassButton>
                </Link>
              </motion.div>
            </motion.section>
          )}

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <LiquidGlassCard intensity="heavy" className="p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Your Business Could Be Next
              </h2>
              <p className="text-xl text-gray-400 font-light mb-10 max-w-xl mx-auto">
                We build fast. We build quality. And we make sure it generates revenue.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/contact">
                  <LiquidGlassButton variant="primary" size="lg">
                    Get a Free Quote
                  </LiquidGlassButton>
                </Link>
                <Link href="/packages">
                  <LiquidGlassButton variant="secondary" size="lg">
                    View Packages
                  </LiquidGlassButton>
                </Link>
              </div>
            </LiquidGlassCard>
          </motion.section>

        </div>
      </main>
    </>
  )
}
