"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";
import DevToolsR3F from "./components/DevTools/DevToolsR3F";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, pointer } = useThree();
  const rigActive = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      rigActive.current = false;
    }, 2000);
  }, []);

  useFrame(() => {
    // if (!rigActive.current) return;
    // camera.position.lerp(vec.set(pointer.x * 3, pointer.y * 1.5, 60), 0.0465);
  });
  return null;
}

const Lights = () => {
  const pointLightRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (pointLightRef.current) {
      // const helper = new THREE.PointLightHelper(pointLightRef.current, 5); // The second argument controls the size of the helper
      // scene.add(helper);
      // return () => {
      //   scene.remove(helper); // Clean up the helper when the component unmounts
      // };
    }
  }, [scene]);

  return (
    <>
      {/* <directionalLight position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} /> */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        distance={17}
        intensity={6}
        decay={0.01}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};

const CanvasComponent: React.FC = () => {
  return (
    <div className="absolute top-[0px] left-0 w-full h-full outline-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1], fov: 70 }}>
        <OrbitControls makeDefault enableZoom={true} />
        {/* <fog attach="fog" args={["#111", 20, 40]} /> */}
        <Suspense fallback={null}>
          <Scene />
          <Rig />
          <Lights />
          {/* <Environment preset="warehouse" background /> */}
        </Suspense>
        <DevToolsR3F />
      </Canvas>
      <Loader />
    </div>
  );
};

export default CanvasComponent;
