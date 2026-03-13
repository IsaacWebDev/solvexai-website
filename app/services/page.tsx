'use client'

import { Navigation } from '@/components/Navigation'
import { InteractiveParticles } from '@/components/InteractiveParticles'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { ServiceIcons3D } from '@/components/3d/ServiceIcons3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'

const services = [
  {
    title: 'Website Templates',
    price: '$297+',
    tagline: 'Launch Fast, Look Professional',
    description: 'Pre-built, conversion-optimized website templates designed for modern businesses. Deploy in hours, not weeks.',
    features: [
      'Responsive Design (Mobile, Tablet, Desktop)',
      'SEO Optimized (Meta tags, Schema, Sitemap)',
      'Fast Loading (<2s page load)',
      'Modern UI/UX (Animations, Micro-interactions)',
      'Easy Customization (Colors, Fonts, Content)',
      'Analytics Ready (Google Analytics, Tag Manager)',
      'Contact Forms (Validation, Email integration)',
      'Free Updates (Bug fixes, Security patches)'
    ],
    ideal: 'Startups, Small Businesses, Solopreneurs',
    delivery: '1-3 days',
    support: '30 days included'
  },
  {
    title: 'Custom Development',
    price: '$1,997+',
    tagline: 'Your Vision, Built to Perfection',
    description: 'Fully custom web applications tailored to your exact specifications. From concept to deployment, we build what you need.',
    features: [
      'Custom Features (Unique functionality for your business)',
      'API Integration (Third-party services, CRMs, Payment)',
      'Database Design (Scalable, secure data architecture)',
      'Authentication (User login, roles, permissions)',
      'Admin Dashboard (Manage content, users, analytics)',
      'Performance Optimization (Caching, CDN, Lazy loading)',
      'Cloud Deployment (AWS, Vercel, or your platform)',
      'Full Support (Bug fixes, updates, maintenance)'
    ],
    ideal: 'Growing Businesses, SaaS, E-commerce',
    delivery: '2-8 weeks',
    support: '90 days included'
  },
  {
    title: 'AI Receptionist',
    price: '$1,997+',
    tagline: '24/7 Customer Service, Zero Downtime',
    description: 'Intelligent AI receptionist that handles customer inquiries, bookings, and support—around the clock, in natural language.',
    features: [
      '24/7 Availability (Never miss a customer inquiry)',
      'Natural Conversation (GPT-4 powered, human-like)',
      'Multi-Language Support (English, Spanish, French, more)',
      'CRM Integration (Sync leads, contacts, conversations)',
      'Appointment Booking (Calendar integration, reminders)',
      'FAQs & Knowledge Base (Custom training on your business)',
      'SMS & Email (Multi-channel communication)',
      'Analytics Dashboard (Track conversations, conversions)'
    ],
    ideal: 'Service Businesses, Agencies, Healthcare',
    delivery: '1-2 weeks',
    support: 'Ongoing (Monthly subscription)'
  }
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <InteractiveParticles />
      
      <main className="relative z-10 min-h-screen bg-black" style={{
        paddingTop: spacing.section.vertical,
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
            <h1 className="font-bold text-white" style={{ 
              fontSize: typography.h1,
              marginBottom: spacing.element.margin,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-white/70" style={{ 
              fontSize: typography.body,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Choose the solution that fits your needs. All services include expert support and guaranteed results.
            </p>
          </motion.div>
          
          {/* 3D Service Icons */}
          <motion.div
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <ServiceIcons3D />
          </motion.div>
          
          {/* Services Grid */}
          <div className="space-y-20">
            {services.map((service, index) => (
              <Card key={index} delay={index * 0.2} className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left: Title & Price */}
                  <div className="md:col-span-1">
                    <div className="sticky top-32">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {service.title}
                      </h2>
                      <p className="text-4xl font-bold gradient-text mb-4">
                        {service.price}
                      </p>
                      <p className="text-lg text-white/60 italic mb-8">
                        {service.tagline}
                      </p>
                      
                      <div className="space-y-3 text-sm text-white/70">
                        <div>
                          <strong className="text-white">Ideal for:</strong> {service.ideal}
                        </div>
                        <div>
                          <strong className="text-white">Delivery:</strong> {service.delivery}
                        </div>
                        <div>
                          <strong className="text-white">Support:</strong> {service.support}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Description & Features */}
                  <div className="md:col-span-2">
                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <h3 className="text-xl font-bold text-white mb-4">What's Included:</h3>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => {
                        const [name, desc] = feature.split(' (')
                        return (
                          <li key={i} className="flex items-start">
                            <svg className="w-6 h-6 mr-3 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <div>
                              <strong className="text-white">{name}</strong>
                              {desc && <span className="text-white/60"> ({desc}</span>}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                    
                    <Link href="/contact">
                      <Button variant="primary">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            className="text-center mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Not Sure Which Service?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Let's talk about your needs. We'll recommend the best solution for your business.
            </p>
            <Link href="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
