"use client";
import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas, events } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Config from "./components/Config/Config";
import { Leva } from "leva";

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none pointer-events-none">
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 2.8, 30],
          zoom: 1.06,
          near: -1500,
          far: 1500,
        }}
        orthographic
        shadows={true}
      >
        <Config />
        <OrbitControls makeDefault enableZoom={true} />
        <Suspense fallback={null}>
          {/* <Suspense fallback={<LoadingScreen />}> */}
          <Scene />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function LoadingScreen() {
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [dots, setDots] = useState("");

  // Animate the glowing ring and text pulsing
  // useFrame((state, delta) => {
  //   if (ringRef.current) {
  //     ringRef.current.rotation.z += delta * 0.5;
  //   }

  //   // Make the 'loading...' dots animate
  //   setDots((prev) => (prev.length >= 3 ? "" : prev + "."));

  //   // Pulse the text
  //   if (textRef.current) {
  //     textRef.current.scale.setScalar(
  //       1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
  //     );
  //   }
  // });

  return (
    <group scale={[100, 100, 100]}>
      {/* Glowing ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshStandardMaterial
          color={"#00aaff"}
          emissive={"#00aaff"}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Loading text */}
      <Text
        ref={textRef}
        position={[0, -2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {"loading" + dots}
      </Text>
    </group>
  );
}
export default CanvasComponent;
