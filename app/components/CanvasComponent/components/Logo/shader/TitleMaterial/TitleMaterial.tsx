import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./titleMaterial.vertex.glsl";
import fragmentShader from "./titleMaterial.fragment.glsl";
import { getAnimProgress } from "@/app/anim/animManager";

interface ShaderProps {
  color: string;
  activePage: number;
}

const TitleShaderMaterial: React.FC<ShaderProps> = ({ color, activePage }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      uColor: { value: new THREE.Color(color) },
      uProgress: { value: 0.0 },
      uActivePage: { value: activePage },
    }),
    [color]
  );

  useFrame(() => {
    if (!materialRef.current) return;

    // Update uProgress uniform using getAnimProgress()
    materialRef.current.uniforms.uProgress.value =
      getAnimProgress() - activePage;
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
    />
  );
};

export default React.memo(TitleShaderMaterial);
