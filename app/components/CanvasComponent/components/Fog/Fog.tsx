import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useStore from "@/app/store/useStore";

const Fog = () => {
  const Page2PropsActive = useStore((state) => state.Page2PropsActive);
  const { scene } = useThree();

  // Ensure fog type is consistent
  const fog = useRef<THREE.Fog | null>(
    scene.fog instanceof THREE.Fog ? scene.fog : null
  );

  // Ref to store the current fog values
  const fogColor = useRef(new THREE.Color(0x0a0a0a)); // Initial fog color
  const fogNear = useRef(100);
  const fogFar = useRef(1000);

  const targetFogColor = useRef(new THREE.Color()); // Target fog color
  const targetFogNear = useRef(100);
  const targetFogFar = useRef(1000);

  useEffect(() => {
    if (!fog.current) {
      // Ensure the scene has a valid fog instance
      scene.fog = new THREE.Fog(
        fogColor.current,
        fogNear.current,
        fogFar.current
      );
      fog.current = scene.fog;
    }

    // Set target fog values based on state
    targetFogColor.current.set(
      Page2PropsActive ? "rgb(195, 233, 251)" : "rgb(11, 11, 11)"
    );
    targetFogNear.current = Page2PropsActive ? 900 : 400;
    targetFogFar.current = Page2PropsActive ? 1000 : 1000;
  }, [Page2PropsActive, scene]);

  useFrame((state, delta) => {
    if (!fog.current) return;

    // Lerp fog color for smooth transition
    fogColor.current.lerp(targetFogColor.current, delta * 0.1);
    fog.current.color.set(fogColor.current);

    // Lerp fog near and far only if `scene.fog` is of type `THREE.Fog`
    if (fog.current instanceof THREE.Fog) {
      fogNear.current = THREE.MathUtils.lerp(
        fogNear.current,
        targetFogNear.current,
        delta * 0.1
      );
      fogFar.current = THREE.MathUtils.lerp(
        fogFar.current,
        targetFogFar.current,
        delta * 0.1
      );

      fog.current.near = fogNear.current;
      fog.current.far = fogFar.current;
    }
  });

  return null; // No JSX needed, modifies scene fog directly
};

export default Fog;
