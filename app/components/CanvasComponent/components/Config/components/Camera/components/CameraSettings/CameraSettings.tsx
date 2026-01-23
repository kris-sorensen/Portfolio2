import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrthographicCamera } from "three";

const CameraSettings = () => {
  const { camera, viewport } = useThree();

  useEffect(() => {
    if (camera instanceof OrthographicCamera) {
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
