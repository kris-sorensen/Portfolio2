import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function LoadingScreen() {
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [dots, setDots] = useState("");

  // Animate the glowing ring and text pulsing
  // useFrame((state, delta) => {
  //   if (ringRef.current) {
  //     ringRef.current.rotation.z += delta * 0.5;
  //   }

  //   // Make the 'loading...' dots animate
  //   setDots((prev) => (prev.length >= 3 ? "" : prev + "."));

  //   // Pulse the text
  //   if (textRef.current) {
  //     textRef.current.scale.setScalar(
  //       1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
  //     );
  //   }
  // });

  return (
    <group scale={[100, 100, 100]}>
      {/* Glowing ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshStandardMaterial
          color={"#00aaff"}
          emissive={"#00aaff"}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Loading text */}
      <Text
        ref={textRef}
        position={[0, -2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {"loading" + dots}
      </Text>
    </group>
  );
}
