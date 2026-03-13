'use client'

import React from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import Link from 'next/link'

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Choose Your Automation Level
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ready-made templates to fully custom systems
            </p>
          </div>
          
          {/* Package 1: Templates */}
          <PackageSection
            icon="🎨"
            title="Website Templates"
            headline="Professional Websites, Zero Hassle"
            price="$297-$997"
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
            icon="⚙️"
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
            icon="🤖"
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
          <div className="mt-24 glass-card rounded-2xl p-8 overflow-x-auto">
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
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center glass-card rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Not sure which you need?</h2>
            <p className="text-gray-300 mb-8">
              Book a free 15-minute consultation and we'll recommend the best fit
            </p>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
                Book Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

interface PackageSectionProps {
  icon: string
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
  return (
    <div className={`glass-card rounded-2xl p-12 mb-16 ${props.highlighted ? 'ring-2 ring-purple-500' : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Header & Description */}
        <div>
          <div className="text-6xl mb-6">{props.icon}</div>
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
          <div className="flex gap-4 mt-8">
            <Link href={props.cta1Href}>
              <button className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all">
                {props.cta1Text}
              </button>
            </Link>
            <Link href={props.cta2Href}>
              <button className="px-6 py-3 rounded-lg font-semibold glass-card hover:bg-white/10 transition-all">
                {props.cta2Text}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
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
