'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

// ===== CENTRAL AI BRAIN =====
function AIBrain() {
  const groupRef = useRef<THREE.Group>(null)
  const wireframeSphereRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08
      groupRef.current.scale.setScalar(scale)
      
      // Slow rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })
  
  // Generate neural network nodes
  const neuralNodes = useMemo(() => {
    const nodes = []
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 1.2
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      nodes.push({ position: [x, y, z], key: i })
    }
    return nodes
  }, [])
  
  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh ref={wireframeSphereRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Neural network nodes */}
      {neuralNodes.map((node) => (
        <mesh key={node.key} position={node.position as [number, number, number]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
      
      {/* Central glow */}
      <pointLight color="#ffffff" intensity={4} distance={8} />
      
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#e0e0e0"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

// ===== TEMPLATE PATH (Purple - Left) =====
function TemplatePath({ hovered, onClick }: { hovered: boolean; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const [blockPositions] = useState(() => {
    return [0, 1, 2, 3, 4].map((i) => ({
      x: -3.5,
      y: i * 0.6 - 1.2,
      z: 0,
      delay: i * 0.3
    }))
  })
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Animate scale on hover
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Connecting line from brain */}
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={hovered ? 1.2 : 0.4}
        />
      </mesh>
      
      {/* Stacking blocks */}
      {blockPositions.map((pos, i) => (
        <AnimatedBlock
          key={i}
          position={[pos.x, pos.y, pos.z]}
          color="#8B5CF6"
          delay={pos.delay}
          hovered={hovered}
        />
      ))}
      
      {/* Particles flowing */}
      <FlowingParticles 
        start={[-1, 0, 0]} 
        end={[-3.5, 0, 0]} 
        color="#8B5CF6"
        count={5}
      />
    </group>
  )
}

// ===== CUSTOM PATH (Blue - Top) =====
function CustomPath({ hovered, onClick }: { hovered: boolean; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Organic circuit board trace positions
  const nodes = useMemo(() => {
    return [
      { pos: [0, 2.5, 0], size: 0.2 },
      { pos: [-0.5, 3.2, 0], size: 0.15 },
      { pos: [0.5, 3.2, 0], size: 0.15 },
      { pos: [0, 3.8, 0], size: 0.18 },
      { pos: [-0.8, 4.2, 0], size: 0.12 },
      { pos: [0.8, 4.2, 0], size: 0.12 }
    ]
  }, [])
  
  useFrame(() => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Connecting line from brain */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.05, 1.3, 0.05]} />
        <meshStandardMaterial 
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={hovered ? 1.2 : 0.4}
        />
      </mesh>
      
      {/* Custom nodes with different shapes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          {i % 3 === 0 && (
            <mesh>
              <boxGeometry args={[node.size, node.size, node.size]} />
              <meshStandardMaterial 
                color="#3B82F6"
                emissive="#3B82F6"
                emissiveIntensity={hovered ? 1.5 : 0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
          {i % 3 === 1 && (
            <mesh>
              <sphereGeometry args={[node.size / 2, 16, 16]} />
              <meshStandardMaterial 
                color="#3B82F6"
                emissive="#3B82F6"
                emissiveIntensity={hovered ? 1.5 : 0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
          {i % 3 === 2 && (
            <mesh>
              <coneGeometry args={[node.size / 2, node.size, 4]} />
              <meshStandardMaterial 
                color="#3B82F6"
                emissive="#3B82F6"
                emissiveIntensity={hovered ? 1.5 : 0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
        </group>
      ))}
      
      {/* Connecting traces between nodes */}
      {nodes.slice(0, -1).map((node, i) => {
        const nextNode = nodes[i + 1]
        const start = new THREE.Vector3(...node.pos as [number, number, number])
        const end = new THREE.Vector3(...nextNode.pos as [number, number, number])
        const mid = start.clone().lerp(end, 0.5)
        const length = start.distanceTo(end)
        
        return (
          <mesh key={`trace-${i}`} position={[mid.x, mid.y, mid.z]}>
            <boxGeometry args={[0.03, length, 0.03]} />
            <meshStandardMaterial 
              color="#3B82F6"
              emissive="#3B82F6"
              emissiveIntensity={hovered ? 1.0 : 0.3}
            />
          </mesh>
        )
      })}
      
      {/* Particles flowing */}
      <FlowingParticles 
        start={[0, 1, 0]} 
        end={[0, 4, 0]} 
        color="#3B82F6"
        count={6}
      />
    </group>
  )
}

// ===== AI RECEPTIONIST PATH (Cyan - Right) =====
function AIReceptionistPath({ hovered, onClick }: { hovered: boolean; onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const waveRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (waveRef.current) {
      // Pulsing sound waves
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15
      waveRef.current.scale.setScalar(scale)
    }
    
    if (groupRef.current) {
      const targetScale = hovered ? 1.1 : 1
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })
  
  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Connecting line from brain */}
      <mesh position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.8, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={hovered ? 1.2 : 0.4}
        />
      </mesh>
      
      {/* Phone icon (simplified) */}
      <group position={[3.5, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.5, 0.05]} />
          <meshStandardMaterial 
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={hovered ? 1.5 : 0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Sound waves */}
      <group ref={waveRef} position={[3.5, 0.5, 0]}>
        {[0.4, 0.7, 1.0].map((radius, i) => (
          <mesh key={i}>
            <torusGeometry args={[radius, 0.02, 8, 32]} />
            <meshStandardMaterial 
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={hovered ? 1.0 - i * 0.2 : 0.3 - i * 0.1}
              transparent
              opacity={0.6 - i * 0.15}
            />
          </mesh>
        ))}
      </group>
      
      {/* Calendar grid */}
      <group position={[3.5, -0.8, 0]}>
        {[0, 1, 2].map((row) => 
          [0, 1, 2].map((col) => (
            <mesh 
              key={`${row}-${col}`}
              position={[col * 0.15 - 0.15, row * 0.15 - 0.15, 0]}
            >
              <boxGeometry args={[0.12, 0.12, 0.02]} />
              <meshStandardMaterial 
                color="#00F0FF"
                emissive="#00F0FF"
                emissiveIntensity={hovered ? 1.5 : 0.5}
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))
        )}
      </group>
      
      {/* Particles flowing */}
      <FlowingParticles 
        start={[1, 0, 0]} 
        end={[3.5, 0, 0]} 
        color="#00F0FF"
        count={5}
      />
    </group>
  )
}

