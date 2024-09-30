import { Plane } from "@react-three/drei";
import React from "react";
import WorkSlideMaterial from "./shader/WorkSlideMaterial";
import { useThree } from "@react-three/fiber";

const WorkSlides = () => {
  const { viewport } = useThree();
  const gap = 0.07 * viewport.width; // 10% of the screen width as the total gap on each side
  const slideWidth = (viewport.width - gap) / 2; // Calculate slide width to fit within the screen
  const slideHeight = viewport.height / 3; // Calculate slide width to fit within the screen
  const halfSlideHeight = slideHeight / 2; // Calculate slide width to fit within the screen
  const slideMargin = 50; // Calculate slide width to fit within the screen

  return (
    <group position={[0, -viewport.height / 2, 90]}>
      <mesh
        position={[-slideWidth / 2 - gap / 4, halfSlideHeight + slideMargin, 0]}
      >
        <Plane args={[slideWidth, slideHeight, 2, 2]}>
          <WorkSlideMaterial />
        </Plane>
      </mesh>
      <mesh
        position={[slideWidth / 2 + gap / 4, halfSlideHeight + slideMargin, 0]}
      >
        <Plane args={[slideWidth, slideHeight, 2, 2]}>
          <WorkSlideMaterial />
        </Plane>
      </mesh>
    </group>
  );
};

export default WorkSlides;
