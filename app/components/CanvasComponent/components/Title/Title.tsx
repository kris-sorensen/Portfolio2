import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import TitleShaderMaterial from "./shader/TitleMaterial/TitleMaterial";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

const Title: React.FC = React.memo(() => {
  const { viewport } = useThree();
  const text = useRef<THREE.Mesh | null>(null);
  console.log(`title component`);
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
          outlineWidth={0.015} // Thickness of the glow
          outlineOffsetX={0.002} // Slight horizontal shift
          outlineOffsetY={0.002} // Slight vertical shift
          outlineBlur={3} // Soft blur for smooth edges
          outlineColor={"#fc8be9"} // Neon pink glow (adjustable)
          outlineOpacity={1} // Full visibility
        >
          <TitleShaderMaterial
            // color="#B067F5"
            color="#4DEEEA"
            // color="#47f36c"
            // color="#fc8be9"
            // color2="#4DEEEA"
            color2="#fc8be9"
            // color2="#47f36c"
            activePage={1}
          />
          NEON MOON
        </Text>
      </mesh>
      {/* <mesh>
        <Text
          ref={text}
          letterSpacing={0.001}
          fontSize={0.19 * fontScale}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
          outlineWidth={0.015} // Thickness of the glow
          outlineOffsetX={0.002} // Slight horizontal shift
          outlineOffsetY={0.002} // Slight vertical shift
          outlineBlur={3} // Soft blur for smooth edges
          outlineColor={"#fc8be9"} // Neon pink glow (adjustable)
          outlineOpacity={1} // Full visibility
        >
          <TitleShaderMaterial
            color="#8A2BE2"
            color2="#fadc6f"
            activePage={1}
          />
          SOLAR GLOW
        </Text>
      </mesh> */}
    </group>
  );
});

Title.displayName = "Title";

export default Title;
