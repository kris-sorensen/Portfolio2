import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";
import Ground from "./components/Ground/Ground";
import Fog from "./components/Fog/Fog";

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
    </>
  );
};

export default Scene;
