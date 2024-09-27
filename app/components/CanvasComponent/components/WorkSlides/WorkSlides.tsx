import { Plane } from "@react-three/drei";
import React from "react";
import WorkSlideMaterial from "./shader/WorkSlideMaterial";

const WorkSlides = () => {
  return (
    <group>
      <mesh position={[-0.7, -0.4, 2]}>
        <Plane args={[1.25, 0.65, 2, 2]}>
          <WorkSlideMaterial />
        </Plane>
      </mesh>
      <mesh position={[0.7, -0.4, 2]}>
        <Plane args={[1.25, 0.65, 2, 2]}>
          <WorkSlideMaterial />
        </Plane>
      </mesh>
    </group>
  );
};

export default WorkSlides;
