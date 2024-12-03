"use client";
import React, { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Config from "./components/Config/Config";
import { Leva } from "leva";
//pointer-events-none
const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none ">
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 20, 50],
          // zoom: 1,
          // near: -3000,
          fov: 45,
          far: 3000,
        }}
        // orthographic
        shadows={true}
      >
        <Config />
        <Suspense fallback={null}>
          {/* <Suspense fallback={<LoadingScreen />}> */}
          <Scene />
          {/* </group> */}
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
