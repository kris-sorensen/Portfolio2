import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useThree } from "@react-three/fiber";
import createStarAttributes from "./util/createStarAttributes";
import StarMaterial from "./shader/StarMaterial";
import { page } from "@/app/constants/settings.const";

const config = {
  particleCount: 40,
  particleSize: 10,
};

const Star = () => {
  // * hooks
  const { gl, clock } = useThree();
  const [angleIncrement] = useState((Math.PI * 2) / config.particleCount);
  const points = useRef(null);

  // * clock
  let clockOffset = 0;
  useEffect(() => {
    //used to offset clock so it starts at zero for each new firework
    clockOffset = clock.getElapsedTime();
  }, []);
  console.log(`config sh`, config);
  // * create firework attributes
  const { positions } = createStarAttributes(config);
  console.log(`positions`, positions);
  // * animation loop
  // useFrame(() => {
  //   points.current.material.uniforms.uTime.value =
  //     clock.getElapsedTime() - clockOffset;
  // }, -3);

  return (
    <>
      <mesh visible={page === 2 ? false : true}>
        <points ref={points}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <StarMaterial config={config} />
        </points>
      </mesh>
    </>
  );
};

export default React.memo(Star);
