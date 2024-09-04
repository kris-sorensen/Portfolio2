import {
  vertexShader,
  AnimatedFrameFragment,
  CurrentShader,
} from "@/app/Shaders/BasicShader/BasicShader.shader";
import { Circle, Plane, Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

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

const CurrentShaderMaterial = () => {
  const material = useRef(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0.0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (material.current) {
      material.current.uniforms.time.value += delta;
    }
  });

  return (
    <shaderMaterial
      ref={material}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={CurrentShader}
      transparent
    />
  );
};

const Frame = () => {
  const { viewport } = useThree();
  return (
    <>
      <mesh>
        <Plane args={[viewport.width, viewport.height]}>
          <FrameMaterial />
        </Plane>
      </mesh>
      {/* <mesh scale={[1.4, 1.4, 1.1]}>
        <Sphere args={[0.295, 48, 48]}>
          <meshPhysicalMaterial
            color={"white"}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={0.5}
            transparent
            opacity={0.25}
            fog={false}
          />
        </Sphere>
      </mesh> */}
      <mesh position={[0, 0, -0.01]}>
        <Ellipsoid a={0.4} b={0.4} c={0.1} />
      </mesh>
    </>
  );
};

const Overlay = () => {
  const { viewport } = useThree();
  return (
    <mesh>
      <Plane args={[viewport.width, viewport.height]}>
        <meshBasicMaterial color={"blue"} />
      </Plane>
    </mesh>
  );
};

const uniforms = {
  time: { value: 0.0 },
};

const onBeforeCompile = (shader) => {
  shader.uniforms.time = uniforms.time;

  // Vertex shader modification (if needed, otherwise this can remain the same)
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float time;
    varying vec2 vUv;

    mat2 get2dRotateMatrix(float _angle) {
      return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <beginnormal_vertex>",
    `
    #include <beginnormal_vertex>
    float angle = time;
    mat2 rotationMatrix = get2dRotateMatrix(angle);
    objectNormal.xz = rotationMatrix * objectNormal.xz;
    
    vUv = uv;
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    transformed.xz = rotationMatrix * transformed.xz;
    `
  );

  // Ensure UVs are declared in the fragment shader
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    varying vec2 vUv; // Ensure vUv is available
    uniform float time;
    `
  );

  // Modify the fragment shader to create a pink-blue checker pattern
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>",
    `
    #include <color_fragment>
    
    // Checker pattern based on UV coordinates
    vec2 checkerUV = fract(vUv * 10.0); // Adjust scale of pattern with the multiplier
    float checker = step(0.5, checkerUV.x) * step(0.5, checkerUV.y) + (1.0 - step(0.5, checkerUV.x)) * (1.0 - step(0.5, checkerUV.y));
    
    // Colors for the checkerboard
    vec3 pink = vec3(1.0, 0.0, 1.0);  // Pink color
    vec3 blue = vec3(0.0, 0.0, 1.0);  // Blue color
    
    // Alternate between pink and blue based on checker pattern

    diffuseColor.rgb = mix(pink, blue, checker);
    `
  );
};

const onBeforeCompileDepth = (shader) => {
  console.log(`shader depth`, shader);
  shader.uniforms.time = uniforms.time;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
    #include <common>
    uniform float time;

    mat2 get2dRotateMatrix(float _angle) {
      return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
    #include <begin_vertex>
    float angle = time;
    mat2 rotationMatrix = get2dRotateMatrix(angle);
    transformed.xz = rotationMatrix * transformed.xz;
    `
  );
};

function Ellipsoid({ a = 1, b = 1, c = 1 }) {
  const mesh = useRef(null);

  const depthMaterial = useMemo(() => {
    const mat = new THREE.MeshDepthMaterial();
    mat.depthPacking = THREE.RGBADepthPacking;
    mat.onBeforeCompile = onBeforeCompileDepth;
    return mat;
  }, []);

  const OBC = useCallback(onBeforeCompile, []);

  useFrame((_, delta) => {
    uniforms.time.value += delta;
  });

  return (
    <mesh
      ref={mesh}
      scale={[a, b, c]}
      customDepthMaterial={depthMaterial}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        onBeforeCompile={OBC}
        color={"white"}
        roughness={1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={0.5}
        transparent
        opacity={1}
        fog={false}
        metalness={0.8}
      />
    </mesh>
  );
}

function EllipsoidCoating({ a = 1, b = 1, c = 1 }) {
  return (
    <mesh scale={[a, b, c]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Frame;
