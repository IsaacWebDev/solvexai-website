'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function VerticalHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  const helixPoints = useMemo(() => {
    const points = []
    const radius = 1.5
    const height = 20
    const turns = 5
    
    for (let i = 0; i < 150; i++) {
      const t = (i / 150) * turns * Math.PI * 2
      const y = (i / 150) * height - height / 2
      
      // Double helix strands
      points.push({
        x: Math.cos(t) * radius,
        y: y,
        z: Math.sin(t) * radius,
        color: i % 2 === 0 ? '#8B5CF6' : '#3B82F6'
      })
    }
    
    return points
  }, [])
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <group ref={groupRef}>
      {helixPoints.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={point.color}
            emissive={point.color}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

export function VerticalDNAHelix() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      transform: 'translateX(-50%)',
      width: '300px',
      zIndex: 2,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <VerticalHelix />
      </Canvas>
    </div>
  )
}
