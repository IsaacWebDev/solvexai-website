'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function NeuralNetworkPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);

  // Generate node positions in 3D space
  const positions = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const conns: [number, number, number][][] = [];
    const nodePositions = [];
    
    for (let i = 0; i < 50; i++) {
      nodePositions.push([
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      ]);
    }

    for (let i = 0; i < 50; i++) {
      for (let j = i + 1; j < 50; j++) {
        const dist = Math.sqrt(
          Math.pow(nodePositions[i][0] - nodePositions[j][0], 2) +
          Math.pow(nodePositions[i][1] - nodePositions[j][1], 2) +
          Math.pow(nodePositions[i][2] - nodePositions[j][2], 2)
        );
        
        if (dist < 3) {
          conns.push([
            nodePositions[i] as [number, number, number],
            nodePositions[j] as [number, number, number]
          ]);
        }
      }
    }
    
    return conns;
  }, [positions]);

  // Slow rotation animation
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <>
      {/* Neural network nodes */}
      <Points ref={pointsRef} positions={positions}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Connection lines */}
      <group ref={linesRef}>
        {connections.map((conn, i) => (
          <Line
            key={i}
            points={conn}
            color="#00F0FF"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        ))}
      </group>
    </>
  );
}

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066FF" />
        <NeuralNetworkPoints />
      </Canvas>
    </div>
  );
}
