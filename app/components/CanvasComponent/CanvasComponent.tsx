"use client";
import React, { Suspense, useState } from "react";
import * as THREE from "three";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 3, 1, 60), 0.05));
  return null;
}

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 160, 160], fov: 20 }}>
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} />
        <fog attach="fog" args={["#111", 20, 120]} />
        <Suspense fallback={null}>
          <Scene position={[0, -9, 0]} />
          <Rig />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
