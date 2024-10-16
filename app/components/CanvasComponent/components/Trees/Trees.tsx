import { Plane } from "@react-three/drei";
import React from "react";
import TreeMaterial from "./shader/TreeMaterial";
import { useThree } from "@react-three/fiber";

const WorkSlides = () => {
  const { viewport } = useThree();

  return (
    <mesh position={[0, -200, 0]}>
      <Plane args={[viewport.width / 1, viewport.height / 1, 100, 100]}>
        {/* <meshBasicMaterial color={"#ff0000"} /> */}
        <TreeMaterial />
      </Plane>
    </mesh>
  );
};

export default WorkSlides;
