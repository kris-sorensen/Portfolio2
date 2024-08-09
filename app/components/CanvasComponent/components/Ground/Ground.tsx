import React from "react";
import { Reflector } from "@react-three/drei";
import * as THREE from "three";

const material = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#932CE6").convertSRGBToLinear(),
  roughness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const Ground = () => {
  return (
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
      {(Material, props) => (
        <Material metalness={0.25} color="#932CE6" roughness={1} {...props} />
      )}
    </Reflector>
  );
};

export default Ground;
