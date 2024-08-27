"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, pointer } = useThree();
  const rigActive = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      rigActive.current = false;
    }, 2000);
  }, []);

  useFrame(() => {
    if (!rigActive.current) return;
    camera.position.lerp(vec.set(pointer.x * 3, 0, 60), 0.0465);
  });
  return null;
}

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 20 }}>
        <OrbitControls makeDefault enableZoom={true} />
        {/* <fog attach="fog" args={["#111", 20, 40]} /> */}
        <Suspense fallback={null}>
          <Scene />
          <Rig />
          <Environment preset="warehouse" />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
