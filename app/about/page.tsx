'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { TeamOrbit3D } from '@/components/3d/TeamOrbit3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative px-4 md:px-8 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero */}
          <motion.div 
            className="text-center mb-40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-10 leading-tight">
              You Shouldn't Be<br />Answering Phones at 11 PM
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              We automate the work that steals your evenings and weekends.<br />
              127 businesses reclaimed 2,000+ hours in 2026.
            </p>
            
            {/* Founder Context Card */}
            <div className="max-w-4xl mx-auto mb-16">
              <LiquidGlassCard intensity="medium" className="p-10 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8 text-left">
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-semibold shadow-2xl">
                      I+A
                    </div>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Isaac and Amun</span> met while running their own businesses in Bordeaux and Johannesburg. 
                      Isaac spent 15 hours/week answering the same customer questions. Amun's restaurant was losing $3K/month to no-show reservations. 
                      We built SolveXAI to fix our own problems—then realized every small business had the same ones.
                    </p>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Book Discovery Call
                </LiquidGlassButton>
              </Link>
              <Link href="/templates">
                <LiquidGlassButton variant="secondary" size="lg">
                  Browse Templates
                </LiquidGlassButton>
              </Link>
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-24" />
          
          {/* Stats - Moved Before Story */}
          <section className="mb-40 text-center">
            <div className="max-w-5xl mx-auto">
              <LiquidGlassCard intensity="medium" className="p-12 md:p-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                <StatItem number="127" label="Websites Launched" sublabel="In 10 Months" />
                <StatItem number="2,000+" label="Hours Saved" sublabel="For Our Clients" />
                <StatItem number="$2M+" label="Revenue Generated" sublabel="Client Success" />
                <StatItem number="4.9★" label="Average Rating" sublabel="Customer Reviews" />
              </div>
              </LiquidGlassCard>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-24" />
          
          {/* Our Story - Redesigned with Split Layout */}
          <section className="mb-40">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Our Story</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left: Story Text */}
              <div>
                <LiquidGlassCard intensity="medium" className="p-10 md:p-12">
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                      Most business owners spend <span className="font-semibold text-white">20+ hours/week</span> on tasks a computer could do better.
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                      We saw restaurant owners manually taking reservations, lawyers typing the same emails, 
                      gyms chasing no-shows. <span className="font-semibold text-white">It doesn't have to be this way.</span>
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                      SolveXAI was built to give small businesses the AI automation that big companies have—without 
                      the enterprise price tag.
                    </p>
                  </div>
                </LiquidGlassCard>
              </div>
              
              {/* Right: Timeline */}
              <div>
                <LiquidGlassCard intensity="light" className="p-10 md:p-12">
                  <div className="space-y-8">
                    <TimelineItem 
                      year="2024"
                      title="Problem Identified"
                      description="Isaac and Amun both struggling with repetitive business tasks"
                    />
                    <TimelineItem 
                      year="2025"
                      title="Building Solutions"
                      description="Created AI tools to solve our own automation problems"
                    />
                    <TimelineItem 
                      year="2026"
                      title="SolveXAI Founded"
                      description="Launched publicly. 127 businesses automated in 10 months"
                      isLast
                    />
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-24" />
          
          {/* Our Values - Professional Icons */}
          <section className="mb-40">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <ValueCard
                title="Speed Over Perfection"
                description="Launch fast, optimize later. Every day you wait is money lost. Average template goes live in 48 hours (not 2 weeks)."
                icon={<ZapIcon />}
              />
              <ValueCard
                title="Transparent Pricing"
                description="No hidden fees. No surprise charges. Know exactly what you pay. See our full pricing breakdown on every page."
                icon={<DiamondIcon />}
              />
              <ValueCard
                title="Human Support"
                description="Real humans answer your questions. No chatbots (except the ones we build for you). Average response time: 12 minutes."
                icon={<UsersIcon />}
              />
              <ValueCard
                title="Results First"
                description="We only succeed if you save time and make money. Period. We don't get paid until your site is live and you're happy."
                icon={<TargetIcon />}
              />
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-24" />
          
          {/* Meet the Team - 3D Orbit + Profiles */}
          <section className="mb-40">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Meet the Team</h2>
            
            {/* 3D Team Orbit */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <TeamOrbit3D />
            </motion.div>
            
            {/* Team Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <TeamMemberCard
                name="Isaac Senior Primo"
                role="Co-Founder & Technical Lead"
                bio="Economics student turned developer. Built automation tools to escape 15-hour work weeks. Now helps others do the same."
                location="Bordeaux, France"
                linkedin="#"
              />
              <TeamMemberCard
                name="Amun Nour"
                role="Co-Founder & Operations Director"
                bio="Former restaurant owner who lost $3K/month to no-shows. Built the AI receptionist we wish we had."
                location="Johannesburg, South Africa"
                linkedin="#"
              />
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-24" />
          
          {/* FAQ Section */}
          <section className="mb-40">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-16">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <FAQItem
                question="Why should I trust a company founded in 2026?"
                answer="Fair question. We're new as a company, but not new to automation. Isaac and Amun have been building AI tools for their own businesses since 2024. We've already delivered 127 websites and saved clients 2,000+ hours. Plus, we offer a 14-day money-back guarantee—no risk."
              />
              <FAQItem
                question="What happens if I'm not happy with the result?"
                answer="14-day money-back guarantee, no questions asked. We also offer unlimited revisions during the build process. We don't get paid until you're satisfied."
              />
              <FAQItem
                question="Do you work with my industry?"
                answer="We've built solutions for restaurants, law firms, gyms, real estate agencies, medical practices, and more. If you have repetitive tasks (bookings, calls, emails), we can automate them. Book a discovery call and we'll show you exactly how."
              />
              <FAQItem
                question="How is this different from hiring a traditional agency?"
                answer="Traditional agencies take 6-12 weeks and charge $10K-50K. We deliver in 2-7 days for $497-7,997. You get direct access to the founders (text Isaac or Amun anytime), not a ticket system. Maintenance is included, not an extra $500/month."
              />
              <FAQItem
                question="What if I need help after launch?"
                answer="We're real humans, not outsourced support. Text us directly, and we'll respond within 12 minutes (average). All plans include ongoing support and updates."
              />
              <FAQItem
                question="Can I see examples of your work?"
                answer="Absolutely. Check out our Templates page to see 8 live demos across different industries. Or book a discovery call and we'll show you case studies from businesses like yours."
              />
            </div>
          </section>
          
          {/* Final CTA */}
          <div className="max-w-4xl mx-auto">
            <LiquidGlassCard intensity="heavy" className="text-center p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Want to join the automation revolution?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 font-light">
              Join 127 businesses that reclaimed their time in 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Start Your Project
                </LiquidGlassButton>
              </Link>
              <Link href="/templates">
                <LiquidGlassButton variant="secondary" size="lg">
                  Browse Templates
                </LiquidGlassButton>
              </Link>
            </div>
            </LiquidGlassCard>
          </div>
        </div>
      </main>
    </>
  )
}

