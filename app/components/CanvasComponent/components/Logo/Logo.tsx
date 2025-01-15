import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const Logo: React.FC = () => {
  const { viewport } = useThree();
  const text = useRef<THREE.Mesh | null>(null);

  // Font scale variable
  const fontScale = 500; // Adjust this scale as needed

  return (
    <group scale={[1.5, 1.5, 1.5]} position={[0, viewport.height / 2.5, 800]}>
      <mesh>
        <Text
          ref={text}
          letterSpacing={0.001}
          fontSize={0.19 * fontScale}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <TitleShaderMaterial
            color="#fc8be9"
            color2="#47f36c"
            activePage={0}
          />
          NEON MOON
        </Text>
      </mesh>
      <mesh position={[0, -460, 0]}>
        <Text
          ref={text}
          letterSpacing={0.0025}
          fontSize={0.027 * fontScale}
          anchorX={"center"}
          fontWeight={600}
          // font="./fonts/altehaasgroteskregular.woff"
        >
          <TitleShaderMaterial
            color="#ffffff"
            color2="#ffffff"
            activePage={0}
          />
          KRISTOPHER SORENSEN - CREATIVE DEVELOPER
        </Text>
      </mesh>
    </group>
  );
};

export default Logo;
