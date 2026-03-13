'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface PedestalProps {
  position: [number, number, number]
  height: number
  color: string
  label: string
}

function PricingPedestal({ position, height, color, label }: PedestalProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, height / 2, 0]}>
          <cylinderGeometry args={[0.8, 1, height, 32]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Top platform */}
        <mesh position={[0, height, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
          <meshStandardMaterial 
            color={color}
            metalness={1}
            roughness={0}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

export function PricingPedestals3D() {
  const pedestals: PedestalProps[] = [
    { position: [-3.5, 0, 0], height: 2, color: '#8B5CF6', label: 'Basic' },
    { position: [0, 0, 0], height: 3, color: '#3B82F6', label: 'Pro' },
    { position: [3.5, 0, 0], height: 4, color: '#00F0FF', label: 'Elite' }
  ]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '500px',
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, 10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[0, -5, 5]} intensity={0.3} color="#3B82F6" />
        
        {pedestals.map((pedestal, i) => (
          <PricingPedestal key={i} {...pedestal} />
        ))}
        
        {/* Base platform */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#0a0a0a"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </Canvas>
    </div>
  )
}
