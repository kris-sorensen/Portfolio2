import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import { useThree } from "@react-three/fiber";

interface ShaderProps {
  color: THREE.Vector3;
}
const MountainMaterial: React.FC<ShaderProps> = ({ color }) => {
  const mat = useRef(null);

  const { gl } = useThree();
  useFrame((state, delta) => {
    if (!mat.current) return;
    // @ts-ignore
    const elapsedTime = mat.current.uniforms.time.value;
    // @ts-ignore
    mat.current.uniforms.time.value = elapsedTime + delta;
  });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
      },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uColor: { value: color },
    }),
    []
  );

  return (
    <shaderMaterial
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true} // Ensure the material supports transparency
      depthWrite={false} // Allow solid parts to write to the depth buffer
      depthTest={true} // Keep depth testing to block rays with solid parts
      // Render mountain before God Rays
    />
  );
};

export default React.memo(MountainMaterial);
