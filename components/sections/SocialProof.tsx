'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Hours Saved Weekly', suffix: '' },
  { value: '100', label: 'Websites Delivered', suffix: '+' },
  { value: '24/7', label: 'AI Uptime', suffix: '' },
  { value: '99.9', label: 'Reliability', suffix: '%' }
]

export function SocialProof() {
  return (
    <section className="py-32 px-4 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Trusted by Businesses Worldwide
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/70 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-white/60 italic max-w-2xl mx-auto">
            "Testimonials coming soon from satisfied clients who've transformed their business with SolveXAI automation."
          </p>
        </div>
      </div>
    </section>
  )
}
