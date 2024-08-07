import React, { useRef } from "react";
``;
import { Text } from "@react-three/drei";

const Logo = () => {
  const text = useRef(null);
  return (
    <group>
      <mesh position={[0, 5, 0]}>
        <Text
          ref={text}
          letterSpacing={0.005}
          fontSize={3}
          anchorX={"center"}
          // color={!hovered ? "#ff0044" : "#ff0044"}
          // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          font="./fonts/dessau-heavy-regular.woff"
        >
          ZURCHERS
        </Text>
      </mesh>
      <mesh position={[0, 2, 0]}>
        <Text
          ref={text}
          letterSpacing={0.005}
          fontSize={0.5}
          anchorX={"center"}
          // color={!hovered ? "#ff0044" : "#ff0044"}
          // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          // font="./fonts/dessau-heavy-regular.woff"
        >
          PARTY COSTUMES WEDDING
        </Text>
      </mesh>
    </group>
  );
};

export default Logo;
