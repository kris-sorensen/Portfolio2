import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import { isHovered } from "../constants/nextPageBtn.constant";

// Cubic easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface ShaderProps {
  color: string;
}

const NextPageBtnMaterial: React.FC<ShaderProps> = ({ color }) => {
  const mat = useRef<any>(null);
  const revealTime = 11; // Time in seconds to start revealing
  const fadeDuration = 2; // Time in seconds for the fade-in effect

  const hoverProgress = useRef(0);

  useFrame((state, delta) => {
    if (!mat.current) return;

    // Update time uniform
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Start fade-in process after revealTime
    if (elapsedTime >= revealTime) {
      const progress = (elapsedTime - revealTime) / fadeDuration;
      const easedAlpha = easeInOutCubic(Math.min(progress, 1)); // Eased alpha goes from 0 to 1
      mat.current.uniforms.alpha.value = easedAlpha;
    }

    // Update hover progress smoothly
    const targetProgress = isHovered ? 1 : 0;
    hoverProgress.current += (targetProgress - hoverProgress.current) * 0.1;

    // Update shader uniforms for hover effect
    mat.current.uniforms.uHoverProgress.value = hoverProgress.current;
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      alpha: { value: 0.0 },
      uColor: { value: new THREE.Color(color) },
      uHoverProgress: { value: 0.0 },
    }),
    [color]
  );

  return (
    <shaderMaterial
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      depthWrite={false}
      depthTest={false}
    />
  );
};

export default React.memo(NextPageBtnMaterial);
