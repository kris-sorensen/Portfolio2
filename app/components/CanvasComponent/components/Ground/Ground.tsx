import React from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

const Room: React.FC = () => {
  const roomHeight = 22.5; // Tall room
  const roomWidth = 40; // Width of the room
  const roomDepth = 13; // Depth (about two balloons wide)
  const wallThickness = 2; // Thickness of the walls

  return (
    <group position={[0, 10, 0]}>
      {/* Floor */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomWidth / 2, wallThickness / 2, roomDepth / 2]}
          position={[0, -roomHeight / 2, 0]}
        />
        <mesh
          position={[0, -roomHeight / 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshBasicMaterial color="purple" />
        </mesh>
      </RigidBody>

      {/* Ceiling */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomWidth / 2, wallThickness / 2, roomDepth / 2]}
          position={[0, roomHeight / 2, 0]}
        />
        <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </RigidBody>

      {/* Left Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
          position={[-roomWidth / 2, 0, 0]}
        />
        <mesh position={[-roomWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </RigidBody>

      {/* Right Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
          position={[roomWidth / 2, 0, 0]}
        />
        <mesh position={[roomWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[roomDepth, roomHeight]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </RigidBody>

      {/* Front Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
          position={[0, 0, roomDepth / 2]}
        />
        <mesh position={[0, 0, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshBasicMaterial color="black" side={THREE.FrontSide} />
        </mesh>
      </RigidBody>

      {/* Back Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
          position={[0, 0, -roomDepth / 2]}
        />
        <mesh position={[0, 0, -roomDepth / 2]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default Room;
