'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { TemplateMockup3D } from '@/components/3d/TemplateMockup3D'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export default function TemplatesPage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  
  const filters = ['All', 'Restaurants', 'Law Firms', 'Fitness', 'Real Estate', 'E-Commerce', 'Medical', 'More']
  
  const templates = [
    {
      name: 'Restaurant Delight',
      industry: 'Restaurants',
      price: 497,
      features: [
        'Hero with food photography',
        'Digital menu with categories',
        'Online ordering integration',
        'Table reservation system',
        'Instagram feed widget'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      name: 'Law Firm Authority',
      industry: 'Law Firms',
      price: 797,
      features: [
        'Professional blue/gold theme',
        'Case study showcase',
        'Client intake forms',
        'Attorney bio pages',
        'Practice area pages'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-blue-800 to-blue-600'
    },
    {
      name: 'Fitness Studio Energy',
      industry: 'Fitness',
      price: 597,
      features: [
        'Vibrant orange/yellow design',
        'Class schedule with filters',
        'Online booking system',
        'Trainer profile pages',
        'Member portal login'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      name: 'Real Estate Luxury',
      industry: 'Real Estate',
      price: 897,
      features: [
        'Dark theme with gold accents',
        'Property listings (grid/map view)',
        'Virtual tour integration',
        'Advanced search filters',
        'Lead capture forms'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-yellow-800 to-yellow-600'
    },
    {
      name: 'E-Commerce Clean',
      industry: 'E-Commerce',
      price: 997,
      features: [
        'Minimal white design',
        'Product catalog with filters',
        'Shopping cart & checkout',
        'Inventory management',
        'Order tracking'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Medical Practice',
      industry: 'Medical',
      price: 797,
      features: [
        'Calming blue/white theme',
        'Appointment booking',
        'Patient portal',
        'Insurance information',
        'Service descriptions'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      name: 'Construction Pro',
      industry: 'More',
      price: 597,
      features: [
        'Bold construction theme',
        'Project portfolio',
        'Quote request forms',
        'Before/after galleries',
        'Service area maps'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-gray-700 to-yellow-700'
    },
    {
      name: 'Creative Agency',
      industry: 'More',
      price: 697,
      features: [
        'Bold typography',
        'Portfolio showcase',
        'Case study pages',
        'Client logo grid',
        'Team member bios'
      ],
      includes: 'Contact forms, SEO, Mobile responsive, 1-week setup',
      gradient: 'from-pink-600 to-purple-600'
    }
  ]
  
  const filteredTemplates = selectedFilter === 'All' 
    ? templates 
    : templates.filter(t => t.industry === selectedFilter)
  
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative pt-40" style={{
        paddingBottom: spacing.section.vertical,
        paddingLeft: spacing.section.horizontal,
        paddingRight: spacing.section.horizontal
      }}>
        <div style={{ maxWidth: containers.full, margin: '0 auto' }}>
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
            <p className="text-gray-300" style={{ 
              fontSize: typography.body,
              maxWidth: containers.text,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Choose your industry. Customize your brand. Launch this week.
            </p>
          </motion.div>
          
          {/* 3D Template Mockups */}
          <motion.div
            style={{ marginBottom: spacing.content.gap }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <TemplateMockup3D />
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
              <TemplateCard key={index} {...template} />
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
}

function TemplateCard({ name, industry, price, features, includes, gradient }: TemplateCardProps) {
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
          className={`h-64 bg-gradient-to-br ${gradient} relative overflow-hidden cursor-pointer`}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-6xl font-bold">{name.charAt(0)}</div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">View Full Details</span>
          </div>
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
          
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold gradient-text">${price}</span>
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
          template={{ name, industry, price, features, includes, gradient }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

function TemplateModal({ template, onClose }: { template: TemplateCardProps; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <LiquidGlassCard 
          intensity="heavy"
          className="max-w-4xl w-full p-8 my-8"
        >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="float-right text-gray-400 hover:text-white text-3xl leading-none"
        >
          ×
        </button>
        
        <h2 className="text-4xl font-bold mb-4">{template.name}</h2>
        <p className="text-gray-400 mb-8">Industry: {template.industry}</p>
        
        {/* Multi-page Preview Placeholder */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {['Home', 'About', 'Services', 'Contact'].map((page) => (
            <div 
              key={page}
              className={`h-48 bg-gradient-to-br ${template.gradient} rounded-lg flex items-center justify-center`}
            >
              <span className="text-white/50 font-semibold">{page} Page</span>
            </div>
          ))}
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
