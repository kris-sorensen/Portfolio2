import React, { useRef } from "react";
import { Plane, Reflector } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import WelcomeText from "./Shaders/WelcomeText/WelcomeText";
import BasicShaderMaterial from "./Shaders/BasicShader/BasicShaderMaterial";
import * as THREE from "three";

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#bb86a1").convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const FullScreenPlane = (props) => {
  const group = useRef();
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  console.log(`render scene comp`);
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={() => console.log(group.current)}
    >
      {/* <Plane {...props} scale={20}> */}
      {/* <ambientLight intensity={1} /> */}
      <Reflector
        resolution={1024}
        receiveShadow
        mirror={0}
        mixBlur={1}
        mixStrength={0.3}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1}
        position={[0, 0, 8]}
        scale={[2, 2, 1]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        args={[70, 70]}
      >
        {/* <meshPhysicalMaterial /> */}
        {(Material, props) => (
          <Material metalness={0.25} color="#eea6b1" roughness={1} {...props} />
        )}
      </Reflector>

      {/* <meshBasicMaterial color="#b20e27" side={THREE.DoubleSide} /> */}
      {/* </Plane> */}
    </group>
  );
};

export default FullScreenPlane;
