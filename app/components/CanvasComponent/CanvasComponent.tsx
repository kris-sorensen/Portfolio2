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
        <fog attach="fog" args={["#932CE6", 60, 100]} />
        <Suspense fallback={null}>
          <Scene position={[0, -4, 0]} />
          <ambientLight intensity={0.5} />
          <Rig />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
