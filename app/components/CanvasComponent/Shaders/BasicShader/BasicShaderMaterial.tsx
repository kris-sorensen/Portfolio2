"use client";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./BasicShader.shader";
import { useFrame } from "@react-three/fiber";

const BasicShaderMaterial = () => {
  const mat = useRef(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    // @ts-ignore
    const elapsedTime = mat.current.uniforms.time.value;
    // @ts-ignore
    mat.current.uniforms.time.value = elapsedTime + delta;
  });

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0.0,
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
    />
  );
};

export default React.memo(BasicShaderMaterial);
