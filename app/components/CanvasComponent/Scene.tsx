import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import Moon from "./components/Moon/Moon";
import * as THREE from "three";
import Mountains from "./components/Mountains/Mountains";
import NextPageBtn from "./components/NextPageBtn/NextPageBtn";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);

  return (
    <group>
      <Logo />
      {/* <NextPageBtn /> */}
      {/* <Moon /> */}
      <Mountains />
    </group>
  );
};

export default Scene;
