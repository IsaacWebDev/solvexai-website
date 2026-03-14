'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LEDConstellation } from './LEDConstellation';

interface LEDJellyfishProps {
  initialPosition?: [number, number, number];
  speed?: number;
  phase?: number;
  color?: string;
}

export const LEDJellyfish = ({
  initialPosition = [0, 0, 0],
  speed = 1.0,
  phase = 0,
  color = '#8B5CF6'  // Purple
}: LEDJellyfishProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const particles = useRef<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }>>([]);

  // Jellyfish constellation pattern (80 points for MAXIMUM detail)
  const jellyfishPoints = [
    // Dome apex
    { position: new THREE.Vector3(0, 1.5, 0), connections: [1, 2, 3, 4] },
    
    // Dome ring 0.5 (very top, NEW - between apex and ring 1)
    { position: new THREE.Vector3(0.25, 1.35, 0), connections: [5, 6] },
    { position: new THREE.Vector3(0, 1.35, 0.25), connections: [6, 7] },
    { position: new THREE.Vector3(-0.25, 1.35, 0), connections: [7, 8] },
    { position: new THREE.Vector3(0, 1.35, -0.25), connections: [8, 5] },
    
    // Dome ring 1
    { position: new THREE.Vector3(0.5, 1.2, 0), connections: [9, 10, 37] },
    { position: new THREE.Vector3(0, 1.2, 0.5), connections: [10, 11, 38] },
    { position: new THREE.Vector3(-0.5, 1.2, 0), connections: [11, 12, 39] },
    { position: new THREE.Vector3(0, 1.2, -0.5), connections: [12, 9, 40] },
    
    // Dome ring 1.5 (intermediate detail)
    { position: new THREE.Vector3(0.75, 1.0, 0), connections: [13, 14] },
    { position: new THREE.Vector3(0, 1.0, 0.75), connections: [14, 15] },
    { position: new THREE.Vector3(-0.75, 1.0, 0), connections: [15, 16] },
    { position: new THREE.Vector3(0, 1.0, -0.75), connections: [16, 13] },
    
    // Dome ring 1.7 (NEW - between ring 1.5 and 2)
    { position: new THREE.Vector3(0.85, 0.9, 0), connections: [17, 18] },
    { position: new THREE.Vector3(0, 0.9, 0.85), connections: [18, 19] },
    { position: new THREE.Vector3(-0.85, 0.9, 0), connections: [19, 20] },
    { position: new THREE.Vector3(0, 0.9, -0.85), connections: [20, 17] },
    
    // Dome ring 2
    { position: new THREE.Vector3(1, 0.8, 0), connections: [21, 22] },
    { position: new THREE.Vector3(0, 0.8, 1), connections: [22, 23] },
    { position: new THREE.Vector3(-1, 0.8, 0), connections: [23, 24] },
    { position: new THREE.Vector3(0, 0.8, -1), connections: [24, 21] },
    
    // Dome ring 2.5 (NEW - between ring 2 and bottom)
    { position: new THREE.Vector3(1.1, 0.6, 0), connections: [25, 26] },
    { position: new THREE.Vector3(0, 0.6, 1.1), connections: [26, 27] },
    { position: new THREE.Vector3(-1.1, 0.6, 0), connections: [27, 28] },
    { position: new THREE.Vector3(0, 0.6, -1.1), connections: [28, 25] },
    
    // Dome bottom
    { position: new THREE.Vector3(1.2, 0.4, 0), connections: [29, 30] },
    { position: new THREE.Vector3(0, 0.4, 1.2), connections: [30, 31] },
    { position: new THREE.Vector3(-1.2, 0.4, 0), connections: [31, 32] },
    { position: new THREE.Vector3(0, 0.4, -1.2), connections: [32, 29] },
    
    // Tentacle roots
    { position: new THREE.Vector3(1, 0, 0), connections: [41] },
    { position: new THREE.Vector3(0.7, 0, 0.7), connections: [42] },
    { position: new THREE.Vector3(0, 0, 1), connections: [43] },
    { position: new THREE.Vector3(-0.7, 0, 0.7), connections: [44] },
    { position: new THREE.Vector3(-1, 0, 0), connections: [45] },
    { position: new THREE.Vector3(-0.7, 0, -0.7), connections: [46] },
    { position: new THREE.Vector3(0, 0, -1), connections: [47] },
    { position: new THREE.Vector3(0.7, 0, -0.7), connections: [48] },
    
    // Dome ring 1 to ring 1.5 connectors
    { position: new THREE.Vector3(0.6, 1.1, 0), connections: [9] },
    { position: new THREE.Vector3(0, 1.1, 0.6), connections: [10] },
    { position: new THREE.Vector3(-0.6, 1.1, 0), connections: [11] },
    { position: new THREE.Vector3(0, 1.1, -0.6), connections: [12] },
    
    // Tentacle segment at -0.5 (NEW - between root and -1)
    { position: new THREE.Vector3(1, -0.5, 0), connections: [49] },
    { position: new THREE.Vector3(0.7, -0.5, 0.7), connections: [50] },
    { position: new THREE.Vector3(0, -0.5, 1), connections: [51] },
    { position: new THREE.Vector3(-0.7, -0.5, 0.7), connections: [52] },
    { position: new THREE.Vector3(-1, -0.5, 0), connections: [53] },
    { position: new THREE.Vector3(-0.7, -0.5, -0.7), connections: [54] },
    { position: new THREE.Vector3(0, -0.5, -1), connections: [55] },
    { position: new THREE.Vector3(0.7, -0.5, -0.7), connections: [56] },
    
    // Tentacle segment at -1 (middle)
    { position: new THREE.Vector3(1, -1, 0), connections: [57] },
    { position: new THREE.Vector3(0.7, -1, 0.7), connections: [58] },
    { position: new THREE.Vector3(0, -1, 1), connections: [59] },
    { position: new THREE.Vector3(-0.7, -1, 0.7), connections: [60] },
    { position: new THREE.Vector3(-1, -1, 0), connections: [61] },
    { position: new THREE.Vector3(-0.7, -1, -0.7), connections: [62] },
    { position: new THREE.Vector3(0, -1, -1), connections: [63] },
    { position: new THREE.Vector3(0.7, -1, -0.7), connections: [64] },
    
    // Tentacle segment at -1.5 (intermediate)
    { position: new THREE.Vector3(1, -1.5, 0), connections: [65] },
    { position: new THREE.Vector3(0.7, -1.5, 0.7), connections: [66] },
    { position: new THREE.Vector3(0, -1.5, 1), connections: [67] },
    { position: new THREE.Vector3(-0.7, -1.5, 0.7), connections: [68] },
    { position: new THREE.Vector3(-1, -1.5, 0), connections: [69] },
    { position: new THREE.Vector3(-0.7, -1.5, -0.7), connections: [70] },
    { position: new THREE.Vector3(0, -1.5, -1), connections: [71] },
    { position: new THREE.Vector3(0.7, -1.5, -0.7), connections: [72] },
    
    // Tentacle segment at -1.75 (NEW - between -1.5 and -2)
    { position: new THREE.Vector3(1, -1.75, 0), connections: [73] },
    { position: new THREE.Vector3(0.7, -1.75, 0.7), connections: [74] },
    { position: new THREE.Vector3(0, -1.75, 1), connections: [75] },
    { position: new THREE.Vector3(-0.7, -1.75, 0.7), connections: [76] },
    { position: new THREE.Vector3(-1, -1.75, 0), connections: [77] },
    { position: new THREE.Vector3(-0.7, -1.75, -0.7), connections: [78] },
    { position: new THREE.Vector3(0, -1.75, -1), connections: [79] },
    { position: new THREE.Vector3(0.7, -1.75, -0.7), connections: [80] },
    
    // Tentacle ends
    { position: new THREE.Vector3(1, -2, 0), connections: [] },
    { position: new THREE.Vector3(0.7, -2, 0.7), connections: [] },
    { position: new THREE.Vector3(0, -2, 1), connections: [] },
    { position: new THREE.Vector3(-0.7, -2, 0.7), connections: [] },
    { position: new THREE.Vector3(-1, -2, 0), connections: [] },
    { position: new THREE.Vector3(-0.7, -2, -0.7), connections: [] },
    { position: new THREE.Vector3(0, -2, -1), connections: [] },
    { position: new THREE.Vector3(0.7, -2, -0.7), connections: [] },
  ];

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current) {
      // 1. ULTRA-REALISTIC PULSING (with variation per jellyfish)
      const pulseVariation = 0.8 + (Math.sin(phase) * 0.4); // 0.4 to 1.2
      const pulse = Math.sin(time.current * 1.2 + phase) * pulseVariation;
      const pulseStrength = (pulse + 1) / 2; // 0 to 1
      
      // 2. BREATHING PATTERN (inhale/exhale - slower cycle)
      const breathCycle = Math.sin(time.current * 0.4 + phase);
      const breathScale = 1 + (breathCycle * 0.08); // ±8% breathing
      
      // Combined body scaling (pulse + breathing)
      const bodyScale = (1 + (pulse * 0.15)) * breathScale;
      groupRef.current.scale.set(bodyScale, bodyScale, bodyScale);
      
      // Upward propulsion on pulse
      const propulsion = pulseStrength * 0.05;
      
      // Drift (slow fall between pulses)
      const drift = 0.01 * (1 - pulseStrength);
      
      // 3. ORGANIC DRIFT (compound multiple frequencies - NOT just sine waves)
      const driftX = 
        Math.sin(time.current * 0.15 + phase) * 1.5 +
        Math.sin(time.current * 0.23 + phase * 1.3) * 0.8 +
        Math.sin(time.current * 0.37 + phase * 0.7) * 0.4;
      
      const driftY = 
        Math.cos(time.current * 0.18 + phase) * 1.2 +
        Math.cos(time.current * 0.29 + phase * 1.5) * 0.6 +
        Math.cos(time.current * 0.41 + phase * 0.9) * 0.3;
      
      groupRef.current.position.x = initialPosition[0] + driftX;
      groupRef.current.position.y = initialPosition[1] + driftY + propulsion - drift;
      
      // 4. ROTATION VARIATION (more organic - 3 axes)
      groupRef.current.rotation.y = Math.sin(time.current * 0.15 + phase) * 0.2;
      groupRef.current.rotation.x = Math.sin(time.current * 0.11 + phase * 1.3) * 0.1;
      groupRef.current.rotation.z = Math.sin(time.current * 0.09 + phase * 0.8) * 0.08;
      
      // 5. BIO-LUMINESCENT PARTICLES (with emission variation)
      // More particles when pulsing strongly
      const emissionRate = pulseStrength > 0.6 ? 0.6 : 0.8; // Emit more when pulsing
      
      if (Math.random() > emissionRate) {
        particles.current.push({
          position: groupRef.current.position.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            -0.05,
            (Math.random() - 0.5) * 0.15
          ),
          life: 2.5, // Longer life
          maxLife: 2.5
        });
      }
      
      // Update particles
      particles.current = particles.current.filter(p => {
        p.position.add(p.velocity);
        p.life -= delta;
        return p.life > 0;
      });
      
      // Limit particle count for performance
      if (particles.current.length > 30) {
        particles.current = particles.current.slice(-30);
      }
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      <LEDConstellation
        points={jellyfishPoints}
        color={color}
        glowIntensity={2.5 + Math.sin(time.current * 1.2 + phase) * 0.5}
        lineWidth={0.025}
        dotSize={0.08}
      />
      
      {/* Render particles */}
      {particles.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={particle.life / particle.maxLife}
          />
        </mesh>
      ))}
    </group>
  );
};
