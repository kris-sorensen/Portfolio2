import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei"; // Import useTexture
import vertexShader from "./tree.vertex.glsl";
import fragmentShader from "./tree.fragment.glsl";

const TreeMaterial: React.FC = () => {
  const mat = useRef<THREE.ShaderMaterial | null>(null);
  const texture = useTexture("/textures/forest.webp");

  useEffect(() => {
    const handleResize = () => {
      if (mat.current) {
        mat.current.uniforms.resolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    if (!mat.current) return;
    const elapsedTime = mat.current.uniforms.time.value;
    mat.current.uniforms.time.value = elapsedTime + delta;
  });

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      uColor: { value: new THREE.Vector3(0.25, 0.25, 0.25) },
      uTexture: { value: texture },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      }, // Initialize resolution
    }),
    [texture]
  );

  return (
    <shaderMaterial
      ref={mat}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      // blending={4}
      side={THREE.FrontSide}
      // depthTest
      // depthWrite={false}
    />
  );
};

export default React.memo(TreeMaterial);
