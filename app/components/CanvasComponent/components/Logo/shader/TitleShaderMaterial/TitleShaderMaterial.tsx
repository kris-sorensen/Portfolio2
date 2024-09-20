import React, { useMemo, useRef } from "react";
import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import directionalLightChunk from "./includes/directionalLight.glsl"; // Import your custom chunk

// Register the custom shader chunk in THREE.ShaderChunk
THREE.ShaderChunk.directionalLight = directionalLightChunk;

interface ShaderProps {
  color: string;
}
const TitleShaderMaterial: React.FC<ShaderProps> = ({ color }) => {
  const mat = useRef(null);

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
      uColor: {
        value: new THREE.Color(color),
      },
    }),
    [color]
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

export default React.memo(TitleShaderMaterial);
