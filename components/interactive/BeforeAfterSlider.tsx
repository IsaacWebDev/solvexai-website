'use client'

import { useState, useEffect } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@/components/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  beforeStats: string
  afterStats: string
  name?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  beforeStats,
  afterStats,
  name = 'Client'
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])
  
  return (
    <LiquidGlassCard intensity="medium" className="p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-bold text-center mb-6">
          {name}'s Transformation
        </h3>
        
        <div className="relative rounded-xl overflow-hidden">
          <ReactCompareSlider
            itemOne={
              <div className="relative w-full h-[400px]">
                <ReactCompareSliderImage
                  src={beforeImage}
                  alt="Before automation"
                  className="object-cover"
                />
                {/* Before Overlay */}
                <div className="absolute top-4 left-4 backdrop-blur-xl bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3">
                  <div className="text-red-400 font-bold text-sm mb-1">BEFORE</div>
                  <div className="text-white text-xs">{beforeLabel}</div>
                  <div className="text-red-300 font-bold mt-2">{beforeStats}</div>
                </div>
              </div>
            }
            itemTwo={
              <div className="relative w-full h-[400px]">
                <ReactCompareSliderImage
                  src={afterImage}
                  alt="After automation"
                  className="object-cover"
                />
                {/* After Overlay */}
                <div className="absolute top-4 right-4 backdrop-blur-xl bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-3">
                  <div className="text-green-400 font-bold text-sm mb-1">AFTER</div>
                  <div className="text-white text-xs">{afterLabel}</div>
                  <div className="text-green-300 font-bold mt-2">{afterStats}</div>
                </div>
              </div>
            }
            position={position}
            onPositionChange={setPosition}
            style={{
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          />
          
          {/* Drag Instruction */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ← Drag to compare →
            </motion.div>
          )}
          
          {/* Mobile Tap Buttons */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <motion.button
                onClick={() => setPosition(0)}
                className="bg-red-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
                Before
              </motion.button>
              <motion.button
                onClick={() => setPosition(50)}
                className="bg-purple-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold"
                whileTap={{ scale: 0.95 }}
              >
                Split
              </motion.button>
              <motion.button
                onClick={() => setPosition(100)}
                className="bg-green-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                After
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Stats Comparison */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-red-400 text-sm mb-1">Time Spent Daily</div>
            <div className="text-2xl font-bold text-red-400">3 hours</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 text-sm mb-1">Time Spent Daily</div>
            <div className="text-2xl font-bold text-green-400">10 minutes</div>
          </div>
        </div>
      </motion.div>
    </LiquidGlassCard>
  )
}

// Preset testimonial sliders
export function EmailBeforeAfter() {
  return (
    <BeforeAfterSlider
      beforeImage="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80"
      afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
      beforeLabel="125 unread emails"
      afterLabel="Inbox zero"
      beforeStats="3 hrs/day"
      afterStats="10 min/day"
      name="Sarah Chen"
    />
  )
}

export function InvoiceBeforeAfter() {
  return (
    <BeforeAfterSlider
      beforeImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
      afterImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
      beforeLabel="Manual invoicing"
      afterLabel="Auto-generated"
      beforeStats="2 hrs/week"
      afterStats="5 sec/invoice"
      name="Marcus Johnson"
    />
  )
}
