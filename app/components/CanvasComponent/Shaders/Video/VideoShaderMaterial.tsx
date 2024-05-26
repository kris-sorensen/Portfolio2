"use client";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "./videoShader.shader";
import { useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const VideoShader = () => {
  const mat = useRef(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    // @ts-ignore
    const elapsedTime = mat.current.uniforms.time.value;
    // @ts-ignore
    mat.current.uniforms.time.value = elapsedTime + delta;
  });

  const dogVideo = useVideoTexture("/videos/dogs_petting_1_4k_webm.webm");

  const uniforms = useMemo(
    () => ({
      dogVideo: { value: dogVideo },
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

export default React.memo(VideoShader);
