'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  tooltipFeatures: string[]
  icon: string
  color: string
}

const services: Service[] = [
  {
    id: 'ai-receptionist',
    title: 'AI Receptionist',
    description: '24/7 intelligent phone answering that sounds human',
    features: ['Natural voice conversations', 'Appointment booking', 'Call routing & transfers', 'Multi-language support'],
    tooltipFeatures: [
      'Answer calls 24/7 with human-like AI',
      'Book appointments automatically',
      'Route calls to right department',
      'Handle unlimited concurrent calls'
    ],
    icon: '🤖',
    color: '#00d0ff'
  },
  {
    id: 'automation',
    title: 'Business Automation',
    description: 'Eliminate repetitive tasks and scale effortlessly',
    features: ['Workflow automation', 'CRM integration', 'Data synchronization', 'Process optimization'],
    tooltipFeatures: [
      'Automate repetitive workflows',
      'Sync data across all platforms',
      'Reduce manual errors by 95%',
      'Scale operations without hiring'
    ],
    icon: '⚡',
    color: '#00f0d0'
  },
  {
    id: 'websites',
    title: 'Website Systems',
    description: 'Professional websites that convert visitors to customers',
    features: ['Custom design', 'Booking systems', 'Payment integration', 'SEO optimization'],
    tooltipFeatures: [
      'Professional custom design',
      'Mobile-responsive on all devices',
      'Integrated booking & payments',
      'SEO optimized for Google ranking'
    ],
    icon: '🌐',
    color: '#0090ff'
  },
  {
    id: 'integrations',
    title: 'AI Integrations',
    description: 'Connect your tools with intelligent automation',
    features: ['Custom AI models', 'API connections', 'Data pipelines', 'Chatbot development'],
    tooltipFeatures: [
      'Connect any platform or tool',
      'Build custom AI chatbots',
      'Automate data flow between systems',
      'Train AI on your business data'
    ],
    icon: '🔗',
    color: '#0070ff'
  },
  {
    id: 'crm-integration',
    title: 'CRM Integration',
    description: 'Seamlessly connect your customer data',
    features: ['Sync contacts automatically', 'Track customer interactions', 'Unified dashboard', 'Real-time updates'],
    tooltipFeatures: [
      'Connect Salesforce, HubSpot, or any CRM',
      'Auto-sync contacts and deals',
      'Track all customer touchpoints',
      'Never lose a lead again'
    ],
    icon: '📊',
    color: '#00c0ff'
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Smart email sequences that convert',
    features: ['Drip campaigns', 'Personalized sequences', 'A/B testing', 'Performance analytics'],
    tooltipFeatures: [
      'Send personalized email sequences',
      'Trigger based on customer actions',
      'A/B test subject lines automatically',
      'Boost open rates by 300%'
    ],
    icon: '📧',
    color: '#00e0c0'
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking',
    description: 'Let customers book instantly',
    features: ['Calendar sync', 'Automated reminders', 'Payment collection', 'No-show reduction'],
    tooltipFeatures: [
      'Customers book appointments 24/7',
      'Sync with Google/Outlook calendar',
      'Send automatic SMS reminders',
      'Reduce no-shows by 80%'
    ],
    icon: '📅',
    color: '#0080ff'
  },
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    description: 'Accept payments effortlessly',
    features: ['Multiple payment methods', 'Subscription billing', 'Invoice generation', 'Secure checkout'],
    tooltipFeatures: [
      'Accept credit cards, PayPal, Stripe',
      'Recurring subscription billing',
      'Generate professional invoices',
      'PCI compliant security'
    ],
    icon: '💳',
    color: '#00a0ff'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Rank #1 on Google',
    features: ['Keyword research', 'On-page optimization', 'Link building', 'Performance tracking'],
    tooltipFeatures: [
      'Rank higher on Google searches',
      'Drive organic traffic to your site',
      'Optimize for your target keywords',
      '10x your website visibility'
    ],
    icon: '🔍',
    color: '#00d0a0'
  },
  {
    id: 'analytics-reporting',
    title: 'Analytics & Reporting',
    description: 'Data-driven decision making',
    features: ['Custom dashboards', 'Real-time metrics', 'Automated reports', 'Predictive insights'],
    tooltipFeatures: [
      'Track all business metrics in one place',
      'Real-time performance dashboards',
      'Automated weekly reports',
      'AI-powered insights and predictions'
    ],
    icon: '📈',
    color: '#00b0d0'
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    description: 'Fill your pipeline with qualified leads',
    features: ['Lead capture forms', 'Landing pages', 'Lead scoring', 'Follow-up automation'],
    tooltipFeatures: [
      'Generate 5-10x more qualified leads',
      'Capture leads from every channel',
      'Score and prioritize automatically',
      'Never miss a sales opportunity'
    ],
    icon: '🎯',
    color: '#00e0b0'
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description: 'Grow your social presence',
    features: ['Post scheduling', 'Multi-platform posting', 'Engagement tracking', 'Content calendar'],
    tooltipFeatures: [
      'Schedule posts across all platforms',
      'Auto-post to Instagram, Facebook, LinkedIn',
      'Track engagement and growth',
      'Save 10+ hours per week'
    ],
    icon: '📱',
    color: '#00c0e0'
  },
  {
    id: 'customer-support',
    title: 'Customer Support AI',
    description: 'Instant support that never sleeps',
    features: ['AI chat support', 'Ticket management', 'Knowledge base', 'Multi-channel support'],
    tooltipFeatures: [
      'Answer customer questions instantly',
      'Resolve 80% of tickets automatically',
      'Support via chat, email, SMS',
      'Available 24/7/365'
    ],
    icon: '💬',
    color: '#00a0d0'
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    description: 'Never run out of stock',
    features: ['Real-time tracking', 'Low stock alerts', 'Supplier integration', 'Demand forecasting'],
    tooltipFeatures: [
      'Track inventory in real-time',
      'Auto-alert when stock is low',
      'Forecast demand with AI',
      'Sync with suppliers automatically'
    ],
    icon: '📦',
    color: '#00d0b0'
  },
  {
    id: 'document-automation',
    title: 'Document Automation',
    description: 'Generate documents instantly',
    features: ['Template library', 'Data auto-fill', 'E-signature integration', 'Version control'],
    tooltipFeatures: [
      'Generate contracts in seconds',
      'Auto-fill from your CRM data',
      'Send for e-signature instantly',
      'Legally compliant and secure'
    ],
    icon: '📄',
    color: '#00e0d0'
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description: 'Work together seamlessly',
    features: ['Shared workspaces', 'Task management', 'File sharing', 'Real-time updates'],
    tooltipFeatures: [
      'Centralized team workspace',
      'Assign and track tasks',
      'Share files securely',
      'Get notified of updates instantly'
    ],
    icon: '👥',
    color: '#00b0e0'
  },
  {
    id: 'data-security',
    title: 'Data Security',
    description: 'Enterprise-grade protection',
    features: ['Encryption', 'Access controls', 'Audit logs', 'Compliance'],
    tooltipFeatures: [
      'Bank-level encryption (AES-256)',
      'Role-based access control',
      'Complete audit trail',
      'GDPR & SOC 2 compliant'
    ],
    icon: '🔒',
    color: '#0090d0'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Run your business from anywhere',
    features: ['iOS & Android', 'Push notifications', 'Offline mode', 'Native performance'],
    tooltipFeatures: [
      'Custom iOS and Android apps',
      'Manage business on the go',
      'Real-time push notifications',
      'Works offline, syncs when online'
    ],
    icon: '📲',
    color: '#00c0d0'
  },
  {
    id: 'voice-ai',
    title: 'Voice AI',
    description: 'Natural voice interactions',
    features: ['Voice commands', 'Speech recognition', 'Multi-language', 'Voice analytics'],
    tooltipFeatures: [
      'Control systems with voice commands',
      '99% accurate speech recognition',
      'Support 40+ languages',
      'Sounds completely human'
    ],
    icon: '🎤',
    color: '#00d0c0'
  },
  {
    id: 'training-support',
    title: 'Training & Support',
    description: 'We help you succeed',
    features: ['Onboarding training', 'Video tutorials', '24/7 support', 'Dedicated success manager'],
    tooltipFeatures: [
      'Complete onboarding training included',
      'Access library of video tutorials',
      '24/7 support via chat and email',
      'Dedicated success manager for Enterprise'
    ],
    icon: '🎓',
    color: '#00a0c0'
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    description: 'Built exactly for your needs',
    features: ['Tailored solutions', 'API development', 'Legacy system integration', 'Ongoing maintenance'],
    tooltipFeatures: [
      'Custom-built for your business',
      'Integrate with existing systems',
      'Develop custom APIs',
      'Ongoing support and updates'
    ],
    icon: '⚙️',
    color: '#00b0c0'
  },
  {
    id: 'roi-guarantee',
    title: 'ROI Guarantee',
    description: 'Results or your money back',
    features: ['Performance metrics', 'ROI tracking', 'Money-back guarantee', 'Success milestones'],
    tooltipFeatures: [
      '14-day money-back guarantee',
      'Track ROI in real-time',
      'Typical clients see 300% ROI',
      'We guarantee measurable results'
    ],
    icon: '💰',
    color: '#00e0a0'
  },
  {
    id: 'scaling',
    title: 'Scale Effortlessly',
    description: 'Grow without growing pains',
    features: ['Cloud infrastructure', 'Auto-scaling', 'Load balancing', 'Global CDN'],
    tooltipFeatures: [
      'Handle 10x traffic with no downtime',
      'Auto-scale during peak times',
      'Global CDN for speed',
      'Pay only for what you use'
    ],
    icon: '🚀',
    color: '#00d090'
  },
  {
    id: 'reporting',
    title: 'Smart Reporting',
    description: 'Insights at your fingertips',
    features: ['Custom reports', 'Scheduled delivery', 'Export to Excel/PDF', 'Visual dashboards'],
    tooltipFeatures: [
      'Generate custom reports instantly',
      'Schedule weekly/monthly delivery',
      'Export to Excel, PDF, or CSV',
      'Beautiful visual dashboards'
    ],
    icon: '📊',
    color: '#00c090'
  }
]

