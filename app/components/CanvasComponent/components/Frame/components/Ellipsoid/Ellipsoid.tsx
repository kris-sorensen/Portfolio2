import React, { useRef, useMemo, useCallback, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls, folder } from "leva";
import * as THREE from "three";
import { Mesh, ShaderMaterial } from "three";

// Define the uniforms object type
interface Uniforms {
  time: { value: number };
}

const uniforms: Uniforms = {
  time: { value: 0.0 },
};

// Shader modification functions
const onBeforeCompile = (shader: ShaderMaterial) => {
  shader.uniforms.time = uniforms.time;

  // Vertex shader modification
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
    // float angle = time;
    float angle = 3.;
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

  // Fragment shader modification
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
    #include <common>
    varying vec2 vUv;
    uniform float time;

    vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
    return a + b*cos( 6.28318*(c*t+d) );
    }

vec3 pal1(in float t){
    return pal(t, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67)) ;
    }

    // // Random number generation based on a vec2 input
    // float rand(vec2 v) {
    //   return fract(sin(dot(v, vec2(5.11543, 71.3177))) * 43758.5453);
    // }

    // // Random number generation based on a vec3 input
    // float rand(vec3 v) {
    //   return fract(cos(dot(v, vec3(13.46543, 67.1132, 123.546123))) * 43758.5453);
    // }

    // // Random number generation based on a single float
    // float rand(float v) {
    //   return fract(sin(v * 71.3132) * 43758.5453);
    // }

    // Smoothed random number generation
    // float smrand(float v) {
    //   float vv = floor(v);
    //   return mix(rand(vv), rand(vv + 1.0), fract(v));
    // }

    // // Function to rotate 2D coordinates by an angle
    // vec2 rotate(vec2 st, float angle) {
    //   float c = cos(angle);
    //   float s = sin(angle);
    //   return mat2(c, -s, s, c) * st;
    // }

    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>",
    `
    #include <color_fragment>

    // Base color of the eyeball
    float lloc = length(vUv - 0.5); // Distance from center (vUv assumed to range from 0.0 to 1.0)
    vec3 baseCol = vec3(smoothstep(-0.1, 0.1, -lloc + 0.25));
    baseCol = baseCol + 0.25 * pal1(baseCol.x + time / 10.0);

    // Adding iris and pupil details
    vec2 loc = vec2(fract(vUv.x * 2.0 * PI) - 0.53, vUv.y);
    float iris = length(loc * 0.5); // Iris size
    float pupil = length(loc * 0.1); // Pupil size

    // Iris and pupil colors
    vec3 irisColor = vec3(0.2, 0.5, 1.0); // Blue iris
    vec3 pupilColor = vec3(0.0, 0.0, 0.0); // Black pupil

    // Smooth iris and pupil edges
    float irisEdge = smoothstep(0.1, 0.3, iris);
    float pupilEdge = smoothstep(0.05, 0.1, pupil);

    // Combine the iris and pupil with the base color
    vec3 finalColor = mix(baseCol, irisColor, irisEdge);
    finalColor = mix(finalColor, pupilColor, pupilEdge);

    // Set the final color output
    diffuseColor.rgb = finalColor;
  `
  );
};

const onBeforeCompileDepth = (shader: ShaderMaterial) => {
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

interface EllipsoidProps {
  a?: number;
  b?: number;
  c?: number;
  activeColor?: string;
}

const Ellipsoid: React.FC<EllipsoidProps> = ({
  a = 1,
  b = 1,
  c = 1,
  activeColor = "#ffffff",
}) => {
  const mesh = useRef<Mesh>(null);

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
          fog: { value: true },
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
          // color: { value: activeColor },
          // attenuationColor: {
          //   value: "#ffffff",
          //   onChange: (val: string) => {
          //     if (
          //       mesh.current &&
          //       (mesh.current.material as MeshPhysicalMaterial)
          //     ) {
          //       (
          //         mesh.current.material as MeshPhysicalMaterial
          //       ).attenuationColor.set(val);
          //     }
          //   },
          // },
          sheen: { value: 0.45, min: 0, max: 1, step: 0.001 },
          // sheenColor: {
          //   value: "#000000",
          //   onChange: (val: string) => {
          //     if (
          //       mesh.current &&
          //       (mesh.current.material as MeshPhysicalMaterial)
          //     ) {
          //       (mesh.current.material as MeshPhysicalMaterial).sheenColor.set(
          //         val
          //       );
          //     }
          //   },
          // },
          specularIntensity: { value: 0.42, min: 0, max: 1, step: 0.001 },
          // specularColor: {
          //   value: "#ffffff",
          //   onChange: (val: string) => {
          //     if (
          //       mesh.current &&
          //       (mesh.current.material as MeshPhysicalMaterial)
          //     ) {
          //       (
          //         mesh.current.material as MeshPhysicalMaterial
          //       ).specularColor.set(val);
          //     }
          //   },
          // },
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
    <Suspense fallback={null}>
      <mesh
        ref={mesh}
        // scale={[a, b, c]}
        scale={[0.5, 0.5, 0.5]}
        customDepthMaterial={depthMaterial}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial onBeforeCompile={OBC} {...props} />
      </mesh>
    </Suspense>
  );
};

export default Ellipsoid;
