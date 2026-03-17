'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

interface Template {
  id: string
  name: string
  description: string
  path: string
  color: string
  orbitRadius: number
  orbitSpeed: number
}

interface OrbitConfig {
  type: 'top' | 'main' | 'side'
  radius: number
  speed: number
}

const templates: (Template & { orbit: OrbitConfig })[] = [
  // Top Orbit (3 planets - semi-circle arc above)
  {
    id: 'restaurant',
    name: 'Restaurant Delight',
    description: 'Elegant dark luxury restaurant template with gold accents and sophisticated design',
    path: '/templates/restaurant',
    color: '#d4af37',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 }
  },
  {
    id: 'construction',
    name: 'Construction Pro',
    description: 'Bold construction website with yellow accents and professional industrial design',
    path: '/templates/construction',
    color: '#FDB927',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 }
  },
  {
    id: 'law',
    name: 'Law Firm Authority',
    description: 'Professional legal services template with navy blue and gold trustworthy aesthetic',
    path: '/templates/law',
    color: '#1B3A4B',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 }
  },
  
  // Main Orbit (4 planets - full circle)
  {
    id: 'fitness',
    name: 'Fitness Studio Energy',
    description: 'Energetic fitness gym template with navy blue design and athletic aesthetic',
    path: '/templates/fitness',
    color: '#2563eb',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 }
  },
  {
    id: 'real-estate',
    name: 'Real Estate Luxury',
    description: 'Luxury real estate template with white background and elegant gold accents',
    path: '/templates/real-estate',
    color: '#C9A961',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 }
  },
  {
    id: 'agency',
    name: 'Creative Agency Studio',
    description: 'Modern creative agency with dark background and bold purple-blue gradients',
    path: '/templates/agency',
    color: '#667eea',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 }
  },
  {
    id: 'medical',
    name: 'Medical Practice Care',
    description: 'Clean professional healthcare template with soft blue accents and calming design',
    path: '/templates/medical',
    color: '#4A90E2',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 }
  },
  
  // Side Orbit (2 planets - vertical tilted ring)
  {
    id: 'ecommerce',
    name: 'E-Commerce Clean',
    description: 'Apple-style minimal e-commerce template with white background and clean typography',
    path: '/templates/ecommerce',
    color: '#1a1a1a',
    orbitRadius: 3.8,
    orbitSpeed: 0.22,
    orbit: { type: 'side', radius: 3.8, speed: 0.22 }
  },
  {
    id: 'service',
    name: 'ServicePro',
    description: 'Professional service business template with versatile design and modern aesthetic',
    path: '/templates/service',
    color: '#00c0ff',
    orbitRadius: 3.8,
    orbitSpeed: 0.22,
    orbit: { type: 'side', radius: 3.8, speed: 0.22 }
  }
]

function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 2 + Math.random() * 4
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      const usesCyan = Math.random() > 0.5
      const color = new THREE.Color(usesCyan ? '#00d0ff' : '#a855f7')
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(particles.colors, 3))
    return geo
  }, [particles])
  
  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function SolvexAICore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08
      if (glowRef.current) {
        glowRef.current.scale.setScalar(scale)
      }
    }
  })
  
  return (
    <group>
      {/* Wireframe geometric sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial
          color="#00d0ff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Inner glow - cyan */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#00d0ff"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      
      {/* Outer glow - purple */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      
      <pointLight color="#00d0ff" intensity={5} distance={12} />
      <pointLight color="#a855f7" intensity={3} distance={10} />
    </group>
  )
}

function OrbitRing({ radius, type }: { radius: number, type: 'top' | 'main' | 'side' }) {
  const line = useMemo(() => {
    let points: THREE.Vector3[]
    
    if (type === 'top') {
      // Semi-circle arc above the center
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        Math.PI, 2 * Math.PI, // Top half only
        false,
        0
      )
      const pts = curve.getPoints(50)
      points = pts.map(p => new THREE.Vector3(p.x, 1, p.y))
    } else if (type === 'main') {
      // Full circular orbit
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
      )
      const pts = curve.getPoints(100)
      points = pts.map(p => new THREE.Vector3(p.x, 0, p.y))
    } else {
      // Side/vertical orbit (tilted 90 degrees)
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
      )
      const pts = curve.getPoints(100)
      // Rotate to vertical orientation
      points = pts.map(p => new THREE.Vector3(0, p.x, p.y))
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: '#00d0ff',
      transparent: true,
      opacity: type === 'main' ? 0.2 : 0.12
    })
    return new THREE.LineLoop(geometry, material)
  }, [radius, type])
  
  return <primitive object={line} />
}

