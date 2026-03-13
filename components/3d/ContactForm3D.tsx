'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface FloatingLabelProps {
  text: string
  position: [number, number, number]
  focused: boolean
  color: string
}

function FloatingLabel({ text, position, focused, color }: FloatingLabelProps) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = focused ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  return (
    <group ref={meshRef} position={position}>
      <Float enabled={focused} speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Center>
          <mesh>
            <boxGeometry args={[2, 0.5, 0.2]} />
            <meshStandardMaterial 
              color={focused ? color : '#1a1a1a'}
              emissive={focused ? color : '#000000'}
              emissiveIntensity={focused ? 0.5 : 0}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Center>
      </Float>
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial 
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export function ContactForm3D({ focusedField }: { focusedField: string | null }) {
  const fields = [
    { name: 'name', position: [0, 2, 0] as [number, number, number], color: '#8B5CF6' },
    { name: 'email', position: [0, 0.5, 0] as [number, number, number], color: '#3B82F6' },
    { name: 'message', position: [0, -1, 0] as [number, number, number], color: '#00F0FF' },
  ]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '400px',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, 10]} intensity={0.3} color="#8B5CF6" />
        
        <ParticleField />
        
        {fields.map((field) => (
          <FloatingLabel
            key={field.name}
            text={field.name}
            position={field.position}
            focused={focusedField === field.name}
            color={field.color}
          />
        ))}
      </Canvas>
    </div>
  )
}
