import React, { useRef } from "react";
import { Text } from "@react-three/drei";

const Logo = () => {
  const text = useRef(null);
  const circleColor = "#00BFFF"; // Light blue color (can be adjusted based on the exact color from the image)
  return (
    <group position={[0, 5, 0]} scale={[1.6, 1.6, 1.6]}>
      <mesh>
        <Text
          ref={text}
          letterSpacing={0.005}
          fontSize={2.3}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          ZURCHERS
        </Text>
      </mesh>
      <group position={[-0.3, -1.2, 0]} scale={[1, 1, 1]}>
        <group position={[-3, 0, 0]}>
          <Text
            ref={text}
            letterSpacing={0.005}
            fontSize={0.6}
            anchorX={"center"}
            font="./fonts/altehaasgroteskregular.woff"
          >
            Party
          </Text>
        </group>
        <mesh position={[-1.95, 0, 0]}>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color={circleColor} />
        </mesh>
        <group position={[-0.15, 0, 0]}>
          <Text
            ref={text}
            letterSpacing={0.005}
            fontSize={0.6}
            anchorX={"center"}
            font="./fonts/altehaasgroteskregular.woff"
          >
            Costumes
          </Text>
        </group>
        <mesh position={[1.65, 0, 0]}>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color={circleColor} />
        </mesh>
        <group position={[3.2, 0, 0]}>
          <Text
            ref={text}
            letterSpacing={0.005}
            fontSize={0.6}
            anchorX={"center"}
            font="./fonts/altehaasgroteskregular.woff"
          >
            Wedding
          </Text>
        </group>
      </group>
    </group>
  );
};

export default Logo;
