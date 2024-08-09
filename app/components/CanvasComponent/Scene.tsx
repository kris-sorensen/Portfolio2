import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Logo from "./components/Logo/Logo";
import { Balloon } from "./components/Balloon/Balloon";
import Ground from "./components/Ground/Ground";
import BalloonContainer from "./components/Balloon/BalloonContainer";

const Scene = (props) => {
  const group = useRef();
  const { viewport } = useThree();

  return (
    <group>
      <Logo />
      <group ref={group} {...props} dispose={null}>
        <Ground />
        <BalloonContainer />
      </group>
    </group>
  );
};

export default Scene;
