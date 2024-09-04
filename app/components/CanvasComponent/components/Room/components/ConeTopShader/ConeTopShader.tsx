import React, { useRef } from "react";
import * as THREE from "three";

const ConeTopShader = (props) => {
  const material = useRef(null);
  return (
    <mesh {...props}>
      <circleGeometry args={[0.24, 48]} />
      <meshStandardMaterial color={"red"} />
      {/* <shaderMaterial
        ref={material}
        attach="material"
        // uniforms={uniforms}
        // vertexShader={vertexShader}
        // fragmentShader={fragmentShader}
        transparent
      /> */}
    </mesh>
  );
};

export default ConeTopShader;
