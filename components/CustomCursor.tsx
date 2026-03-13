'use client'

import { useState, useEffect } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    
    const handleMouseLeave = () => {
      setVisible(false)
    }
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseEnter)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseEnter)
    }
  }, [])
  
  if (!visible) return null
  
  return (
    <>
      {/* Main cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: hovering ? '40px' : '20px',
          height: hovering ? '40px' : '20px',
          borderRadius: '50%',
          border: '2px solid #8B5CF6',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          backgroundColor: hovering ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Trailing dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#8B5CF6',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.1s, top 0.1s'
        }}
      />
    </>
  )
}
