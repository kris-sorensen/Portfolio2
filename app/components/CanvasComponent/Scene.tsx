import React, { useRef } from "react";
import Logo from "./components/Logo/Logo";
// import Moon from "./components/Moon/Moon";
import * as THREE from "three";
import useStore from "@/app/store/useStore";
// import NextPageBtn from "./components/NextPageBtn/NextPageBtn";
import { Plane } from "@react-three/drei";
import MountainMaterial from "./shader/MountainMaterial/MountainMaterial";
import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";
import useAnimProgressUpdater from "@/app/hook/useAnimProgressUpdater";
import WorkSlides from "./components/WorkSlides/WorkSlides";

const Scene: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  useAnimProgressUpdater();

  return (
    <>
      <Logo />
      {/* <NextPageBtn /> */}
      {/* <Moon /> */}
      {/* <WorkSlides /> */}
      <mesh visible={true} position={[0, 0, 1.8]}>
        <Plane args={[3, 2, 2, 2]}>
          <MountainMaterial />
        </Plane>
      </mesh>
      <mesh visible={true} position={[0, 0, -2]}>
        <Plane args={[3, 2, 2, 2]}>
          <BackgroundMaterial />
        </Plane>
      </mesh>
    </>
  );
};

export default Scene;