function TemplatePlanet({ 
  template, 
  onHover, 
  onClick, 
  isHovered,
  isActive,
  index,
  totalInOrbit
}: { 
  template: Template & { orbit: OrbitConfig }
  onHover: (id: string | null) => void
  onClick: (template: Template) => void
  isHovered: boolean
  isActive: boolean
  index: number
  totalInOrbit: number
}) {
  const planetRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (planetRef.current) {
      const baseOffset = (index / totalInOrbit) * (template.orbit.type === 'top' ? Math.PI : 2 * Math.PI)
      const time = state.clock.elapsedTime * template.orbit.speed
      
      if (template.orbit.type === 'top') {
        // Top arc - semi-circle above center
        // Animate from π to 2π (top half only)
        const angle = Math.PI + (time % Math.PI) + baseOffset
        planetRef.current.position.x = Math.cos(angle) * template.orbit.radius
        planetRef.current.position.y = 1.5 + Math.abs(Math.sin(angle)) * 0.5 // Elevated arc
        planetRef.current.position.z = Math.sin(angle) * template.orbit.radius
      } else if (template.orbit.type === 'main') {
        // Main horizontal ring
        const angle = time + baseOffset
        planetRef.current.position.x = Math.cos(angle) * template.orbit.radius
        planetRef.current.position.y = 0
        planetRef.current.position.z = Math.sin(angle) * template.orbit.radius
      } else {
        // Vertical side ring (rotated 90° on Y axis)
        const angle = time + baseOffset
        planetRef.current.position.x = Math.sin(angle) * template.orbit.radius * 0.3 // Slight X offset
        planetRef.current.position.y = Math.cos(angle) * template.orbit.radius
        planetRef.current.position.z = Math.sin(angle) * template.orbit.radius
      }
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (isHovered || isActive) {
        const targetScale = 1.3
        meshRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale),
          0.1
        )
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02
    }
  })
  
  return (
    <group ref={planetRef}>
      {/* Planet orbit ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial
          color={template.color}
          transparent
          opacity={isHovered || isActive ? 0.5 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(template.id) }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(template) }}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshPhysicalMaterial
          color={template.color}
          emissive={template.color}
          emissiveIntensity={isHovered || isActive ? 1.5 : 0.5}
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Planet glow */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial
          color={template.color}
          transparent
          opacity={isHovered || isActive ? 0.4 : 0.2}
          depthWrite={false}
        />
      </mesh>
      
      {(isHovered || isActive) && (
        <pointLight
          color={template.color}
          intensity={3}
          distance={4}
        />
      )}
    </group>
  )
}

