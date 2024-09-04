import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const CameraSettings = () => {
  const { camera, viewport } = useThree();

  useEffect(() => {
    if (camera.isOrthographicCamera) {
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
