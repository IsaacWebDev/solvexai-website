'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface SoundWaveProps {
  delay: number
  color: string
}

function SoundWave({ delay, color }: SoundWaveProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3
      const opacity = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.5 + 0.5
      meshRef.current.scale.set(scale, scale, 1)
      
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity = opacity * 0.4
      }
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.08, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

function PhoneBody() {
  const [talking, setTalking] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTalking(prev => !prev)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <group>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Phone body */}
        <RoundedBox args={[1.2, 2.5, 0.3]} radius={0.15}>
          <meshStandardMaterial 
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>
        
        {/* Screen */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[1, 2.2]} />
          <meshStandardMaterial 
            color={talking ? '#8B5CF6' : '#3B82F6'}
            emissive={talking ? '#8B5CF6' : '#3B82F6'}
            emissiveIntensity={talking ? 0.5 : 0.3}
          />
        </mesh>
        
        {/* Speaker */}
        <mesh position={[0, 1, 0.16]}>
          <capsuleGeometry args={[0.02, 0.3, 4, 8]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </Float>
      
      {/* Sound waves when talking */}
      {talking && (
        <group>
          <SoundWave delay={0} color="#8B5CF6" />
          <SoundWave delay={0.3} color="#3B82F6" />
          <SoundWave delay={0.6} color="#00F0FF" />
        </group>
      )}
    </group>
  )
}

export function Phone3D() {
  return (
    <div style={{ 
      width: '100%', 
      height: '500px',
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
        <spotLight position={[0, 10, 10]} intensity={0.8} angle={0.3} penumbra={1} />
        
        <PhoneBody />
      </Canvas>
    </div>
  )
}
