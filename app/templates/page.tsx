'use client'
// Updated Fitness Studio pages - 2026-03-17 17:52

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { GuaranteeBadge } from '@/components/GuaranteeBadge'
import { TemplatePreviewHover } from '@/components/TemplatePreviewHover'
import { IndustrySelector } from '@/components/interactive/IndustrySelector'
import { EmailBeforeAfter } from '@/components/interactive/BeforeAfterSlider'
import { X, Shield, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function TemplatesPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [showBanner, setShowBanner] = useState(true)
  
  const filters = ['All', 'Restaurants', 'Law Firms', 'Fitness', 'Real Estate', 'E-Commerce', 'Medical', 'More']
  
  const templates = [
    {
      name: 'Restaurant Delight',
      industry: 'Restaurants',
      price: 497,
      features: [
        'Dark luxury aesthetic with gold accents',
        'Full menu preview (starters, mains, desserts)',
        'Table reservation form with validation',
        'Featured dishes grid (6 items)',
        'Customer testimonials & gallery',
        'Location map & hours section'
      ],
      includes: 'Dark charcoal/black design, Smooth animations, Fully responsive, Ready to deploy',
      gradient: 'from-orange-600 to-red-600',
      image: '/template-mockups/restaurant-delight-mockup.png',
      previewUrl: 'https://placeholder-restaurant-demo.vercel.app',
      pageImages: {
        home: '/template-pages/restaurant-home-page.png',
        about: '/template-pages/restaurant-about-page.png',
        services: '/template-pages/restaurant-services-page.png',
        contact: '/template-pages/restaurant-contact-page.png'
      }
    },
    {
      name: 'Law Firm Authority',
      industry: 'Law Firms',
      price: 797,
      features: [
        'Navy blue & gold professional design',
        '6 practice areas with detail pages',
        '3 attorney profiles with bios',
        'Consultation request form',
        'Firm stats (35+ years, $500M+ won)',
        'Client testimonials section'
      ],
      includes: 'Professional typography, Smooth animations, Fully responsive, Ready to deploy',
      gradient: 'from-blue-800 to-blue-600',
      image: '/template-mockups/law-firm-authority-mockup.png',
      previewUrl: 'https://placeholder-lawfirm-demo.vercel.app',
      pageImages: {
        home: '/template-pages/law-firm-home-page.png',
        about: '/template-pages/law-firm-about-page.png',
        services: '/template-pages/law-firm-services-page.png',
        contact: '/template-pages/law-firm-contact-page.png'
      }
    },
    {
      name: 'Fitness Studio Energy',
      industry: 'Fitness',
      price: 597,
      features: [
        'Dark design with neon green accents',
        '4 fitness programs with details',
        '3 trainer profiles with bios',
        '3-day class schedule grid',
        '3 membership plans (Basic/Pro/Elite)',
        'Transformation showcase & testimonials'
      ],
      includes: 'Bold energetic design, Smooth animations, Fully responsive, Ready to deploy',
      gradient: 'from-yellow-600 to-orange-600',
      image: '/template-mockups/fitness-studio-energy-mockup.png',
      previewUrl: 'https://placeholder-fitness-demo.vercel.app',
      pageImages: {
        home: '/template-pages/fitness-home-page.png',
        about: '/template-pages/fitness-about-page.png',
        services: '/template-pages/fitness-services-page.png',
        contact: '/template-pages/fitness-contact-page.png'
      }
    },
    {
      name: 'Real Estate Luxury',
      industry: 'Real Estate',
      price: 897,
      features: [
        'White background with gold accents',
        '6 featured properties with full details',
        '4 property categories (Villas, Apartments, etc.)',
        '3 agent profiles with contact buttons',
        'Property search bar & testimonials',
        'Stats: $2B+ sold, 25+ years, 50+ markets'
      ],
      includes: 'Luxury design, Premium typography, Fully responsive, Ready to deploy',
      gradient: 'from-yellow-800 to-yellow-600',
      image: '/template-mockups/real-estate-luxury-mockup.png',
      previewUrl: 'https://placeholder-realestate-demo.vercel.app',
      pageImages: {
        home: '/template-pages/real-estate-home-page.png',
        about: '/template-pages/real-estate-about-page.png',
        services: '/template-pages/real-estate-services-page.png',
        contact: '/template-pages/real-estate-contact-page.png'
      }
    },
    {
      name: 'E-Commerce Clean',
      industry: 'E-Commerce',
      price: 997,
      features: [
        'Apple-inspired minimal white design',
        '8 featured products with ratings',
        'Working shopping cart system',
        '4 featured categories with hover effects',
        'Trust section (shipping, returns, support)',
        'Newsletter signup & testimonials'
      ],
      includes: 'Cart functionality, Form validation, Fully responsive, Ready to deploy',
      gradient: 'from-purple-600 to-pink-600',
      image: '/template-mockups/ecommerce-clean-mockup.png',
      previewUrl: 'https://placeholder-ecommerce-demo.vercel.app',
      pageImages: {
        home: '/template-pages/ecommerce-home-page.png',
        about: '/template-pages/ecommerce-about-page.png',
        services: '/template-pages/ecommerce-services-page.png',
        contact: '/template-pages/ecommerce-contact-page.png'
      }
    },
    {
      name: 'Medical Practice',
      industry: 'Medical',
      price: 797,
      features: [
        'Soft blue accents with clean design',
        '6 medical services with details',
        '3 doctor profiles with specialties',
        'Appointment booking form with validation',
        '4 trust features & patient testimonials',
        'Clinic information with hours & map'
      ],
      includes: 'Professional healthcare design, Smooth animations, Fully responsive, Ready to deploy',
      gradient: 'from-cyan-600 to-blue-600',
      image: '/template-mockups/medical-practice-mockup.png',
      previewUrl: 'https://placeholder-medical-demo.vercel.app',
      pageImages: {
        home: '/template-pages/medical-home-page.png',
        about: '/template-pages/medical-about-page.png',
        services: '/template-pages/medical-services-page.png',
        contact: '/template-pages/medical-contact-page.png'
      }
    },
    {
      name: 'Construction Pro',
      industry: 'More',
      price: 597,
      features: [
        'Construction yellow accents on dark grey',
        '6 services (residential, commercial, etc.)',
        '6 featured projects portfolio grid',
        '4-step construction process display',
        'Quote request form & testimonials',
        'Stats: 500+ projects, 25+ years, 100+ team'
      ],
      includes: 'Bold professional design, Smooth animations, Fully responsive, Ready to deploy',
      gradient: 'from-gray-700 to-yellow-700',
      image: '/template-mockups/construction-pro-mockup.png',
      previewUrl: 'https://placeholder-construction-demo.vercel.app',
      pageImages: {
        home: '/template-pages/construction-home-page.png',
        about: '/template-pages/construction-about-page.png',
        services: '/template-pages/construction-services-page.png',
        contact: '/template-pages/construction-contact-page.png'
      }
    },
    {
      name: 'Creative Agency',
      industry: 'More',
      price: 697,
      features: [
        'Dark theme with purple/blue gradients',
        '4 services (Web Design, Branding, etc.)',
        '6 featured work portfolio with overlays',
        '4-step process (Discovery to Launch)',
        'Contact form with project type & budget',
        'Stats: 8+ years, 200+ projects, 50+ clients'
      ],
      includes: 'Modern creative design, Gradient accents, Fully responsive, Ready to deploy',
      gradient: 'from-pink-600 to-purple-600',
      image: '/template-mockups/creative-agency-mockup.png',
      previewUrl: 'https://placeholder-agency-demo.vercel.app',
      pageImages: {
        home: '/template-pages/creative-agency-home-page.png',
        about: '/template-pages/creative-agency-about-page.png',
        services: '/template-pages/creative-agency-services-page.png',
        contact: '/template-pages/creative-agency-contact-page.png'
      }
    }
  ]
  
  const filteredTemplates = selectedFilter === 'All' 
    ? templates 
    : templates.filter(t => t.industry === selectedFilter)
  
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />

      {/* Sticky Maintenance Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-20 left-0 right-0 z-40 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <LiquidGlassCard intensity="medium" glowColor="#8B5CF6" className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <p className="text-sm text-gray-200">
                    <span className="font-semibold">All templates include maintenance plan option</span> — Keep your site secure & optimized
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/maintenance">
                    <LiquidGlassButton variant="primary" size="sm">
                      View Plans
                    </LiquidGlassButton>
                  </Link>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </motion.div>
      )}
      
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
            <h1 className="font-bold mb-6" style={{ fontSize: typography.h1 }}>
              Professional Websites, Ready in Days
            </h1>
            <p className="text-gray-300 mb-8" style={{ 
              fontSize: typography.body,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Choose your industry. Customize your brand. Launch this week.
            </p>
            
            {/* Industry Selector */}
            <IndustrySelector onIndustryChange={(industry) => {
              // Map industry IDs to filter names
              const industryMap: Record<string, string> = {
                restaurant: 'Restaurants',
                realtor: 'Real Estate',
                lawyer: 'Law Firms',
                fitness: 'Fitness',
                ecommerce: 'E-Commerce',
                medical: 'Medical',
                construction: 'More',
                agency: 'More',
              };
              setSelectedFilter(industryMap[industry] || 'All');
            }} />
          </motion.div>

          {/* Sarah Chen's Transformation */}
          <motion.div
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <EmailBeforeAfter />
          </motion.div>
          
          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <LiquidGlassButton
                key={filter}
                variant={selectedFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </LiquidGlassButton>
            ))}
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredTemplates.map((template, index) => (
              <TemplatePreviewHover 
                key={index} 
                previewUrl={template.previewUrl}
                templateName={template.name}
              >
                <TemplateCard {...template} />
              </TemplatePreviewHover>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <LiquidGlassCard intensity="heavy" className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't see your industry? We can build it.
            </h2>
            <p className="text-gray-300 mb-8">
              Request a custom template designed specifically for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="lg">
                  Request Custom Template
                </LiquidGlassButton>
              </Link>
              <Link href="/packages">
                <LiquidGlassButton variant="secondary" size="lg">
                  View Custom Development
                </LiquidGlassButton>
              </Link>
            </div>
          </LiquidGlassCard>
        </div>
      </main>
    </>
  )
}

