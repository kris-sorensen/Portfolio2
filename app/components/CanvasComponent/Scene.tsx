import React, { useEffect, useRef, useState } from "react";
import Logo from "./components/Logo/Logo";
import { Physics } from "@react-three/rapier";
import BalloonMaker from "./components/BalloonMaker/BalloonMaker";
import IDE from "../Css/components/IDE/IDE";
import * as THREE from "three";
import { retrieveVertexShader } from "@/app/data/currentShader";
import Room from "./components/Room/Room";
import Frame from "./components/Frame/Frame";
import Overlay from "./components/Frame/components/ScreenOverlay/ScreenOverlay";
import { Circle } from "@react-three/drei";
import Moon from "./components/Moon/Moon";

// Define the interface for BalloonData
interface BalloonData {
  id: number;
  fragmentShader: string;
  vertexShader: string;
}

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const group = useRef<THREE.Group>(null);
  const balloonCount = useRef(0);

  // Initialize the state with a generic type <BalloonData[]>
  const [balloonDataArray, setBalloonDataArray] = useState<BalloonData[]>([]);
  const balloonCounter = useRef(1);

  const addBalloon = (fragmentShader: string) => {
    const vertexShader = retrieveVertexShader(); // use existing logic for vertex shader
    const newBalloon: BalloonData = {
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
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const makeBalloons = setInterval(() => {
        if (balloonCount.current === 140) {
          clearInterval(makeBalloons); // Clear interval when balloonCount reaches 7
          return;
        }
        addBalloon("");
        balloonCount.current += 1;
      }, 4000);
    }, 2000);
  }, []);

  return (
    <group>
      {/* <Logo /> */}

      <Physics debug={false}>
        <Moon />
        {/* <Frame /> */}
        {/* <Overlay /> */}

        {/* <Room /> */}
        <group ref={group} {...props}>
          <BalloonMaker
            position={[0, -1.2, 0]}
            balloonDataArray={balloonDataArray}
            onRemove={removeBalloon}
          />
        </group>
      </Physics>
      {/* <IDE addBalloon={addBalloon} /> */}
    </group>
  );
};

export default Scene;
