"use client";
import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Camera from "./components/Camera/Camera";
import { Leva } from "leva";

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 2, 30],
          zoom: 1.06,
          near: -1500,
          far: 1500,
        }}
        orthographic
        shadows={true}
        // linear
      >
        <Camera />
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
