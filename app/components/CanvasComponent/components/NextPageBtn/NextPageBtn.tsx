import React from "react";
import NextPageBtnMaterial from "./shader/NextPageBtnMaterial";
import { Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const NextPageBtn = () => {
  const { camera } = useThree(); // Get camera to check positioning

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <mesh
      position={[0, -0.7, 0.3]}
      onClick={(e) => {
        e.stopPropagation(); // Ensure click event is not propagating
        handleClick();
      }}
      onPointerOver={(e) => console.log("Pointer over button")} // Debugging pointer events
      onPointerOut={(e) => console.log("Pointer out of button")}
    >
      <Plane args={[0.2, 0.1]}>
        <NextPageBtnMaterial />
      </Plane>
    </mesh>
  );
};

export default NextPageBtn;
