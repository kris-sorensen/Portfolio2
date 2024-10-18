import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  getAnimProgress,
  sunMoonPropChangeDelay,
} from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const Logo: React.FC = () => {
  const Page = useStore((state) => state.Page);
  const { viewport } = useThree();
  const text = useRef<THREE.Mesh | null>(null);
  const page1Group = useRef<THREE.Group | null>(null);
  const page2Group = useRef<THREE.Group | null>(null);

  // Font scale variable
  const fontScale = 500; // Adjust this scale as needed

  useEffect(() => {
    // Add your visibility logic here
  }, [Page]);

  return (
    <group scale={[1.2, 1.2, 1.2]} position={[0, viewport.height / 2.4, 800]}>
      {/* PAGE 1 */}
      {/* <group visible={true} ref={page1Group}>
        <group position={[0, 40, 0]}>
          <mesh>
            <Text
              ref={text}
              letterSpacing={0.0005}
              fontSize={0.2 * fontScale}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#fc8be9" activePage={0} />
              RISTOPHER
            </Text>
          </mesh>
          <mesh position={[-300, 0, 0]}>
            <Text
              ref={text}
              letterSpacing={0.0005}
              fontSize={0.35 * fontScale}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#fc8be9" activePage={0} />K
            </Text>
          </mesh>
        </group>
        <group position={[0, -40, 0]}>
          <mesh position={[0, 0, 0]}>
            <Text
              ref={text}
              letterSpacing={0.01}
              fontSize={0.2 * fontScale}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#47f36c" activePage={0} />
              ORENSEN
            </Text>
          </mesh>
          <mesh position={[-250, -10, 1]}>
            <Text
              ref={text}
              letterSpacing={0.01}
              fontSize={0.3 * fontScale}
              anchorX={"center"}
              font="./fonts/dessau-heavy-regular.woff"
            >
              <TitleShaderMaterial color="#47f36c" activePage={0} />S
            </Text>
          </mesh>
        </group>
        <group position={[0, -100, 0]} scale={[1, 1, 1]}>
          <mesh>
            <Text
              ref={text}
              letterSpacing={0.3}
              fontSize={0.044 * fontScale}
              anchorX={"center"}
              font="./fonts/altehaasgroteskregular.woff"
            >
              <TitleShaderMaterial color="white" activePage={0} />
              CREATIVE DEVELOPER
            </Text>
          </mesh>
        </group>
      </group> */}
      {/* PAGE 2 */}
      {/* <group position={[0, 0.4, 4]} visible={true} ref={page2Group}>
        <mesh>
          <Text
            ref={text}
            letterSpacing={0.08}
            fontSize={0.35 * fontScale}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            <TitleShaderMaterial color="#fc8b8b" activePage={1} />
            WORK
          </Text>
        </mesh>
      </group> */}

      <mesh>
        <Text
          ref={text}
          letterSpacing={0.0001}
          fontSize={0.12 * fontScale}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <TitleShaderMaterial
            color="#fc8be9"
            color2="#47f36c"
            activePage={0}
          />
          CREATIVE DEVELOPER
        </Text>
      </mesh>
      <mesh position={[0, -50, 0]}>
        <Text
          ref={text}
          letterSpacing={0.25}
          fontSize={0.04 * fontScale}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <TitleShaderMaterial
            color="#ffffff"
            color2="#ffffff"
            activePage={0}
          />
          KRISTOPHER SORENSEN
        </Text>
      </mesh>
    </group>
  );
};

export default Logo;
