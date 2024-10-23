import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";

// Cubic easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface ShaderProps {
  color: string;
}

const NextPageBtnMaterial: React.FC<ShaderProps> = ({ color }) => {
  const mat = useRef(null);
  const revealTime = 12; // Time in seconds to start revealing
  const fadeDuration = 3; // Time in seconds for the fade-in effect

  useFrame((state, delta) => {
    if (!mat.current) return;
    // @ts-ignore
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;

    // Start fade-in process after revealTime
    if (elapsedTime >= revealTime) {
      const progress = (elapsedTime - revealTime) / fadeDuration;
      const easedAlpha = easeInOutCubic(Math.min(progress, 1)); // Eased alpha goes from 0 to 1
      // @ts-ignore
      mat.current.uniforms.alpha.value = easedAlpha;
    }
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      alpha: { value: 0.0 },
      uColor: { value: new THREE.Color(color) },
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

export default React.memo(NextPageBtnMaterial);
