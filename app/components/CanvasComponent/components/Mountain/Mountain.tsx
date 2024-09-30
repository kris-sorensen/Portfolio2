import React from "react";
import * as THREE from "three";
import Triangle from "./components/Triangle/Triangle";
import { useThree } from "@react-three/fiber";

const Mountain = () => {
  const { viewport } = useThree();

  // Set the target height to 2/3 of the viewport height
  const targetHeight = 0.5 * viewport.height;

  // Calculate scale factors based on the target height and original triangle sizes
  const scaleFactor1 = targetHeight / 17; // For the first triangle (original Y = 16)
  const scaleFactor2 = targetHeight / 15; // For the second triangle (original Y = 24)

  // Define vertices for the first triangle
  const vertices1 = [
    new THREE.Vector3(0, 16 * scaleFactor1, 0), // Vertex A
    new THREE.Vector3(-10 * scaleFactor1, 0, 0), // Vertex B
    new THREE.Vector3(10 * scaleFactor1, 0, 0), // Vertex C
  ];

  // Define vertices for the second triangle
  const vertices2 = [
    new THREE.Vector3(0, 24 * scaleFactor2, 0), // Vertex A2
    new THREE.Vector3(-15 * scaleFactor2, 0, 0), // Vertex B2
    new THREE.Vector3(15 * scaleFactor2, 0, 0), // Vertex C2
  ];

  // Position the triangles slightly above the bottom of the screen to keep them visible
  const groupPositionY = -viewport.height / 2;

  return (
    <group position={[viewport.width / 10, groupPositionY, 80]}>
      <Triangle vertices={vertices1} position={[0, 0, 0]} color={"#00a2ff"} />
      <Triangle
        vertices={vertices2}
        position={[500, 0, -0.01]}
        color={"#006aff"}
      />
    </group>
  );
};

export default Mountain;
