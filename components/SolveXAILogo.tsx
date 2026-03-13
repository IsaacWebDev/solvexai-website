'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function SolveXAILogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative z-10"
      style={{ textAlign: 'center' }}
    >
      {/* Logo with enhanced visibility */}
      <div style={{
        position: 'relative',
        filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
        marginBottom: '3rem'
      }}>
        <Image
          src="/logo-transparent.png"
          alt="SolveXAI"
          width={1000}
          height={250}
          priority
          style={{
            width: 'clamp(400px, 70vw, 1000px)',
            height: 'auto',
            filter: 'brightness(2) contrast(1.5)'
          }}
        />
      </div>
      
      {/* Slogan + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          marginTop: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <p style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
          color: '#ffffff',
          lineHeight: 1.6,
          fontWeight: 500,
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
        }}>
          Automate 20+ hours of work every week.
        </p>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'rgba(255, 255, 255, 0.85)',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: '2.5rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
        }}>
          Let AI handle the repetitive tasks while you focus on growth.
        </p>
        
        {/* CTA Button */}
        <motion.a
          href="/services"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-block',
            padding: '1.25rem 3rem',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            borderRadius: '50px',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          Explore Our Services →
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
