'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface OrbitalSphereProps {
  radius: number
  speed: number
  color: string
  size: number
  initialAngle: number
}

function OrbitalSphere({ radius, speed, color, size, initialAngle }: OrbitalSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const angleRef = useRef(initialAngle)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Update orbital angle
      angleRef.current += delta * speed
      
      // Calculate position in orbit
      const x = Math.cos(angleRef.current) * radius
      const z = Math.sin(angleRef.current) * radius
      
      meshRef.current.position.set(x, 0, z)
      
      // Gentle self-rotation
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x += delta * 0.3
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.5}
      />
      {/* Glow effect */}
      <pointLight color={color} intensity={1.5} distance={4} />
    </mesh>
  )
}

function AutomationCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      meshRef.current.scale.setScalar(scale)
      
      // Slow rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <group>
      {/* Central core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Inner glow */}
      <pointLight color="#ffffff" intensity={3} distance={6} />
      
      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function OrbitPath({ radius }: { radius: number }) {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
    )
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ 
      color: "#ffffff", 
      transparent: true, 
      opacity: 0.15 
    }))} />
  )
}

export function OrbitalAutomation3D() {
  return (
    <div style={{ 
      width: '100%', 
      height: '500px',
      position: 'relative',
      background: 'radial-gradient(circle at center, rgba(16,16,32,0.8), rgba(0,0,0,0.95))'
    }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Key lights */}
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[-10, 10, 10]} intensity={0.6} color="#3B82F6" />
        <pointLight position={[0, -5, 5]} intensity={0.4} color="#00F0FF" />
        
        {/* Central automation core */}
        <AutomationCore />
        
        {/* Orbit paths (subtle guides) */}
        <OrbitPath radius={2.5} />
        <OrbitPath radius={4} />
        <OrbitPath radius={5.5} />
        
        {/* Three orbiting spheres representing automation tiers */}
        
        {/* Template tier - Purple, smallest orbit, fastest */}
        <OrbitalSphere 
          radius={2.5}
          speed={1.0}
          color="#8B5CF6"
          size={0.4}
          initialAngle={0}
        />
        
        {/* Custom tier - Blue, medium orbit, medium speed */}
        <OrbitalSphere 
          radius={4}
          speed={0.7}
          color="#3B82F6"
          size={0.5}
          initialAngle={2.1}
        />
        
        {/* Enterprise tier - Cyan, largest orbit, slowest */}
        <OrbitalSphere 
          radius={5.5}
          speed={0.5}
          color="#00F0FF"
          size={0.6}
          initialAngle={4.2}
        />
        
        {/* Dark space background plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial 
            color="#050510"
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>
      </Canvas>
      
      {/* Overlay labels (optional - can be added later) */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '24px',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8B5CF6' }} />
          <span>Template</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3B82F6' }} />
          <span>Custom</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00F0FF' }} />
          <span>Enterprise</span>
        </div>
      </div>
    </div>
  )
}
