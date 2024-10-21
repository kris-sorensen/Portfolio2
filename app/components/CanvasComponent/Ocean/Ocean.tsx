import React, { Suspense, useMemo, useRef } from "react";
import {
  useThree,
  extend,
  useLoader,
  useFrame,
  ReactThreeFiber,
} from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three-stdlib";

// Extend the Water class so that it can be used as a JSX element
extend({ Water });

// Declare the custom element 'water' for JSX with appropriate types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: ReactThreeFiber.Object3DNode<Water, typeof Water>;
    }
  }
}

const Ocean: React.FC = () => {
  // Define the ref with the correct type
  const ref = useRef<Water>(null!);
  const { gl } = useThree();

  // Load water normals texture
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "./textures/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  // Memoize the geometry and configuration to prevent unnecessary recalculations
  const geom = useMemo(() => new THREE.PlaneGeometry(3000, 3000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: "#349ef5",
      waterColor: "#0054bb",
      distortionScale: 3.7,
      fog: true,
      // format: gl.outputEncoding, // Updated from 'gl.encoding' to 'gl.outputEncoding' for newer versions
    }),
    [waterNormals, gl]
  );

  useFrame((state, delta) => {
    // Ensure ref.current is not null and has the expected structure
    if (ref.current) {
      // Type assertion to access uniforms
      (ref.current.material as THREE.ShaderMaterial).uniforms.time.value +=
        delta;
    }
  });

  return (
    <Suspense fallback={null}>
      <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        position={[0, -360, 0]}
      />
    </Suspense>
  );
};

export default Ocean;
