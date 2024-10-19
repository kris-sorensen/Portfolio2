import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getAnimProgress } from "@/app/anim/animManager";

const Lights = () => {
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const { scene } = useThree();

  useFrame(() => {
    if (ambientLightRef.current) {
      // Get animation progress from 0 to 1
      const animProgress = getAnimProgress();

      // Transition ambient light intensity from 0.1 to 1 based on animProgress
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        0.1,
        2,
        animProgress
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.1} />
    </>
  );
};

export default Lights;
