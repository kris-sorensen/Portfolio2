import React from "react";
import { useThree } from "@react-three/fiber";
import TreeModel from "./TreeModel";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const Trees = () => {
  const { viewport } = useThree();
  const numClusters = 50; // Number of tree clusters
  const sphereRadius = 1500; // Radius of the sphere

  // Helper function to generate a random number between min and max
  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  // Generate clusters of trees
  const clusters = Array.from({ length: numClusters }).map(
    (_, clusterIndex) => {
      const numTreesInCluster = Math.floor(randomBetween(2, 6)); // 2, 3, 4, or 5 trees per cluster
      const cluster = [];

      // Random base position for the cluster on the sphere
      const baseTheta = Math.PI * 2 * Math.random(); // Random horizontal angle
      const basePhi = Math.PI * 0.25 + Math.random() * Math.PI * 0.2; // Random vertical angle (latitude)

      const baseX = sphereRadius * Math.sin(basePhi) * Math.cos(baseTheta);
      const baseY = sphereRadius * Math.sin(basePhi) * Math.sin(baseTheta);
      const baseZ = sphereRadius * Math.cos(basePhi);

      // Offset trees slightly around the base position to form a cluster
      for (let i = 0; i < numTreesInCluster; i++) {
        const offsetX = randomBetween(-100, 100); // Offset within a small range
        const offsetY = randomBetween(-100, 100); // Offset within a small range
        const offsetZ = randomBetween(-100, 100); // Offset within a small range

        const x = baseX + offsetX;
        const y = baseY + offsetY - viewport.height / 2;
        const z = baseZ + offsetZ;

        const scale = 24 + Math.random() * 13;
        const yRotation = Math.random() * Math.PI * 2; // Random rotation on the y-axis

        cluster.push({
          position: [x, y, z],
          scale: [scale, scale, scale],
          rotation: [0, yRotation, 0],
        });
      }

      return cluster;
    }
  );

  return (
    <group position={[0, -1400, -170]} name={"ground"}>
      <mesh position={[0, 460, 0]}>
        {clusters.map((cluster, clusterIndex) =>
          cluster.map((tree, treeIndex) => (
            <TreeModel
              key={`${clusterIndex}-${treeIndex}`}
              scale={tree.scale}
              position={tree.position}
              rotation={tree.rotation}
              castShadow
            />
          ))
        )}
      </mesh>
      {/* The sphere is the "ground" */}
      <mesh position={[0, 0, 0]} name={"floor"}>
        <Sphere args={[sphereRadius, 100, 100]}>
          <meshStandardMaterial
            color={"#213362"}
            metalness={1}
            roughness={0.5}
          />
        </Sphere>
      </mesh>
    </group>
  );
};

export default Trees;