// Component: Stat Item
function StatItem({ number, label, sublabel }: { number: string; label: string; sublabel: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="transition-transform"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-sm md:text-base text-gray-300 font-medium">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
    </motion.div>
  )
}

// Component: Timeline Item
function TimelineItem({ year, title, description, isLast = false }: { 
  year: string; 
  title: string; 
  description: string; 
  isLast?: boolean 
}) {
  return (
    <div className="relative pl-8">
      {!isLast && (
        <div className="absolute left-0 top-8 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
      )}
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 ring-4 ring-purple-600/20" />
      <div className="text-sm text-purple-400 font-semibold mb-1">{year}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed">{description}</p>
    </div>
  )
}

// Component: Value Card
function ValueCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="h-full">
      <LiquidGlassCard intensity="medium" className="p-8 md:p-10 h-full">
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-300 leading-relaxed font-light">{description}</p>
      </LiquidGlassCard>
    </motion.div>
  )
}

// Component: Team Member Card
function TeamMemberCard({ name, role, bio, location, linkedin }: { 
  name: string; 
  role: string; 
  bio: string; 
  location: string; 
  linkedin: string 
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <LiquidGlassCard intensity="medium" className="p-8 md:p-10 h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-purple-400 text-sm font-medium mb-1">{role}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1">
              <MapPinIcon /> {location}
            </p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed font-light mb-6">{bio}</p>
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium"
        >
          <LinkedInIcon /> Connect on LinkedIn
        </a>
      </LiquidGlassCard>
    </motion.div>
  )
}

// Component: FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <LiquidGlassCard intensity="medium" className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 md:p-8 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
      >
        <h3 className="text-lg md:text-xl font-semibold pr-4">{question}</h3>
        <motion.span 
          className="text-3xl flex-shrink-0 text-purple-400 font-light"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-6" />
          <p className="text-gray-300 leading-relaxed font-light text-base md:text-lg">{answer}</p>
        </div>
      </motion.div>
    </LiquidGlassCard>
  )
}

// SVG Icons
function ZapIcon() {
  return (
    <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  )
}
