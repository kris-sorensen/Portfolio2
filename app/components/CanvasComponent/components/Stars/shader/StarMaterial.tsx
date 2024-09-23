import React, { useMemo, useRef } from "react";
import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import { useThree } from "@react-three/fiber";

interface ShaderProps {
  config: {
    particleSize: number;
  };
}
const StarMaterial: React.FC<ShaderProps> = ({ config }) => {
  const mat = useRef(null);

  const { gl } = useThree();
  // useFrame((state, delta) => {
  //   if (!mat.current) return;
  //   // @ts-ignore
  //   const elapsedTime = mat.current.uniforms.time.value;
  //   // @ts-ignore
  //   mat.current.uniforms.time.value = elapsedTime + delta;
  // });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
      },
      uSize: { value: config.particleSize * gl.getPixelRatio() },
    }),
    [config]
  );

  return (
    <shaderMaterial
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

export default React.memo(StarMaterial);
