import React, { useEffect, useState } from "react";
import NextPageBtnMaterial from "./shader/NextPageBtnMaterial";
import { Plane, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const NextPageBtn = () => {
  // Init Raycaster
  const raycaster = useThree((state) => state.raycaster);
  raycaster.layers.enable(1);

  const [clickHovered, setClickHovered] = useState(false);
  useEffect(() => {
    console.log(`clickHovered`, clickHovered);
  }, [clickHovered]);
  const { camera } = useThree(); // Get camera to check positioning

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <group position={[0, -200, 700]}>
      <mesh position={[0, 0, 1]}>
        <Text
          // ref={text}
          letterSpacing={0.25}
          fontSize={40}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <NextPageBtnMaterial color={"#e1e1e1"} />
          WORK
        </Text>
      </mesh>
      {/* <mesh
        onClick={(e) => {
          e.stopPropagation(); // Ensure click event is not propagating
          handleClick();
        }}
        onPointerOver={() => setClickHovered(true)}
        onPointerOut={() => setClickHovered(false)}
      > */}
      <Plane
        args={[200, 100]}
        onClick={(e) => {
          e.stopPropagation(); // Ensure click event is not propagating
          handleClick();
        }}
        onPointerOver={() => setClickHovered(true)}
        onPointerOut={() => setClickHovered(false)}
      >
        <NextPageBtnMaterial color={"#008261"} />
      </Plane>
      {/* </mesh> */}
    </group>
  );
};

export default NextPageBtn;
