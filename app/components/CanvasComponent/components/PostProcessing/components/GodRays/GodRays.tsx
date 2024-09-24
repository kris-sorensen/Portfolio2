import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useTexture } from "@react-three/drei";

export interface GodRayProps {
  Hotspot?: number;
}
const GodRaysComponent: React.FC<GodRayProps> = ({ Hotspot = 1 }) => {
  const { camera, pointer } = useThree();
  const [vec] = useState(() => new THREE.Vector3());
  const [isInitialRender, setIsInitialRender] = useState(true);
  const sunRef = useRef(null);
  const initialized = useRef(true);
  const parallaxActive = useRef(false);

  // const textureProps = useTexture({
  //   map: "/textures/sun.webp",
  // });

  // // Set texture filtering to improve quality
  // textureProps.map.minFilter = THREE.LinearFilter;
  // textureProps.map.magFilter = THREE.LinearFilter;

  // textureProps.map.wrapS = THREE.RepeatWrapping;
  // textureProps.map.wrapT = THREE.RepeatWrapping;
  // textureProps.map.repeat.set(4, 4);

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

  useEffect(() => {
    setTimeout(() => {
      parallaxActive.current = true;
    }, 26000);
  }, []);

  useFrame(() => {
    if (!sunRef.current) return;
    // * Initial Animation
    const currentY = sunRef.current.position.y;
    if (currentY < 0.36) sunRef.current.position.y += 0.0009;

    // * Parallax effect
    if (parallaxActive.current) {
      sunRef.current.position.lerp(
        vec.set(-pointer.x * 1, -pointer.y * 0.5, sunRef.current.position.z),
        // 0.565
        0.015
      );
    }
  });

  return (
    <>
      <mesh visible={Hotspot < 2} ref={sunRef} position={positionVector}>
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <meshBasicMaterial
          // {...textureProps}
          color={sunColor}
          transparent
          opacity={sunOpacity}
        />
      </mesh>
      {sunRef.current && !isInitialRender && (
        <EffectComposer multisampling={4}>
          <GodRays
            sun={sunRef.current}
            samples={samples}
            density={density}
            decay={decay}
            weight={weight}
            exposure={exposure}
            clampMax={clampMax}
            blur={blur}
          />
        </EffectComposer>
      )}
    </>
  );
};

export default GodRaysComponent;
