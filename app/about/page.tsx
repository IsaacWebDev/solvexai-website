'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { TeamOrbit3D } from '@/components/3d/TeamOrbit3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative px-4 md:px-8 py-32 md:py-40 flex justify-center">
        <div className="w-full max-w-6xl">
          
          {/* Hero - Perfectly Centered */}
          <section className="mb-48 flex justify-center">
            <motion.div 
              className="text-center max-w-5xl w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-light mb-10 leading-tight">
                You Shouldn't Be<br />Answering Phones at 11 PM
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-16 font-light leading-relaxed">
                We automate the work that steals your evenings and weekends.<br />
                127 businesses reclaimed 2,000+ hours in 2026.
              </p>
              
              {/* Founder Context Card - Centered */}
              <div className="mb-20 flex justify-center">
                <LiquidGlassCard intensity="medium" className="p-10 md:p-12 max-w-4xl w-full">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-semibold shadow-2xl">
                        I+A
                      </div>
                    </div>
                    <div className="max-w-2xl">
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
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-32" />
          
          {/* Stats Section - Perfectly Centered */}
          <section className="mb-48 py-20">
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <LiquidGlassCard intensity="medium" className="p-12 md:p-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    <StatItem 
                      icon={<WebsiteIcon />}
                      number="127" 
                      label="Websites Launched" 
                      sublabel="In 10 Months" 
                    />
                    <StatItem 
                      icon={<ClockIcon />}
                      number="2,000+" 
                      label="Hours Saved" 
                      sublabel="For Our Clients" 
                    />
                    <StatItem 
                      icon={<DollarIcon />}
                      number="$2M+" 
                      label="Revenue Generated" 
                      sublabel="Client Success" 
                    />
                    <StatItem 
                      icon={<StarIcon />}
                      number="4.9★" 
                      label="Average Rating" 
                      sublabel="Customer Reviews" 
                    />
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-32" />
          
          {/* Our Story - Perfectly Centered */}
          <section className="mb-48 py-20">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-20">Our Story</h2>
            
            {/* Story Text - Centered */}
            <div className="flex justify-center mb-20">
              <div className="w-full max-w-4xl">
                <LiquidGlassCard intensity="medium" className="p-10 md:p-12 text-center">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
                    Most business owners spend <span className="font-semibold text-white">20+ hours/week</span> on tasks a computer could do better.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
                    We saw restaurant owners manually taking reservations, lawyers typing the same emails, 
                    gyms chasing no-shows. <span className="font-semibold text-white">It doesn't have to be this way.</span>
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                    SolveXAI was built to give small businesses the AI automation that big companies have—without 
                    the enterprise price tag.
                  </p>
                </LiquidGlassCard>
              </div>
            </div>
            
            {/* Timeline - Perfectly Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <LiquidGlassCard intensity="light" className="p-12 md:p-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    <TimelineItemHorizontal 
                      year="2024"
                      title="Problem Identified"
                      description="Isaac and Amun both struggling with repetitive business tasks"
                    />
                    <TimelineItemHorizontal 
                      year="2025"
                      title="Building Solutions"
                      description="Created AI tools to solve our own automation problems"
                    />
                    <TimelineItemHorizontal 
                      year="2026"
                      title="SolveXAI Founded"
                      description="Launched publicly. 127 businesses automated in 10 months"
                    />
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-32" />
          
          {/* Our Values - Perfectly Centered */}
          <section className="mb-48 py-20">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-20">Our Values</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
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
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-32" />
          
          {/* Meet the Team - Perfectly Centered */}
          <section className="mb-48 py-20">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-20">Meet the Team</h2>
            
            {/* 3D Team Orbit - Centered & Smaller */}
            <motion.div
              className="mb-20 mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ maxHeight: '350px', maxWidth: '600px' }}
            >
              <TeamOrbit3D />
            </motion.div>
            
            {/* Team Member Cards - Perfectly Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                  <TeamMemberCard
                    name="Isaac Senior Primo"
                    role="Co-Founder & Technical Lead"
                    bio="Economics student turned developer. Built automation tools to escape 15-hour work weeks. Now helps others do the same."
                    location="Bordeaux, France"
                    linkedin="#"
                    twitter="#"
                  />
                  <TeamMemberCard
                    name="Amun Nour"
                    role="Co-Founder & Operations Director"
                    bio="Former restaurant owner who lost $3K/month to no-shows. Built the AI receptionist we wish we had."
                    location="Johannesburg, South Africa"
                    linkedin="#"
                    twitter="#"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent mb-32" />
          
          {/* FAQ Section - Perfectly Centered */}
          <section className="mb-48 py-20">
            <h2 className="text-4xl md:text-5xl font-light text-center mb-20">Frequently Asked Questions</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl space-y-6">
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
            </div>
          </section>
          
          {/* Final CTA - Perfectly Centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
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
        </div>
      </main>
    </>
  )
}

// Component: Stat Item with Icon
function StatItem({ icon, number, label, sublabel }: { 
  icon: React.ReactNode;
  number: string; 
  label: string; 
  sublabel: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="transition-all"
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
        {number}
      </div>
      <div className="text-base md:text-lg text-gray-300 font-medium mb-1">{label}</div>
      <div className="text-sm text-gray-500">{sublabel}</div>
    </motion.div>
  )
}

// Component: Horizontal Timeline Item
function TimelineItemHorizontal({ year, title, description }: { 
  year: string; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="text-center">
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-xl">
          {year.slice(-2)}
        </div>
      </div>
      <div className="text-sm text-purple-400 font-semibold mb-2">{year}</div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed">{description}</p>
    </div>
  )
}

// Component: Value Card - Centered Content
function ValueCard({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode 
}) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} className="h-full">
      <LiquidGlassCard intensity="medium" className="p-12 md:p-14 h-full flex flex-col text-center">
        <div className="mb-6 flex justify-center">{icon}</div>
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-300 leading-relaxed font-light flex-1">{description}</p>
      </LiquidGlassCard>
    </motion.div>
  )
}

// Component: Team Member Card - Centered Content
function TeamMemberCard({ name, role, bio, location, linkedin, twitter }: { 
  name: string; 
  role: string; 
  bio: string; 
  location: string; 
  linkedin: string;
  twitter: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }}>
      <LiquidGlassCard intensity="medium" className="p-12 md:p-14 h-full text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-xl mb-4">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-purple-400 text-base font-medium mb-2">{role}</p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <MapPinIcon /> {location}
          </p>
        </div>
        <p className="text-lg text-gray-300 leading-relaxed font-light mb-6">{bio}</p>
        <div className="flex gap-4 justify-center">
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a 
            href={twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors font-medium"
          >
            <TwitterIcon /> Twitter
          </a>
        </div>
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
        className="w-full p-8 md:p-10 text-left flex items-start justify-between gap-6 hover:bg-white/5 transition-colors"
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
        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-0">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent mb-6" />
          <p className="text-gray-300 leading-relaxed font-light text-base md:text-lg">{answer}</p>
        </div>
      </motion.div>
    </LiquidGlassCard>
  )
}

// SVG Icons (unchanged)
function ZapIcon() {
  return (
    <svg className="w-14 h-14 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg className="w-14 h-14 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-14 h-14 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg className="w-14 h-14 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg className="w-12 h-12 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-12 h-12 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function DollarIcon() {
  return (
    <svg className="w-12 h-12 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="w-12 h-12 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  )
}
