import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  getAnimProgress,
  sunMoonPropChangeDelay,
} from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const Logo: React.FC = () => {
  const Page = useStore((state) => state.Page);

  const text = useRef<THREE.Mesh | null>(null);
  const page1Group = useRef<THREE.Group | null>(null);
  const page2Group = useRef<THREE.Group | null>(null);

  // * Turns on and off the visibility of the logo. Without this you see god rays shinning through invisible letters.
  useEffect(() => {
    if (Page === 2) {
      setTimeout(() => {
        if (page1Group.current) page1Group.current.visible = false;
        if (page2Group.current) page2Group.current.visible = true;
      }, sunMoonPropChangeDelay * 2);
    } else {
      setTimeout(() => {
        if (page1Group.current) page1Group.current.visible = true;
        if (page2Group.current) page2Group.current.visible = false;
      }, sunMoonPropChangeDelay / 2);
    }
  }, [Page]);

  return (
    <group>
      {/* PAGE 1 */}
      <group position={[0, 0.62, 4]} visible={true} ref={page1Group}>
        <mesh>
          <Text
            ref={text}
            letterSpacing={0.0005}
            fontSize={0.2}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            {/* Use the same material instance */}
            <TitleShaderMaterial color="#fc8be9" />
            RISTOPHER
          </Text>
        </mesh>
        <mesh position={[-0.5895, 0.01, 0]}>
          <Text
            ref={text}
            letterSpacing={0.0005}
            fontSize={0.35}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            {/* Use the same material instance */}
            <TitleShaderMaterial color="#fc8be9" />K
          </Text>
        </mesh>
        <group position={[0, 0.0, 0]}>
          <mesh position={[0, -0.155, 0]}>
            <Text
              ref={text}
              letterSpacing={0.01}
              fontSize={0.2}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#47f36c" />
              ORENSEN
            </Text>
          </mesh>
          <mesh position={[-0.5, -0.185, 0.01]}>
            <Text
              ref={text}
              letterSpacing={0.01}
              fontSize={0.3}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#47f36c" />S
            </Text>
          </mesh>
        </group>
        <group position={[-0.015, -0.27, 0]} scale={[1, 1, 1]}>
          <mesh>
            <Text
              ref={text}
              letterSpacing={0.3}
              fontSize={0.048}
              anchorX={"center"}
              font="./fonts/altehaasgroteskregular.woff"
            >
              {/* Use the same material instance for CREATIVE DEVELOPER */}
              <TitleShaderMaterial color="white" />
              CREATIVE DEVELOPER
            </Text>
          </mesh>
        </group>
      </group>
      {/* PAGE 2 */}
      <group position={[0, 0.62, 4]} visible={false} ref={page2Group}>
        <mesh>
          <Text
            ref={text}
            letterSpacing={0.08}
            fontSize={0.2}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            {/* Use the same material instance */}
            {/* <TitleShaderMaterial color="#fc8b8b" /> */}
            <meshBasicMaterial color="#fc8b8b" />
            WORK
          </Text>
        </mesh>
      </group>
    </group>
  );
};

export default Logo;
