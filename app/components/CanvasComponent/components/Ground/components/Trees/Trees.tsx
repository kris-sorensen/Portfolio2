import React, { useRef } from "react";
import TreeModel from "./TreeModel";
import * as THREE from "three";

const Trees = () => {
  const treesRef = useRef([
    {
      position: [-375, 310, 500],
      scale: [55, 55, 55],
      rotation: [0, (1 / 10) * Math.PI * 2, 0],
    },
    {
      position: [-275, 360, 800],
      scale: [40, 40, 40],
      rotation: [0, (2 / 10) * Math.PI * 2, 0],
    },
    {
      position: [450, 290, 650],
      scale: [17, 17, 17],
      rotation: [0, (3 / 10) * Math.PI * 2, 0],
    },
    {
      position: [350, 340, 700],
      scale: [18, 18, 18],
      rotation: [0, (4 / 10) * Math.PI * 2, 0],
    },
    {
      position: [400, 325, 800],
      scale: [22, 22, 22],
      rotation: [0, (5 / 10) * Math.PI * 2, 0],
    },
    {
      position: [290, 340, 600],
      scale: [18, 18, 18],
      rotation: [0, (6 / 10) * Math.PI * 2, 0],
    },
    {
      position: [200, 300, 400],
      scale: [30, 30, 30],
      rotation: [0, (7 / 10) * Math.PI * 2, 0],
    },
    {
      position: [520, 257, 850],
      scale: [10, 10, 10],
      rotation: [0, (8 / 10) * Math.PI * 2, 0],
    },
    {
      position: [250, 360, 920],
      scale: [13, 13, 13],
      rotation: [0, (9 / 10) * Math.PI * 2, 0],
    },
    {
      position: [450, 275, 1000],
      scale: [20, 20, 20],
      rotation: [0, (10 / 10) * Math.PI * 2, 0],
    },
  ]);

  return (
    <mesh position={[0, -300, -500]}>
      {treesRef.current.map((tree, treeIndex) => (
        <TreeModel
          key={`${treeIndex}-${treeIndex}`}
          scale={tree.scale}
          position={tree.position}
          rotation={tree.rotation}
          castShadow
        />
      ))}
    </mesh>
  );
};

export default Trees;
