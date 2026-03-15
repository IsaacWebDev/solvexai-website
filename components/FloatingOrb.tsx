'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'

interface RippleRingProps {
  startTime: number
}

function RippleRing({ startTime }: RippleRingProps) {
  const ringRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      const elapsed = Date.now() - startTime
      const progress = elapsed / 1000 // 1 second duration
      
      if (progress < 1) {
        ringRef.current.scale.set(1 + progress * 2, 1 + progress * 2, 1 + progress * 2)
        const material = ringRef.current.material as any
        if (material) {
          material.opacity = 1 - progress
        }
      }
    }
  })
  
  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[2.5, 2.7, 32]} />
      <meshBasicMaterial color="#8B5CF6" transparent opacity={1} />
    </mesh>
  )
}

function InteractiveOrb() {
  const meshRef = useRef<Mesh>(null)
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<number[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [pulse, setPulse] = useState(0)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTarget({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Pulsing animation every 2 seconds
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse(p => p + 1)
    }, 2000)
    
    return () => clearInterval(pulseInterval)
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth follow mouse with spring physics (lerp for smoothness)
      const currentPos = meshRef.current.position
      const targetPos = new Vector3(target.x * 2, target.y * 2, 0)
      
      currentPos.lerp(targetPos, 0.05) // Smooth cursor following
      
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      // Pulsing effect (independent of hover, every 2s)
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * Math.PI) * 0.08
      
      // Combine pulsing with hover effect
      if (isHovered) {
        const hoverScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
        meshRef.current.scale.set(pulseScale * hoverScale, pulseScale * hoverScale, pulseScale * hoverScale)
      } else {
        meshRef.current.scale.set(pulseScale, pulseScale, pulseScale)
      }
    }
  })
  
  const handleClick = () => {
    setRipples(prev => [...prev, Date.now()])
    setTimeout(() => {
      setRipples(prev => prev.slice(1))
    }, 1000)
  }
  
  return (
    <group>
      <Sphere 
        ref={meshRef} 
        args={[2.5, 100, 100]}
        onClick={handleClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <MeshDistortMaterial
          color="#8B5CF6"
          distort={0.4 + (ripples.length * 0.2)}
          speed={1.5 + (isHovered ? 1.0 : 0)}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Multi-layer glow */}
      <Sphere args={[2.7, 64, 64]}>
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} />
      </Sphere>
      <Sphere args={[2.9, 64, 64]}>
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.05} />
      </Sphere>
      <Sphere args={[3.2, 64, 64]}>
        <meshBasicMaterial color="#6D28D9" transparent opacity={0.03} />
      </Sphere>
      
      {/* Ripple rings */}
      {ripples.map((time, i) => (
        <RippleRing key={time} startTime={time} />
      ))}
    </group>
  )
}

export function FloatingOrb() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      pointerEvents: 'auto',
      cursor: 'pointer'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3B82F6" />
        <InteractiveOrb />
      </Canvas>
    </div>
  )
}
