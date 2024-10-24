import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import vertexShader from "./backgroundMaterial.vertex.glsl";
import fragmentShader from "./backgroundMaterial.fragment.glsl";
import starMakerChunk from "../includes/starMaker.glsl";
import randomChunk from "../includes/util/random.glsl";
import random2Chunk from "../includes/util/random2.glsl";
import meteorChunk from "../includes/meteor.glsl";
import meteorstormChunk from "../includes/meteorstorm.glsl";
import { getAnimProgress } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

THREE.ShaderChunk.starMaker = starMakerChunk;
THREE.ShaderChunk.random = randomChunk;
THREE.ShaderChunk.random2 = random2Chunk;
THREE.ShaderChunk.meteor = meteorChunk;
THREE.ShaderChunk.meteorstorm = meteorstormChunk;

const BackgroundMaterial: React.FC = () => {
  const applyPage2Props = useStore((state) => state.Page2PropsActive);
  const mat = useRef<THREE.ShaderMaterial | null>(null);
  const { size, pointer, scene } = useThree(); // Get pointer (mouse) data

  useFrame((state, delta) => {
    if (!mat.current) return;

    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Look for the 'sunMoonMesh' mesh by its name
    const sunMoonMesh = scene.getObjectByName("sunMoonMesh");

    if (sunMoonMesh && sunMoonMesh.position) {
      mat.current.uniforms.sunMoonPosY.value =
        sunMoonMesh.position.y / window.innerHeight;
    }

    // Update the shader material's uProgress uniform
    mat.current.uniforms.uProgress.value = getAnimProgress();
    // Define fade duration based on whether we're fading in or out
    const fadeOutDuration = 0.5; // Seconds to fade out
    const fadeInDuration = 2; // Seconds to fade in

    // Target visibility for stars (fade out when applyPage2Props is true, fade in otherwise)
    const targetStarViz = getAnimProgress() > 0.5 ? 1 : 0;

    // Define the duration for the transition based on the current target
    const fadeDuration = applyPage2Props ? fadeOutDuration : fadeInDuration;

    // Interpolate uStarViz based on the target value, delta time, and duration
    mat.current.uniforms.uStarViz.value = THREE.MathUtils.lerp(
      mat.current.uniforms.uStarViz.value,
      targetStarViz,
      delta / fadeDuration
    );
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
      uStarViz: { value: 0 },
      sunMoonPosY: { value: 0.5 }, // Add pos of sunMoon
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
