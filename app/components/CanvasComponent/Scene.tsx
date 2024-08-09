import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import Ground from "./components/Ground/Ground";
import BalloonContainer from "./components/Balloon/BalloonContainer";

const Scene = (props) => {
  const group = useRef();

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
