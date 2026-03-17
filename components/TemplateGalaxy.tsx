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
  icon: 'restaurant' | 'law' | 'fitness' | 'ecommerce' | 'medical' | 'construction' | 'agency' | 'service' | 'realestate'
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
  
  // Main Orbit (4 planets - full circle)
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
  
  // Side Orbit (2 planets - vertical tilted ring)
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

function PlanetIcon({ icon, isHovered, isActive }: { icon: Template['icon'], isHovered: boolean, isActive: boolean }) {
  const extrudedGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Create BOLD icon shapes with solid fills
    switch (icon) {
      case 'restaurant': // Fork & Knife
        // Fork
        shape.moveTo(-0.08, 0.12)
        shape.lineTo(-0.08, -0.12)
        shape.lineTo(-0.05, -0.12)
        shape.lineTo(-0.05, -0.04)
        shape.lineTo(-0.04, -0.04)
        shape.lineTo(-0.04, 0.12)
        shape.closePath()
        // Knife (separate shape)
        const knife = new THREE.Shape()
        knife.moveTo(0.04, 0.12)
        knife.lineTo(0.04, -0.08)
        knife.lineTo(0.02, -0.12)
        knife.lineTo(0.08, -0.12)
        knife.lineTo(0.08, -0.08)
        knife.lineTo(0.06, -0.08)
        knife.lineTo(0.06, 0.12)
        knife.closePath()
        shape.holes.push(knife)
        break
      case 'law': // Scales (simplified solid)
        // Base
        shape.moveTo(-0.12, 0.02)
        shape.lineTo(-0.12, -0.02)
        shape.lineTo(0.12, -0.02)
        shape.lineTo(0.12, 0.02)
        shape.closePath()
        // Center post
        const post = new THREE.Shape()
        post.moveTo(-0.02, 0.02)
        post.lineTo(-0.02, 0.12)
        post.lineTo(0.02, 0.12)
        post.lineTo(0.02, 0.02)
        post.closePath()
        shape.holes.push(post)
        break
      case 'fitness': // Dumbbell
        // Left weight
        shape.moveTo(-0.12, 0.05)
        shape.lineTo(-0.12, -0.05)
        shape.lineTo(-0.08, -0.05)
        shape.lineTo(-0.08, 0.05)
        shape.closePath()
        // Bar
        const bar = new THREE.Shape()
        bar.moveTo(-0.08, 0.02)
        bar.lineTo(-0.08, -0.02)
        bar.lineTo(0.08, -0.02)
        bar.lineTo(0.08, 0.02)
        bar.closePath()
        shape.holes.push(bar)
        // Right weight
        const rightWeight = new THREE.Shape()
        rightWeight.moveTo(0.08, 0.05)
        rightWeight.lineTo(0.08, -0.05)
        rightWeight.lineTo(0.12, -0.05)
        rightWeight.lineTo(0.12, 0.05)
        rightWeight.closePath()
        shape.holes.push(rightWeight)
        break
      case 'medical': // Plus/Cross
        // Horizontal bar
        shape.moveTo(-0.12, 0.035)
        shape.lineTo(-0.12, -0.035)
        shape.lineTo(0.12, -0.035)
        shape.lineTo(0.12, 0.035)
        shape.closePath()
        // Vertical bar
        const vertical = new THREE.Shape()
        vertical.moveTo(-0.035, -0.12)
        vertical.lineTo(-0.035, 0.12)
        vertical.lineTo(0.035, 0.12)
        vertical.lineTo(0.035, -0.12)
        vertical.closePath()
        shape.holes.push(vertical)
        break
      case 'construction': // Hammer
        // Hammer head
        shape.moveTo(-0.02, 0.08)
        shape.lineTo(-0.02, 0.12)
        shape.lineTo(0.12, 0.12)
        shape.lineTo(0.12, 0.04)
        shape.lineTo(0.08, 0.04)
        shape.lineTo(0.08, 0.08)
        shape.closePath()
        // Handle
        const handle = new THREE.Shape()
        handle.moveTo(-0.02, -0.12)
        handle.lineTo(-0.02, 0.08)
        handle.lineTo(0.02, 0.08)
        handle.lineTo(0.02, -0.12)
        handle.closePath()
        shape.holes.push(handle)
        break
      case 'agency': // Star (5-pointed)
        const outerRadius = 0.12
        const innerRadius = 0.05
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5 - Math.PI / 2
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) shape.moveTo(x, y)
          else shape.lineTo(x, y)
        }
        shape.closePath()
        break
      case 'ecommerce': // Shopping cart
        // Cart body
        shape.moveTo(-0.12, 0.08)
        shape.lineTo(-0.08, -0.04)
        shape.lineTo(0.08, -0.04)
        shape.lineTo(0.10, 0.02)
        shape.lineTo(0.12, 0.08)
        shape.closePath()
        // Handle
        const cartHandle = new THREE.Shape()
        cartHandle.moveTo(-0.14, 0.08)
        cartHandle.lineTo(-0.12, 0.08)
        cartHandle.lineTo(-0.10, 0.12)
        cartHandle.lineTo(-0.12, 0.12)
        cartHandle.closePath()
        shape.holes.push(cartHandle)
        break
      case 'realestate': // House
        // Roof triangle
        shape.moveTo(0, 0.12)
        shape.lineTo(-0.12, 0)
        shape.lineTo(0.12, 0)
        shape.closePath()
        // House body
        const body = new THREE.Shape()
        body.moveTo(-0.10, 0)
        body.lineTo(-0.10, -0.12)
        body.lineTo(0.10, -0.12)
        body.lineTo(0.10, 0)
        body.closePath()
        shape.holes.push(body)
        // Door
        const door = new THREE.Shape()
        door.moveTo(-0.03, -0.12)
        door.lineTo(-0.03, -0.06)
        door.lineTo(0.03, -0.06)
        door.lineTo(0.03, -0.12)
        door.closePath()
        body.holes.push(door)
        break
      default: // Service - Gear
        const teeth = 8
        const outerR = 0.12
        const innerR = 0.08
        for (let i = 0; i < teeth * 2; i++) {
          const angle = (i * Math.PI) / teeth
          const r = i % 2 === 0 ? outerR : innerR
          const x = Math.cos(angle) * r
          const y = Math.sin(angle) * r
          if (i === 0) shape.moveTo(x, y)
          else shape.lineTo(x, y)
        }
        shape.closePath()
        // Inner circle hole
        const innerCircle = new THREE.Shape()
        const circlePoints = 32
        for (let i = 0; i <= circlePoints; i++) {
          const angle = (i / circlePoints) * Math.PI * 2
          const x = Math.cos(angle) * 0.04
          const y = Math.sin(angle) * 0.04
          if (i === 0) innerCircle.moveTo(x, y)
          else innerCircle.lineTo(x, y)
        }
        shape.holes.push(innerCircle)
    }
    
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3
    })
  }, [icon])
  
  return (
    <mesh geometry={extrudedGeometry}>
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={isHovered || isActive ? 1.2 : 0.6}
        metalness={0.1}
        roughness={0.3}
      />
    </mesh>
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
  const ringRef = useRef<THREE.Mesh>(null)
  const iconGroupRef = useRef<THREE.Group>(null)
  
  // Calculate ANGLE on orbit (not position)
  const baseAngle = useMemo(() => {
    return (index / totalInOrbit) * (template.orbit.type === 'top' ? Math.PI : 2 * Math.PI)
  }, [index, totalInOrbit, template.orbit.type])
  
  useFrame((state) => {
    if (!orbitContainerRef.current || !planetGroupRef.current || !iconGroupRef.current) return
    
    // Rotate the entire orbit
    orbitContainerRef.current.rotation.y = state.clock.elapsedTime * template.orbit.speed
    
    // Calculate planet position based on orbit type
    let x = 0, y = 0, z = 0
    
    if (template.orbit.type === 'top') {
      // Semi-circle above
      const angle = Math.PI + baseAngle
      x = Math.cos(angle) * template.orbit.radius
      y = 1.5 + Math.abs(Math.sin(angle)) * 0.5
      z = Math.sin(angle) * template.orbit.radius
    } else if (template.orbit.type === 'main') {
      // Full circle
      x = Math.cos(baseAngle) * template.orbit.radius
      y = 0
      z = Math.sin(baseAngle) * template.orbit.radius
    } else {
      // Side orbit (vertical)
      x = Math.sin(baseAngle) * template.orbit.radius * 0.3
      y = Math.cos(baseAngle) * template.orbit.radius
      z = Math.sin(baseAngle) * template.orbit.radius
    }
    
    planetGroupRef.current.position.set(x, y, z)
    
    // Counter-rotate planet to face camera
    planetGroupRef.current.rotation.y = -orbitContainerRef.current.rotation.y
    
    // Planet self-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      
      // Scale on hover/active
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
    
    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02
    }
    
    // Keep icon facing camera
    if (iconGroupRef.current) {
      const camera = state.camera
      iconGroupRef.current.lookAt(camera.position)
    }
  })
  
  return (
    <group ref={orbitContainerRef}>
      <group ref={planetGroupRef}>
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
            transparent
            opacity={0.85}
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
        
        {/* Icon - positioned OUTSIDE sphere and always faces camera */}
        <group ref={iconGroupRef} position={[0, 0, 0.35]}>
          <PlanetIcon icon={template.icon} isHovered={isHovered} isActive={isActive} />
        </group>
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
    const groups = {
      top: templates.filter(t => t.orbit.type === 'top'),
      main: templates.filter(t => t.orbit.type === 'main'),
      side: templates.filter(t => t.orbit.type === 'side')
    }
    return groups
  }, [])
  
  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      
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
          className="absolute bottom-24 left-1/2