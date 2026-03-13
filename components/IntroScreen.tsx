'use client';

import { useState, useEffect } from 'react';
import MatrixRain from './MatrixRain';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    // Pulsing animation for "Press ENTER"
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1000);
    
    // Listen for ENTER key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onEnter]);
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a0a',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Matrix code rain background */}
      <MatrixRain />
      
      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '3rem',
          animation: 'fadeIn 1s ease-in-out'
        }}>
          <img 
            src="/solvexai-logo-transparent.png" 
            alt="SolveXAI"
            style={{
              maxWidth: '800px',
              width: '85vw',
              height: 'auto',
              filter: 'drop-shadow(0 0 60px rgba(139, 92, 246, 0.9))'
            }}
          />
        </div>
        
        {/* Press ENTER text */}
        <div
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 600,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            opacity: pulse ? 1 : 0.4,
            transition: 'opacity 0.3s ease-in-out',
            textShadow: '0 0 20px rgba(139, 92, 246, 0.8)'
          }}
        >
          Press <span style={{
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            display: 'inline-block',
            margin: '0 0.5rem',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
          }}>ENTER</span> to Continue
        </div>
        
        {/* Click alternative (mobile) */}
        <button
          onClick={onEnter}
          style={{
            marginTop: '2rem',
            padding: '1.25rem 3rem',
            fontSize: '1.125rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            border: 'none',
            borderRadius: '100px',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 25px 80px rgba(139, 92, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(139, 92, 246, 0.4)';
          }}
        >
          Click to Enter
        </button>
        
        {/* Tagline */}
        <div style={{
          marginTop: '3rem',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontStyle: 'italic',
          maxWidth: '600px'
        }}>
          AI-Powered Automation for Modern Businesses
        </div>
      </div>
      
      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
