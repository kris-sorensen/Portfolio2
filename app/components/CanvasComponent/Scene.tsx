import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import Ground from "./components/Ground/Ground";
import BalloonContainer from "./components/Balloon/BalloonContainer";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import BalloonMaker from "./components/BalloonMaker/BalloonMaker";
import IDE from "./components/IDE/IDE";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);

  return (
    <group>
      {/* <Logo /> */}
      <Physics debug={false}>
        <group ref={group} {...props}>
          {/* <Ground /> */}
          <BalloonMaker />
          <IDE />
          {/* <BalloonContainer /> */}
        </group>
      </Physics>
    </group>
  );
};

export default Scene;