function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 150
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 1.5 + Math.random() * 2
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      const color = new THREE.Color('#00d0ff')
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ServiceNode({ position, index, onHover, onClick, isHovered, isActive, hasTooltip, service }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isHovered || isActive || hasTooltip) {
        const targetScale = hasTooltip ? 1.5 : (isActive ? 1.5 : 1.3)
        meshRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale).add(
            new THREE.Vector3(
              Math.sin(state.clock.elapsedTime * 5) * 0.1,
              Math.sin(state.clock.elapsedTime * 5) * 0.1,
              Math.sin(state.clock.elapsedTime * 5) * 0.1
            )
          ),
          0.1
        )
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
    
    if (glowRef.current) {
      const baseScale = (isActive || hasTooltip) ? 1.5 : 1.2
      glowRef.current.scale.setScalar(baseScale + Math.sin(state.clock.elapsedTime * 3) * 0.2)
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = ((isHovered || isActive || hasTooltip) ? 0.5 : 0.25) + Math.sin(state.clock.elapsedTime * 3) * 0.15
    }
    
    if (ringRef.current && (isHovered || isActive || hasTooltip)) {
      ringRef.current.rotation.z += 0.02
      ringRef.current.scale.setScalar(1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2)
    }
  })

  return (
    <group>
      {(isHovered || isActive || hasTooltip) && (
        <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.28, 32]} />
          <meshBasicMaterial
            color={service.color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); onHover(index) }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(index) }}
      >
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshPhysicalMaterial
          color={(isHovered || isActive || hasTooltip) ? service.color : '#d0e0f0'}
          emissive={service.color}
          emissiveIntensity={(isHovered || isActive || hasTooltip) ? 3 : 0.6}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial
          color={service.color}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      
      {(isHovered || isActive || hasTooltip) && (
        <>
          <pointLight
            position={position}
            color={service.color}
            intensity={6}
            distance={5}
          />
          <mesh position={position}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial
              color={service.color}
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </group>
  )
}

