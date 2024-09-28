import React from "react";
import * as THREE from "three";
import Triangle from "./components/Triangle/Triangle";

const Mountain = () => {
  // Scale factor to make the triangles visible
  const scaleFactor1 = 0.06;
  const scaleFactor2 = 0.06;

  // First Triangle scaled down
  const vertices = [
    new THREE.Vector3(0, 16 * scaleFactor1, 0), // Vertex A
    new THREE.Vector3(-10 * scaleFactor1, 0, 0), // Vertex B
    new THREE.Vector3(10 * scaleFactor1, 0, 0), // Vertex C
  ];

  // Second Triangle with adjusted vertex to match slopes, scaled down
  const vertices2 = [
    new THREE.Vector3(0, 24 * scaleFactor2, 0), // Adjusted Vertex A2
    new THREE.Vector3(-15 * scaleFactor2, 0, 0), // Vertex B2
    new THREE.Vector3(15 * scaleFactor2, 0, 0), // Vertex C2
  ];

  return (
    <>
      <Triangle
        vertices={vertices}
        position={[0.5, -0.9, 1.8]}
        color={"#00a2ff"}
      />
      <Triangle
        vertices={vertices2}
        position={[1.1, -0.9, 1.8 - 0.01]}
        color={"#006aff"}
      />
    </>
  );
};

export default Mountain;
