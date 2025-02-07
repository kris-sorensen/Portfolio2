import React from "react";
import Title from "./components/Title/Title";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import Background from "./components/Background/Background";
import SunMoon from "./components/SunMoon/SunMoon";
import Earth from "./components/Earth/Earth";
import Lights from "./components/Lights/Lights";
// import Fog from "./components/Fog/Fog";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = React.memo(() => {
  useAnimProgressUpdater();

  return (
    <>
      {/* <Title /> */}
      <Background />
      <SunMoon />
      <Earth />
      <Lights />
    </>
  );
});

Scene.displayName = "Scene";

export default Scene;
