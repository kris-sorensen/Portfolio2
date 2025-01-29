import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { treesData } from "./data/trees.data";
import useStore from "@/app/store/useStore";

const Trees: React.FC = React.memo(() => {
  const EnableShadows = useStore((state) => state.EnableShadows);
  const gltf = useGLTF("./models/tree-transformed.glb");

  // Leva controls for material properties
  const { roughness, metalness, flatShading } = useControls("Tree Material", {
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    flatShading: { value: true },
  });

  const nodes = useMemo(
    () => gltf.nodes as Record<string, THREE.Mesh>,
    [gltf.nodes]
  );

  const mergedGeometry = useMemo(() => {
    const trunkMesh = nodes["Cylinder"] as THREE.Mesh;
    const leavesMesh = nodes["Cone002"] as THREE.Mesh;

    if (!trunkMesh?.geometry || !leavesMesh?.geometry) return null;

    const trunkGeo = trunkMesh.geometry.clone();
    const leavesGeo = leavesMesh.geometry.clone();

    // Offset leaves
    const leavesOffset = new THREE.Vector3(0, 5.297, 0);
    leavesGeo.translate(leavesOffset.x, leavesOffset.y, leavesOffset.z);

    const trunkPositions = Array.from(trunkGeo.attributes.position.array);
    const leavesPositions = Array.from(leavesGeo.attributes.position.array);
    const trunkNormals = Array.from(trunkGeo.attributes.normal.array);
    const leavesNormals = Array.from(leavesGeo.attributes.normal.array);

    const trunkIndices = trunkGeo.index ? Array.from(trunkGeo.index.array) : [];
    const leavesIndices = leavesGeo.index
      ? Array.from(leavesGeo.index.array).map(
          (i) => i + trunkGeo.attributes.position.count
        )
      : [];

    const positions = new Float32Array([...trunkPositions, ...leavesPositions]);
    const normals = new Float32Array([...trunkNormals, ...leavesNormals]);
    const indices = new Uint16Array([...trunkIndices, ...leavesIndices]);

    // Assign vertex colors
    const trunkColor = new THREE.Color(0x8b5a2b);
    const leavesColor = new THREE.Color(0x228b22);

    const colors = new Float32Array(positions.length);
    const trunkVertexCount = trunkGeo.attributes.position.count;
    const leavesVertexCount = leavesGeo.attributes.position.count;

    for (let i = 0; i < trunkVertexCount; i++) {
      colors[i * 3] = trunkColor.r;
      colors[i * 3 + 1] = trunkColor.g;
      colors[i * 3 + 2] = trunkColor.b;
    }

    for (let i = 0; i < leavesVertexCount; i++) {
      const index = (trunkVertexCount + i) * 3;
      colors[index] = leavesColor.r;
      colors[index + 1] = leavesColor.g;
      colors[index + 2] = leavesColor.b;
    }

    const merged = new THREE.BufferGeometry();
    merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    merged.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    merged.setIndex(new THREE.BufferAttribute(indices, 1));
    merged.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return merged;
  }, [nodes]);

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

      instancedRef.current?.setMatrixAt(index, tempMatrix);
    });

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [mergedGeometry]);

  if (!mergedGeometry) return null;

  return (
    <group position={[0, 600, -800]}>
      <instancedMesh
        ref={instancedRef}
        args={[mergedGeometry, undefined, treesData.length]}
        castShadow={EnableShadows}
        receiveShadow={EnableShadows}
      >
        <meshStandardMaterial
          vertexColors
          roughness={roughness}
          metalness={metalness}
          flatShading={flatShading}
        />
      </instancedMesh>
    </group>
  );
});

Trees.displayName = "Trees";

useGLTF.preload("./models/tree-transformed.glb");

export default Trees;
