import React, { useMemo } from "react";
import * as THREE from "three";
import MountainMaterial from "../../shader/MountainMaterial";

const Triangle = ({ vertices, position, color }: { vertices: any[]; position: [number, number, number]; color: string }) => {
  const f32array = useMemo(
    () =>
      Float32Array.from(
        new Array(vertices.length)
          .fill(null)
          .flatMap((_item, index) => vertices[index].toArray())
      ),
    [vertices]
  );
  console.log(`triangle`);

  return (
    <mesh position={position}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={f32array.length / 3}
          array={f32array}
          itemSize={3}
        />
      </bufferGeometry>
      <MountainMaterial />
      {/* <meshBasicMaterial attach="material" color={color} wireframe={false} /> */}
    </mesh>
  );
};

export default Triangle;
