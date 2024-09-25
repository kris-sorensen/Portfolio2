import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import MountainMaterial from "./shader/MountainMaterial/MountainMaterial";
import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";
// import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";

const config = {
  particleCount: 40,
  particleSize: 10,
};

const Star = () => {
  // * hooks
  const { clock } = useThree();
  const mountainRef = useRef(null);

  // * clock
  let clockOffset = 0;
  useEffect(() => {
    //used to offset clock so it starts at zero for each new firework
    clockOffset = clock.getElapsedTime();
  }, []);

  // useFrame(() => {
  //   points.current.material.uniforms.uTime.value =
  //     clock.getElapsedTime() - clockOffset;
  // }, -3);

  return (
    <>
      <mesh visible={true}>
        <Plane ref={mountainRef} args={[3, 2, 2, 2]}>
          <MountainMaterial color={new THREE.Vector3(0, 0.2, 1)} />
        </Plane>
      </mesh>
      <mesh visible={true} position={[0, 0, -0.1]}>
        <Plane ref={mountainRef} args={[3, 2, 2, 2]}>
          <BackgroundMaterial color={new THREE.Vector3(0, 0.2, 1)} />
        </Plane>
      </mesh>
    </>
  );
};

export default React.memo(Star);
