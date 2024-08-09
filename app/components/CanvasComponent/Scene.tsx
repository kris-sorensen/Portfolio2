import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import Ground from "./components/Ground/Ground";
import BalloonContainer from "./components/Balloon/BalloonContainer";
import * as THREE from "three";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);

  return (
    <group>
      <Logo />
      <group ref={group} {...props}>
        <Ground />
        <BalloonContainer />
      </group>
    </group>
  );
};

export default Scene;
