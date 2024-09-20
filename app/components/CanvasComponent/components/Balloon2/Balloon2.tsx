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
          linearDamping={1} // Add resistance to slow down movement
          angularDamping={1.0} // Prevent balloon from rotating excessively
        >
          <mesh
            ref={mesh}
            geometry={nodes.Line001.geometry}
            scale={[0.1, 0.1, 0.1]}
          >
            <meshPhysicalMaterial
              // color={"#00f2de"}
              color={"#ff6cb5"}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.05}
              reflectivity={0.5}
              transparent={true}
              opacity={1}
              // fog={false}
              metalness={0.25}
              side={THREE.DoubleSide}
            />
            {/* <shaderMaterial
              ref={material}
              attach="material"
              // uniforms={uniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              transparent
              side={THREE.DoubleSide} //todo: can turn off if balloon and bottom of ballon are separate
            /> */}
          </mesh>
        </RigidBody>
      </group>
    );
  }
);

useGLTF.preload("/models/balloon-transformed.glb");

export default Balloon;
