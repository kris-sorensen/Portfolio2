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
        onClick={(event) => {
          console.log(`event`, event);
        }}
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
          <Scene />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
