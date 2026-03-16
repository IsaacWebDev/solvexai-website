'use client'

import React, { useState } from 'react'
import { Shield } from 'lucide-react'

interface GuaranteeBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'inline' | 'prominent'
  children?: React.ReactNode
}

export function GuaranteeBadge({ 
  size = 'md', 
  variant = 'inline',
  children 
}: GuaranteeBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Size configurations
  const sizeConfig = {
    sm: {
      padding: '6px 12px',
      fontSize: '12px',
      iconSize: '14px',
      gap: '6px'
    },
    md: {
      padding: '10px 16px',
      fontSize: '14px',
      iconSize: '16px',
      gap: '8px'
    },
    lg: {
      padding: '14px 20px',
      fontSize: '16px',
      iconSize: '20px',
      gap: '10px'
    }
  }
  
  const config = sizeConfig[size]
  
  // Variant styles
  const isProminent = variant === 'prominent'
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="guarantee-badge-container"
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <div
        className="guarantee-badge"
        style={{
          display: 'flex',
          flexDirection: isProminent ? 'column' : 'row',
          alignItems: 'center',
          gap: config.gap,
          padding: config.padding,
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(74, 158, 126, 0.15) 0%, rgba(74, 158, 126, 0.05) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(74, 158, 126, 0.3)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(74, 158, 126, 0.4), 0 0 40px rgba(74, 158, 126, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)'
            : '0 0 15px rgba(74, 158, 126, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.03)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          userSelect: 'none',
          fontSize: config.fontSize,
          fontWeight: isProminent ? '600' : '500',
          color: 'white',
          whiteSpace: isProminent ? 'normal' : 'nowrap',
          textAlign: isProminent ? 'center' : 'left'
        }}
      >
        {children || (
          <>
            <Shield className="w-5 h-5 text-green-400" />
            <span>14-Day Money-Back Guarantee</span>
          </>
        )}
      </div>
      
      {/* Tooltip */}
      {isHovered && (
        <div
          className="guarantee-tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '10px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(15, 15, 20, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(74, 158, 126, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            fontSize: '13px',
            color: '#d1d5db',
            whiteSpace: 'nowrap',
            zIndex: 100,
            animation: 'tooltipFadeIn 0.2s ease-out',
            pointerEvents: 'none'
          }}
        >
          Changed your mind? Email <strong style={{ color: '#4A9E7E' }}>hello@solvexai.com</strong> within 14 days for instant refund
          
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(15, 15, 20, 0.95)'
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
