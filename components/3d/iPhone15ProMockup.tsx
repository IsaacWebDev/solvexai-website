'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'

export function iPhone15ProMockup() {
  const [talking, setTalking] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTalking(prev => !prev)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative w-full h-[700px] flex items-center justify-center">
      {/* Sound Wave Rings */}
      {talking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <SoundWaveRing delay={0} color="rgba(139, 92, 246, 0.4)" />
          <SoundWaveRing delay={0.3} color="rgba(59, 130, 246, 0.4)" />
          <SoundWaveRing delay={0.6} color="rgba(0, 240, 255, 0.4)" />
        </div>
      )}
      
      {/* iPhone 15 Pro Frame with Floating Animation */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotateY: [-3, 3, -3],
          rotateX: [1, -1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1200px'
        }}
      >
        {/* iPhone Device Frame */}
        <div 
          className="relative"
          style={{
            width: '320px',
            height: '650px',
            background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
            borderRadius: '50px',
            padding: '12px',
            boxShadow: `
              0 30px 80px rgba(0, 0, 0, 0.6),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 2px 4px rgba(255, 255, 255, 0.05)
            `,
            border: '3px solid #3a3a3a',
            filter: talking ? 'drop-shadow(0 0 50px rgba(139, 92, 246, 0.7))' : 'none',
            transition: 'filter 0.4s ease-in-out'
          }}
        >
          {/* Side Buttons (Left - Volume) */}
          <div className="absolute left-0 top-32 w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l" style={{ transform: 'translateX(-3px)' }} />
          <div className="absolute left-0 top-48 w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-l" style={{ transform: 'translateX(-3px)' }} />
          
          {/* Side Button (Right - Power) */}
          <div className="absolute right-0 top-40 w-1 h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-r" style={{ transform: 'translateX(3px)' }} />
          
          {/* Screen */}
          <div 
            className="relative w-full h-full rounded-[42px] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
              boxShadow: 'inset 0 0 0 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* Dynamic Island */}
            <div 
              className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
              style={{
                width: '110px',
                height: '32px',
                background: '#000000',
                borderRadius: '20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
              }}
            >
              {/* Animated Waveform Inside Dynamic Island */}
              {talking && (
                <div className="flex items-center gap-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-purple-500 rounded-full"
                      animate={{
                        height: ['4px', '16px', '4px']
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 px-8 pt-2 pb-2 flex items-center justify-between text-white text-xs font-semibold z-10">
              <div className="flex items-center gap-1">
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"' }}>9:41</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Signal */}
                <div className="flex items-end gap-0.5">
                  {[8, 12, 16, 20].map((h, i) => (
                    <div key={i} className="w-1 bg-white rounded-sm" style={{ height: `${h}px` }} />
                  ))}
                </div>
                {/* WiFi */}
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                  <div className="w-6 h-3 border border-white rounded-sm flex items-center px-0.5">
                    <div className="w-full h-full bg-white rounded-sm" />
                  </div>
                  <div className="w-0.5 h-1.5 bg-white rounded-r-sm" />
                </div>
              </div>
            </div>
            
            {/* Incoming Call Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-between pt-24 pb-12 px-6">
              {/* Caller Info */}
              <div className="flex flex-col items-center text-center">
                <div className="text-sm text-gray-400 mb-8 tracking-wide">Incoming Call</div>
                
                {/* Avatar with Animated Ring */}
                <div className="relative mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                      filter: 'blur(20px)',
                      opacity: 0.6
                    }}
                    animate={{
                      scale: talking ? [1, 1.2, 1] : 1,
                      opacity: talking ? [0.6, 0.8, 0.6] : 0.6
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  <div 
                    className="relative w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                      boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    AI
                  </div>
                </div>
                
                <h2 className="text-3xl font-semibold text-white mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"' }}>
                  SolveXAI Assistant
                </h2>
                <p className="text-lg text-gray-400">Automated Receptionist</p>
              </div>
              
              {/* Action Buttons (iOS Style) */}
              <div className="w-full space-y-4">
                {/* Remind Me / Message */}
                <div className="flex items-center justify-center gap-8 mb-8">
                  <button className="flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-gray-800/60 backdrop-blur-lg flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                    </div>
                    <span className="text-xs">Remind Me</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-gray-800/60 backdrop-blur-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs">Message</span>
                  </button>
                </div>
                
                {/* Decline / Accept */}
                <div className="flex items-center justify-between px-4">
                  <button className="flex flex-col items-center gap-2 text-white">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform"
                      style={{
                        background: '#FF3B30',
                        boxShadow: '0 8px 30px rgba(255, 59, 48, 0.4)'
                      }}
                    >
                      <Phone className="w-7 h-7 rotate-135" />
                    </div>
                    <span className="text-sm font-medium">Decline</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-2 text-white">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform"
                      style={{
                        background: '#34C759',
                        boxShadow: '0 8px 30px rgba(52, 199, 89, 0.4)'
                      }}
                    >
                      <Phone className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-medium">Accept</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Screen Glass Reflection */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
                mixBlendMode: 'overlay'
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SoundWaveRing({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full border-2"
      style={{
        borderColor: color,
        width: '400px',
        height: '400px',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.6, 0.8],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  )
}
