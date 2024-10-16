import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./water.vertex.glsl";
import fragmentShader from "./water.fragment.glsl";
import { getAnimProgress } from "@/app/anim/animManager";

const Water: React.FC = () => {
  const mat = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    // Update time uniform
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Update uProgress uniform
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
      // depthWrite={false} // Disable depth writing for transparency
      // depthTest={true} // Keep depth testing to ensure correct render order
      // blending={THREE.AdditiveBlending} // Use additive blending to let light through
    />
  );
};

export default React.memo(Water);
