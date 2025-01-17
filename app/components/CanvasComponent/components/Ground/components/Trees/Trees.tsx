import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { treesData } from "./data/trees.data";

const Trees = React.memo(() => {
  const { nodes, materials } = useGLTF("./models/tree-transformed.glb");

  // Refs for instanced meshes
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const leavesRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!trunkRef.current || !leavesRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    const leavesOffset = new THREE.Vector3(0, 5.297, 0); // Move leaves up

    treesData.forEach((tree, index) => {
      const { position, scale, rotation } = tree;

      // **Apply transformation to the trunks (No Y offset needed)**
      tempMatrix.compose(
        new THREE.Vector3(...position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
        new THREE.Vector3(...scale)
      );
      trunkRef.current.setMatrixAt(index, tempMatrix);

      // **Apply transformation to the leaves (Offset added to position)**
      tempMatrix.compose(
        new THREE.Vector3(
          position[0],
          position[1] + leavesOffset.y * scale[1],
          position[2]
        ),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
        new THREE.Vector3(...scale)
      );
      leavesRef.current.setMatrixAt(index, tempMatrix);
    });

    trunkRef.current.instanceMatrix.needsUpdate = true;
    leavesRef.current.instanceMatrix.needsUpdate = true;
  }, [treesData]);

  return (
    <group position={[0, 600, -800]}>
      {/* Instanced Mesh for Tree Trunks */}
      <instancedMesh
        ref={trunkRef}
        args={[
          nodes.Cylinder.geometry,
          materials["Material.002"],
          treesData.length,
        ]}
        castShadow
        receiveShadow
      />

      {/* Instanced Mesh for Tree Leaves (Corrected Y Position) */}
      <instancedMesh
        ref={leavesRef}
        args={[
          nodes.Cone002.geometry,
          materials["Material.001"],
          treesData.length,
        ]}
        castShadow
        receiveShadow
      />
    </group>
  );
});

export default Trees;
