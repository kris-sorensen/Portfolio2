import React, { useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";

export interface GodRayProps {
  Hotspot?: number;
}
const GodRaysComponent: React.FC<GodRayProps> = ({ Hotspot = 1 }) => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const sunRef = useRef(null);
  const initialized = useRef(true);

  const {
    sunPosition,
    sunColor,
    sunOpacity,
    sphereRadius,
    samples,
    density,
    decay,
    weight,
    exposure,
    clampMax,
    blur,
  } = useGodRaysControls();

  useFrame(({ clock }) => {
    if (sunRef.current && initialized.current) {
      initialized.current = false;
      setIsInitialRender(false);
    }
  });

  const positionVector = new THREE.Vector3(
    sunPosition.x,
    sunPosition.y,
    sunPosition.z
  );

  return (
    <>
      <mesh
        visible={Hotspot < 2}
        renderOrder={4}
        ref={sunRef}
        position={positionVector}
      >
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <meshBasicMaterial color={sunColor} transparent opacity={sunOpacity} />
      </mesh>
      {sunRef.current && !isInitialRender && Hotspot < 2 && (
        <EffectComposer multisampling={4}>
          <GodRays
            sun={sunRef.current}
            samples={samples}
            density={density}
            decay={decay}
            weight={weight}
            exposure={exposure}
            clampMax={clampMax}
            // blur={blur}
          />
        </EffectComposer>
      )}
    </>
  );
};

export default GodRaysComponent;
