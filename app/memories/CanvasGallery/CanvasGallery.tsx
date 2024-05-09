"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Gallery from "./Gallery";

const CanvasGallery = () => {
  return (
    <div className="top-[0px] left-0 w-full h-[calc(100vh-156px)] outline-none">
      <Canvas linear dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <color attach="background" args={["#efefef"]} />
          {/* <color attach="background" args={["#e1f5ff"]} /> */}
          <Gallery />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasGallery;
