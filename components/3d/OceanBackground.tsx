'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { LEDJellyfish } from './LEDJellyfish';
import { LEDTurtle } from './LEDTurtle';
import { LEDMantaRay } from './LEDMantaRay';

export default function OceanBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        {/* JELLYFISH (Purple/Cyan) */}
        <LEDJellyfish 
          initialPosition={[8, 2, -5]} 
          speed={1.0}
          phase={0}
          color="#8B5CF6"  // Purple
        />
        <LEDJellyfish 
          initialPosition={[-6, -3, -8]} 
          speed={0.7}
          phase={Math.PI}
          color="#00F0FF"  // Cyan
        />
        <LEDJellyfish 
          initialPosition={[0, 0, -10]} 
          speed={1.3}
          phase={Math.PI / 2}
          color="#8B5CF6"  // Purple
        />
        
        {/* GREEN TURTLES */}
        <LEDTurtle 
          initialPosition={[-10, 0, -6]} 
          speed={0.5}
          phase={0}
        />
        <LEDTurtle 
          initialPosition={[8, -2, -12]} 
          speed={0.6}
          phase={Math.PI / 3}
        />
        
        {/* BLUE MANTA RAYS */}
        <LEDMantaRay 
          initialPosition={[12, 4, -8]} 
          speed={0.4}
          phase={0}
        />
        <LEDMantaRay 
          initialPosition={[-8, -4, -15]} 
          speed={0.45}
          phase={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, 10]} intensity={0.5} color="#ffffff" />
        
        {/* Bloom post-processing for LED glow */}
        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
