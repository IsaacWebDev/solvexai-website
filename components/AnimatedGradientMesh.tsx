'use client'

import React from 'react'

export function AnimatedGradientMesh() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 240, 255, 0.08) 0%, transparent 70%),
          linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
        `,
        animation: 'mesh-move 20s ease-in-out infinite'
      }}
    >
      <style jsx>{`
        @keyframes mesh-move {
          0%, 100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
      `}</style>
      
      {/* Floating geometric shapes */}
      <FloatingShapes />
    </div>
  )
}

function FloatingShapes() {
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20
  }))

  return (
    <>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full opacity-10 blur-xl"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: shape.id % 3 === 0 
              ? 'rgba(139, 92, 246, 0.3)' 
              : shape.id % 3 === 1 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(0, 240, 255, 0.3)',
            animation: `float ${shape.duration}s ease-in-out infinite ${shape.delay}s`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
      `}</style>
    </>
  )
}
