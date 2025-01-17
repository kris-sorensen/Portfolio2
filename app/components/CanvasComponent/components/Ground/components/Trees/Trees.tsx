import React, { useRef } from "react";
import TreeModel from "./TreeModel";
import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { treesData } from "./data/trees.data";

const Trees = React.memo(() => {
  const { nodes, materials } = useGLTF("./models/tree-transformed.glb");
  console.log(`trees component`);
  return (
    <group position={[0, 600, -800]}>
      {treesData.map((tree, treeIndex) => (
        <TreeModel
          key={`${treeIndex}-${treeIndex}`}
          scale={tree.scale}
          position={tree.position}
          rotation={tree.rotation}
        />
      ))}
    </group>
  );
});

export default Trees;
