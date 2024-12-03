import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { OrbitControls } from "@react-three/drei";

const CameraSettings = () => {
  const { camera, viewport, controls } = useThree();

  // Leva controls for camera settings
  const { positionX, positionY, positionZ, fov } = useControls("Camera", {
    positionX: { value: camera.position.x, min: -1000, max: 1000, step: 0.1 },
    positionY: { value: camera.position.y, min: -1000, max: 1000, step: 0.1 },
    positionZ: { value: camera.position.z, min: -1000, max: 1000, step: 0.1 },
    fov: { value: camera.fov, min: 1, max: 180, step: 1 },
  });

  // Leva controls for OrbitControls settings
  const { enableZoom, targetX, targetY, targetZ } = useControls(
    "Orbit Controls",
    {
      enableZoom: { value: true },
      targetX: { value: 0, min: -1000, max: 1000, step: 0.1 },
      targetY: { value: 0, min: -1000, max: 1000, step: 0.1 },
      targetZ: { value: -100, min: -1000, max: 1000, step: 0.1 },
    }
  );

  // Update camera settings from Leva controls
  useEffect(() => {
    camera.position.set(positionX, positionY, positionZ);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [camera, positionX, positionY, positionZ, fov]);

  // Set orthographic camera properties, if applicable
  useEffect(() => {
    if (camera.isOrthographicCamera) {
      camera.left = -viewport.width / 2;
      camera.right = viewport.width / 2;
      camera.top = viewport.height / 2;
      camera.bottom = -viewport.height / 2;
      camera.updateProjectionMatrix();
    }
  }, [camera, viewport]);

  useFrame(() => {
    if (controls && camera) {
      console.log(`controls`, controls.target);
      console.log(`camera`, camera.position);
    }
  });

  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={enableZoom}
        target={[targetX, targetY, targetZ]}
      />
    </>
  );
};

export default CameraSettings;
