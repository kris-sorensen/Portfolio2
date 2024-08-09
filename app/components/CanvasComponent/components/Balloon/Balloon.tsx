import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Line001: THREE.Mesh;
  };
  materials: {};
  animations: GLTFAction[];
};

function easeInCubicRoot(t) {
  return Math.cbrt(t); // Cube root of t
}

export function Balloon(
  props: JSX.IntrinsicElements["group"] & {
    color: THREE.Color;
    onRemove: () => void;
  }
) {
  const { nodes } = useGLTF("/models/balloon-transformed.glb") as GLTFResult;
  const mesh = useRef<THREE.Mesh>(null);
  const scaleFactor = useRef(0); // Initialize scale factor as a ref
  const elapsedTime = useRef(0); // Track the elapsed time
  const growing = useRef(true); // Track if the balloon is still growing

  // Set an initial small scale
  const initialScale = 0.0;
  const targetScale = 0.75;
  const resetPoint = 30;

  const delay = 0;

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Accumulate elapsed time
    elapsedTime.current += delta;

    if (growing.current) {
      // Start scaling only after the delay
      if (elapsedTime.current > delay) {
        // Increment the scale factor after the delay
        scaleFactor.current = Math.min(scaleFactor.current + delta * 0.3, 1); // Clamp between 0 and 1

        // Apply the easing function to the scale factor
        const easeFactor =
          initialScale +
          easeInCubicRoot(scaleFactor.current) * (targetScale - initialScale);

        // Uniformly increase the scale
        mesh.current.scale.set(easeFactor, easeFactor, easeFactor);

        // Adjust the Y position using the same easing function
        const initialY = 1.001; // Initial Y position is 1
        const boundingBoxHeight =
          mesh.current.geometry.boundingBox.max.y -
          mesh.current.geometry.boundingBox.min.y;
        mesh.current.position.y =
          initialY + (easeFactor - 1) * (boundingBoxHeight / 2);

        // Check if scaling is complete
        if (scaleFactor.current >= 1) {
          growing.current = false; // Stop scaling and start drifting
        }
      }
    } else {
      // Start drifting upwards after the balloon has finished growing
      mesh.current.position.y += delta * 0.5; // Adjust the speed of drifting upwards

      // Check if the balloon is off-screen (e.g., above y=10)
      if (mesh.current.position.y > resetPoint) {
        props.onRemove(); // Trigger the removal callback
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        scale={0.001}
        ref={mesh}
        name="Line001"
        geometry={nodes.Line001.geometry}
      >
        <meshPhysicalMaterial
          color={props.color} // Use the passed color
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          reflectivity={1}
          transparent={true}
          opacity={0.9}
          fog={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/balloon-transformed.glb");
