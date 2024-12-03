import React from "react";
import { Plane, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import Logo from "./components/Logo/Logo";
import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";
import Ground from "./components/Ground/Ground";
import Fog from "./components/Fog/Fog";
import WorkExperience from "./components/WorkExperience/WorkExperience";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  useAnimProgressUpdater();

  return (
    <>
      <Logo />
      <Background />
      <SunMoon />
      <Ground />
      <Fog />
      <NextPageBtn />
      <WorkExperience />
      <TestImg />
    </>
  );
};

const TestImg = () => {
  const texture = useTexture("./images/3DScene.png"); // Replace with the path to your texture

  // Define controls for position, rotation, and scale using Leva's useControls
  const { position, rotation, scale, opacity } = useControls(
    "TestImg Controls",
    {
      position: { value: [0, 0, 137], step: 0.1 },
      rotation: { value: [0, 0, 0], step: 0.1 },
      scale: { value: [1, 1, 1], step: 0.1 },
      opacity: { value: 0.15, step: 0.01, max: 1, min: 0 },
    }
  );

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <Plane args={[2, 1]}>
        <meshBasicMaterial map={texture} transparent opacity={opacity} />
      </Plane>
    </mesh>
  );
};

export default Scene;
