import { Circle } from "@react-three/drei";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";

const easeOutQuad = (t: number) => 1 - Math.pow(1 - t, 2);

const Moon = () => {
  const circleRef = useRef<any>(null);
  const mesh = useRef<Mesh>(null);
  const scene = useRef(0);
  const scaleProgress = useRef(0);

  // Use the useFrame hook to rotate the circle
  useFrame(() => {
    if (mesh.current) {
      if (scene.current > 0) {
        const currentScale = mesh.current.scale.x; // Assuming uniform scale

        // Only scale if the current scale is less than 1
        if (currentScale >= 1) return;

        // Increase the progress of the scaling
        scaleProgress.current += 0.01; // Adjust speed by modifying increment

        // Cap progress at 1 (to prevent over-scaling)
        if (scaleProgress.current > 1) scaleProgress.current = 1;

        // Apply the easing function to calculate the new scale
        const easedScale = easeOutQuad(scaleProgress.current);

        // Update the scale on all three axes (x, y, z) using the eased value
        mesh.current.scale.set(easedScale, easedScale, easedScale);
        return;
      }
      if (mesh.current.position.x > 1) {
        scene.current = 1;
        mesh.current.scale.set(0, 0, 0);
        mesh.current.position.x = 0;
        return;
      }
      mesh.current.position.x += 0.0009; // Adjust speed here for slower or faster rotation
    }
  });

  return (
    <mesh ref={mesh} position={[-1, 0, 0]}>
      <Circle ref={circleRef} args={[0.39, 64, 64]}>
        <meshBasicMaterial color="#000000" />
      </Circle>
    </mesh>
  );
};

export default Moon;
