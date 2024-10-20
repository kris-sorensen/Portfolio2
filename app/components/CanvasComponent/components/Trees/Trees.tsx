import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useThree, extend, useLoader, useFrame } from "@react-three/fiber";
import TreeModel from "./TreeModel";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Water } from "three-stdlib";
import useStore from "@/app/store/useStore"; // Import Zustand store

// Extend water from three-stdlib
extend({ Water });

const Ocean = () => {
  const ref = useRef();
  const { gl } = useThree();
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "./textures/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: "#349ef5",
      waterColor: "#0054bb",
      distortionScale: 3.7,
      fog: true,
      format: gl.encoding,
    }),
    [waterNormals, gl.encoding]
  );

  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta;
  });

  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, -310, 0]}
    />
  );
};

const Trees = () => {
  const { viewport } = useThree();
  const sphereRadius = 1000; // Radius of the sphere

  // Access applyPage2Props from Zustand store
  const applyPage2Props = useStore((state) => state.Page2PropsActive);

  const [trees, setTrees] = useState([
    {
      position: [-375, 310, 500],
      scale: [55, 55, 55],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [-275, 360, 800],
      scale: [40, 40, 40],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [450, 290, 650],
      scale: [17, 17, 17],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [350, 340, 700],
      scale: [18, 18, 18],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [400, 325, 800],
      scale: [22, 22, 22],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [290, 340, 600],
      scale: [18, 18, 18],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [200, 300, 400],
      scale: [30, 30, 30],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [520, 257, 850],
      scale: [10, 10, 10],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [250, 360, 920],
      scale: [13, 13, 13],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
    {
      position: [450, 275, 1000],
      scale: [20, 20, 20],
      rotation: [0, Math.random() * Math.PI * 2, 0],
    },
  ]);

  useEffect(() => {}, []);

  return (
    <group position={[0, -50, 0]}>
      <group position={[0, -1070, -100]} name={"ground"}>
        <mesh position={[0, 600, -800]}>
          {trees.map((tree, treeIndex) => (
            <TreeModel
              key={`${treeIndex}-${treeIndex}`}
              scale={tree.scale}
              position={tree.position}
              rotation={tree.rotation}
              castShadow
            />
          ))}
        </mesh>
        {/* The sphere is the "ground" */}
        <mesh position={[0, 0, 0]} name={"floor"}>
          <Sphere args={[sphereRadius, 100, 100]}>
            {/* Use ternary operator to change color based on applyPage2Props */}
            <meshStandardMaterial
              color={applyPage2Props ? "#008736" : "#153178"} // Green for grass, blue for default//#87fb8f// #fbf587
              metalness={applyPage2Props ? 0.2 : 0.5}
              roughness={0.5}
            />
          </Sphere>
        </mesh>
      </group>

      {/* Water - using Ocean shader */}
      <Suspense fallback={null}>
        <Ocean />
      </Suspense>
    </group>
  );
};

export default Trees;
