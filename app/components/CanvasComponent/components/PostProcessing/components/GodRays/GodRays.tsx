import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";

export interface GodRayProps {
  Hotspot?: number;
}

const GodRaysComponent: React.FC<GodRayProps> = ({ Hotspot = 1 }) => {
  const { camera, pointer } = useThree();
  const [vec] = useState(() => new THREE.Vector3());
  const [isInitialRender, setIsInitialRender] = useState(true);
  const sunRef = useRef(null);
  const initialized = useRef(true);
  const parallaxStarted = useRef(false); // Track if parallax has started
  const parallaxReady = useRef(false); // Track if parallax can start after initial animation

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

  // Enable parallax only after the first mouse move after the animation
  useEffect(() => {
    const handleMouseMove = () => {
      if (!parallaxStarted.current && parallaxReady.current) {
        parallaxStarted.current = true; // Enable parallax after the first mouse movement
        window.removeEventListener("mousemove", handleMouseMove); // Remove the listener after the first movement
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Clean up the event listener
    };
  }, []);

  useFrame((state, delta) => {
    if (!sunRef.current) return;

    // * Initial Animation - Move sun in an arc from bottom right to top left
    const totalDuration = 10.0; // Duration in seconds
    const elapsedTime = state.clock.getElapsedTime(); // Get elapsed time

    if (elapsedTime <= totalDuration) {
      // Calculate progress as a value between 0 and 1
      const progress = Math.min(elapsedTime / totalDuration, 1);

      // Use an easing function, like easeInOut, to smooth the arc animation
      const easedProgress = Math.sin(progress * Math.PI * 0.5); // Ease in/out

      // Define the arc's radius and center
      const arcRadius = 1.45; // Radius of the arc
      const centerX = 0; // X center of the arc
      const centerY = -0.5; // Y center of the arc (adjust to shift vertically)

      // Parametric equation for an arc moving from bottom right to top left
      const startAngle = 0.0; // Starting angle (0 radians -> bottom-right)
      const endAngle = Math.PI * 0.75; // Ending angle (π radians -> top-left)

      // Calculate the current angle based on progress
      const currentAngle = startAngle + (endAngle - startAngle) * easedProgress;

      // Update sun's position along the arc using cos and sin for x and y
      sunRef.current.position.x = centerX + arcRadius * Math.cos(currentAngle); // X position
      sunRef.current.position.y = centerY + arcRadius * Math.sin(currentAngle); // Y position
    } else {
      // Mark that the parallax is ready after the initial animation finishes
      parallaxReady.current = true;

      // Start the parallax effect only if the first mouse movement has occurred
      if (parallaxStarted.current) {
        sunRef.current.position.lerp(
          vec.set(-pointer.x * 1.25, -pointer.y * 1, sunRef.current.position.z),
          0.006
        );
      }
    }
  });

  return (
    <>
      <mesh visible={Hotspot < 2} ref={sunRef} position={positionVector}>
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <meshBasicMaterial color={sunColor} transparent opacity={sunOpacity} />
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
