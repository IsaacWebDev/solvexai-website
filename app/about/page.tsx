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
      
      <main className="relative" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div style={{ maxWidth: containers.content, margin: '0 auto' }}>
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
              marginBottom: spacing.element.margin,
              lineHeight: '1.2'
            }}>
              You Shouldn't Be Answering Phones at 11 PM
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto" style={{ lineHeight: '1.6' }}>
              We automate the work that steals your evenings and weekends. 127 businesses reclaimed 2,000+ hours in 2026.
            </p>
            
            {/* Founder Context */}
            <div className="max-w-4xl mx-auto mb-12">
              <LiquidGlassCard intensity="medium" className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold">
                      I+A
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 leading-relaxed">
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
          
          {/* Meet the Team - 3D Orbit + Profiles */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
            
            {/* 3D Team Orbit */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <TeamOrbit3D />
            </motion.div>
            
            {/* Team Member Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
          
          {/* Our Story */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold mb-8">Our Story</h2>
            <LiquidGlassCard intensity="medium" className="p-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Most business owners spend 20+ hours/week on tasks a computer could do better. 
                We saw restaurant owners manually taking reservations, lawyers typing the same emails, 
                gyms chasing no-shows. It doesn't have to be this way.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                SolveXAI was built to give small businesses the AI automation that big companies have—without 
                the enterprise price tag.
              </p>
            </LiquidGlassCard>
          </section>
          
          {/* Our Values */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ValueCard
                title="Speed Over Perfection"
                description="Launch fast, optimize later. Every day you wait is money lost."
                icon="⚡"
              />
              <ValueCard
                title="Transparent Pricing"
                description="No hidden fees. No surprise charges. Know exactly what you pay."
                icon="💎"
              />
              <ValueCard
                title="Human Support"
                description="Real humans answer your questions. No chatbots (except the ones we build for you 😉)"
                icon="👥"
              />
              <ValueCard
                title="Results First"
                description="We only succeed if you save time and make money. Period."
                icon="🎯"
              />
            </div>
          </section>
          
          {/* Stats */}
          <LiquidGlassCard intensity="medium" className="p-12 mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">127</div>
                <div className="text-sm text-gray-400">Websites Launched</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">2,000+</div>
                <div className="text-sm text-gray-400">Hours Saved</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">$2M+</div>
                <div className="text-sm text-gray-400">Revenue Generated</div>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">4.9★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>
          </LiquidGlassCard>
          
          {/* FAQ Section */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
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
          
          {/* CTA */}
          <LiquidGlassCard intensity="heavy" className="text-center p-12">
            <h2 className="text-4xl font-bold mb-6">
              Want to join the automation revolution?
            </h2>
            <p className="text-gray-300 text-lg mb-8">Join 127 businesses that reclaimed their time in 2026</p>
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
      </main>
    </>
  )
}

function ValueCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <LiquidGlassCard intensity="medium" className="p-8">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </LiquidGlassCard>
  )
}

function TeamMemberCard({ name, role, bio, location, linkedin }: { 
  name: string; 
  role: string; 
  bio: string; 
  location: string; 
  linkedin: string 
}) {
  return (
    <LiquidGlassCard intensity="medium" className="p-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-purple-400 text-sm mb-1">{role}</p>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{bio}</p>
      <a 
        href={linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
      >
        LinkedIn →
      </a>
    </LiquidGlassCard>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <LiquidGlassCard intensity="medium" className="p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-start justify-between gap-4"
      >
        <h3 className="text-xl font-semibold">{question}</h3>
        <span className="text-2xl flex-shrink-0 transition-transform" style={{
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          +
        </span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </LiquidGlassCard>
  )
}
