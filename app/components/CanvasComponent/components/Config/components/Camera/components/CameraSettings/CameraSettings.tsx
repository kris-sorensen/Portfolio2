import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const CameraSettings: React.FC = () => {
  const { camera, viewport } = useThree();

  useEffect(() => {
    // Ensure it's an OrthographicCamera before applying properties
    if (camera instanceof THREE.OrthographicCamera) {
      camera.left = -viewport.width / 2;
      camera.right = viewport.width / 2;
      camera.top = viewport.height / 2;
      camera.bottom = -viewport.height / 2;
      camera.updateProjectionMatrix();
    }
  }, [camera, viewport]);

  return null;
};

export default CameraSettings;
