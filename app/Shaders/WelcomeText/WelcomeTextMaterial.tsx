"use client";
import React, { useMemo, useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./welcomeText.shader";

interface Props {
  delay: number;
  duration: number;
}

// Define the type for the shader material
interface ShaderMaterial extends THREE.ShaderMaterial {
  uniforms: {
    time: { value: number };
    uOpacity: { value: number };
    uDelay: { value: number };
  };
}

const WelcomeText: React.FC<Props> = ({ delay, duration }) => {
  const mat = useRef<ShaderMaterial | null>(null);
  const animationState = useRef("fade-in");

  useFrame((state, delta) => {
    if (!mat.current) return;
    const elapsedTime = mat.current.uniforms.time.value;
    if (animationState.current === "fade-in") {
      if (elapsedTime - delay > duration) {
        animationState.current = "fade-out";
        mat.current.uniforms.time.value = 1;
        mat.current.uniforms.uDelay.value = 0;
      } else {
        mat.current.uniforms.time.value = elapsedTime + delta;
      }
    } else {
      mat.current.uniforms.time.value = elapsedTime - delta;
    }
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      uOpacity: { value: 0.0 },
      uDelay: { value: delay },
    }),
    [delay]
  );

  return (
    <shaderMaterial
      ref={mat}
      attach="material"
      transparent
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

export default React.memo(WelcomeText);
