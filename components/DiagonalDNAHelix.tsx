'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

function PhotorealisticDNA() {
  const groupRef = useRef<THREE.Group>(null)
  
  const { backbones, basePairs } = useMemo(() => {
    const backbones: any[] = []
    const basePairs: any[] = []
    
    // Realistic DNA parameters
    const helixRadius = 1.0
    const risePerBase = 0.34
    const basesPerTurn = 10.5
    const totalBases = 100
    const diagonalLength = 25
    
    for (let i = 0; i < totalBases; i++) {
      const t = (i / basesPerTurn) * Math.PI * 2
      const progress = i / totalBases
      
      // DIAGONAL: bottom-left → top-right
      const diagonalX = (progress * diagonalLength) - (diagonalLength / 2)
      const diagonalY = (progress * diagonalLength) - (diagonalLength / 2)
      const rise = i * risePerBase
      
      // Strand 1
      const strand1 = {
        x: diagonalX + Math.cos(t) * helixRadius,
        y: diagonalY,
        z: Math.sin(t) * helixRadius + rise
      }
      
      // Strand 2 (opposite)
      const strand2 = {
        x: diagonalX + Math.cos(t + Math.PI) * helixRadius,
        y: diagonalY,
        z: Math.sin(t + Math.PI) * helixRadius + rise
      }
      
      backbones.push(strand1, strand2)
      
      // Base pairs (A-T or G-C)
      if (i % 2 === 0) {
        const baseType = Math.random() > 0.5 ? 'AT' : 'GC'
        basePairs.push({
          start: strand1,
          end: strand2,
          type: baseType,
          colors: baseType === 'AT'
            ? { base1: '#FF6B9D', base2: '#C44569' }
            : { base1: '#4ECDC4', base2: '#1A535C' }
        })
      }
    }
    
    return { backbones, basePairs }
  }, [])
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <group ref={groupRef}>
      {/* Phosphate backbone tubes */}
      {backbones.map((point, i) => {
        if (i > 0 && i % 2 === 0) {
          const prev = backbones[i - 2]
          const start = new THREE.Vector3(prev.x, prev.y, prev.z)
          const end = new THREE.Vector3(point.x, point.y, point.z)
          const direction = end.clone().sub(start)
          const length = direction.length()
          
          return (
            <mesh
              key={`backbone-${i}`}
              position={[
                (prev.x + point.x) / 2,
                (prev.y + point.y) / 2,
                (prev.z + point.z) / 2
              ]}
              rotation={[
                Math.atan2(direction.y, Math.sqrt(direction.x**2 + direction.z**2)),
                Math.atan2(direction.x, direction.z),
                0
              ]}
            >
              <cylinderGeometry args={[0.15, 0.15, length, 16]} />
              <meshPhysicalMaterial
                color="#8B5CF6"
                emissive="#8B5CF6"
                emissiveIntensity={0.4}
                metalness={0.3}
                roughness={0.4}
                transmission={0.1}
                thickness={0.5}
              />
            </mesh>
          )
        }
        return null
      })}
      
      {/* Base pairs (A-T / G-C) */}
      {basePairs.map((pair, i) => {
        const start = new THREE.Vector3(pair.start.x, pair.start.y, pair.start.z)
        const end = new THREE.Vector3(pair.end.x, pair.end.y, pair.end.z)
        const mid = start.clone().lerp(end, 0.5)
        const direction = end.clone().sub(start)
        const length = direction.length()
        
        return (
          <group key={`base-${i}`}>
            {/* Base 1 */}
            <mesh position={[
              start.x + direction.x * 0.25,
              start.y + direction.y * 0.25,
              start.z + direction.z * 0.25
            ]}>
              <boxGeometry args={[0.3, 0.15, 0.15]} />
              <meshPhysicalMaterial
                color={pair.colors.base1}
                emissive={pair.colors.base1}
                emissiveIntensity={0.6}
              />
            </mesh>
            
            {/* Base 2 */}
            <mesh position={[
              end.x - direction.x * 0.25,
              end.y - direction.y * 0.25,
              end.z - direction.z * 0.25
            ]}>
              <boxGeometry args={[0.3, 0.15, 0.15]} />
              <meshPhysicalMaterial
                color={pair.colors.base2}
                emissive={pair.colors.base2}
                emissiveIntensity={0.6}
              />
            </mesh>
            
            {/* Hydrogen bonds */}
            <mesh position={[mid.x, mid.y, mid.z]}>
              <cylinderGeometry args={[0.04, 0.04, length * 0.5, 8]} />
              <meshPhysicalMaterial
                color="#00F0FF"
                emissive="#00F0FF"
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export function DiagonalDNAHelix() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[0, 0, 10]} intensity={1.5} color="#00F0FF" />
        
        <PhotorealisticDNA />
        
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.4} />
          <DepthOfField focusDistance={0.01} focalLength={0.1} bokehScale={2} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
