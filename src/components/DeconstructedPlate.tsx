"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, PresentationControls, SpotLight, Center, Bounds, Html, useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="text-[#D4AF37] font-sans tracking-[0.3em] text-xs whitespace-nowrap bg-black/50 p-4 rounded-xl backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl">LOADING THALI... {progress.toFixed(0)}%</div></Html>;
}

function TorchLight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const xTo = useRef<Function>(null);
  const yTo = useRef<Function>(null);

  useEffect(() => {
    if (lightRef.current) {
      xTo.current = gsap.quickTo(lightRef.current.position, "x", { duration: 1, ease: "power2.out" });
      yTo.current = gsap.quickTo(lightRef.current.position, "y", { duration: 1, ease: "power2.out" });
    }
  }, []);
  
  useFrame((state) => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(state.pointer.x * 8);
    yTo.current(state.pointer.y * 8 + 5);
  });

  return (
    <SpotLight
      ref={lightRef}
      position={[0, 5, 5]}
      angle={0.6}
      penumbra={1}
      intensity={8}
      color="#E5C07B"
      castShadow
    />
  );
}

function ThaliModel({ isDeconstructed }: { isDeconstructed: boolean }) {
  const { scene } = useGLTF("/indian_thali.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current || !scene) return;
    
    // 2. Traversal and Animation
    const children = scene.children;
    
    // If it's a monolithic scan with only 1 child, we make the whole thing float.
    const isMonolithic = children.length <= 1;

    let index = 0;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        if (!child.userData.originalPosition) {
          child.userData.originalPosition = child.position.clone();
          child.userData.originalRotation = child.rotation.clone();
        }
        
        index++;
        const angle = (index / 10) * Math.PI * 2; // Arbitrary 10 parts if we have many
        const radius = isDeconstructed ? (isMonolithic ? Math.sin(Date.now()*0.001)*0.05 : 0.5) : 0;
        const targetX = isMonolithic ? 0 : Math.cos(angle) * radius;
        const targetY = isMonolithic ? Math.sin(Date.now()*0.001) * 0.05 : Math.sin(angle) * radius;
        const targetZ = isMonolithic ? 0 : Math.sin(angle) * radius;
        
        const origPos = child.userData.originalPosition;
        const origRot = child.userData.originalRotation;

        gsap.to(child.position, {
          x: origPos.x + targetX,
          y: origPos.y + targetY,
          z: origPos.z + targetZ,
          duration: 2.5,
          ease: "power4.out",
          overwrite: "auto"
        });
        
        gsap.to(child.rotation, {
          x: isDeconstructed ? origRot.x + (isMonolithic ? 0.2 : Math.random() * Math.PI) : origRot.x,
          y: isDeconstructed ? origRot.y + (isMonolithic ? Math.PI / 4 : setAngle(Math.random())) : origRot.y,
          z: isDeconstructed ? origRot.z + (isMonolithic ? -0.1 : Math.random() * Math.PI) : origRot.z,
          duration: 2.5,
          ease: "power4.out",
          overwrite: "auto"
        });
      }
    });

    function setAngle(num: number) { return num * Math.PI; }
  }, [isDeconstructed, scene]);

  return (
    <primitive ref={groupRef} object={scene} />
  );
}

export default function DeconstructedPlate() {
  const [isDeconstructed, setIsDeconstructed] = useState(false);

  return (
    <div className="relative w-full h-[100dvh] bg-transparent flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1]}
          gl={{ powerPreference: "high-performance", antialias: false }}
        >
          <color attach="background" args={['#000000']} />
          {/* Moody Noir Lighting */}
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <SpotLight
            position={[5, 10, 5]}
            angle={0.4}
            penumbra={1}
            intensity={3}
            color="#ffffff"
          />
          <TorchLight />
          <PresentationControls
            global
            rotation={[0.2, 0, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.5, 0.5]}
          >
            <React.Suspense fallback={<Loader />}>
              <Bounds fit clip margin={1.2}>
                <ThaliModel isDeconstructed={isDeconstructed} />
              </Bounds>
            </React.Suspense>
          </PresentationControls>
        </Canvas>
      </div>
      
      {/* UI Overlay */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-12 z-10 pointer-events-none flex flex-col items-center px-4 text-center">
        <button
          className="pointer-events-auto px-6 py-3 md:px-8 md:py-4 mb-4 md:mb-6 rounded-full glass text-[#D4AF37] font-sans uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-semibold transition-all duration-500 hover:bg-[#D4AF37] hover:text-[#1a1a1a] shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] border border-[#D4AF37]/30"
          onClick={() => setIsDeconstructed(!isDeconstructed)}
        >
          {isDeconstructed ? "Reassemble Masterpiece" : "Deconstruct Flavor"}
        </button>
        
        <div className={`transition-all duration-1000 transform ${isDeconstructed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} pointer-events-auto`}>
          <h2 className="font-serif text-3xl md:text-5xl mb-4 text-[#F5F5F5]">A Taste of Tradition</h2>
          <a href="https://maps.app.goo.gl/wnSBFMmKL2fS3DmAA" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 pb-1 border-b border-[#D4AF37] text-[#D4AF37] font-sans text-xs md:text-sm tracking-[0.2em] hover:text-white hover:border-white transition-colors">
            RESERVE AT HOTEL RAJ THAL
          </a>
        </div>
      </div>
      
      {/* Vignette overlay for cinematic effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)' }}></div>
    </div>
  );
}
