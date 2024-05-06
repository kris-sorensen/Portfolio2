"use client";
import React, { Suspense } from "react";
import * as three from "three";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FullScreenPlane from "./FullScreenPlane";

const CanvasComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen outline-none">
      <Suspense fallback={null}>
        <Canvas linear dpr={[1, 2]}>
          {/* <color attach="background" args={["#e1f5ff"]} /> */}
          <FullScreenPlane />
        </Canvas>
      </Suspense>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
