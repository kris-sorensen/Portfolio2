import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useStore from "@/app/store/useStore";

const Fog = () => {
  const Page2PropsActive = useStore((state) => state.Page2PropsActive);
  const { scene } = useThree();

  // Ref to store the current fog values
  const fogColor = useRef(new THREE.Color(0x0a0a0a)); // Initial fog color (blackish)
  const fogNear = useRef(100); // Initial near value
  const fogFar = useRef(1000); // Initial far value

  const targetFogColor = useRef(new THREE.Color()); // Target fog color
  const targetFogNear = useRef(100); // Target near value
  const targetFogFar = useRef(1000); // Target far value

  useEffect(() => {
    // Set initial fog color to match the current scene fog color for smooth transition
    if (scene.fog) {
      fogColor.current.set(scene.fog.color);
    }

    // Update target fog values when Page2PropsActive changes
    targetFogColor.current.set(
      Page2PropsActive ? "rgb(195, 233, 251)" : "rgb(11, 11, 11)"
    );
    targetFogNear.current = Page2PropsActive ? 900 : 400;
    targetFogFar.current = Page2PropsActive ? 1000 : 1000;
  }, [Page2PropsActive, scene]);

  useFrame((state, delta) => {
    if (!scene.fog) {
      scene.fog = new THREE.Fog(
        fogColor.current,
        fogNear.current,
        fogFar.current
      );
    }

    // Lerp fog color - scaled delta for smoother effect
    fogColor.current.lerp(targetFogColor.current, delta * 0.1); // Slowing the transition for visibility
    scene.fog.color.set(fogColor.current);

    // Lerp fog near and far values
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

    scene.fog.near = fogNear.current;
    scene.fog.far = fogFar.current;
  });

  return null; // No need for a JSX element, we're modifying the scene's fog directly
};

export default Fog;
