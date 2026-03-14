'use client';

import { useRef, useMemo } from 'react';
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
  const previousPosition = useRef(new THREE.Vector3(...initialPosition));
  const particles = useRef<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }>>([]);

  // Generate 150-point jellyfish constellation
  const generateJellyfishPoints = () => {
    const points: Array<{
      position: THREE.Vector3;
      connections: number[];
      isTentacle?: boolean;
      tentacleIndex?: number;
      segmentIndex?: number;
      isTip?: boolean;
    }> = [];

    // === DOME (60 POINTS) ===
    
    // Dome apex
    points.push({ position: new THREE.Vector3(0, 1.5, 0), connections: [1, 2, 3, 4] });
    
    // Ring 0.25 (very very top - 4 points)
    const ring025Start = points.length;
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const x = Math.cos(angle) * 0.125;
      const z = Math.sin(angle) * 0.125;
      const idx = points.length;
      points.push({
        position: new THREE.Vector3(x, 1.42, z),
        connections: [idx + 1 === ring025Start + 4 ? ring025Start : idx + 1, idx + 4]
      });
    }
    
    // Ring 0.5 (very top - 4 points)
    const ring05Start = points.length;
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const x = Math.cos(angle) * 0.25;
      const z = Math.sin(angle) * 0.25;
      const idx = points.length;
      points.push({
        position: new THREE.Vector3(x, 1.35, z),
        connections: [idx + 1 === ring05Start + 4 ? ring05Start : idx + 1, idx + 4]
      });
    }
    
    // Helper to create ring
    const createRing = (radius: number, y: number, nextRingOffset: number = 4) => {
      const ringStart = points.length;
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI / 2) * i;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const idx = points.length;
        points.push({
          position: new THREE.Vector3(x, y, z),
          connections: [
            idx + 1 === ringStart + 4 ? ringStart : idx + 1,
            idx + nextRingOffset
          ]
        });
      }
    };
    
    createRing(0.5, 1.25, 4);   // Ring 0.75
    createRing(0.5, 1.2, 4);    // Ring 1
    createRing(0.6, 1.1, 4);    // Ring 1.25
    createRing(0.75, 1.0, 4);   // Ring 1.5
    createRing(0.85, 0.9, 4);   // Ring 1.7
    createRing(0.95, 0.85, 4);  // Ring 1.85
    createRing(1.0, 0.8, 4);    // Ring 2
    createRing(1.05, 0.7, 4);   // Ring 2.25
    createRing(1.1, 0.6, 4);    // Ring 2.5
    
    // Dome bottom edge (only connects to itself, not next ring)
    const domeBottomStart = points.length;
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const x = Math.cos(angle) * 1.2;
      const z = Math.sin(angle) * 1.2;
      const idx = points.length;
      points.push({
        position: new THREE.Vector3(x, 0.4, z),
        connections: [idx + 1 === domeBottomStart + 4 ? domeBottomStart : idx + 1]
      });
    }
    
    // === TENTACLES (108 POINTS: 12 tentacles × 9 segments) ===
    
    const tentacleAngles = [
      0,                  // 0°
      Math.PI / 6,        // 30°
      Math.PI / 3,        // 60°
      Math.PI / 2,        // 90°
      Math.PI * 2 / 3,    // 120°
      Math.PI * 5 / 6,    // 150°
      Math.PI,            // 180°
      Math.PI * 7 / 6,    // 210°
      Math.PI * 4 / 3,    // 240°
      Math.PI * 3 / 2,    // 270°
      Math.PI * 5 / 3,    // 300°
      Math.PI * 11 / 6    // 330°
    ];
    
    const tentacleSegments = [
      0,     // Root
      -0.3,  // Segment 1
      -0.6,  // Segment 2
      -0.9,  // Segment 3
      -1.2,  // Segment 4
      -1.5,  // Segment 5
      -1.8,  // Segment 6
      -2.1,  // Segment 7
      -2.4   // Endpoint (tip)
    ];
    
    tentacleAngles.forEach((angle, tentacleIndex) => {
      tentacleSegments.forEach((y, segmentIndex) => {
        const radius = 1.0 + (segmentIndex * 0.03); // Slight spread
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        const pointIndex = points.length;
        
        points.push({
          position: new THREE.Vector3(x, y, z),
          connections: segmentIndex < tentacleSegments.length - 1 
            ? [pointIndex + 1] // Connect to next segment
            : [], // Endpoint
          isTentacle: true,
          tentacleIndex,
          segmentIndex,
          isTip: segmentIndex === tentacleSegments.length - 1
        });
      });
    });
    
    return points;
  };

  const jellyfishPoints = useMemo(generateJellyfishPoints, []);
  
  // Store original positions for animation
  const originalPositions = useMemo(() => 
    jellyfishPoints.map(p => p.position.clone()),
    [jellyfishPoints]
  );
  
  // Independent tentacle speed variations
  const tentacleSpeedVariation = useMemo(() => [
    1.0, 1.15, 0.9, 1.2, 0.85, 1.1, 0.95, 1.25, 0.8, 1.05, 1.12, 0.88
  ], []);

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current) {
      // 1. ULTRA-REALISTIC PULSING
      const pulseVariation = 0.8 + (Math.sin(phase) * 0.4);
      const pulse = Math.sin(time.current * 1.2 + phase) * pulseVariation;
      const pulseStrength = (pulse + 1) / 2; // 0 to 1
      
      // 2. BREATHING PATTERN
      const breathCycle = Math.sin(time.current * 0.4 + phase);
      const breathScale = 1 + (breathCycle * 0.08);
      
      // Combined body scaling
      const bodyScale = (1 + (pulse * 0.15)) * breathScale;
      groupRef.current.scale.set(bodyScale, bodyScale, bodyScale);
      
      // 3. MOVEMENT
      const propulsion = pulseStrength * 0.05;
      const drift = 0.01 * (1 - pulseStrength);
      
      const driftX = 
        Math.sin(time.current * 0.15 + phase) * 1.5 +
        Math.sin(time.current * 0.23 + phase * 1.3) * 0.8 +
        Math.sin(time.current * 0.37 + phase * 0.7) * 0.4;
      
      const driftY = 
        Math.cos(time.current * 0.18 + phase) * 1.2 +
        Math.cos(time.current * 0.29 + phase * 1.5) * 0.6 +
        Math.cos(time.current * 0.41 + phase * 0.9) * 0.3;
      
      const newPosition = new THREE.Vector3(
        initialPosition[0] + driftX,
        initialPosition[1] + driftY + propulsion - drift,
        initialPosition[2]
      );
      
      // Calculate velocity for drag effect
      const velocity = new THREE.Vector3().subVectors(
        groupRef.current.position,
        previousPosition.current
      );
      
      groupRef.current.position.copy(newPosition);
      
      // 4. ROTATION
      groupRef.current.rotation.y = Math.sin(time.current * 0.15 + phase) * 0.2;
      groupRef.current.rotation.x = Math.sin(time.current * 0.11 + phase * 1.3) * 0.1;
      groupRef.current.rotation.z = Math.sin(time.current * 0.09 + phase * 0.8) * 0.08;
      
      // === 5. DYNAMIC TENTACLE ANIMATION ===
      
      const curlAmount = pulseStrength * 0.3; // Curl when pulsing
      
      jellyfishPoints.forEach((point, i) => {
        const originalPos = originalPositions[i];
        
        if (point.isTentacle && point.tentacleIndex !== undefined && point.segmentIndex !== undefined) {
          const tentacleIndex = point.tentacleIndex;
          const segmentIndex = point.segmentIndex;
          const segmentProgress = segmentIndex / 8; // 0 to 1 (9 segments = 0-8)
          
          // A. COMPOUND WAVE MOTION (5 frequencies)
          const adjustedTime = time.current * tentacleSpeedVariation[tentacleIndex];
          const waveTime = adjustedTime + tentacleIndex * 0.5 + phase;
          
          const wave1 = Math.sin(waveTime * 2 - segmentProgress * Math.PI * 2) * 0.15;
          const wave2 = Math.sin(waveTime * 3.5 - segmentProgress * Math.PI * 1.5) * 0.08;
          const wave3 = Math.sin(waveTime * 5 - segmentProgress * Math.PI) * 0.04;
          const wave4 = Math.sin(waveTime * 7.5 - segmentProgress * Math.PI * 0.8) * 0.02;
          const wave5 = Math.sin(waveTime * 11 - segmentProgress * Math.PI * 0.5) * 0.01;
          
          const totalWave = wave1 + wave2 + wave3 + wave4 + wave5;
          
          // B. APPLY WAVE TO X AND Z (sideways motion)
          const waveStrength = segmentProgress * 1.5; // Stronger at tips
          let targetX = originalPos.x + totalWave * waveStrength;
          let targetZ = originalPos.z + totalWave * waveStrength * 0.7;
          
          // C. Y OSCILLATION (up/down)
          const yWave = Math.sin(waveTime * 1.5 - segmentProgress * Math.PI) * 0.05;
          let targetY = originalPos.y + yWave * segmentProgress;
          
          // D. CURL/UNFURL (tentacles curl inward when pulsing)
          const curlFactor = curlAmount * segmentProgress * segmentProgress;
          const centerDirection = new THREE.Vector3(
            -originalPos.x,
            0,
            -originalPos.z
          ).normalize();
          
          targetX += centerDirection.x * curlFactor;
          targetZ += centerDirection.z * curlFactor;
          targetY += curlFactor * 0.5; // Lift when curling
          
          // E. DRAG EFFECT (tentacles lag behind body motion)
          const dragStrength = segmentProgress * 0.5; // Stronger at tips
          targetX -= velocity.x * dragStrength;
          targetY -= velocity.y * dragStrength;
          targetZ -= velocity.z * dragStrength;
          
          // F. SMOOTH INTERPOLATION
          const lerpSpeed = 0.15;
          const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
          point.position.lerp(targetPosition, lerpSpeed);
          
        } else {
          // Dome points stay at original position (relative to body)
          point.position.copy(originalPos);
        }
      });
      
      // Store position for next frame (drag calculation)
      previousPosition.current.copy(groupRef.current.position);
      
      // 6. BIO-LUMINESCENT PARTICLES
      const emissionRate = pulseStrength > 0.6 ? 0.6 : 0.8;
      
      if (Math.random() > emissionRate) {
        particles.current.push({
          position: groupRef.current.position.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            -0.05,
            (Math.random() - 0.5) * 0.15
          ),
          life: 2.5,
          maxLife: 2.5
        });
      }
      
      particles.current = particles.current.filter(p => {
        p.position.add(p.velocity);
        p.life -= delta;
        return p.life > 0;
      });
      
      if (particles.current.length > 30) {
        particles.current = particles.current.slice(-30);
      }
    }
  });

  // Calculate dynamic glow intensity based on pulse and motion
  const getDynamicGlowIntensity = () => {
    const pulseVariation = 0.8 + (Math.sin(phase) * 0.4);
    const pulse = Math.sin(time.current * 1.2 + phase) * pulseVariation;
    const pulseStrength = (pulse + 1) / 2;
    
    // Base glow varies with pulse
    const baseGlow = 2.5 * pulseStrength + 1.0; // 1.0 to 3.5
    
    return baseGlow;
  };

  return (
    <group ref={groupRef} position={initialPosition}>
      <LEDConstellation
        points={jellyfishPoints.map((p, i) => ({
          position: p.position,
          connections: p.connections,
          // Tips glow brighter
          glowMultiplier: p.isTip ? 1.5 : 1.0
        }))}
        color={color}
        glowIntensity={getDynamicGlowIntensity()}
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
