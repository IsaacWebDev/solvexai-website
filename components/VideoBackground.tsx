'use client'

import { useEffect, useRef } from 'react'

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Ensure video plays (some browsers require user interaction)
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err)
      })
    }
  }, [])

  return (
    <>
      {/* Video layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        style={{
          filter: 'brightness(0.9) contrast(1.15) saturate(1.2) blur(0.5px)',
          transform: 'scale(1.05)', // Slight zoom to hide edges after blur
        }}
      >
        <source src="/backgrounds/neural-network.mp4" type="video/mp4" />
      </video>
      
      {/* Glass morphism overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 180, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 220, 255, 0.06) 0%, transparent 50%),
            linear-gradient(180deg, rgba(0, 10, 30, 0.4) 0%, rgba(0, 5, 20, 0.6) 100%)
          `,
          backdropFilter: 'blur(1px)',
        }}
      />
      
      {/* Frosted glass texture */}
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.01) 0px,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.01) 0px,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Subtle vignette */}
      <div 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </>
  )
}
