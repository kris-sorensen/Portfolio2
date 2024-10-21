"use client";
import React, { Suspense } from "react";
import * as THREE from "three";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";
import Camera from "./components/Camera/Camera";
import Lights from "./components/Lights/Lights";
import { Leva } from "leva";
import PostProcessing from "./components/PostProcessing/PostProcessing";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Leva collapsed />
      <Canvas
        onClick={() => console.log("canvas click")}
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
        {/* <fog attach="fog" args={["rgb(10, 10, 10)", 100, 1000]} /> */}
        <Camera />
        <OrbitControls makeDefault enableZoom={true} />
        {/* <color
          attach="background"
          args={[Page === 2 ? "#349ef5" : "black"]} //#0bdbf9
        /> */}
        <Suspense fallback={null}>
          {/* <PostProcessing /> */}
          {/* <Lights /> */}
          <Scene />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
