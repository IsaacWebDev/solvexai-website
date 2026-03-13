'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralSphereProps {
  scrollProgress: number;
}

function NeuralSphere({ scrollProgress }: NeuralSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const nodeCount = 100;
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const color = new THREE.Color('#00F0FF');
    
    // Create sphere of nodes
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * (i / nodeCount) - 1);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame(() => {
    if (groupRef.current) {
      // Rotate based on scroll
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
    }
    
    if (nodesRef.current) {
      // Pulse nodes
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
      nodesRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

interface ScrollControlled3DObjectProps {
  scrollProgress: number;
}

export default function ScrollControlled3DObject({ scrollProgress }: ScrollControlled3DObjectProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0088FF" />
        <NeuralSphere scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
