'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Mesh } from 'three'

function Orb() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[2.5, 100, 100]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

export function FloatingOrb() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none'
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
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#8B5CF6" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3B82F6" />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  )
}
