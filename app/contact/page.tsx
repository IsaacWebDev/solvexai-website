'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui'

export default function ContactPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: [] as string[],
    industry: '',
    project: '',
    budget: '',
    timeline: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const handleCheckbox = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.includes(value)
        ? prev.interest.filter(i => i !== value)
        : [...prev.interest, value]
    }))
  }
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }
  
  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }
  
  const canProceed = () => {
    if (step === 1) return formData.name && formData.email && formData.interest.length > 0
    if (step === 2) return formData.industry && formData.project
    if (step === 3) return formData.budget && formData.timeline
    return false
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mark user as booked (prevents exit-intent popup)
    localStorage.setItem('userBooked', 'true')
    
    setIsSubmitting(false)
    setSubmitted(true)
  }
  
  if (submitted) {
    return (
      <>
        <Navigation />
        <AnimatedGradientMesh />
        
        <main className="relative pt-32 pb-32 px-4 min-h-screen flex items-center justify-center" style={{ paddingTop: '120px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <LiquidGlassCard intensity="medium" className="p-16">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-8xl mb-8"
              >
                ✓
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-light mb-6">Message Sent</h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-16 max-w-lg mx-auto">
                We'll email you within 2 hours. Usually faster.
              </p>
              
              <div className="text-left max-w-md mx-auto space-y-8">
                <Step
                  number="1"
                  title="We'll email you within 2 hours"
                  description="Usually faster"
                />
                <Step
                  number="2"
                  title="15-minute discovery call"
                  description="Understand your needs"
                />
                <Step
                  number="3"
                  title="Custom proposal sent"
                  description="Clear pricing + timeline"
                />
                <Step
                  number="4"
                  title="Kickoff within 48 hours"
                  description="If you approve"
                />
              </div>
            </LiquidGlassCard>
          </motion.div>
        </main>
      </>
    )
  }
  
  return (
    <>
      <Navigation />
      <AnimatedGradientMesh />
      
      <main className="relative pt-32 pb-32 px-4 min-h-screen" style={{ paddingTop: '120px' }}>
        <div className="max-w-3xl mx-auto">
          
          {/* Hero - Centered */}
          <div className="text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight"
            >
              Let's Build Something<br />Amazing Together
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 font-light"
            >
              Tell us about your project in 3 simple steps
            </motion.p>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-3 mb-16">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step === num 
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50 scale-110' 
                    : step > num
                    ? 'bg-purple-600/30 text-purple-300'
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    step > num ? 'bg-purple-600/30' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Form Card - Centered */}
          <LiquidGlassCard intensity="heavy" className="p-12 md:p-16">
            <form onSubmit={handleSubmit}>
              
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-light mb-3">Your Information</h2>
                      <p className="text-gray-400 font-light">How can we reach you?</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-4 text-gray-300">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:outline-none transition-all text-lg font-light placeholder:text-gray-600"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-4 text-gray-300">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:outline-none transition-all text-lg font-light placeholder:text-gray-600"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-6 text-gray-300">I'm interested in</label>
                      <div className="space-y-4">
                        <CheckboxOption 
                          label="Website Template" 
                          sublabel="$497-997"
                          checked={formData.interest.includes('template')}
                          onChange={() => handleCheckbox('template')}
                        />
                        <CheckboxOption 
                          label="Custom Development" 
                          sublabel="$1,997-7,997"
                          checked={formData.interest.includes('custom')}
                          onChange={() => handleCheckbox('custom')}
                        />
                        <CheckboxOption 
                          label="AI Receptionist" 
                          sublabel="$997/month"
                          checked={formData.interest.includes('ai')}
                          onChange={() => handleCheckbox('ai')}
                        />
                        <CheckboxOption 
                          label="Not sure yet" 
                          sublabel="Let's talk"
                          checked={formData.interest.includes('unsure')}
                          onChange={() => handleCheckbox('unsure')}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Project Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-light mb-3">Your Project</h2>
                      <p className="text-gray-400 font-light">Help us understand your needs</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-4 text-gray-300">Industry</label>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:outline-none transition-all text-lg font-light"
                      >
                        <option value="" className="bg-gray-900">Select your industry</option>
                        <option value="restaurant" className="bg-gray-900">Restaurant</option>
                        <option value="law" className="bg-gray-900">Law Firm</option>
                        <option value="fitness" className="bg-gray-900">Fitness</option>
                        <option value="realestate" className="bg-gray-900">Real Estate</option>
                        <option value="ecommerce" className="bg-gray-900">E-Commerce</option>
                        <option value="medical" className="bg-gray-900">Medical</option>
                        <option value="construction" className="bg-gray-900">Construction</option>
                        <option value="creative" className="bg-gray-900">Creative Agency</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-4 text-gray-300">Tell us about your project</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-purple-500 focus:outline-none transition-all text-lg font-light resize-none placeholder:text-gray-600"
                        placeholder="What are you looking to build? What problems are you trying to solve?"
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Budget & Timeline */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-light mb-3">Budget & Timeline</h2>
                      <p className="text-gray-400 font-light">Help us create the perfect proposal</p>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-6 text-gray-300">Budget</label>
                      <div className="space-y-4">
                        <RadioOption 
                          label="Under $1,000" 
                          sublabel="Template tier"
                          name="budget"
                          value="under1k"
                          checked={formData.budget === 'under1k'}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                        <RadioOption 
                          label="$1,000-$3,000" 
                          sublabel="Custom lite"
                          name="budget"
                          value="1k-3k"
                          checked={formData.budget === '1k-3k'}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                        <RadioOption 
                          label="$3,000-$5,000" 
                          sublabel="Full custom"
                          name="budget"
                          value="3k-5k"
                          checked={formData.budget === '3k-5k'}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                        <RadioOption 
                          label="$5,000+" 
                          sublabel="Enterprise"
                          name="budget"
                          value="5k+"
                          checked={formData.budget === '5k+'}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-light mb-6 text-gray-300">When do you need this?</label>
                      <div className="space-y-4">
                        <RadioOption 
                          label="ASAP" 
                          sublabel="1-2 weeks"
                          name="timeline"
                          value="asap"
                          checked={formData.timeline === 'asap'}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        />
                        <RadioOption 
                          label="This month" 
                          sublabel="2-4 weeks"
                          name="timeline"
                          value="month"
                          checked={formData.timeline === 'month'}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        />
                        <RadioOption 
                          label="Next 3 months" 
                          sublabel="Flexible timeline"
                          name="timeline"
                          value="3months"
                          checked={formData.timeline === '3months'}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        />
                        <RadioOption 
                          label="Just exploring" 
                          sublabel="No rush"
                          name="timeline"
                          value="exploring"
                          checked={formData.timeline === 'exploring'}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-16 gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`px-8 py-4 rounded-xl font-light text-lg transition-all ${
                    step === 1 
                      ? 'invisible' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ← Back
                </button>
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="px-12 py-5 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30 hover:scale-105"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !canProceed()}
                    className="px-12 py-5 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30 hover:scale-105"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                )}
              </div>
              
            </form>
            
            {/* Alternative Contact - Below form */}
            {step === 1 && (
              <div className="mt-16 pt-12 border-t border-white/10 text-center">
                <p className="text-gray-400 font-light">
                  Prefer email? <a href="mailto:hello@solvexai.org" className="text-purple-400 hover:text-purple-300 transition-colors">hello@solvexai.org</a>
                </p>
              </div>
            )}
          </LiquidGlassCard>
          
        </div>
      </main>
    </>
  )
}

function CheckboxOption({ label, sublabel, checked, onChange }: { label: string; sublabel: string; checked: boolean; onChange: () => void }) {
  return (
    <label 
      onClick={onChange}
      className={`flex items-center justify-between p-5 rounded-xl cursor-pointer group transition-all border-2 relative z-10 ${
        checked 
          ? 'bg-purple-600/10 border-purple-500' 
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-4 pointer-events-none">
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked 
            ? 'bg-purple-600 border-purple-600' 
            : 'border-white/30'
        }`}>
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div>
          <div className="font-light text-lg">{label}</div>
          <div className="text-sm text-gray-400 font-light">{sublabel}</div>
        </div>
      </div>
    </label>
  )
}

function RadioOption({ label, sublabel, name, value, checked, onChange }: { label: string; sublabel: string; name: string; value: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className={`flex items-center justify-between p-5 rounded-xl cursor-pointer group transition-all border-2 relative z-10 ${
      checked 
        ? 'bg-purple-600/10 border-purple-500' 
        : 'bg-white/5 border-white/10 hover:border-white/20'
    }`}>
      <div className="flex items-center gap-4 pointer-events-none">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          checked 
            ? 'border-purple-600' 
            : 'border-white/30'
        }`}>
          {checked && (
            <div className="w-3 h-3 rounded-full bg-purple-600" />
          )}
        </div>
        <div>
          <div className="font-light text-lg">{label}</div>
          <div className="text-sm text-gray-400 font-light">{sublabel}</div>
        </div>
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer z-20"
      />
    </label>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 text-xl font-semibold shadow-lg shadow-purple-500/50">
        {number}
      </div>
      <div className="pt-3">
        <h3 className="text-xl font-light mb-1">{title}</h3>
        <p className="text-gray-400 text-sm font-light">{description}</p>
      </div>
    </div>
  )
}
