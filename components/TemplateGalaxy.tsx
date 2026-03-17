'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Html } from '@react-three/drei'
import { 
  UtensilsCrossed, 
  Scale, 
  Dumbbell, 
  Cross, 
  HardHat, 
  Sparkles, 
  ShoppingCart, 
  Home, 
  Settings 
} from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  path: string
  color: string
  orbitRadius: number
  orbitSpeed: number
  icon: 'restaurant' | 'law' | 'fitness' | 'ecommerce' | 'medical' | 'construction' | 'agency' | 'service' | 'realestate'
}

interface OrbitConfig {
  type: 'top' | 'main' | 'side'
  radius: number
  speed: number
}

const templates: (Template & { orbit: OrbitConfig })[] = [
  // Top arc: 3 planets (restaurant, construction, law)
  {
    id: 'restaurant',
    name: 'Restaurant Delight',
    description: 'Elegant dark luxury restaurant template with gold accents and sophisticated design',
    path: '/templates/restaurant',
    color: '#d4af37',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 },
    icon: 'restaurant'
  },
  {
    id: 'construction',
    name: 'Construction Pro',
    description: 'Bold construction website with yellow accents and professional industrial design',
    path: '/templates/construction',
    color: '#FDB927',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 },
    icon: 'construction'
  },
  {
    id: 'law',
    name: 'Law Firm Authority',
    description: 'Professional legal services template with navy blue and gold trustworthy aesthetic',
    path: '/templates/law',
    color: '#1B3A4B',
    orbitRadius: 4.5,
    orbitSpeed: 0.2,
    orbit: { type: 'top', radius: 4.5, speed: 0.2 },
    icon: 'law'
  },
  
  // Main ring: 4 planets (fitness, real-estate, agency, medical)
  {
    id: 'fitness',
    name: 'Fitness Studio Energy',
    description: 'Energetic fitness gym template with navy blue design and athletic aesthetic',
    path: '/templates/fitness',
    color: '#2563eb',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 },
    icon: 'fitness'
  },
  {
    id: 'real-estate',
    name: 'Real Estate Luxury',
    description: 'Luxury real estate template with white background and elegant gold accents',
    path: '/templates/real-estate',
    color: '#C9A961',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 },
    icon: 'realestate'
  },
  {
    id: 'agency',
    name: 'Creative Agency Studio',
    description: 'Modern creative agency with dark background and bold purple-blue gradients',
    path: '/templates/agency',
    color: '#667eea',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 },
    icon: 'agency'
  },
  {
    id: 'medical',
    name: 'Medical Practice Care',
    description: 'Clean professional healthcare template with soft blue accents and calming design',
    path: '/templates/medical',
    color: '#4A90E2',
    orbitRadius: 3.2,
    orbitSpeed: 0.18,
    orbit: { type: 'main', radius: 3.2, speed: 0.18 },
    icon: 'medical'
  },
  
  // Side ring: 2 planets (ecommerce, service)
  {
    id: 'ecommerce',
    name: 'E-Commerce Clean',
    description: 'Apple-style minimal e-commerce template with white background and clean typography',
    path: '/templates/ecommerce',
    color: '#1a1a1a',
    orbitRadius: 3.8,
    orbitSpeed: 0.22,
    orbit: { type: 'side', radius: 3.8, speed: 0.22 },
    icon: 'ecommerce'
  },
  {
    id: 'service',
    name: 'ServicePro',
    description: 'Professional service business template with versatile design and modern aesthetic',
    path: '/templates/service',
    color: '#00c0ff',
    orbitRadius: 3.8,
    orbitSpeed: 0.22,
    orbit: { type: 'side', radius: 3.8, speed: 0.22 },
    icon: 'service'
  }
]

