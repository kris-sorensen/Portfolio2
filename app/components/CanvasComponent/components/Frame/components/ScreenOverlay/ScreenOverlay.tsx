import React from "react";
import { useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import { fragmentShader } from "./shader/overlay";
import { vertexShader } from "@/app/shaders/BasicShader/BasicShader.shader";

const OverlayMaterial = () => {
  return (
    <shaderMaterial
      // ref={material}
      attach="material"
      // uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
    />
  );
};

const Overlay = () => {
  const { viewport, camera } = useThree();
  return (
    <mesh position={[0, 0, camera.position.z - 0.01]}>
      <Plane args={[5, 5]}>
        <OverlayMaterial />
      </Plane>
    </mesh>
  );
};

export default Overlay;
