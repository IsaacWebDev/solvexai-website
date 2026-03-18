'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface CinematicEntranceProps {
  onComplete: () => void
  gateImageUrl: string
  videoUrl: string
}

export function CinematicEntrance({ onComplete, gateImageUrl, videoUrl }: CinematicEntranceProps) {
  const [stage, setStage] = useState<'gate' | 'video' | 'complete'>('gate')
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const handleEnter = () => {
    setStage('video')
    // Start video playback
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.error('Video autoplay failed:', err)
          // If autoplay fails, skip to complete
          setTimeout(() => handleVideoEnd(), 1000)
        })
      }
    }, 100)
  }
  
  const handleVideoEnd = () => {
    setStage('complete')
    setTimeout(() => onComplete(), 800) // Fade out duration
  }
  
  // Auto-play video when stage changes
  useEffect(() => {
    if (stage === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video play failed:', err)
        handleVideoEnd()
      })
    }
  }, [stage])
  
  if (stage === 'complete') {
    return null // Component unmounts, homepage shows
  }
  
  return (
    <div className="fixed inset-0 z-[200] bg-black">
      <AnimatePresence mode="wait">
        {stage === 'gate' && (
          <motion.div
            key="gate"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={gateImageUrl}
                alt="Entrance"
                fill
                className="object-cover"
                priority
                quality={100}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Enter Button */}
            <motion.button
              onClick={handleEnter}
              className="relative z-10 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                
                {/* Button */}
                <div className="relative backdrop-blur-xl bg-white/10 border-2 border-white/30 rounded-full px-12 py-6 transition-all group-hover:bg-white/20 group-hover:border-white/50">
                  <span className="text-white text-2xl font-light tracking-[0.3em] uppercase">
                    ENTER
                  </span>
                </div>
              </div>
            </motion.button>
            
            {/* Optional: Skip button */}
            <motion.button
              onClick={onComplete}
              className="absolute bottom-8 right-8 text-white/50 hover:text-white/80 text-sm transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Skip intro
            </motion.button>
          </motion.div>
        )}
        
        {stage === 'video' && (
          <motion.div
            key="video"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
              onEnded={handleVideoEnd}
              onError={() => {
                console.error('Video failed to load')
                handleVideoEnd() // Skip if video fails
              }}
              preload="auto"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </video>
            
            {/* Skip video button */}
            <motion.button
              onClick={handleVideoEnd}
              className="absolute bottom-8 right-8 backdrop-blur-xl bg-white/10 border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Skip →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