function SceneRefs({ cameraRef, glRef }: any) {
  const { camera, gl } = useThree()
  
  useEffect(() => {
    cameraRef.current = camera
    glRef.current = gl
  }, [camera, gl, cameraRef, glRef])
  
  return null
}

function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <group>
      {/* Main hub sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#00d0ff"
          emissiveIntensity={2}
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      
      {/* Outer glow pulse */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial
          color="#00d0ff"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      
      <pointLight position={[0, 0, 0]} color="#00f0ff" intensity={4} distance={8} />
    </group>
  )
}

function DenseOrb({ 
  onNodeClick, 
  activeNodeIndex, 
  tooltipNodeIndex,
  onTooltipClick,
  nodePositionsRef 
}: { 
  onNodeClick: (index: number) => void
  activeNodeIndex: number | null
  tooltipNodeIndex: number | null
  onTooltipClick: (index: number) => void
  nodePositionsRef: React.MutableRefObject<THREE.Vector3[]>
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const { camera } = useThree()

  const { nodes, connections, serviceNodeIndices, centerNodeIndex } = useMemo(() => {
    const scale = 2.8
    
    const allNodes: THREE.Vector3[] = []
    
    // Central hub node at origin
    const centerNode = new THREE.Vector3(0, 0, 0)
    allNodes.push(centerNode)
    
    // Generate 24 service nodes evenly distributed on sphere surface
    const count = 24
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2 // Range from 1 to -1
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      
      allNodes.push(new THREE.Vector3(x * scale, y * scale, z * scale))
    }
    
    // All nodes except center (index 0) are service nodes
    const serviceIndices = Array.from({ length: 24 }, (_, i) => i + 1)
    
    // Hub-and-spoke connections: each outer node connects ONLY to center
    const lines: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 1; i <= 24; i++) {
      lines.push([centerNode, allNodes[i]])
    }

    return {
      nodes: allNodes,
      connections: lines,
      serviceNodeIndices: serviceIndices,
      centerNodeIndex: 0
    }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.25) * 0.08
      
      // Update screen positions for tooltips
      serviceNodeIndices.forEach((nodeIdx, i) => {
        const worldPos = nodes[nodeIdx].clone()
        worldPos.applyMatrix4(groupRef.current!.matrixWorld)
        nodePositionsRef.current[i] = worldPos
      })
    }
    

  })

  useEffect(() => {
    camera.position.set(0, 0, 10)
  }, [camera])

  return (
    <group ref={groupRef}>
      {/* Central hub node */}
      <CentralHub />
      
      <pointLight color="#ffffff" intensity={6} distance={20} />
      <pointLight color="#00d0ff" intensity={4} distance={15} />

      <EnergyParticles />

      {connections.map((conn, i) => {
        const points = [conn[0], conn[1]]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: '#00b0ff',
          transparent: true,
          opacity: 0.5,
          linewidth: 2
        })
        return <primitive key={i} object={new THREE.Line(geometry, material)} />
      })}

      {serviceNodeIndices.map((nodeIdx, i) => (
        <ServiceNode
          key={i}
          position={nodes[nodeIdx]}
          index={i}
          service={services[i]}
          onHover={setHoveredNode}
          onClick={onTooltipClick}
          isHovered={hoveredNode === i}
          isActive={activeNodeIndex === i}
          hasTooltip={tooltipNodeIndex === i}
        />
      ))}
    </group>
  )
}

