import React from "react";
import { useThree } from "@react-three/fiber";
import { Plane, Text } from "@react-three/drei";
//todo: bouncing arrow. pointing towards first time & schedule? at end of word anim?

function WelcomeText() {
  const { viewport } = useThree();

  return (
    <group>
      <mesh position={[0, 3, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.55}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          WELCOME TO
        </Text>
      </mesh>
      <mesh position={[0, 2, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={1.15}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          HAPPY TAILS!
        </Text>
      </mesh>
      <mesh position={[-2, 0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.5}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          WE OFFER
        </Text>
      </mesh>

      <mesh position={[0, -0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.9}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Boarding
        </Text>
      </mesh>
      {/* <mesh position={[0, -0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.9}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Daycare
        </Text>
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.9}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Grooming
        </Text>
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.9}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          Training
        </Text>
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <Text
          anchorX={"center"}
          color="#57fbbf"
          fontSize={0.9}
          outlineWidth={0.01}
          outlineOffsetX={0.01}
          outlineOffsetY={0.03}
          outlineBlur={0.15}
          outlineColor={"#313131"}
          outlineOpacity={0.75}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          and tons of fun!
        </Text>
      </mesh> */}
    </group>
  );
}

export default React.memo(WelcomeText);