// Icon component mapping
const IconComponents = {
  restaurant: UtensilsCrossed,
  law: Scale,
  fitness: Dumbbell,
  medical: Cross,
  construction: HardHat,
  agency: Sparkles,
  ecommerce: ShoppingCart,
  realestate: Home,
  service: Settings
}

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
      
      const color = new THREE.Color(Math.random() > 0.5 ? '#00d0ff' : '#a855f7')
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
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color="#00d0ff" wireframe transparent opacity={0.6} />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#00d0ff" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      
      <pointLight color="#00d0ff" intensity={5} distance={12} />
      <pointLight color="#a855f7" intensity={3} distance={10} />
    </group>
  )
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
  const orbitContainerRef = useRef<THREE.Group>(null)
  const planetGroupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Calculate static angle position on orbit
  const baseAngle = useMemo(() => {
    if (template.orbit.type === 'top') {
      // Top arc: distribute across π to 2π (top half)
      return Math.PI + (index / totalInOrbit) * Math.PI
    } else {
      // Full circle: distribute across 0 to 2π
      return (index / totalInOrbit) * 2 * Math.PI
    }
  }, [index, totalInOrbit, template.orbit.type])
  
  useFrame((state) => {
    if (!orbitContainerRef.current || !planetGroupRef.current) return
    
    // Rotate orbit container - this makes planets orbit
    orbitContainerRef.current.rotation.y = state.clock.elapsedTime * template.orbit.speed
    
    // Calculate position based on orbit type and static angle
    let x = 0, y = 0, z = 0
    
    if (template.orbit.type === 'top') {
      // Top arc - semi-circle above center
      x = Math.cos(baseAngle) * template.orbit.radius
      y = 1.5 + Math.abs(Math.sin(baseAngle)) * 0.5
      z = Math.sin(baseAngle) * template.orbit.radius
    } else if (template.orbit.type === 'main') {
      // Main horizontal ring at y=0
      x = Math.cos(baseAngle) * template.orbit.radius
      y = 0
      z = Math.sin(baseAngle) * template.orbit.radius
    } else if (template.orbit.type === 'side') {
      // Side vertical ring
      x = Math.sin(baseAngle) * template.orbit.radius * 0.3
      y = Math.cos(baseAngle) * template.orbit.radius
      z = Math.sin(baseAngle) * template.orbit.radius
    }
    
    planetGroupRef.current.position.set(x, y, z)
    
    // Counter-rotate so planet doesn't spin with orbit
    planetGroupRef.current.rotation.y = -orbitContainerRef.current.rotation.y
    
    // Planet self-rotation and scale
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      
      const targetScale = (isHovered || isActive) ? 1.4 : 1.0
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      )
    }
  })
  
  const IconComponent = IconComponents[template.icon]
  
  return (
    <group ref={orbitContainerRef}>
      <group ref={planetGroupRef}>
        {/* Clean glowing sphere */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => { e.stopPropagation(); onHover(template.id) }}
          onPointerOut={() => onHover(null)}
          onClick={(e) => { e.stopPropagation(); onClick(template) }}
        >
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial
            color={template.color}
            emissive={template.color}
            emissiveIntensity={isHovered || isActive ? 0.8 : 0.4}
            metalness={0.7}
            roughness={0.3}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Outer glow */}
        <mesh>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshBasicMaterial
            color={template.color}
            transparent
            opacity={isHovered || isActive ? 0.35 : 0.15}
            depthWrite={false}
          />
        </mesh>
        
        {/* Hover light */}
        {(isHovered || isActive) && (
          <pointLight color={template.color} intensity={4} distance={5} />
        )}
        
        {/* 2D HTML Icon Overlay */}
        <Html
          center
          distanceFactor={8}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div 
            style={{ 
              color: '#ffffff',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
              transform: `scale(${isHovered || isActive ? 1.2 : 1})`,
              transition: 'transform 0.2s ease'
            }}
          >
            <IconComponent size={24} strokeWidth={2.5} />
          </div>
        </Html>
      </group>
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
    return {
      top: templates.filter(t => t.orbit.type === 'top'),
      main: templates.filter(t => t.orbit.type === 'main'),
      side: templates.filter(t => t.orbit.type === 'side')
    }
  }, [])
  
  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
      
      {/* Core */}
      <SolvexAICore />
      
      {/* Particles */}
      <EnergyParticles />
      
      {/* NO ORBIT RINGS - removed completely */}
      
      {/* Top arc planets (3) */}
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
      
      {/* Main ring planets (4) */}
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
      
      {/* Side ring planets (2) */}
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
  
  const hoveredTemplate = templates.find(t => t.id === hoveredId)
  
  return (
    <div className="relative w-full h-[700px]">
      <Canvas
        camera={{ position: [0, 5, 12], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <TemplateGalaxyScene
          onTemplateClick={setSelectedTemplate}
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
          className="absolute bottom-24 left-1/2 -translate-x-1/2 
                     bg-black/80 backdrop-blur-sm border border-cyan-500/30 
                     px-6 py-3 rounded-lg pointer-events-none z-10"
        >
          <p className="text-white font-medium text-sm">{hoveredTemplate.name}</p>
        </motion.div>
      )}
      
      {/* Template detail card */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 
                       bg-gradient-to-br from-gray-900/95 to-black/95 
                       backdrop-blur-lg border border-cyan-500/40 
                       rounded-2xl p-8 max-w-md w-full shadow-2xl z-20"
          >
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white 
                         transition-colors text-2xl leading-none"
            >
              ×
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: selectedTemplate.color + '20',
                  border: `2px solid ${selectedTemplate.color}`
                }}
              >
                {(() => {
                  const Icon = IconComponents[selectedTemplate.icon]
                  return <Icon size={32} color={selectedTemplate.color} strokeWidth={2} />
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedTemplate.name}
                </h3>
                <p className="text-sm text-gray-400">Professional Template</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {selectedTemplate.description}
            </p>
            
            <div className="flex gap-3">
              <a
                href={selectedTemplate.path}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 
                           text-white px-6 py-3 rounded-lg font-semibold 
                           hover:shadow-lg hover:shadow-cyan-500/50 
                           transition-all duration-300 text-center"
              >
                View Template
              </a>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-6 py-3 border border-gray-600 text-gray-300 
                           rounded-lg hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