function FloatingTooltip({ 
  service, 
  position, 
  onClose 
}: { 
  service: Service
  position: { x: number; y: number }
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="absolute pointer-events-auto z-30"
      style={{
        left: `${position.x + 25}px`,
        top: `${position.y - 50}px`,
      }}
    >
      {/* Arrow pointer */}
      <div 
        className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0"
        style={{
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: `8px solid ${service.color}50`,
        }}
      />
      
      {/* Tooltip card */}
      <div
        className="relative rounded-xl backdrop-blur-2xl p-4 shadow-2xl border min-w-[240px] max-w-[280px]"
        style={{
          background: 'rgba(5, 10, 20, 0.94)',
          borderColor: `${service.color}70`,
          boxShadow: `0 0 25px ${service.color}50, 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1)`,
        }}
      >
        <div className="space-y-2.5">
          {service.tooltipFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-sm text-gray-200"
            >
              <div 
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ 
                  backgroundColor: service.color,
                  boxShadow: `0 0 8px ${service.color}`
                }}
              />
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Interactive3DOrb() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const nodePositionsRef = useRef<THREE.Vector3[]>([])
  const canvasRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<THREE.Camera | null>(null)
  const glRef = useRef<any>(null)

  const handleNodeClick = (index: number) => {
    setSelectedService(services[index])
    setActiveIndex(index)
    setTooltipIndex(null)
  }

  const handleTooltipClick = (index: number) => {
    if (tooltipIndex === index) {
      setTooltipIndex(null)
    } else {
      setTooltipIndex(index)
      setActiveIndex(null)
      setSelectedService(null)
    }
  }

  const closeCard = () => {
    setSelectedService(null)
    setActiveIndex(null)
  }

  const closeTooltip = () => {
    setTooltipIndex(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTooltip()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    if (tooltipIndex !== null && canvasRef.current) {
      const updateTooltipPosition = () => {
        const worldPos = nodePositionsRef.current[tooltipIndex]
        if (!worldPos || !cameraRef.current || !glRef.current) return

        const canvas = glRef.current.domElement
        const rect = canvas.getBoundingClientRect()
        
        const screenPos = worldPos.clone().project(cameraRef.current)
        const x = (screenPos.x * 0.5 + 0.5) * rect.width
        const y = (-screenPos.y * 0.5 + 0.5) * rect.height
        
        setTooltipPosition({ x, y })
      }

      const interval = setInterval(updateTooltipPosition, 16)
      return () => clearInterval(interval)
    }
  }, [tooltipIndex])

  return (
    <div className="relative w-full h-[700px]" ref={canvasRef}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeTooltip()
          }
        }}
      >
        <SceneRefs cameraRef={cameraRef} glRef={glRef} />
        <ambientLight intensity={0.15} />
        <DenseOrb 
          onNodeClick={handleNodeClick} 
          activeNodeIndex={activeIndex}
          tooltipNodeIndex={tooltipIndex}
          onTooltipClick={handleTooltipClick}
          nodePositionsRef={nodePositionsRef}
        />
      </Canvas>

      {tooltipIndex !== null && (
        <FloatingTooltip
          service={services[tooltipIndex]}
          position={tooltipPosition}
          onClose={closeTooltip}
        />
      )}

      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-md z-10"
              onClick={closeCard}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{ type: 'spring', damping: 18, stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div
                className="relative p-12 rounded-3xl backdrop-blur-3xl border-2 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(5, 10, 25, 0.95), rgba(10, 15, 35, 0.95))',
                  borderColor: selectedService.color,
                  minWidth: '450px',
                  maxWidth: '550px',
                  boxShadow: `0 0 80px ${selectedService.color}60, 0 30px 100px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)`
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCard}
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-4xl leading-none"
                >
                  ×
                </motion.button>
                
                <motion.div 
                  className="text-8xl mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {selectedService.icon}
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-3" style={{ color: selectedService.color }}>
                  {selectedService.title}
                </h3>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedService.description}
                </p>
                
                <div className="space-y-2 mb-8">
                  {selectedService.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: selectedService.color, boxShadow: `0 0 10px ${selectedService.color}` }}
                      />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-10 py-4 rounded-xl font-bold transition-all text-white text-lg shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${selectedService.color}, ${selectedService.color}dd)`,
                    boxShadow: `0 10px 40px ${selectedService.color}70, inset 0 1px 1px rgba(255,255,255,0.3)`
                  }}
                >
                  Get Started →
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <motion.p 
          className="text-sm text-gray-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Click on any glowing node to explore our services
        </motion.p>
      </div>
    </div>
  )
}
