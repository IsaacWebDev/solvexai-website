'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { X } from 'lucide-react'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export interface TemplateModalData {
  name: string
  industry: string
  price: number
  features: string[]
  includes: string
  gradient: string
  previewUrl?: string
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="max-h-[95vh] overflow-y-auto w-full max-w-6xl">
        <LiquidGlassCard 
          intensity="heavy"
          className="w-full p-8 pb-32"
        >
        {/* Close Button - Fixed Contrast */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Title + Industry + Price - Side by Side */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 text-center">
            <h2 className="text-4xl font-bold">{template.name}</h2>
            <p className="text-gray-400">Industry: {template.industry}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold gradient-text">${template.price}</div>
            <div className="text-sm text-gray-400">One-time payment</div>
          </div>
        </div>
        
        {/* Page Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { name: 'Home', key: 'home' as const },
            { name: 'About', key: 'about' as const },
            { name: 'Services', key: 'services' as const },
            { name: 'Contact', key: 'contact' as const }
          ].map((page) => (
            <button
              key={page.key}
              onClick={() => setSelectedPage(page.key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedPage === page.key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
        
        {/* Page Preview */}
        <div className="mb-8 rounded-lg overflow-hidden" style={{ maxHeight: '450px' }}>
          {template.pageImages?.[selectedPage] ? (
            <img 
              src={template.pageImages[selectedPage]} 
              alt={`${selectedPage} Page`}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '450px' }}
            />
          ) : (
            <div className={`w-full h-96 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
              <span className="text-white/50 font-semibold text-2xl">
                {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page
              </span>
            </div>
          )}
        </div>
        
        {/* Section Divider */}
        <div className="border-t border-white/10 my-8" />
        
        {/* Full Feature List */}
        <h3 className="text-2xl font-bold mb-4 mt-8">Complete Feature List</h3>
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
        
        {/* Section Divider */}
        <div className="border-t border-white/10 my-8" />
        
        {/* What's Customizable - Fixed Yellow Highlight */}
        <h3 className="text-2xl font-bold mb-4 mt-8">What's Customizable</h3>
        <ul className="space-y-2 mb-8 text-gray-300">
          <li className="text-gray-300">• Colors and fonts to match your brand</li>
          <li className="text-gray-300">• Logo and branding elements</li>
          <li className="text-gray-300">• All text and images</li>
          <li className="text-gray-300">• Contact information and social links</li>
        </ul>
        
        {/* Section Divider */}
        <div className="border-t border-white/10 my-8" />
        
        {/* Setup Timeline */}
        <h3 className="text-2xl font-bold mb-4 mt-8">Setup Timeline</h3>
        <p className="text-gray-300 mb-8">
          3-7 days from purchase to launch. We handle everything: design customization, 
          content migration, domain setup, and testing.
        </p>
        
        {/* Sticky CTA Bar with View Live Demo */}
        <div className="sticky bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/20 p-6 mt-8 flex items-center justify-between rounded-b-lg">
          {template.previewUrl && (
            <a 
              href={template.previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold flex items-center gap-2"
            >
              View Live Demo →
            </a>
          )}
          <Link href="/contact" className={template.previewUrl ? '' : 'mx-auto'}>
            <LiquidGlassButton variant="primary" size="lg">
              Purchase This Template
            </LiquidGlassButton>
          </Link>
        </div>
        </LiquidGlassCard>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
