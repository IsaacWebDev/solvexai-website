'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui'
import { Search, Sparkles, Check, ArrowRight } from 'lucide-react'

interface Automation {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeSaved: string
}

const automationDatabase: Record<string, Automation[]> = {
  restaurant: [
    { title: 'Auto-post daily specials to Instagram', description: 'New menu items → Instagram posts', difficulty: 'easy', timeSaved: '30 min/day' },
    { title: 'Send review requests after dining', description: 'Payment confirmed → Email review link', difficulty: 'easy', timeSaved: '1 hr/week' },
    { title: 'Sync reservations to Google Calendar', description: 'OpenTable/Resy → Calendar events', difficulty: 'medium', timeSaved: '45 min/day' },
    { title: 'Inventory low stock alerts', description: 'Inventory < threshold → Slack notification', difficulty: 'medium', timeSaved: '2 hrs/week' },
    { title: 'Auto-generate staff schedules', description: 'Availability data → Optimized shifts', difficulty: 'hard', timeSaved: '3 hrs/week' }
  ],
  'law firm': [
    { title: 'Client intake form automation', description: 'Form submitted → Create case + calendar', difficulty: 'medium', timeSaved: '2 hrs/week' },
    { title: 'Document generation from templates', description: 'Case data → PDF contracts', difficulty: 'medium', timeSaved: '5 hrs/week' },
    { title: 'Court date reminders', description: '48 hrs before → Email + SMS clients', difficulty: 'easy', timeSaved: '1 hr/week' },
    { title: 'Billable hours tracking', description: 'Calendar events → Invoice items', difficulty: 'hard', timeSaved: '4 hrs/week' }
  ],
  fitness: [
    { title: 'Class booking confirmations', description: 'Booking made → SMS confirmation', difficulty: 'easy', timeSaved: '1 hr/day' },
    { title: 'Membership renewal reminders', description: '7 days before expiry → Email reminder', difficulty: 'easy', timeSaved: '30 min/day' },
    { title: 'Social media workout posts', description: 'New workout video → Multi-platform post', difficulty: 'medium', timeSaved: '2 hrs/week' },
    { title: 'PT session notes to client app', description: 'Session completed → Client receives notes', difficulty: 'medium', timeSaved: '1 hr/day' }
  ],
  'real estate': [
    { title: 'New listing to all platforms', description: 'Create listing → Zillow, Realtor, social', difficulty: 'medium', timeSaved: '3 hrs/listing' },
    { title: 'Showing request automation', description: 'Request received → Check calendar + confirm', difficulty: 'easy', timeSaved: '2 hrs/week' },
    { title: 'Market report generation', description: 'Weekly → PDF report to clients', difficulty: 'hard', timeSaved: '4 hrs/week' },
    { title: 'Lead follow-up sequences', description: 'New lead → Drip email campaign', difficulty: 'medium', timeSaved: '5 hrs/week' }
  ],
  ecommerce: [
    { title: 'Order confirmation emails', description: 'Order placed → Branded email', difficulty: 'easy', timeSaved: 'Instant' },
    { title: 'Abandoned cart recovery', description: '24 hrs no purchase → Discount email', difficulty: 'medium', timeSaved: '10% more sales' },
    { title: 'Inventory sync across platforms', description: 'Shopify → Amazon, eBay, Etsy', difficulty: 'hard', timeSaved: '10 hrs/week' },
    { title: 'Customer review requests', description: 'Delivery confirmed → Review request', difficulty: 'easy', timeSaved: '2 hrs/week' }
  ],
  default: [
    { title: 'Email to Slack notifications', description: 'Important email → Slack alert', difficulty: 'easy', timeSaved: 'Real-time' },
    { title: 'Meeting notes to CRM', description: 'Google Meet ends → Notes in Salesforce', difficulty: 'medium', timeSaved: '1 hr/day' },
    { title: 'Invoice generation', description: 'Project complete → Send invoice', difficulty: 'medium', timeSaved: '3 hrs/week' },
    { title: 'Social media scheduler', description: 'Content calendar → Auto-post', difficulty: 'easy', timeSaved: '5 hrs/week' }
  ]
}

export function AutomationScanner() {
  const [businessType, setBusinessType] = useState('')
  const [results, setResults] = useState<Automation[]>([])
  const [scanning, setScanning] = useState(false)
  
  const handleScan = () => {
    setScanning(true)
    setResults([])
    
    setTimeout(() => {
      const key = businessType.toLowerCase()
      const automations = automationDatabase[key] || automationDatabase.default
      setResults(automations)
      setScanning(false)
    }, 2000)
  }
  
  const difficultyColors = {
    easy: 'from-green-500 to-emerald-600',
    medium: 'from-yellow-500 to-orange-600',
    hard: 'from-red-500 to-pink-600'
  }
  
  return (
    <section className="py-32 px-6 relative z-10 flex justify-center">
      <LiquidGlassCard intensity="heavy" className="p-8 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              🔍 Automation Potential Scanner
            </h2>
            <p className="text-gray-400">
              Tell us your business type and we'll find what can be automated
            </p>
          </div>
        
        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            placeholder="e.g., Restaurant, Law Firm, E-commerce..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            onClick={handleScan}
            disabled={!businessType || scanning}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5" />
            Scan
          </motion.button>
        </div>
        
        {/* Scanning Animation */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-16 h-16 text-purple-400" />
              </motion.div>
              <p className="text-gray-400">Analyzing automation opportunities...</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && !scanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-green-400 font-bold">
                  <Check className="w-5 h-5" />
                  Found {results.length} automation opportunities
                </div>
              </div>
              
              <div className="space-y-4">
                {results.map((automation, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <h3 className="text-white font-bold">{automation.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm ml-8 mb-3">
                          {automation.description}
                        </p>
                        <div className="flex items-center gap-4 ml-8">
                          <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColors[automation.difficulty]} text-white font-medium`}>
                            {automation.difficulty.charAt(0).toUpperCase() + automation.difficulty.slice(1)}
                          </span>
                          <span className="text-xs text-gray-400">
                            ⚡ Saves {automation.timeSaved}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: results.length * 0.1 + 0.3 }}
              >
                <p className="text-gray-400 mb-4">
                  Ready to implement these automations?
                </p>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Build These For Me →
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </LiquidGlassCard>
    </section>
  )
}
