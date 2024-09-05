"use client";
import React, { Suspense } from "react";
import * as THREE from "three";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Camera from "./components/Camera/Camera";
import Lights from "./components/Camera/components/Lights/Lights";
import { Leva } from "leva";

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 0.5],
          zoom: 60, // Adjust this value to control the zoom level
          near: 0.0,
          far: 5,
        }}
        orthographic
        shadows={true}
      >
        <Leva hidden />
        <Camera />
        <OrbitControls makeDefault enableZoom={true} />
        <fog attach="fog" args={["#ff0000", 0, 40]} />
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <Lights />
          <Scene />
        </Suspense>
        {/* <DevToolsR3F /> */}
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
