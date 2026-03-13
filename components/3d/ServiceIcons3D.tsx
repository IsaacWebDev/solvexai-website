'use client'

import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ServiceIconProps {
  position: [number, number, number]
  color: string
  geometry: 'box' | 'sphere' | 'torus'
}

function ServiceIcon({ position, color, geometry }: ServiceIconProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export function ServiceIcons3D() {
  const icons: ServiceIconProps[] = [
    { position: [-3, 0, 0], color: '#8B5CF6', geometry: 'sphere' },
    { position: [0, 0, 0], color: '#3B82F6', geometry: 'box' },
    { position: [3, 0, 0], color: '#00F0FF', geometry: 'torus' }
  ]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '400px',
      position: 'relative',
      margin: '0 auto'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        {icons.map((icon, i) => (
          <ServiceIcon key={i} {...icon} />
        ))}
      </Canvas>
    </div>
  )
}
