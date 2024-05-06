import React, { Suspense } from "react";
import * as three from "three";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import VideoShader from "./Video/VideoShader";

const FullScreenPlane = () => {
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  return (
    <mesh position={[0, 0, 0]}>
      <Plane args={[scale, scale]} />
      {/* Scale the plane to cover the entire viewport */}
      <VideoShader />
    </mesh>
  );
};

export default FullScreenPlane;
