import useStore from "@/app/store/useStore";
import { Sphere } from "@react-three/drei";
import React, { useCallback, useRef, useEffect } from "react";
import { ShaderMaterial, Color } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";

// Sphere radius
const sphereRadius = 1000;

interface Uniforms {
  uProgress: { value: number };
  dayColor: { value: Color };
  nightColor: { value: Color };
}

// Define the day and night colors
const uniforms: Uniforms = {
  uProgress: { value: 0.0 },
  dayColor: { value: new Color("#008736") }, // Grass green
  nightColor: { value: new Color("#153178") }, // Dark blue
};

// Shader modification function
const onBeforeCompile = (
  shader: ShaderMaterial & { fragmentShader: string; uniforms: any }
) => {
  shader.uniforms.uProgress = uniforms.uProgress;
  shader.uniforms.dayColor = uniforms.dayColor;
  shader.uniforms.nightColor = uniforms.nightColor;

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uProgress;
    uniform vec3 dayColor;
    uniform vec3 nightColor;
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>",
    `
    // Interpolate between nightColor and dayColor based on uProgress
    vec3 finalColor = mix(nightColor, dayColor, uProgress);
    diffuseColor.rgb = finalColor;

    #include <color_fragment>
    `
  );
};

const Land = () => {
  const applyPage2Props = useStore((state) => state.Page2PropsActive);
  const EnableShadows = useStore((state) => state.EnableShadows); // Get shadow toggle
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const OBC = useCallback(
    (shader: any) => onBeforeCompile(shader as ShaderMaterial),
    []
  );

  // Leva controls for material properties
  const { roughness, metalness, flatShading } = useControls("Land Material", {
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    flatShading: { value: false },
  });

  // Refs for animation
  const isAnimating = useRef(false);
  const startTime = useRef(0);
  const startValue = useRef(0);

  // Update animation when 'applyPage2Props' changes
  useEffect(() => {
    if (materialRef.current) {
      isAnimating.current = true;
      startTime.current = performance.now() / 1000;
      startValue.current = uniforms.uProgress.value;
    }
  }, [applyPage2Props]);

  // Update 'uProgress' uniform every frame
  useFrame(() => {
    if (isAnimating.current) {
      const elapsedTime = performance.now() / 1000 - startTime.current;
      const duration = 12;
      let t = elapsedTime / duration;
      t = Math.min(t, 1);

      const start = startValue.current;
      const end = applyPage2Props ? 1 : 0;
      uniforms.uProgress.value = start + (end - start) * t;

      if (t >= 1) {
        isAnimating.current = false;
      }
    }
  });

  return (
    <mesh
      position={[0, 0, 0]}
      name={"floor"}
      receiveShadow={EnableShadows}
      castShadow={EnableShadows}
    >
      <Sphere args={[sphereRadius, 128, 128]}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={OBC}
          roughness={roughness}
          metalness={metalness}
          flatShading={flatShading}
        />
      </Sphere>
    </mesh>
  );
};

export default Land;
