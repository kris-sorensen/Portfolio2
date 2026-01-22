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
    fov: { value: (camera as any).fov || 75, min: 1, max: 180, step: 1 },
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
    if ((camera as any).fov !== undefined) {
      (camera as any).fov = fov;
    }
    camera.updateProjectionMatrix();
  }, [camera, positionX, positionY, positionZ, fov]);

  // Set orthographic camera properties, if applicable
  useEffect(() => {
    const c = camera as any;
    if (c.isOrthographicCamera) {
      c.left = -viewport.width / 2;
      c.right = viewport.width / 2;
      c.top = viewport.height / 2;
      c.bottom = -viewport.height / 2;
      c.updateProjectionMatrix();
    }
  }, [camera, viewport]);

  useFrame(() => {
    if (controls && camera) {
      console.log(`controls`, (controls as any).target);
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
