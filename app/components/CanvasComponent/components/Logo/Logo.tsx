import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import useStore from "@/app/store/useStore";

const Logo: React.FC = () => {
  const Page = useStore((state) => state.Page);
  const { viewport } = useThree();
  const text = useRef<THREE.Mesh | null>(null);

  // Font scale variable
  const fontScale = 500; // Adjust this scale as needed

  useEffect(() => {
    // Add your visibility logic here
  }, [Page]);

  return (
    <group scale={[1.5, 1.5, 1.5]} position={[0, viewport.height / 2.1, 800]}>
      {/* PAGE 1 */}
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
