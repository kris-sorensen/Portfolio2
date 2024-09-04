import React, { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
import * as THREE from "three";

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
    
    // Calculate the edge width for anti-aliasing based on UV rate of change
    vec2 edge = fwidth(checkerUV); 

    // Smooth the transition between checkers using smoothstep and the edge width
    float checkerX = smoothstep(0.5 - edge.x, 0.5 + edge.x, checkerUV.x);
    float checkerY = smoothstep(0.5 - edge.y, 0.5 + edge.y, checkerUV.y);
    float checker = checkerX * checkerY + (1.0 - checkerX) * (1.0 - checkerY);

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

function Ellipsoid({ a = 1, b = 1, c = 1, activeColor = "#ffffff" }) {
  const mesh = useRef(null);

  const { ...props } = useControls(
    {
      PaintShop: folder(
        {
          metalness: { value: 1, min: 0, max: 1, step: 0.001 },
          roughness: { value: 0.5, min: 0, max: 1, step: 0.001 },
          envMapIntensity: { value: 0.75, min: 0, max: 5, step: 0.001 },
          reflectivity: { value: 0.31, min: 0, max: 1, step: 0.001 },
          clearcoat: { value: 0.5, min: 0, max: 1, step: 0.001 },
          clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.001 },
          transparent: { value: true },
          wireframe: { value: false },
          fog: { value: false },
          vertexColors: { value: false },
          sheenRoughness: { value: 0.15, min: 0, max: 1, step: 0.001 },
          thickness: { value: 7.78, min: 0, max: 10, step: 0.001 },
          ior: { value: 2.05, min: 0, max: 2.33, step: 0.001 },
          transmission: { value: 0, min: 0, max: 1, step: 0.001 },
          opacity: { value: 1, min: 0, max: 1, step: 0.001 },
          attenuationDistance: {
            value: Infinity,
            min: 0,
            max: Infinity,
            step: 1,
          },
          color: { value: activeColor },
          attenuationColor: {
            value: "#ffffff",
            onChange: (val) => {
              if (mesh.current) {
                mesh.current.material.attenuationColor.set(val);
              }
            },
          },
          sheen: { value: 0.45, min: 0, max: 1, step: 0.001 },
          sheenColor: {
            value: "#000000",
            onChange: (val) => {
              if (mesh.current) {
                mesh.current.material.sheenColor.set(val);
              }
            },
          },
          specularIntensity: { value: 0.42, min: 0, max: 1, step: 0.001 },
          specularColor: {
            value: "#ffffff",
            onChange: (val) => {
              if (mesh.current) {
                mesh.current.material.specularColor.set(val);
              }
            },
          },
        },
        { collapsed: true }
      ),
    },
    [activeColor]
  );

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
        metalness={props.metalness}
        roughness={props.roughness}
        envMapIntensity={props.envMapIntensity}
        reflectivity={props.reflectivity}
        clearcoat={props.clearcoat}
        clearcoatRoughness={props.clearcoatRoughness}
        transparent={props.transparent}
        wireframe={props.wireframe}
        fog={props.fog}
        sheenRoughness={props.sheenRoughness}
        thickness={props.thickness}
        ior={props.ior}
        transmission={props.transmission}
        opacity={props.opacity}
        attenuationColor={new THREE.Color(props.attenuationColor)}
        attenuationDistance={props.attenuationDistance}
        sheen={props.sheen}
        sheenColor={new THREE.Color(props.sheenColor)}
        specularIntensity={props.specularIntensity}
        specularColor={new THREE.Color(props.specularColor)}
        color={new THREE.Color(props.color)}
      />
    </mesh>
  );
}

export default Ellipsoid;
