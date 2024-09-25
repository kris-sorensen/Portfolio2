import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./mountainMaterial.vertex.glsl";
import fragmentShader from "./mountainMaterial.fragment.glsl";
import mountainShapeChunk from "../includes/mountainShape.glsl";
import { PageProps } from "../../types/SceneTypes";
import { getAnimProgress } from "@/app/anim/animManager";

THREE.ShaderChunk.mountainShape = mountainShapeChunk;

const MountainMaterial: React.FC<PageProps> = () => {
  const mat = useRef(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    // Update time uniform
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Keep the call to getAnimProgress
    mat.current.uniforms.uProgress.value = getAnimProgress();
  });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
      },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uProgress: {
        value: 0,
      },
    }),
    []
  );

  return (
    <shaderMaterial
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      depthWrite={false}
      depthTest={true}
    />
  );
};

export default React.memo(MountainMaterial);
