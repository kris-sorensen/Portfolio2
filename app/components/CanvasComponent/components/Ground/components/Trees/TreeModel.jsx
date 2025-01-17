import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TreeModel = React.memo((props) => {
  const { nodes } = useGLTF("./models/tree-transformed.glb");

  const mergedGeometry = useMemo(() => {
    if (!nodes?.Cylinder || !nodes?.Cone002) return null; // Prevents errors if nodes are not loaded yet

    const trunkGeo = nodes.Cylinder.geometry.clone();
    const leavesGeo = nodes.Cone002.geometry.clone();

    // Offset to correct leaf position (adjust Y-axis)
    const leavesOffset = new THREE.Vector3(0, 5.297, 0);

    // Merge positions with corrected leaf height
    const positions = new Float32Array([
      ...trunkGeo.attributes.position.array,
      ...Array.from(leavesGeo.attributes.position.array).map(
        (val, index) => (index % 3 === 1 ? val + leavesOffset.y : val) // Add Y offset to the leaves
      ),
    ]);

    // Merge normals
    const normals = new Float32Array([
      ...trunkGeo.attributes.normal.array,
      ...leavesGeo.attributes.normal.array,
    ]);

    // Merge indices
    const indices = new Uint16Array([
      ...trunkGeo.index.array,
      ...leavesGeo.index.array.map(
        (i) => i + trunkGeo.attributes.position.count
      ),
    ]);

    // Assign vertex colors (trunk = brown, leaves = green)
    const trunkColor = new THREE.Color(0x8b5a2b); // Tree trunk brown
    const leavesColor = new THREE.Color(0x228b22); // Evergreen green

    const colors = new Float32Array(positions.length);
    const trunkVertexCount = trunkGeo.attributes.position.count;
    const leavesVertexCount = leavesGeo.attributes.position.count;

    for (let i = 0; i < trunkVertexCount; i++) {
      colors[i * 3] = trunkColor.r;
      colors[i * 3 + 1] = trunkColor.g;
      colors[i * 3 + 2] = trunkColor.b;
    }

    for (let i = 0; i < leavesVertexCount; i++) {
      colors[(trunkVertexCount + i) * 3] = leavesColor.r;
      colors[(trunkVertexCount + i) * 3 + 1] = leavesColor.g;
      colors[(trunkVertexCount + i) * 3 + 2] = leavesColor.b;
    }

    // Create merged geometry
    const merged = new THREE.BufferGeometry();
    merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    merged.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    merged.setIndex(new THREE.BufferAttribute(indices, 1));
    merged.setAttribute("color", new THREE.BufferAttribute(colors, 3)); // Vertex colors

    return merged;
  }, [nodes]);

  console.log(`TreeModel Rendered`);

  if (!mergedGeometry) return null; // Prevents rendering if geometry hasn't loaded yet

  return (
    <mesh geometry={mergedGeometry} {...props} dispose={null}>
      <meshStandardMaterial vertexColors />
    </mesh>
  );
});

useGLTF.preload("./models/tree-transformed.glb");

export default TreeModel;
