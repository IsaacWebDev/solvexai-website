'use client'

import { useState, FormEvent } from 'react'
import { Navigation } from '@/components/Navigation'
import { InteractiveParticles } from '@/components/InteractiveParticles'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', service: '', message: '' })
        setErrors({})
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <Navigation />
      <InteractiveParticles />
      
      <main className="relative z-10 min-h-screen bg-black px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70">
              Ready to automate your business? Let's talk about your needs.
            </p>
          </motion.div>
          
          <Card>
            {isSuccess ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                <p className="text-white/70 text-lg mb-8">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="secondary">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-white font-medium mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.service ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors`}
                  >
                    <option value="">Select a service</option>
                    <option value="Website Templates">Website Templates ($297+)</option>
                    <option value="Custom Development">Custom Development ($1,997+)</option>
                    <option value="AI Receptionist">AI Receptionist ($1,997+)</option>
                    <option value="Not Sure">Not Sure / Multiple Services</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-sm mt-1">{errors.service}</p>
                  )}
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400">{errors.submit}</p>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="relative w-full px-8 py-4 rounded-full font-medium text-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </Card>
          
          {/* Contact Info */}
          <motion.div
            className="mt-16 text-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="mb-2">Prefer email?</p>
            <a href="mailto:contact@solvexai.com" className="text-purple-400 hover:text-purple-300 transition-colors text-lg">
              contact@solvexai.com
            </a>
          </motion.div>
        </div>
      </main>
    </>
  )
}
