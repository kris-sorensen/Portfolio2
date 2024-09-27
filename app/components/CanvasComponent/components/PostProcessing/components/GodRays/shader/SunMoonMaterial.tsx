import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./sunMoon.vertex.glsl";
import fragmentShader from "./sunMoon.fragment.glsl";
import { getAnimProgress } from "@/app/anim/animManager";

interface SunMoonMaterialProps {
  sunOpacity: number;
  materialRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
  applyPage2Props: boolean;
}

const SunMoonMaterial: React.FC<SunMoonMaterialProps> = ({
  sunOpacity,
  materialRef,
  applyPage2Props,
}) => {
  useFrame(() => {
    if (!materialRef.current) return;

    // Get the current animation progress and round to a small precision
    let progress = getAnimProgress();

    // Apply precision rounding
    const threshold = 0.01;
    if (Math.abs(progress - 1) < threshold) {
      progress = 1;
    } else if (Math.abs(progress) < threshold) {
      progress = 0;
    }

    materialRef.current.uniforms.uProgress.value = progress;

    // Update the opacity uniform
    materialRef.current.uniforms.opacity.value = sunOpacity;

    // Switch colors instantly based on the adjusted progress value
    if (applyPage2Props) {
      materialRef.current.uniforms.uColor.value.set("#fde216"); // Yellow color
      materialRef.current.uniforms.opacity.value = 0.2; // Yellow color
    } else if (!applyPage2Props) {
      materialRef.current.uniforms.uColor.value.set("#349ef5"); // Blue color
      materialRef.current.uniforms.opacity.value = 0.5; // Blue color
    }
  });

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0.0 },
      uColor: { value: new THREE.Color("#349ef5") }, // Initial color (blue)
      opacity: { value: sunOpacity },
    }),
    [sunOpacity]
  );

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true} // Enable transparency
    />
  );
};

export default React.memo(SunMoonMaterial);
