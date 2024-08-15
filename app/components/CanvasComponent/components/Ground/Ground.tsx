import React from "react";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

const Room: React.FC = () => {
  const roomSize = 100; // Size of the room (100 units wide, deep, and tall)
  const wallThickness = 2; // Thickness of the walls to prevent tunneling

  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomSize / 2, wallThickness / 2, roomSize / 2]}
          position={[0, -roomSize / 2, 0]}
        />
        <mesh position={[0, -roomSize / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="brown" />
        </mesh>
      </RigidBody>

      {/* Ceiling */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomSize / 2, wallThickness / 2, roomSize / 2]}
          position={[0, roomSize / 2, 0]}
        />
        <mesh position={[0, roomSize / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="gray" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>

      {/* Left Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[wallThickness / 2, roomSize / 2, roomSize / 2]}
          position={[-roomSize / 2, 0, 0]}
        />
        <mesh position={[-roomSize / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="green" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>

      {/* Right Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[wallThickness / 2, roomSize / 2, roomSize / 2]}
          position={[roomSize / 2, 0, 0]}
        />
        <mesh position={[roomSize / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="green" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>

      {/* Front Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomSize / 2, roomSize / 2, wallThickness / 2]}
          position={[0, 0, roomSize / 2]}
        />
        <mesh position={[0, 0, roomSize / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>

      {/* Back Wall */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[roomSize / 2, roomSize / 2, wallThickness / 2]}
          position={[0, 0, -roomSize / 2]}
        />
        <mesh position={[0, 0, -roomSize / 2]}>
          <planeGeometry args={[roomSize, roomSize]} />
          <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default Room;
