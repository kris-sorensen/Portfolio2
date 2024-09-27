import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./workSlide.vertex.glsl";
import fragmentShader from "./workSlide.fragment.glsl";
// import { getAnimProgress } from "@/app/anim/animManager";

const WorkSlideMaterial: React.FC = () => {
  const mat = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    // Update time uniform
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Update uProgress uniform
    // mat.current.uniforms.uProgress.value = getAnimProgress();
  });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
      },
      uColor: {
        // value: new THREE.Vector3(0.0, 1.0, 0.7843),
        value: new THREE.Vector3(0.25, 0.25, 0.25),
      },
      // resolution: {
      //   value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      // },
      // uProgress: {
      //   value: 0,
      // },
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
    />
  );
};

export default React.memo(WorkSlideMaterial);
