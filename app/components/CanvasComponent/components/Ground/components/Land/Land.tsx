import useStore from "@/app/store/useStore";
import { Sphere } from "@react-three/drei";
import React, { useCallback, useRef, useEffect } from "react";
import { ShaderMaterial, Color } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Sphere radius
const sphereRadius = 1000; // Radius of the sphere

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
const onBeforeCompile = (shader: ShaderMaterial) => {
  // Add custom uniforms to the shader
  shader.uniforms.uProgress = uniforms.uProgress;
  shader.uniforms.dayColor = uniforms.dayColor;
  shader.uniforms.nightColor = uniforms.nightColor;

  // Inject uniforms into the shader code
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float uProgress;
    uniform vec3 dayColor;
    uniform vec3 nightColor;
    `
  );

  // Modify the color output in the shader
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
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const OBC = useCallback(onBeforeCompile, []);

  // Refs for animation
  const isAnimating = useRef(false);
  const startTime = useRef(0);
  const startValue = useRef(0);

  // Update animation when 'applyPage2Props' changes
  useEffect(() => {
    if (materialRef.current) {
      isAnimating.current = true;
      startTime.current = performance.now() / 1000; // Start time in seconds
      // Get the current progress
      startValue.current = uniforms.uProgress.value;
    }
  }, [applyPage2Props]);

  // Update 'uProgress' uniform every frame
  useFrame(() => {
    if (isAnimating.current) {
      const elapsedTime = performance.now() / 1000 - startTime.current;
      const duration = 12; // Duration of the color transition in seconds
      let t = elapsedTime / duration;
      t = Math.min(t, 1); // Ensure t does not exceed 1

      // Optionally, apply an easing function here

      // Calculate the current progress
      const start = startValue.current;
      const end = applyPage2Props ? 1 : 0;
      uniforms.uProgress.value = start + (end - start) * t;

      if (t >= 1) {
        isAnimating.current = false;
      }
    }
  });

  return (
    <mesh position={[0, 0, 0]} name={"floor"}>
      <Sphere args={[sphereRadius, 100, 100]}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={OBC}
          metalness={0.8}
          roughness={0.6}
          receiveShadows={true}
        />
      </Sphere>
    </mesh>
  );
};

export default Land;
