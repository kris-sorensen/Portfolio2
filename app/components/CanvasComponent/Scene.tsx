import React from "react";
import Title from "./components/Title/Title";
// import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";
import Ground from "./components/Ground/Ground";
import Lights from "./components/Lights/Lights";
// import Fog from "./components/Fog/Fog";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  useAnimProgressUpdater();

  return (
    <>
      <Title />
      <Background />
      <SunMoon />
      <Ground />
      <Lights />
      {/* <Fog /> */}
      {/* <NextPageBtn /> */}
    </>
  );
};

export default Scene;
