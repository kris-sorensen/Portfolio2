import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  vertexShader,
  AnimatedFrameFragment,
} from "@/app/shaders/BasicShader/BasicShader.shader";

const FrameMaterial = () => {
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
      aspectRatio: {
        value: viewport.width / viewport.height,
      },
      resolution: {
        value: new THREE.Vector2(viewport.width, viewport.height),
      },
    }),
    [viewport.width, viewport.height]
  );
  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={AnimatedFrameFragment}
      transparent
    />
  );
};

export default FrameMaterial;
