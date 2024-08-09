import * as THREE from "three";
import React, { useRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Line001: THREE.Mesh;
  };
  materials: {};
};

function easeInCubicRoot(t: number): number {
  return Math.cbrt(t);
}

const Balloon = memo(
  ({
    color,
    position,
    onRemove,
  }: {
    color: THREE.Color;
    position: [number, number, number];
    onRemove: () => void;
  }) => {
    const { nodes } = useGLTF("/models/balloon-transformed.glb") as GLTFResult;
    const mesh = useRef<THREE.Mesh>(null);
    const scaleFactor = useRef(0);
    const elapsedTime = useRef(0);
    const growing = useRef(true);

    const initialScale = 0.0;
    const targetScale = 0.75;
    const resetPoint = 30;

    const delay = 0;

    useFrame((state, delta) => {
      if (!mesh.current) return;

      elapsedTime.current += delta;

      if (growing.current) {
        if (elapsedTime.current > delay) {
          scaleFactor.current = Math.min(scaleFactor.current + delta * 0.3, 1);

          const easeFactor =
            initialScale +
            easeInCubicRoot(scaleFactor.current) * (targetScale - initialScale);

          mesh.current.scale.set(easeFactor, easeFactor, easeFactor);

          const initialY = 1.001;

          if (!mesh.current.geometry.boundingBox) {
            mesh.current.geometry.computeBoundingBox();
          }

          const boundingBoxHeight =
            (mesh.current.geometry.boundingBox?.max.y ?? 0) -
            (mesh.current.geometry.boundingBox?.min.y ?? 0);
          mesh.current.position.y =
            initialY + (easeFactor - 1) * (boundingBoxHeight / 2);

          if (scaleFactor.current >= 1) {
            growing.current = false;
          }
        }
      } else {
        mesh.current.position.y += delta * 0.5;

        if (mesh.current.position.y > resetPoint) {
          onRemove();
        }
      }
    });

    return (
      <group position={position}>
        <mesh
          ref={mesh}
          geometry={nodes.Line001.geometry}
          scale={[0.001, 0.001, 0.001]}
        >
          <meshPhysicalMaterial
            color={color}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.1}
            reflectivity={1}
            transparent={true}
            opacity={0.9}
            fog={false}
          />
        </mesh>
      </group>
    );
  }
);

useGLTF.preload("/models/balloon-transformed.glb");

export default Balloon;