// ===== ANIMATED BLOCK COMPONENT =====
function AnimatedBlock({ 
  position, 
  color, 
  delay,
  hovered
}: { 
  position: [number, number, number]
  color: string
  delay: number
  hovered: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [dropped, setDropped] = useState(false)
  
  useFrame((state) => {
    if (!dropped && state.clock.elapsedTime > delay) {
      setDropped(true)
    }
    
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })
  
  return (
    <mesh 
      ref={meshRef}
      position={position}
    >
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.5 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// ===== FLOWING PARTICLES =====
function FlowingParticles({ 
  start, 
  end, 
  color, 
  count 
}: { 
  start: [number, number, number]
  end: [number, number, number]
  color: string
  count: number
}) {
  const particlesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const progress = (state.clock.elapsedTime * 0.3 + i / count) % 1
        
        const x = start[0] + (end[0] - start[0]) * progress
        const y = start[1] + (end[1] - start[1]) * progress
        const z = start[2] + (end[2] - start[2]) * progress
        
        particle.position.set(x, y, z)
      })
    }
  })
  
  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
          <pointLight color={color} intensity={0.5} distance={1} />
        </mesh>
      ))}
    </group>
  )
}

// ===== ROTATING GEARS =====
function RotatingGear({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.08, 8, 8]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  )
}

