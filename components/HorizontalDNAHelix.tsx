'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function DigitalDNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Generate realistic DNA helix points (horizontal)
  const helixData = useMemo(() => {
    const points: Array<{x: number, y: number, z: number, color: THREE.Color}> = []
    const lines: Array<{start: {x: number, y: number, z: number}, end: {x: number, y: number, z: number}}> = []
    const length = 30  // Horizontal length
    const radius = 1.2
    const turns = 4
    const segments = 200
    
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * turns * Math.PI * 2
      const x = (i / segments) * length - length / 2  // Horizontal (x-axis)
      
      // Strand 1 (top)
      const strand1 = {
        x: x,
        y: Math.cos(t) * radius,
        z: Math.sin(t) * radius,
        color: new THREE.Color(i % 2 === 0 ? '#8B5CF6' : '#3B82F6')
      }
      
      // Strand 2 (bottom, opposite phase)
      const strand2 = {
        x: x,
        y: Math.cos(t + Math.PI) * radius,
        z: Math.sin(t + Math.PI) * radius,
        color: new THREE.Color(i % 2 === 0 ? '#3B82F6' : '#8B5CF6')
      }
      
      points.push(strand1, strand2)
      
      // Connecting rungs every 10 segments
      if (i % 10 === 0 && i < segments - 1) {
        lines.push({
          start: strand1,
          end: strand2
        })
      }
    }
    
    return { points, lines }
  }, [])
  
  // Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation around x-axis (barrel roll effect)
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.15
    }
  })
  
  return (
    <group ref={groupRef}>
      {/* DNA spheres (nucleotides) */}
      {helixData.points.map((point, i) => (
        <mesh key={`sphere-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={point.color}
            emissive={point.color}
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Connecting rungs (base pairs) */}
      {helixData.lines.map((line, i) => {
        const start = new THREE.Vector3(line.start.x, line.start.y, line.start.z)
        const end = new THREE.Vector3(line.end.x, line.end.y, line.end.z)
        const direction = end.clone().sub(start)
        const length = direction.length()
        
        return (
          <mesh
            key={`rung-${i}`}
            position={[
              (line.start.x + line.end.x) / 2,
              (line.start.y + line.end.y) / 2,
              (line.start.z + line.end.z) / 2
            ]}
            rotation={[0, 0, Math.atan2(direction.y, direction.x)]}
          >
            <cylinderGeometry args={[0.04, 0.04, length, 8]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
      
      {/* Digital glow particles along helix */}
      {helixData.points.filter((_, i) => i % 5 === 0).map((point, i) => (
        <mesh key={`glow-${i}`} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial
            color={point.color}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export function HorizontalDNAHelix() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '400px',
      transform: 'translateY(-50%)',
      zIndex: 2,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#3B82F6" />
        <DigitalDNAHelix />
      </Canvas>
    </div>
  )
}
