"use client";
import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Config from "./components/Config/Config";
import { Leva } from "leva";

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none pointer-events-none">
      <Leva hidden />
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 2.8, 30],
          zoom: 1.06,
          near: -3000,
          far: 3000,
        }}
        orthographic
        shadows={false}
      >
        <Config />
        <OrbitControls makeDefault enableZoom={true} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
