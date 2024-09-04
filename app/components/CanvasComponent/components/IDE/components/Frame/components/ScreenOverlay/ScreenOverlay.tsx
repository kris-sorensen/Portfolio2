import React from "react";
import { useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";

const Overlay = () => {
  const { viewport } = useThree();
  return (
    <mesh>
      <Plane args={[viewport.width, viewport.height]}>
        <meshBasicMaterial color={"blue"} />
      </Plane>
    </mesh>
  );
};

export default Overlay;
