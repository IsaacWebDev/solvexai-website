'use client';

import { ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
  return (
    <div 
      className={`holographic-card-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Shimmer effect layer */}
      <div 
        className="holographic-shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(0, 240, 255, 0.2), rgba(139, 92, 246, 0.2))',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />
      
      <div 
        className="relative z-10 p-8"
        style={{ position: 'relative', zIndex: 10, padding: '2rem' }}
      >
        {children}
      </div>
      
      {/* Holographic glitch scan effect */}
      <div 
        className="holographic-scan"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.1) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scan 2s linear infinite',
          pointerEvents: 'none',
        }}
      />
      
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        .holographic-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .holographic-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
