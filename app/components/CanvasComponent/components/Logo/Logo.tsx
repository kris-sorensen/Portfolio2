import React, { useRef } from "react";
import { Text, Image } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleShaderMaterial/TitleShaderMaterial";

const Logo = () => {
  const text = useRef(null);
  const circleColor = "#56B1C5"; // Light blue color (can be adjusted based on the exact color from the image)
  const imageWidth = 501;
  const imageHeight = 282;
  const aspectRatio = imageWidth / imageHeight;

  return (
    <group position={[0, 0.62, 0.1]}>
      <group position={[0, 0, 0]}>
        <mesh>
          <Text
            ref={text}
            letterSpacing={0.0005}
            fontSize={0.2}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            {/* <meshBasicMaterial color="#fc8be9" fog={false} /> */}
            <TitleShaderMaterial color="#fc8be9" />
            KRISTOPHER
          </Text>
        </mesh>
        <group position={[0, -0.14, 0]} scale={[1, 1, 1]}>
          <mesh>
            <Text
              ref={text}
              letterSpacing={0.005}
              fontSize={0.05}
              anchorX={"center"}
              font="./fonts/altehaasgroteskregular.woff"
            >
              <meshBasicMaterial fog={false} color={"white"} />
              CREATIVE DEVELOPER
            </Text>
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Logo;