interface TemplateCardProps {
  name: string
  industry: string
  price: number
  features: string[]
  includes: string
  gradient: string
  image?: string
  previewUrl?: string
  pageImages?: {
    home?: string
    about?: string
    services?: string
    contact?: string
  }
}

function TemplateCard({ name, industry, price, features, includes, gradient, image, pageImages }: TemplateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  return (
    <>
      <div
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          transform: hoveredIndex === 0 ? 'translateZ(50px) scale(1.05)' : 'translateZ(0) scale(1)',
          transformStyle: 'preserve-3d',
          transition: 'all 0.3s'
        }}
      >
        <LiquidGlassCard intensity="medium" className="overflow-hidden transition-all duration-500 group">
        {/* Screenshot Preview */}
        <div 
          className="h-64 relative overflow-hidden cursor-pointer bg-black"
          onClick={() => setIsModalOpen(true)}
        >
          {image ? (
            <>
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">View Full Details</span>
              </div>
            </>
          ) : (
            <div className={`h-full bg-gradient-to-br ${gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-6xl font-bold">{name.charAt(0)}</div>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">View Full Details</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold">{name}</h3>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400">
              {industry}
            </span>
          </div>
          
          <ul className="space-y-2 mb-4 text-sm text-gray-300">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">•</span>
                {feature}
              </li>
            ))}
          </ul>
          
          <p className="text-xs text-gray-400 mb-4 border-t border-white/10 pt-4">
            {includes}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">${price}</div>
              <GuaranteeBadge size="sm">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  14-Day Guarantee
                </span>
              </GuaranteeBadge>
            </div>
            <div className="flex gap-2">
              <LiquidGlassButton 
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                View Demo
              </LiquidGlassButton>
              <Link href="/contact">
                <LiquidGlassButton variant="primary" size="sm">
                  Buy Now
                </LiquidGlassButton>
              </Link>
            </div>
          </div>
        </div>
        </LiquidGlassCard>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <TemplateModal 
          template={{ name, industry, price, features, includes, gradient, pageImages }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

function TemplateModal({ template, onClose }: { template: TemplateCardProps; onClose: () => void }) {
  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'services' | 'contact'>('home')
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] overflow-y-auto w-full max-w-4xl">
        <LiquidGlassCard 
          intensity="heavy"
          className="w-full p-8"
        >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="float-right text-gray-400 hover:text-white text-3xl leading-none"
        >
          ×
        </button>
        
        <h2 className="text-4xl font-bold mb-4">{template.name}</h2>
        <p className="text-gray-400 mb-4">Industry: {template.industry}</p>
        
        {/* Debug - Remove after testing */}
        {template.pageImages && <p className="text-green-400 text-xs mb-2">✓ Has page images</p>}
        {!template.pageImages && <p className="text-red-400 text-xs mb-2">✗ No page images</p>}
        
        {/* Page Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { name: 'Home', key: 'home' as const },
            { name: 'About', key: 'about' as const },
            { name: 'Services', key: 'services' as const },
            { name: 'Contact', key: 'contact' as const }
          ].map((page) => (
            <button
              key={page.key}
              onClick={() => setSelectedPage(page.key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedPage === page.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
        
        {/* Large Page Preview */}
        <div className="mb-8 rounded-lg overflow-hidden" style={{ maxHeight: '500px' }}>
          {template.pageImages?.[selectedPage] ? (
            <img 
              src={template.pageImages[selectedPage]} 
              alt={`${selectedPage} Page`}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
            />
          ) : (
            <div className={`w-full h-96 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
              <span className="text-white/50 font-semibold text-2xl">
                {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page
              </span>
            </div>
          )}
        </div>
        
        {/* Full Feature List */}
        <h3 className="text-2xl font-bold mb-4">Complete Feature List</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {template.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        {/* What's Customizable */}
        <h3 className="text-2xl font-bold mb-4">What's Customizable</h3>
        <ul className="space-y-2 mb-8 text-gray-300">
          <li>• Colors and fonts to match your brand</li>
          <li>• Logo and branding elements</li>
          <li>• All text and images</li>
          <li>• Contact information and social links</li>
        </ul>
        
        {/* Setup Timeline */}
        <h3 className="text-2xl font-bold mb-4">Setup Timeline</h3>
        <p className="text-gray-300 mb-8">
          3-7 days from purchase to launch. We handle everything: design customization, 
          content migration, domain setup, and testing.
        </p>
        
        {/* Price & CTA */}
        <div className="flex items-center justify-between border-t border-white/10 pt-8">
          <div>
            <div className="text-4xl font-bold gradient-text">${template.price}</div>
            <div className="text-sm text-gray-400">One-time payment</div>
          </div>
          <Link href="/contact">
            <LiquidGlassButton variant="primary" size="lg">
              Purchase This Template
            </LiquidGlassButton>
          </Link>
        </div>
        </LiquidGlassCard>
      </div>
    </div>
  )
}
