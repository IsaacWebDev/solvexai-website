'use client'
import { motion } from 'framer-motion'
import { Button } from '../Button'
import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Automate?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join businesses saving 20+ hours weekly with AI automation.
          </p>
          
          <Link href="/contact">
            <Button variant="primary">Get Started Today</Button>
          </Link>
        </motion.div>
        
        <footer className="mt-32 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white/60">
              © 2025 SolveXAI. All rights reserved.
            </div>
            
            <div className="flex gap-8">
              <Link href="/services" className="text-white/60 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
