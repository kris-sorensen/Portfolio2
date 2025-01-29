"use client";
import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Config from "./components/Config/Config";
import { Leva } from "leva";
import useStore from "@/app/store/useStore";

const CanvasComponent: React.FC = () => {
  const EnableShadows = useStore((state) => state.EnableShadows);

  return (
    <div className="absolute top-0 left-0 w-full h-full outline-none pointer-events-auto">
      <Leva collapsed />
      <Canvas
        dpr={[1, 2]}
        shadows={EnableShadows}
        camera={{
          position: [0, 1.25, 30],
          zoom: 1.05,
          near: -2000,
          far: 2000,
        }}
        orthographic
      >
        <Config />
        <OrbitControls enabled={false} makeDefault enableZoom={true} />
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
