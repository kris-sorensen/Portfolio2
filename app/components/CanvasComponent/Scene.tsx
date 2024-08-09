import React, { useRef } from "react";
import { Reflector } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Logo from "./components/Logo/Logo";
import { Balloon } from "./components/Balloon/Balloon";

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#932CE6").convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const Scene = (props) => {
  const group = useRef();
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  console.log(`render scene comp`);
  return (
    <group>
      <Logo />
      <group ref={group} {...props} dispose={null}>
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
          args={[90, 90]}
        >
          {/* <meshPhysicalMaterial /> */}
          {(Material, props) => (
            <Material
              metalness={0.25}
              color="#932CE6"
              roughness={1}
              {...props}
            />
          )}
        </Reflector>

        <mesh
          receiveShadow
          castShadow
          position={[0, 1, 8]}
          scale={[2, 2, 2]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <Balloon position={[0, 1.9, 0]} />
        </mesh>
      </group>
    </group>
  );
};

export default Scene;
