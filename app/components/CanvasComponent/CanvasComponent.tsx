"use client";
import React, { Suspense } from "react";
import * as three from "three";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasComponent = () => {
  console.log(`render Canvas comp`);
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas linear dpr={[1, 2]}>
        <Suspense fallback={null}>
          {/* <color attach="background" args={["#e1f5ff"]} /> */}
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
