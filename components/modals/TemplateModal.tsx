'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export interface TemplateModalData {
  name: string
  industry: string
  price: number
  features: string[]
  includes: string
  gradient: string
  pageImages?: {
    home?: string
    about?: string
    services?: string
    contact?: string
  }
}

interface TemplateModalProps {
  template: TemplateModalData
  onClose: () => void
}

export function TemplateModal({ template, onClose }: TemplateModalProps) {
  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'services' | 'contact'>('home')
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
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
