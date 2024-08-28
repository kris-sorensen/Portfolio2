import React, { useEffect, useState } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const Room: React.FC = () => {
  const { viewport } = useThree(); // Get the viewport size
  const [roomDimensions, setRoomDimensions] = useState({
    roomWidth: viewport.width,
    roomHeight: viewport.height,
  });

  useEffect(() => {
    //todo: if first run return to avoid rerender
    // Set room dimensions once viewport is initialized
    setRoomDimensions({
      roomWidth: viewport.width,
      roomHeight: viewport.height,
    });
  }, [viewport]); // Update when the viewport changes

  const roomDepth = 10; // Depth (about two balloons wide)
  const wallThickness = 2; // Thickness of the walls
  const { roomWidth, roomHeight } = roomDimensions;

  return (
    <group>
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
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>

      {/* Ceiling */}
      <RigidBody type="fixed">
        {/* <CuboidCollider
          args={[roomWidth / 2, wallThickness / 2, roomDepth / 2]}
          position={[0, roomHeight / 2, 0]}
        /> */}
        <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, roomDepth]} />
          <meshStandardMaterial color="white" />
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
          <meshStandardMaterial color="white" side={THREE.DoubleSide} />
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
          <meshStandardMaterial color="white" side={THREE.DoubleSide} />
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
          <meshStandardMaterial color="white" side={THREE.DoubleSide} />
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
          <meshStandardMaterial color="white" />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default Room;
