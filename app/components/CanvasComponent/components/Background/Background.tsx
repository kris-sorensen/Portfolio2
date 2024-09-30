import { Plane } from "@react-three/drei";
import React from "react";
import { useThree } from "@react-three/fiber";
import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";

const Background = () => {
  const { viewport } = useThree();

  // Calculate the width and height of the plane based on the viewport size
  const planeWidth = viewport.width;
  const planeHeight = viewport.height;

  console.log(`Here`, viewport);

  return (
    <mesh visible={true} position={[0, 0, -500]}>
      <Plane args={[planeWidth, planeHeight, 2, 2]}>
        <BackgroundMaterial />
      </Plane>
    </mesh>
  );
};

export default Background;
