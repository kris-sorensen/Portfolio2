import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
// import Moon from "./components/Moon/Moon";
import * as THREE from "three";
import useStore from "@/app/store/useStore";
// import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import { Plane } from "@react-three/drei";
import MountainMaterial from "./shader/MountainMaterial/MountainMaterial";
import BackgroundMaterial from "./components/Background/shader/BackgroundMaterial/BackgroundMaterial";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import WorkSlides from "./components/WorkSlides/WorkSlides";
import Mountain from "./components/Mountain/Mountain";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  useAnimProgressUpdater();

  return (
    <>
      <Logo />
      {/* <NextPageBtn /> */}
      {/* <Moon /> */}
      <WorkSlides />
      <Mountain />
      <Background />
      <SunMoon />
    </>
  );
};

export default Scene;
