'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface TeamMemberProps {
  index: number
  total: number
  name: string
  role: string
  color: string
}

function TeamMember({ index, total, name, role, color }: TeamMemberProps) {
  const groupRef = useRef<THREE.Group>(null)
  const angle = (index / total) * Math.PI * 2
  const radius = 4
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.3
      const x = Math.cos(angle + time) * radius
      const z = Math.sin(angle + time) * radius
      groupRef.current.position.set(x, 0, z)
      
      // Face center
      groupRef.current.lookAt(0, 0, 0)
    }
  })
  
  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Avatar sphere */}
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial 
            color={color}
            metalness={0.6}
            roughness={0.4}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Sphere>
        
        {/* Ring around avatar */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

function CenterOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#8B5CF6"
        metalness={0.9}
        roughness={0.1}
        emissive="#8B5CF6"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  )
}

export function TeamOrbit3D() {
  const teamMembers: Omit<TeamMemberProps, 'index' | 'total'>[] = [
    { name: 'AI', role: 'Strategy', color: '#8B5CF6' },
    { name: 'Dev', role: 'Engineering', color: '#3B82F6' },
    { name: 'Design', role: 'Creative', color: '#00F0FF' },
    { name: 'Marketing', role: 'Growth', color: '#10B981' },
  ]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      position: 'relative'
    }}>
      <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#3B82F6" />
        
        {/* Center orb */}
        <CenterOrb />
        
        {/* Orbiting team members */}
        {teamMembers.map((member, i) => (
          <TeamMember 
            key={i}
            index={i}
            total={teamMembers.length}
            {...member}
          />
        ))}
        
        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      </Canvas>
    </div>
  )
}