// ===== MOUSE PARALLAX CAMERA =====
function MouseParallaxCamera() {
  const { camera } = useThree()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useFrame(() => {
    camera.position.x += (mousePos.x * 2 - camera.position.x) * 0.05
    camera.position.y += (mousePos.y * 2 + 5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return null
}

// ===== MAIN COMPONENT =====
export function AutomationFlowVisualization() {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  
  const handlePathClick = (path: string) => {
    setSelectedPath(selectedPath === path ? null : path)
  }
  
  return (
    <div style={{ 
      width: '100%', 
      height: '600px',
      position: 'relative',
      background: 'radial-gradient(circle at center, rgba(16,16,32,0.95), rgba(0,0,0,1))',
      borderRadius: '16px',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-path]')) {
        setHoveredPath(target.closest('[data-path]')?.getAttribute('data-path') || null)
      }
    }}
    onMouseLeave={() => setHoveredPath(null)}
    >
      <Canvas>
        {/* Camera with parallax */}
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <MouseParallaxCamera />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
        <pointLight position={[-10, 10, 10]} intensity={0.6} color="#3B82F6" />
        <pointLight position={[0, -5, 5]} intensity={0.4} color="#00F0FF" />
        
        {/* Central AI Brain */}
        <AIBrain />
        
        {/* Three Automation Pathways */}
        <TemplatePath 
          hovered={hoveredPath === 'template'} 
          onClick={() => handlePathClick('template')}
        />
        <CustomPath 
          hovered={hoveredPath === 'custom'} 
          onClick={() => handlePathClick('custom')}
        />
        <AIReceptionistPath 
          hovered={hoveredPath === 'ai'} 
          onClick={() => handlePathClick('ai')}
        />
        
        {/* Rotating gears at intersections */}
        <RotatingGear position={[-1.5, 0, 0]} color="#8B5CF6" />
        <RotatingGear position={[0, 1.5, 0]} color="#3B82F6" />
        <RotatingGear position={[1.5, 0, 0]} color="#00F0FF" />
        
        {/* Auto-rotation controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={!selectedPath}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Interactive labels */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '32px',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.8)',
          fontWeight: '600',
          pointerEvents: 'none'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            opacity: hoveredPath === 'template' || hoveredPath === null ? 1 : 0.4,
            transition: 'opacity 0.3s'
          }}
        >
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#8B5CF6',
            boxShadow: hoveredPath === 'template' ? '0 0 12px #8B5CF6' : 'none'
          }} />
          <span>Template</span>
        </div>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            opacity: hoveredPath === 'custom' || hoveredPath === null ? 1 : 0.4,
            transition: 'opacity 0.3s'
          }}
        >
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#3B82F6',
            boxShadow: hoveredPath === 'custom' ? '0 0 12px #3B82F6' : 'none'
          }} />
          <span>Custom</span>
        </div>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            opacity: hoveredPath === 'ai' || hoveredPath === null ? 1 : 0.4,
            transition: 'opacity 0.3s'
          }}
        >
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#00F0FF',
            boxShadow: hoveredPath === 'ai' ? '0 0 12px #00F0FF' : 'none'
          }} />
          <span>AI Receptionist</span>
        </div>
      </div>
      
      {/* Feature tags on hover */}
      {hoveredPath && (
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          padding: '16px 24px',
          borderRadius: '12px',
          border: `1px solid ${
            hoveredPath === 'template' ? '#8B5CF6' : 
            hoveredPath === 'custom' ? '#3B82F6' : '#00F0FF'
          }`,
          color: 'white',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          pointerEvents: 'none',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          {hoveredPath === 'template' && 'Pre-built templates • Fast setup • Affordable'}
          {hoveredPath === 'custom' && 'Fully customized • Unlimited features • Your vision'}
          {hoveredPath === 'ai' && '24/7 AI assistant • Booking automation • Human-like'}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
