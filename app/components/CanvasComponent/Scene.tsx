import React from "react";
import Title from "./components/Title/Title";
// import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/PostProcessing/components/SunMoon/SunMoon";
import Earth from "./components/Earth/Earth";
import Lights from "./components/Lights/Lights";
// import Fog from "./components/Fog/Fog";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = React.memo((props) => {
  useAnimProgressUpdater();
  console.log(`scene component`);
  return (
    <>
      <Title />
      <Background />
      <SunMoon />
      <Earth />
      <Lights />
      {/* <Fog /> */}
      {/* <NextPageBtn /> */}
    </>
  );
});

export default Scene;
