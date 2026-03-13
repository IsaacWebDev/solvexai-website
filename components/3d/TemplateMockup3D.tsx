'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

interface MockupProps {
  position: [number, number, number]
  rotation: number
  color: string
}

function BrowserMockup({ position, rotation, color }: MockupProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      if (hovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })
  
  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <RoundedBox args={[4, 3, 0.1]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </RoundedBox>
      
      {/* Screen */}
      <mesh position={[0, -0.2, 0.06]}>
        <planeGeometry args={[3.8, 2.5]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Address bar */}
      <mesh position={[0, 1.2, 0.06]}>
        <planeGeometry args={[3.5, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

export function TemplateMockup3D() {
  const mockups: MockupProps[] = [
    { position: [-4, 0, -2], rotation: 0.3, color: '#8B5CF6' },
    { position: [0, 0, 0], rotation: 0, color: '#3B82F6' },
    { position: [4, 0, -2], rotation: -0.3, color: '#00F0FF' }
  ]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '500px',
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#8B5CF6" />
        
        {mockups.map((mockup, i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <BrowserMockup {...mockup} />
          </Float>
        ))}
      </Canvas>
    </div>
  )
}
