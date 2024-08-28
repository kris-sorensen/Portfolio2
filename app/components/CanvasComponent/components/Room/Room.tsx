import React, { useEffect, useRef, useState } from "react";
import {
  RigidBody,
  CuboidCollider,
  TrimeshCollider,
} from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Ring } from "@react-three/drei";

const Room: React.FC = () => {
  const { viewport } = useThree(); // Get the viewport size
  const [roomDimensions, setRoomDimensions] = useState({
    roomWidth: viewport.width * 1,
    roomHeight: viewport.height * 1,
  });
  const meshRef = useRef(null);
  const domeRef = useRef(null);

  useEffect(() => {
    //todo: if first run return to avoid rerender
    // Set room dimensions once viewport is initialized
    setRoomDimensions({
      roomWidth: viewport.width * 1,
      roomHeight: viewport.height * 1,
    });
  }, [viewport]); // Update when the viewport changes

  const roomDepth = viewport.width * 1; // Depth (about two balloons wide)
  const wallThickness = 0.1; // Thickness of the walls
  const { roomWidth, roomHeight } = roomDimensions;

  return (
    <group>
      {/* Floor */}
      {/* <RigidBody type="fixed"> */}
      <mesh
        ref={meshRef}
        position={[0, -roomHeight / 2, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      >
        <ringGeometry args={[0.4, 1.32, 4, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {meshRef.current && (
        <TrimeshCollider
          rotation={[Math.PI / 2, 0, Math.PI / 4]}
          position={[0, -roomHeight / 2, 0]}
          args={[
            meshRef.current.geometry.attributes.position.array, // vertices
            meshRef.current.geometry.index.array, // indices
          ]}
        />
      )}
      <mesh
        ref={domeRef}
        position={[0, -roomHeight / 2 + 0.075, 0]}
        rotation={[Math.PI, 0, 0]}
      >
        <cylinderGeometry args={[0.4, 0.15, 0.15, 24, 1, true]} />
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      {domeRef.current && (
        <TrimeshCollider
          rotation={[Math.PI, 0, 0]}
          position={[0, -roomHeight / 2 + 0.075, 0]}
          args={[
            domeRef.current.geometry.attributes.position.array, // vertices
            domeRef.current.geometry.index.array, // indices
          ]}
        />
      )}
      {/* </RigidBody> */}

      {/* Ceiling */}
      {/* <RigidBody type="fixed"> */}
      <CuboidCollider
        position={[0, roomHeight / 2, 0]}
        args={[roomWidth / 2, wallThickness / 2, roomDepth / 2]}
      />
      <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* </RigidBody> */}

      {/* Left Wall */}
      {/* <RigidBody type="fixed"> */}
      <CuboidCollider
        args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
        position={[-roomWidth / 2, 0, 0]}
      />
      <mesh position={[-roomWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* </RigidBody> */}

      {/* Right Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
          position={[roomWidth / 2, 0, 0]}
        />
        <mesh position={[roomWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>

      {/* Front Wall */}
      {/* <RigidBody type="fixed"> */}
      <CuboidCollider
        args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
        position={[0, 0, roomDepth / 2]}
      />
      <mesh position={[0, 0, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* </RigidBody> */}

      {/* Back Wall */}
      {/* <RigidBody type="fixed"> */}
      <CuboidCollider
        args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
        position={[0, 0, -roomDepth / 2]}
      />
      <mesh position={[0, 0, -roomDepth / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* </RigidBody> */}
    </group>
  );
};

export default Room;
