'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
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
  const logoTexture = useLoader(THREE.TextureLoader, '/solvexai-logo-white.png')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTalking(prev => !prev)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <group>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* iPhone body - black rounded rectangle */}
        <RoundedBox args={[1.2, 2.6, 0.15]} radius={0.18}>
          <meshStandardMaterial 
            color="#000000"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
        
        {/* Screen with SolveXAI logo */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.1, 2.4]} />
          <meshStandardMaterial 
            color={talking ? '#1a1a2e' : '#16213e'}
            emissive={talking ? '#8B5CF6' : '#3B82F6'}
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* SolveXAI Logo on screen */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial 
            map={logoTexture} 
            transparent 
            opacity={0.9}
          />
        </mesh>
        
        {/* iPhone notch */}
        <mesh position={[0, 1.15, 0.08]}>
          <boxGeometry args={[0.25, 0.05, 0.01]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Camera in notch */}
        <mesh position={[-0.08, 1.15, 0.09]}>
          <circleGeometry args={[0.015, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
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
