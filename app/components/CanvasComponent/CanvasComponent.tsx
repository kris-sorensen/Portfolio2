"use client";
import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05));
  return null;
  // return <CameraShake maxYaw={0.01} maxPitch={0.01} maxRoll={0.01} yawFrequency={0.5} pitchFrequency={0.5} rollFrequency={0.4} />
}

const CanvasComponent = () => {
  console.log(`render Canvas comp`);
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 160, 160], fov: 20 }}
      >
        <OrbitControls makeDefault />
        <fog attach="fog" args={["lightpink", 60, 100]} />
        <Suspense fallback={null}>
          {/* <color attach="background" args={["#e1f5ff"]} /> */}
          <Scene position={[-4.5, -4, 0]} />
          <ambientLight intensity={0.5} />
          <Rig />
          {/* <Model position={[-4.5, -4, 0]} rotation={[0, -2.8, 0]} /> */}
          <spotLight position={[50, 50, -30]} castShadow />
          <pointLight position={[-10, -10, -10]} color="red" intensity={3} />
          <pointLight position={[0, -5, 5]} intensity={0.5} />
          <directionalLight position={[0, -5, 0]} color="red" intensity={2} />
          {/* <Light /> */}
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
