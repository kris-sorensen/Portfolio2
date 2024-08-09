import React from "react";
import { MeshReflectorMaterial, Plane } from "@react-three/drei";
import * as THREE from "three";

const Ground: React.FC = () => {
  return (
    <mesh
      position={[0, 0, 8]}
      rotation={[-Math.PI / 2, 0, Math.PI]}
      scale={[2, 2, 1]}
    >
      <Plane args={[90, 90]}>
        <MeshReflectorMaterial
          blur={[300, 100]} // Blur reflections (width, height), 0 skips blur
          resolution={1024} // Off-buffer resolution, lower is faster, higher is better
          mirror={0.5} // Add the mirror prop here
          mixBlur={1} // How much blur mixes with surface roughness (default = 1)
          mixStrength={0.3} // Strength of the reflections
          depthScale={1} // How much the reflection depth scales (0 = no depth, default = 0)
          minDepthThreshold={0.8}
          maxDepthThreshold={1}
          color="#932CE6" // Color of the reflective surface
          roughness={1} // Roughness of the reflective surface
          metalness={0.25} // Metalness of the reflective surface
        />
      </Plane>
    </mesh>
  );
};

export default Ground;
