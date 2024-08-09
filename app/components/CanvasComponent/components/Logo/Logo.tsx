import React, { useRef } from "react";
import { Text, Image } from "@react-three/drei";

const Logo = () => {
  const text = useRef(null);
  const circleColor = "#56B1C5"; // Light blue color (can be adjusted based on the exact color from the image)
  const imageWidth = 501;
  const imageHeight = 282;
  const aspectRatio = imageWidth / imageHeight;

  return (
    <group position={[0, -1, 0]}>
      <Image
        position={[-4.8, 5.65, 0]}
        url="/images/logo.png"
        scale={[aspectRatio * 3, 1 * 3]}
      />
      <group position={[0, 3, 0]} scale={[1.6, 1.6, 1.6]}>
        <mesh>
          <Text
            ref={text}
            letterSpacing={0.005}
            fontSize={2.3}
            anchorX={"center"}
            font="./fonts/dessau-heavy-regular.woff"
          >
            <meshBasicMaterial color="#ffffff" fog={false} />
            ZURCHERS
          </Text>
        </mesh>
        <group position={[-0.3, -1.2, 0]} scale={[1, 1, 1]}>
          <group position={[-3, 0, 0]}>
            <mesh>
              <Text
                ref={text}
                letterSpacing={0.005}
                fontSize={0.6}
                anchorX={"center"}
                font="./fonts/altehaasgroteskregular.woff"
              >
                <meshBasicMaterial fog={false} />
                Party
              </Text>
            </mesh>
          </group>
          <mesh position={[-1.95, 0, 0]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color={circleColor} fog={false} />
          </mesh>
          <group position={[-0.15, 0, 0]}>
            <mesh>
              <Text
                ref={text}
                letterSpacing={0.005}
                fontSize={0.6}
                anchorX={"center"}
                font="./fonts/altehaasgroteskregular.woff"
              >
                <meshBasicMaterial fog={false} />
                Costumes
              </Text>
            </mesh>
          </group>
          <mesh position={[1.65, 0, 0]}>
            <circleGeometry args={[0.1, 16]} />
            <meshBasicMaterial color={circleColor} fog={false} />
          </mesh>
          <group position={[3.2, 0, 0]}>
            <mesh>
              <Text
                ref={text}
                letterSpacing={0.005}
                fontSize={0.6}
                anchorX={"center"}
                font="./fonts/altehaasgroteskregular.woff"
              >
                <meshBasicMaterial fog={false} />
                Wedding
              </Text>
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Logo;
