import React from "react";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import WelcomeText from "./Shaders/WelcomeText/WelcomeText";
import BasicShaderMaterial from "./Shaders/BasicShader/BasicShaderMaterial";

const FullScreenPlane = () => {
  // * Make Plane full screen
  const { viewport } = useThree();
  const scale = Math.max(viewport.width, viewport.height);

  console.log(`render scene comp`);
  return (
    <group position={[0, 0, 0]}>
      <WelcomeText />
      <Plane args={[scale, scale]}>
        <BasicShaderMaterial />
      </Plane>
      {/* Scale the plane to cover the entire viewport */}
    </group>
  );
};

export default FullScreenPlane;
