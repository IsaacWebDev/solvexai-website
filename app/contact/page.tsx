'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { ContactForm3D } from '@/components/3d/ContactForm3D'
import { motion } from 'framer-motion'
import { containers, spacing, typography } from '@/lib/design-system'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: [] as string[],
    industry: '',
    project: '',
    budget: '',
    timeline: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const handleCheckbox = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.includes(value)
        ? prev.interest.filter(i => i !== value)
        : [...prev.interest, value]
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }
  
  if (submitted) {
    return (
      <>
        <Navigation />
        <AnimatedGradientMesh />
        
        <main className="relative pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-2xl p-12">
              <div className="text-6xl mb-6">✓</div>
              <h1 className="text-4xl font-bold mb-4">Message Sent!</h1>
              <p className="text-xl text-gray-300 mb-8">
                We'll email you within 2 hours (usually faster)
              </p>
              <div className="text-left max-w-md mx-auto space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                  <div>
                    <div className="font-semibold text-white">We'll email you within 2 hours</div>
                    <div className="text-sm">(Usually faster)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                  <div>
                    <div className="font-semibold text-white">15-minute discovery call</div>
                    <div className="text-sm">(Understand your needs)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                  <div>
                    <div className="font-semibold text-white">Custom proposal sent</div>
                    <div className="text-sm">(Clear pricing + timeline)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                  <div>
                    <div className="font-semibold text-white">Kickoff within 48 hours</div>
                    <div className="text-sm">(If you approve)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
  
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone <span className="text-gray-400">(optional)</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                
                {/* Interest */}
                <div>
                  <label className="block text-sm font-medium mb-3">I'm interested in: *</label>
                  <div className="space-y-2">
                    <CheckboxOption 
                      label="Website Template ($297-997)" 
                      checked={formData.interest.includes('template')}
                      onChange={() => handleCheckbox('template')}
                    />
                    <CheckboxOption 
                      label="Custom Development ($1,997-7,997)" 
                      checked={formData.interest.includes('custom')}
                      onChange={() => handleCheckbox('custom')}
                    />
                    <CheckboxOption 
                      label="AI Receptionist ($1,997 + $297/mo)" 
                      checked={formData.interest.includes('ai')}
                      onChange={() => handleCheckbox('ai')}
                    />
                    <CheckboxOption 
                      label="Not sure yet" 
                      checked={formData.interest.includes('unsure')}
                      onChange={() => handleCheckbox('unsure')}
                    />
                  </div>
                </div>
                
                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium mb-2">Industry *</label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select your industry</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="law">Law Firm</option>
                    <option value="fitness">Fitness</option>
                    <option value="realestate">Real Estate</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="medical">Medical</option>
                    <option value="construction">Construction</option>
                    <option value="creative">Creative Agency</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about your project *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-3">Budget *</label>
                  <div className="space-y-2">
                    <RadioOption 
                      label="Under $1,000" 
                      name="budget"
                      value="under1k"
                      checked={formData.budget === 'under1k'}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                    <RadioOption 
                      label="$1,000-$3,000" 
                      name="budget"
                      value="1k-3k"
                      checked={formData.budget === '1k-3k'}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                    <RadioOption 
                      label="$3,000-$5,000" 
                      name="budget"
                      value="3k-5k"
                      checked={formData.budget === '3k-5k'}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                    <RadioOption 
                      label="$5,000+" 
                      name="budget"
                      value="5k+"
                      checked={formData.budget === '5k+'}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>
                
                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium mb-3">When do you need this? *</label>
                  <div className="space-y-2">
                    <RadioOption 
                      label="ASAP (1-2 weeks)" 
                      name="timeline"
                      value="asap"
                      checked={formData.timeline === 'asap'}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    />
                    <RadioOption 
                      label="This month" 
                      name="timeline"
                      value="month"
                      checked={formData.timeline === 'month'}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    />
                    <RadioOption 
                      label="Next 3 months" 
                      name="timeline"
                      value="3months"
                      checked={formData.timeline === '3months'}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    />
                    <RadioOption 
                      label="Just exploring" 
                      name="timeline"
                      value="exploring"
                      checked={formData.timeline === 'exploring'}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    />
                  </div>
                </div>
                
                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              
              {/* Alternative Contact */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                <p>Prefer email? <a href="mailto:hello@solvexai.org" className="text-purple-400 hover:text-purple-300">hello@solvexai.org</a></p>
              </div>
            </div>
            
            {/* Right: What Happens Next */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-8">What Happens Next</h2>
              
              <div className="space-y-8">
                <Step
                  number="1"
                  title="We'll email you within 2 hours"
                  description="(Usually faster)"
                />
                <Step
                  number="2"
                  title="15-minute discovery call"
                  description="(Understand your needs)"
                />
                <Step
                  number="3"
                  title="Custom proposal sent"
                  description="(Clear pricing + timeline)"
                />
                <Step
                  number="4"
                  title="Kickoff within 48 hours"
                  description="(If you approve)"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function CheckboxOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-600 transition-colors cursor-pointer"
      />
      <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  )
}

function RadioOption({ label, name, value, checked, onChange }: { label: string; name: string; value: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 cursor-pointer"
      />
      <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-lg shadow-purple-500/50">
        {number}
      </div>
      <div className="pt-2">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}