function TemplateGalaxyScene({ 
  onTemplateClick, 
  activeTemplate,
  hoveredId,
  setHoveredId 
}: { 
  onTemplateClick: (template: Template) => void
  activeTemplate: Template | null
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
}) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 5, 12)
    camera.lookAt(0, 0, 0)
  }, [camera])
  
  // Group templates by orbit type
  const orbitGroups = useMemo(() => {
    const groups = {
      top: templates.filter(t => t.orbit.type === 'top'),
      main: templates.filter(t => t.orbit.type === 'main'),
      side: templates.filter(t => t.orbit.type === 'side')
    }
    return groups
  }, [])
  
  // Get unique orbit configurations
  const orbitConfigs = useMemo(() => {
    const configs: Array<{ radius: number, type: 'top' | 'main' | 'side' }> = []
    const seen = new Set<string>()
    
    templates.forEach(t => {
      const key = `${t.orbit.type}-${t.orbit.radius}`
      if (!seen.has(key)) {
        seen.add(key)
        configs.push({ radius: t.orbit.radius, type: t.orbit.type })
      }
    })
    
    return configs
  }, [])
  
  return (
    <group>
      <ambientLight intensity={0.1} />
      
      <SolvexAICore />
      
      <EnergyParticles />
      
      {/* Top orbit planets */}
      {orbitGroups.top.map((template, i) => (
        <TemplatePlanet
          key={template.id}
          template={template}
          index={i}
          totalInOrbit={orbitGroups.top.length}
          onHover={setHoveredId}
          onClick={onTemplateClick}
          isHovered={hoveredId === template.id}
          isActive={activeTemplate?.id === template.id}
        />
      ))}
      
      {/* Main orbit planets */}
      {orbitGroups.main.map((template, i) => (
        <TemplatePlanet
          key={template.id}
          template={template}
          index={i}
          totalInOrbit={orbitGroups.main.length}
          onHover={setHoveredId}
          onClick={onTemplateClick}
          isHovered={hoveredId === template.id}
          isActive={activeTemplate?.id === template.id}
        />
      ))}
      
      {/* Side orbit planets */}
      {orbitGroups.side.map((template, i) => (
        <TemplatePlanet
          key={template.id}
          template={template}
          index={i}
          totalInOrbit={orbitGroups.side.length}
          onHover={setHoveredId}
          onClick={onTemplateClick}
          isHovered={hoveredId === template.id}
          isActive={activeTemplate?.id === template.id}
        />
      ))}
    </group>
  )
}

export function TemplateGalaxy() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  
  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
  }
  
  const closeCard = () => {
    setSelectedTemplate(null)
  }
  
  const hoveredTemplate = templates.find(t => t.id === hoveredId)
  
  return (
    <div className="relative w-full h-[700px]">
      <Canvas
        camera={{ position: [0, 5, 12], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <TemplateGalaxyScene
          onTemplateClick={handleTemplateClick}
          activeTemplate={selectedTemplate}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      </Canvas>
      
      {/* Hover tooltip */}
      {hoveredTemplate && !selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="px-6 py-3 rounded-xl backdrop-blur-xl bg-black/80 border border-cyan-500/30">
            <p className="text-white font-semibold text-lg">{hoveredTemplate.name}</p>
          </div>
        </motion.div>
      )}
      
      {/* Template preview card */}
      <AnimatePresence>
        {selectedTemplate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md z-10"
              onClick={closeCard}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div
                className="relative p-10 rounded-3xl backdrop-blur-3xl border-2 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(5, 10, 25, 0.95), rgba(10, 15, 35, 0.95))',
                  borderColor: selectedTemplate.color,
                  minWidth: '500px',
                  maxWidth: '600px',
                  boxShadow: `0 0 60px ${selectedTemplate.color}50, 0 25px 80px rgba(0,0,0,0.6)`
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCard}
                  className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors text-3xl leading-none"
                >
                  ×
                </motion.button>
                
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedTemplate.color}, ${selectedTemplate.color}80)`,
                      boxShadow: `0 8px 32px ${selectedTemplate.color}60`
                    }}
                  />
                  
                  <h3 className="text-3xl font-bold mb-3" style={{ color: selectedTemplate.color }}>
                    {selectedTemplate.name}
                  </h3>
                  
                  <p className="text-gray-300 text-base leading-relaxed">
                    {selectedTemplate.description}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <motion.a
                    href={selectedTemplate.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all text-white text-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${selectedTemplate.color}, ${selectedTemplate.color}dd)`,
                      boxShadow: `0 8px 24px ${selectedTemplate.color}60`
                    }}
                  >
                    View Demo
                  </motion.a>
                  
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all text-white text-center border-2"
                    style={{
                      borderColor: selectedTemplate.color,
                      background: 'rgba(0,0,0,0.3)'
                    }}
                  >
                    Use Template
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Instructions */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <motion.p 
          className="text-sm text-gray-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hover over planets to explore templates • Click to view details
        </motion.p>
      </div>
    </div>
  )
}
