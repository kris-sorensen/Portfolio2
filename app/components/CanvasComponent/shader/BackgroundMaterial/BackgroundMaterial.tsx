import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./backgroundMaterial.vertex.glsl";
import fragmentShader from "./backgroundMaterial.fragment.glsl";
import starMakerChunk from "../includes/starMaker.glsl";
import randomChunk from "../includes/util/random.glsl";
import random2Chunk from "../includes/util/random2.glsl";
import meteorChunk from "../includes/meteor.glsl";
import meteorstormChunk from "../includes/meteorstorm.glsl";
import { getAnimProgress } from "@/app/anim/animManager";

THREE.ShaderChunk.starMaker = starMakerChunk;
THREE.ShaderChunk.random = randomChunk;
THREE.ShaderChunk.random2 = random2Chunk;
THREE.ShaderChunk.meteor = meteorChunk;
THREE.ShaderChunk.meteorstorm = meteorstormChunk;

const BackgroundMaterial: React.FC = () => {
  const mat = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state, delta) => {
    if (!mat.current) return;

    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Update the shader material's uProgress uniform
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
      uProgress: { value: 0 },
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

export default React.memo(BackgroundMaterial);
