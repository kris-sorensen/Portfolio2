import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
// import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";
import Trees from "./components/Trees/Trees";
import Ocean from "./Ocean/Ocean";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  useAnimProgressUpdater();

  return (
    <>
      <Logo />
      {/* <NextPageBtn /> */}
      <Background />
      <SunMoon />
      <Ocean />
      <Trees />
    </>
  );
};

export default Scene;
