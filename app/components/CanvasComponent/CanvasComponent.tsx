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
import useStore from "@/app/store/useStore";

const CanvasComponent: React.FC = () => {
  const Page = useStore((state) => state.Page);

  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Leva collapsed />
      <Canvas
        onClick={() => console.log("canvas click")}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 0.5],
          zoom: 60, // Adjust this value to control the zoom level
          near: -10,
          far: 10,
        }}
        orthographic
        // linear
        // shadows={true}
      >
        {/* <fog attach="fog" args={["#b3b3b38d", 0.5, -2]} /> */}
        <Camera />
        <OrbitControls makeDefault enableZoom={false} />
        {/* <color
          attach="background"
          args={[Page === 2 ? "#349ef5" : "black"]} //#0bdbf9
        /> */}
        <Suspense fallback={null}>
          <PostProcessing />
          <Lights />
          <Scene />
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
