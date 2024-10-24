import React, { useEffect, useState } from "react";
import NextPageBtnMaterial from "./shader/NextPageBtnMaterial";
import { Plane, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useStore from "@/app/store/useStore";
import { setHovered } from "./constants/nextPageBtn.constant";

const NextPageBtn = () => {
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);

  const { camera } = useThree(); // Get camera to check positioning

  const handleClick = (e) => {
    e.stopPropagation();
    setPage(Page === 2 ? 1 : 2);
    console.log("Button clicked!");
  };

  return (
    <group
      scale={[0.66, 0.66, 0.66]}
      position={[0, -350, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <mesh position={[0, 0, 1]}>
        <Text
          // ref={text}
          letterSpacing={0.1}
          fontSize={35}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <NextPageBtnMaterial color={"#e1e1e1"} />
          WORK
        </Text>
      </mesh>
      <mesh>
        <Plane args={[200, 100]}>
          <NextPageBtnMaterial color={"#008261"} />
        </Plane>
      </mesh>
    </group>
  );
};

export default NextPageBtn;
