import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import Ellipsoid from "./components/Ellipsoid/Ellipsoid";
import FrameMaterial from "./components/FrameMaterial/FrameMaterial";

const Frame = () => {
  const { viewport } = useThree();
  return (
    <>
      <mesh>
        <Plane args={[viewport.width, viewport.height]}>
          <FrameMaterial />
        </Plane>
      </mesh>
      {/* Add a white plane behind the ellipsoid to receive shadows */}
      {/* <mesh
        position={[0, 0, -1]} // Position the plane below the ellipsoid
        receiveShadow
      >
        <planeGeometry args={[10, 10]} /> 
        <meshStandardMaterial color={"white"} />
      </mesh> */}
      {/* Bubble around Ellipsoid */}
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

// const CurrentShaderMaterial = () => {
//   const material = useRef(null);

//   const uniforms = useMemo(
//     () => ({
//       time: { value: 0.0 },
//     }),
//     []
//   );

//   useFrame((_, delta) => {
//     if (material.current) {
//       material.current.uniforms.time.value += delta;
//     }
//   });

//   return (
//     <shaderMaterial
//       ref={material}
//       uniforms={uniforms}
//       vertexShader={vertexShader}
//       fragmentShader={CurrentShader}
//       transparent
//     />
//   );
// };

export default Frame;
