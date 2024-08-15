import * as THREE from "three";
import React, { useRef, memo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

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
    const targetScale = 1.65;
    const resetPoint = 30;

    const delay = 0;

    useFrame((state, delta) => {
      // if (!mesh.current) return;
      // elapsedTime.current += delta;
      // if (growing.current) {
      //   if (elapsedTime.current > delay) {
      //     scaleFactor.current = Math.min(scaleFactor.current + delta * 0.3, 1);
      //     const easeFactor =
      //       initialScale +
      //       easeInCubicRoot(scaleFactor.current) * (targetScale - initialScale);
      //     // Set the balloon's scale
      //     mesh.current.scale.set(easeFactor, easeFactor, easeFactor);
      //     // Calculate the opacity factor using the same easeInCubicRoot equation
      //     const opacityFactor = 1 - easeInCubicRoot(scaleFactor.current) * 0.25;
      //     // Update material opacity
      //     if (mesh.current.material instanceof THREE.MeshPhysicalMaterial) {
      //       mesh.current.material.opacity = opacityFactor;
      //     }
      //     const initialY = 1.001;
      //     if (!mesh.current.geometry.boundingBox) {
      //       mesh.current.geometry.computeBoundingBox();
      //     }
      //     const boundingBoxHeight =
      //       (mesh.current.geometry.boundingBox?.max.y ?? 0) -
      //       (mesh.current.geometry.boundingBox?.min.y ?? 0);
      //     mesh.current.position.y =
      //       initialY + (easeFactor - 1) * (boundingBoxHeight / 2);
      //     if (scaleFactor.current >= 1) {
      //       growing.current = false;
      //     }
      //   }
      // } else {
      //   // mesh.current.position.y += delta * 0.5;
      //   if (mesh.current.position.y > resetPoint) {
      //     onRemove();
      //   }
      // }
    });

    return (
      <group>
        <RigidBody
          colliders="hull"
          position={position}
          // ref={bodyRef}
          gravityScale={-0.1} // Simulating reduced gravity
          linearDamping={0.5} // Add resistance to slow down movement
          angularDamping={1.0} // Prevent balloon from rotating excessively

          // density={0.01}
        >
          <mesh
            ref={mesh}
            geometry={nodes.Line001.geometry}
            scale={[1.5, 1.5, 1.5]}
          >
            <meshPhysicalMaterial
              color={color}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.05}
              reflectivity={0.5}
              transparent={true}
              opacity={1}
              fog={false}
              metalness={0.25}
            />
          </mesh>
        </RigidBody>
      </group>
    );
  }
);

useGLTF.preload("/models/balloon-transformed.glb");

export default Balloon;
