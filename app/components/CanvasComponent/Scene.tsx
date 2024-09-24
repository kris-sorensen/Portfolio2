import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import { Physics } from "@react-three/rapier";
import BalloonMaker from "./components/BalloonMaker/BalloonMaker";
import Moon from "./components/Moon/Moon";
import * as THREE from "three";
import Stars from "./components/Stars/Stars";
import Mountains from "./components/Mountains/Mountains";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);

  return (
    <group>
      <Logo />
      <Moon />
      {/* <Stars /> */}
      <Mountains />
    </group>
  );
};

export default Scene;
