import React from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import WelcomeTextMaterial from "./WelcomeTextMaterial";
// import BDOrange from "../../../../../public/fonts/BDOrange.woff2";

function WelcomeText() {
  const { viewport } = useThree();

  const texts = [
    {
      content: "WELCOME TO",
      position: new THREE.Vector3(0, 3, 0),
      fontSize: 0.55,
      delay: 0.5,
      duration: 5,
    },
    {
      content: "HAPPY TAILS!",
      position: new THREE.Vector3(0, 2, 0),
      fontSize: 1.15,
      delay: 2.5,
      duration: 3,
    },
    {
      content: "WE OFFER",
      position: new THREE.Vector3(-2, 1.5, 0),
      fontSize: 0.5,
      delay: 8,
      duration: 17,
    },
    {
      content: "Boarding",
      position: new THREE.Vector3(0, 0.5, 0),
      fontSize: 0.9,
      delay: 11,
      duration: 2,
    },
    {
      content: "Daycare",
      position: new THREE.Vector3(0, 0.5, 0),
      fontSize: 0.9,
      delay: 15,
      duration: 2,
    },
    {
      content: "Grooming",
      position: new THREE.Vector3(0, 0.5, 0),
      fontSize: 0.9,
      delay: 19,
      duration: 2,
    },
    {
      content: "Training",
      position: new THREE.Vector3(0, 0.5, 0),
      fontSize: 0.9,
      delay: 23,
      duration: 2,
    },
    {
      content: "and tons of fun!",
      position: new THREE.Vector3(0, 0.5, 0),
      fontSize: 0.9,
      delay: 27,
      duration: 6,
    },
  ];

  const textStyle = {
    anchorX: "center" as "center",
    // color: "#57fbbf",
    outlineWidth: 0.0015,
    outlineOffsetX: 0.02,
    outlineOffsetY: 0.02,
    outlineBlur: 0.085,
    outlineColor: "#313131",
    outlineOpacity: 0.35,
    // font: "./fonts/BDOrange.woff2",
    font: "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff",
  };

  return (
    <group>
      {texts.map((tex, index) => (
        <mesh key={index} position={tex.position}>
          <Text {...textStyle} fontSize={tex.fontSize}>
            {tex.content}
            <WelcomeTextMaterial delay={tex.delay} duration={tex.duration} />
          </Text>
        </mesh>
      ))}
    </group>
  );
}

export default React.memo(WelcomeText);
