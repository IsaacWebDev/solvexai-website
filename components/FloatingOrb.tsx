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
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth follow mouse with spring physics
      const currentPos = meshRef.current.position
      const targetPos = new Vector3(target.x * 2, target.y * 2, 0)
      
      currentPos.lerp(targetPos, 0.05)
      
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      // Pulsing effect when hovered
      if (isHovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
        meshRef.current.scale.set(scale, scale, scale)
      } else {
        meshRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1)
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
