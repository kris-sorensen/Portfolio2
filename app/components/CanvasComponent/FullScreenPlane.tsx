import React, { Suspense } from "react";
import * as three from "three";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import VideoShader from "./Video/VideoShader";
import WelcomeText from "./WelcomeText";

const FullScreenPlane = () => {
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  return (
    <group position={[0, 0, 0]}>
      <WelcomeText />
      <Plane args={[scale, scale]}>
        <VideoShader />
      </Plane>

      {/* Scale the plane to cover the entire viewport */}
    </group>
  );
};

export default FullScreenPlane;
