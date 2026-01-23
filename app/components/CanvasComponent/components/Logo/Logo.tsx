import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

import useStore from "@/app/store/useStore";

const Logo: React.FC = () => {
  const Page = useStore((state) => state.Page);
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group | null>(null);
  const text = useRef<THREE.Mesh | null>(null);

  // Font scale variable
  const fontScale = 400; // Adjust this scale as needed

  // Floating animation
  const baseY = 220;
  useFrame(({ clock }) => {
    // if (groupRef.current) {
    //   groupRef.current.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.5) * 20;
    // }
  });

  useEffect(() => {
    // Add your visibility logic here
  }, [Page]);

  return (
    <group
      ref={groupRef}
      scale={[1.5, 1.5, 1.5]}
      position={[0, baseY, -800]}
    >
      {/* PAGE 1 */}
      <mesh>
        <Text
          ref={text}
          letterSpacing={0.0001}
          fontSize={0.18 * fontScale}
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
          letterSpacing={0.35}
          fontSize={0.045 * fontScale}
          anchorX={"center"}
          font="./fonts/altehaasgroteskregular.woff"
        >
          <TitleShaderMaterial
            color="#d0d4ff"
            color2="#d0d4ff"
            activePage={0}
          />
          KRISTOPHER SORENSEN
        </Text>
      </mesh>
    </group>
  );
};

export default Logo;
