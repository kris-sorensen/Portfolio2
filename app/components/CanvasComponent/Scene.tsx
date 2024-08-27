import React, { useRef, useState } from "react";
import Logo from "./components/Logo/Logo";
import { Physics } from "@react-three/rapier";
import BalloonMaker from "./components/BalloonMaker/BalloonMaker";
import IDE from "./components/IDE/IDE";
import * as THREE from "three";
import { retrieveVertexShader } from "@/app/data/currentShader";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);
  const [balloonDataArray, setBalloonDataArray] = useState([]);
  const balloonCounter = useRef(1);

  const addBalloon = (fragmentShader) => {
    const vertexShader = retrieveVertexShader(); // use existing logic for vertex shader
    const newBalloon = {
      id: balloonCounter.current,
      fragmentShader,
      vertexShader,
    };
    setBalloonDataArray((prevArray) => [...prevArray, newBalloon]);
    balloonCounter.current += 1;
  };

  const removeBalloon = (id: number) => {
    setBalloonDataArray((prevArray) =>
      prevArray.filter((balloon) => balloon.id !== id)
    );
  };

  return (
    <group>
      <Logo />
      <Physics debug={false}>
        <group ref={group} {...props}>
          <BalloonMaker
            position={[0, -7, 0]}
            balloonDataArray={balloonDataArray}
            onRemove={removeBalloon}
          />
          <IDE addBalloon={addBalloon} />
        </group>
      </Physics>
    </group>
  );
};

export default Scene;
