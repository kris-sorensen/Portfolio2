import React from "react";
import * as THREE from "three";
import BackgroundMaterial from "./shader/BackgroundMaterial/BackgroundMaterial";
import {
  sphereRadius,
  sphereWidthSegments,
  sphereHeightSegments,
  spherePosition,
} from "@/app/constants/sceneGeometry.const";

const Background = () => {
  return (
    <mesh visible={true} position={spherePosition}>
      <sphereGeometry
        args={[sphereRadius, sphereWidthSegments, sphereHeightSegments]}
      />
      <BackgroundMaterial side={THREE.BackSide} />
    </mesh>
  );
};

export default Background;
