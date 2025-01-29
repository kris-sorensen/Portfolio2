import React from "react";
import { useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";

const Background = React.memo(() => {
  const { viewport } = useThree();

  // Calculate the width and height of the plane based on the viewport size
  const planeWidth = viewport.width;
  const planeHeight = viewport.height;

  return (
    <mesh visible={true} position={[0, 0, -1500]}>
      <Plane args={[planeWidth, planeHeight, 2, 2]}>
        <BackgroundMaterial />
      </Plane>
    </mesh>
  );
});

Background.displayName = "Background";

export default Background;
