import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";

const Logo: React.FC = () => {
  const text = useRef<THREE.Mesh | null>(null);

  return (
    <group position={[0, 0.62, 4]}>
      <group position={[0, 0, 0]}>
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
    </group>
  );
};

export default Logo;
