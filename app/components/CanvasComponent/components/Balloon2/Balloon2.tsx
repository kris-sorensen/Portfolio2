import * as THREE from "three";
import React, { useRef, memo, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody } from "@react-three/rapier";
import {
  initialFragmentShader,
  initialVertexShader,
} from "../../../../data/currentShader";

type GLTFResult = GLTF & {
  nodes: {
    Line001: THREE.Mesh;
  };
  materials: {};
};

const Balloon = memo(
  ({
    fragmentShader,
    vertexShader,
    position = [0, 0, 0],
    onRemove,
  }: {
    fragmentShader: string;
    vertexShader: string;
    position: [number, number, number];
    onRemove: () => void;
  }) => {
    const { nodes } = useGLTF("/models/balloon-transformed.glb") as GLTFResult;
    const clockRef = useRef(0);
    const mesh = useRef(null);
    const material = useRef(null);
    const rigidBodyRef = useRef(null);
    // const { size, camera } = useThree();

    //  useFrame(({ clock, size }, delta) => {
    //    clockRef.current += delta;
    //    material.current.uniforms.time.value = clockRef.current;
    //  });

    //  const uniforms = useMemo(() => {
    //    return {
    //      time: { value: 1.0 },
    //      resolution: {
    //        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    //      },
    //      aspectRatio: {
    //        value: camera.aspect,
    //      },
    //    };
    //  }, [camera.aspect]);

    // const uniforms = useMemo(
    //   () => ({
    //     time: { value: 0 },
    //     resolution: {
    //       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    //     },
    //   }),
    //   []
    // );

    return (
      <group>
        <RigidBody
          ref={rigidBodyRef}
          colliders="hull"
          position={position}
          gravityScale={-0.1}
          linearDamping={0.5} // Add resistance to slow down movement
          angularDamping={1.0} // Prevent balloon from rotating excessively
        >
          <mesh ref={mesh} geometry={nodes.Line001.geometry} scale={[2, 2, 2]}>
            <shaderMaterial
              ref={material}
              attach="material"
              // uniforms={uniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              transparent
            />
          </mesh>
        </RigidBody>
      </group>
    );
  }
);

useGLTF.preload("/models/balloon-transformed.glb");

export default Balloon;
