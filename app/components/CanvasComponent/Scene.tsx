import React, { useEffect, useState } from "react";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import VideoShader from "./Shaders/Video/VideoShaderMaterial";
import WelcomeText from "./Shaders/WelcomeText/WelcomeText";

const FullScreenPlane = () => {
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  console.log(`render scene comp`);
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
