"use client";
import React, { Suspense } from "react";
import * as three from "three";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import FullScreenPlane from "./FullScreenPlane";

const CanvasComponent = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-[calc(100vh-156px)] outline-none">
      {" "}
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
