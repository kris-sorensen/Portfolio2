import { Plane } from "@react-three/drei";
import React from "react";

const WorkExperience = () => {
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <Plane args={[200, 200]}>
          <meshBasicMaterial color="#00aeff" />
        </Plane>
      </mesh>
    </>
  );
};

export default WorkExperience;
