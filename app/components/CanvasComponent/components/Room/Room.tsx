import React, { useEffect, useRef, useState } from "react";
import {
  RigidBody,
  CuboidCollider,
  TrimeshCollider,
} from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

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
      roomWidth: viewport.width,
      roomHeight: viewport.height,
    });
  }, [viewport]); // Update when the viewport changes

  const roomDepth = viewport.width; // Depth (about two balloons wide)
  const wallThickness = 0.1; // Thickness of the walls
  const { roomWidth, roomHeight } = roomDimensions;

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={meshRef}
        position={[0, -roomHeight / 2, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      >
        <ringGeometry args={[0.49, viewport.width, 36, 1]} />
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
        position={[0, -roomHeight / 2 - 0.15, 0]}
        rotation={[Math.PI, 0, 0]}
      >
        <cylinderGeometry args={[0.95, 0.24, 1, 64, 1, true]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} />
      </mesh>
      {domeRef.current && (
        <TrimeshCollider
          position={[0, -roomHeight / 2 - 0.15, 0]}
          rotation={[Math.PI, 0, 0]}
          args={[
            domeRef.current.geometry.attributes.position.array, // vertices
            domeRef.current.geometry.index.array, // indices
          ]}
        />
      )}

      {/* Ceiling */}
      <CuboidCollider
        position={[0, roomHeight / 2, 0]}
        args={[roomWidth / 2, wallThickness / 2, roomDepth / 2]}
      />
      <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Left Wall */}
      <CuboidCollider
        args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
        position={[-roomWidth / 2, 0, 0]}
      />
      <mesh position={[-roomWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Right Wall */}
      <CuboidCollider
        args={[wallThickness / 2, roomHeight / 2, roomDepth / 2]}
        position={[roomWidth / 2, 0, 0]}
      />
      <mesh position={[roomWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Front Wall */}
      <CuboidCollider
        args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
        position={[0, 0, roomDepth / 2]}
      />
      <mesh position={[0, 0, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Back Wall */}
      <CuboidCollider
        args={[roomWidth / 2, roomHeight / 2, wallThickness / 2]}
        position={[0, 0, -roomDepth / 2]}
      />
      <mesh position={[0, 0, -roomDepth / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default Room;
