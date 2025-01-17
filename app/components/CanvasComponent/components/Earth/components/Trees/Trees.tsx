import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { treesData } from "./data/trees.data";

const Trees = React.memo(() => {
  const { nodes } = useGLTF("./models/tree-transformed.glb");
  console.log(`trees`);
  // Create a merged geometry (trunk + leaves) with vertex colors
  const mergedGeometry = useMemo(() => {
    if (!nodes?.Cylinder || !nodes?.Cone002) return null;

    const trunkGeo = nodes.Cylinder.geometry.clone();
    const leavesGeo = nodes.Cone002.geometry.clone();

    // Offset leaves to correct position
    const leavesOffset = new THREE.Vector3(0, 5.297, 0);
    leavesGeo.translate(leavesOffset.x, leavesOffset.y, leavesOffset.z);

    // Merge trunk and leaves positions
    const positions = new Float32Array([
      ...trunkGeo.attributes.position.array,
      ...leavesGeo.attributes.position.array,
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
    merged.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return merged;
  }, [nodes]);

  // InstancedMesh reference
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!instancedRef.current || !mergedGeometry) return;

    const tempMatrix = new THREE.Matrix4();

    treesData.forEach((tree, index) => {
      const { position, scale, rotation } = tree;

      tempMatrix.compose(
        new THREE.Vector3(...position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
        new THREE.Vector3(...scale)
      );

      instancedRef.current.setMatrixAt(index, tempMatrix);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [treesData, mergedGeometry]);

  if (!mergedGeometry) return null; // Prevent rendering if geometry isn't ready

  return (
    <group position={[0, 600, -800]}>
      <instancedMesh
        ref={instancedRef}
        args={[mergedGeometry, null, treesData.length]}
        // castShadow
        // receiveShadow
      >
        <meshStandardMaterial vertexColors />
      </instancedMesh>
    </group>
  );
});

useGLTF.preload("./models/tree-transformed.glb");

export default Trees;
