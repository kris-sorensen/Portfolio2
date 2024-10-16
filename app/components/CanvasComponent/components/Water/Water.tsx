import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

const Water = () => {
  const { viewport } = useThree();
  const height = 400;
  const width = 2400;

  return (
    <mesh
      position={[0, -viewport.height / 2 + 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <Plane args={[width, height, 2, 2]}>
        <meshStandardMaterial color={"#14215a"} metalness={0.5} roughness={0} />
      </Plane>
    </mesh>
  );
};

export default Water;
