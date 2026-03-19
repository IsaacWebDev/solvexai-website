'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { Interactive3DOrb } from '@/components/Interactive3DOrb'
import { GuaranteeBadge } from '@/components/GuaranteeBadge'
import { ROIPlayground } from '@/components/interactive/ROIPlayground'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'
import { Palette, Settings, Bot, Shield } from 'lucide-react'

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative flex justify-center" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div className="flex flex-col gap-20" style={{ maxWidth: containers.full, width: '100%' }}>
          {/* Hero */}
          <motion.div 
            className="text-center"
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bold" style={{ 
              fontSize: typography.h1,
              marginBottom: spacing.element.margin
            }}>
              Choose Your Automation Level
            </h1>
            <p className="text-gray-300" style={{ 
              fontSize: typography.body,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              From ready-made templates to fully custom systems
            </p>
          </motion.div>
          
          {/* Calculate Your Time Back */}
          <motion.div
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ROIPlayground />
          </motion.div>
          
          {/* Package 1: Templates */}
          <PackageSection
            icon={<Palette className="w-16 h-16" style={{ color: '#8B5CF6' }} />}
            title="Website Templates"
            headline="Professional Websites, Zero Hassle"
            price="$52-$67"
            timeline="3-7 days"
            whatYouGet={[
              'Industry-specific design (8 options)',
              'Mobile responsive (tested on all devices)',
              'Contact forms with email notifications',
              'SEO optimized (Google-ready)',
              '1-week setup (or faster)',
              'Free stock photos ($200 value)',
              'SSL certificate included',
              '30-day support'
            ]}
            customizable={[
              'Colors and fonts',
              'Logo and branding',
              'All text and images',
              'Contact information',
              'Social media links'
            ]}
            perfectFor={[
              'New businesses',
              'Simple online presence',
              'Fast launch needed',
              'Limited budget'
            ]}
            cta1Text="Browse Templates"
            cta1Href="/templates"
            cta2Text="Buy Now"
            cta2Href="/templates"
          />
          
          {/* Package 2: Custom */}
          <PackageSection
            icon={<Settings className="w-16 h-16" style={{ color: '#3B82F6' }} />}
            title="Custom Development"
            headline="Built Exactly How You Imagine It"
            price="$1,997-$7,997"
            timeline="2-6 weeks"
            whatYouGet={[
              'Unlimited page count',
              'Custom features and integrations',
              'API connections (Stripe, Calendly, CRM, etc.)',
              'Advanced animations',
              'Database setup',
              'Admin dashboard',
              '3 months support',
              'Unlimited revisions during build'
            ]}
            whatWeCanBuild={[
              'Multi-vendor marketplaces',
              'Booking systems',
              'Member portals',
              'E-commerce with custom logic',
              'SaaS dashboards',
              'Integration with ANY tool'
            ]}
            recentProjects={[
              'Restaurant chain ordering system ($3,500)',
              'Law firm CRM + client portal ($5,200)',
              'Fitness studio booking platform ($4,800)'
            ]}
            cta1Text="Start a Project"
            cta1Href="/contact"
            cta2Text="View Portfolio"
            cta2Href="/contact"
            highlighted
          />
          
          {/* Package 3: AI Receptionist */}
          <PackageSection
            icon={<Bot className="w-16 h-16" style={{ color: '#00F0FF' }} />}
            title="AI Receptionist"
            headline="24/7 AI That Sounds Human"
            price="$1,997 setup + $297/mo"
            timeline="2 weeks setup"
            whatItDoes={[
              'Answers incoming calls',
              'Books appointments (syncs with your calendar)',
              'Answers FAQs in your brand voice',
              'Takes messages and emails you',
              'Transfers to you when needed',
              'Works holidays and weekends'
            ]}
            howItWorks={[
              'We record 15 minutes of your voice (or use AI voice)',
              'You give us FAQs and booking rules',
              'We train AI on your business',
              'Test calls with you',
              'Go live in 2 weeks'
            ]}
            perfectFor={[
              'Dentists, doctors, therapists',
              'Restaurants taking reservations',
              'Service businesses (plumbers, electricians)',
              'Any business missing calls'
            ]}
            roi={[
              'Part-time receptionist: $1,500/mo',
              'AI receptionist: $297/mo',
              'Savings: $1,203/mo ($14,436/year)'
            ]}
            cta1Text="Book Demo Call"
            cta1Href="/ai-receptionist"
            cta2Text="Hear Sample"
            cta2Href="/ai-receptionist"
          />
          
          {/* Comparison Table */}
          <LiquidGlassCard intensity="medium" className="mt-24 p-8 overflow-x-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 pr-8">Feature</th>
                  <th className="pb-4 px-4">Templates</th>
                  <th className="pb-4 px-4">Custom</th>
                  <th className="pb-4 pl-4">AI Receptionist</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <ComparisonRow feature="Setup time" templates="1 week" custom="2-6 weeks" ai="2 weeks" />
                <ComparisonRow feature="Customization" templates="Limited" custom="Unlimited" ai="Moderate" />
                <ComparisonRow feature="Integrations" templates="Basic" custom="Unlimited" ai="Calendar+" />
                <ComparisonRow feature="Ongoing cost" templates="$0/mo" custom="$0/mo" ai="$297/mo" />
                <ComparisonRow feature="Best for" templates="Simple" custom="Complex" ai="Automation" />
              </tbody>
            </table>
          </LiquidGlassCard>
          
          {/* Maintenance Plans CTA */}
          <LiquidGlassCard intensity="medium" className="mt-16 p-8 text-center" glowColor="#8B5CF6">
            <h3 className="text-2xl font-bold mb-3">Need ongoing support?</h3>
            <p className="text-gray-300 mb-6">
              Keep your website secure, fast, and optimized with our maintenance plans
            </p>
            <Link href="/maintenance">
              <LiquidGlassButton variant="secondary" size="lg">
                See Maintenance Plans →
              </LiquidGlassButton>
            </Link>
          </LiquidGlassCard>

          {/* Bottom CTA */}
          <LiquidGlassCard intensity="heavy" className="mt-8 text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Not sure which you need?</h2>
            <p className="text-gray-300 mb-8">
              Book a free 15-minute consultation and we'll recommend the best fit
            </p>
            <Link href="/contact">
              <LiquidGlassButton variant="primary" size="lg">
                Book Free Consultation
              </LiquidGlassButton>
            </Link>
          </LiquidGlassCard>

          {/* 3D Automation Flow Visualization - Moved to Bottom */}
          <motion.div
            style={{ marginTop: spacing.content.gap }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Interactive3DOrb />
          </motion.div>
        </div>
      </main>
    </>
  )
}

interface PackageSectionProps {
  icon: React.ReactNode
  title: string
  headline: string
  price: string
  timeline: string
  whatYouGet?: string[]
  customizable?: string[]
  whatWeCanBuild?: string[]
  recentProjects?: string[]
  whatItDoes?: string[]
  howItWorks?: string[]
  perfectFor?: string[]
  roi?: string[]
  cta1Text: string
  cta1Href: string
  cta2Text: string
  cta2Href: string
  highlighted?: boolean
}

function PackageSection(props: PackageSectionProps) {
  const glowColor = props.title.includes('Template') ? '#8B5CF6' : props.title.includes('Custom') ? '#3B82F6' : '#00F0FF'
  
  return (
    <LiquidGlassCard 
      intensity="heavy" 
      glowColor={glowColor}
      className={`p-12 mb-16 ${props.highlighted ? 'ring-2 ring-purple-500' : ''}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Header & Description */}
        <div>
          <div className="mb-6">{props.icon}</div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">{props.headline}</h2>
          
          <div className="mb-8">
            <div className="text-3xl font-bold mb-2">{props.price}</div>
            <div className="text-gray-400">Timeline: {props.timeline}</div>
          </div>
          
          {props.whatYouGet && <FeatureList title="What You Get" items={props.whatYouGet} />}
          {props.whatItDoes && <FeatureList title="What It Does" items={props.whatItDoes} />}
        </div>
        
        {/* Right: Additional Details */}
        <div>
          {props.customizable && <FeatureList title="What's Customizable" items={props.customizable} />}
          {props.whatWeCanBuild && <FeatureList title="What We Can Build" items={props.whatWeCanBuild} />}
          {props.recentProjects && <FeatureList title="Recent Projects" items={props.recentProjects} />}
          {props.howItWorks && <FeatureList title="How It Works" items={props.howItWorks} numbered />}
          {props.perfectFor && <FeatureList title="Perfect For" items={props.perfectFor} />}
          {props.roi && <FeatureList title="ROI Example" items={props.roi} />}
          
          {/* CTAs */}
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex gap-4">
              <Link href={props.cta1Href}>
                <LiquidGlassButton variant="primary" size="lg">
                  {props.cta1Text}
                </LiquidGlassButton>
              </Link>
              <Link href={props.cta2Href}>
                <LiquidGlassButton variant="secondary" size="lg">
                  {props.cta2Text}
                </LiquidGlassButton>
              </Link>
            </div>
            <GuaranteeBadge size="md" variant="prominent">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield className="w-5 h-5" style={{ color: '#10b981' }} />
                <span>14-Day Money-Back Guarantee</span>
              </div>
              <span style={{ fontSize: '12px', color: '#d1d5db', marginTop: '4px', display: 'block' }}>
                100% satisfaction or full refund. No questions asked.
              </span>
            </GuaranteeBadge>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  )
}

function FeatureList({ title, items, numbered }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-purple-400">
              {numbered ? `${index + 1}.` : '✓'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ComparisonRow({ feature, templates, custom, ai }: { feature: string; templates: string; custom: string; ai: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-4 pr-8 font-medium text-white">{feature}</td>
      <td className="py-4 px-4">{templates}</td>
      <td className="py-4 px-4">{custom}</td>
      <td className="py-4 pl-4">{ai}</td>
    </tr>
  )
}
