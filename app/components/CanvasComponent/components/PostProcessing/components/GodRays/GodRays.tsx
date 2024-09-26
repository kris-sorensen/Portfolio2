import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import SunMoonMaterial from "./shader/SunMoonMaterial";

const arcRadius = 1.45; // Radius of the arc
const centerY = -0.5; // Y center of the arc
const totalDuration = 10.0; // Duration in seconds

export interface GodRayProps {
  Hotspot?: number;
  currentPage: number; // Accept the current page as a prop
}

const GodRaysComponent: React.FC<GodRayProps> = ({
  Hotspot = 1,
  currentPage,
}) => {
  const { pointer } = useThree();
  const sunRef = useRef<THREE.Mesh | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "reverseInitial" | "newArc" | "reverseNewArc" | "idle"
  >("initial");
  const phaseStartTime = useRef(0);
  const prevPage = useRef(currentPage);
  const parallaxStarted = useRef(false);
  const parallaxReady = useRef(false);

  const {
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

  useEffect(() => {
    const handleMouseMove = () => {
      if (!parallaxStarted.current && parallaxReady.current) {
        parallaxStarted.current = true;
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!sunRef.current) return;

    // Detect page changes
    if (currentPage !== prevPage.current) {
      // Page has changed
      if (currentPage === 2) {
        // Transition from Page 1 to 2
        if (
          animationPhase !== "reverseInitial" &&
          animationPhase !== "newArc"
        ) {
          setAnimationPhase("reverseInitial");
          phaseStartTime.current = state.clock.getElapsedTime();
        }
      } else if (currentPage === 1) {
        // Transition from Page 2 to 1
        if (
          animationPhase !== "reverseNewArc" &&
          animationPhase !== "initial"
        ) {
          setAnimationPhase("reverseNewArc");
          phaseStartTime.current = state.clock.getElapsedTime();
        }
      }
      prevPage.current = currentPage;
    }

    const elapsedPhaseTime =
      state.clock.getElapsedTime() - phaseStartTime.current;
    let progress = Math.min(elapsedPhaseTime / totalDuration, 1);
    const easedProgress = Math.sin(progress * Math.PI * 0.5); // Ease in/out
    let currentAngle = 0;

    switch (animationPhase) {
      case "initial":
        // **Initial Animation:** Bottom right to top left
        if (progress < 1) {
          currentAngle = Math.PI * 0.75 * easedProgress;
          sunRef.current.position.x = arcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            centerY + arcRadius * Math.sin(currentAngle);
        } else {
          setAnimationPhase("idle");
          parallaxReady.current = true;
        }
        break;

      case "reverseInitial":
        // **Reverse Initial Animation:** Move sun back to starting position
        if (progress < 1) {
          currentAngle = Math.PI * 0.75 * (1 - easedProgress);
          sunRef.current.position.x = arcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            centerY + arcRadius * Math.sin(currentAngle);
        } else {
          // Jump to bottom left corner and start new arc
          sunRef.current.position.set(
            -arcRadius,
            centerY,
            sunRef.current.position.z
          );
          setAnimationPhase("newArc");
          phaseStartTime.current = state.clock.getElapsedTime();
        }
        break;

      case "newArc":
        // **New Arc Animation:** Bottom left to top right
        if (progress < 1) {
          currentAngle = Math.PI - Math.PI * 0.75 * easedProgress;
          sunRef.current.position.x = arcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            centerY + arcRadius * Math.sin(currentAngle);
        } else {
          setAnimationPhase("idle");
          parallaxReady.current = true;
        }
        break;

      case "reverseNewArc":
        // **Reverse New Arc Animation:** Move sun back to starting position
        if (progress < 1) {
          currentAngle = Math.PI - Math.PI * 0.75 * (1 - easedProgress);
          sunRef.current.position.x = arcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            centerY + arcRadius * Math.sin(currentAngle);
        } else {
          // Jump to bottom right corner and start initial animation
          sunRef.current.position.set(
            arcRadius,
            centerY,
            sunRef.current.position.z
          );
          setAnimationPhase("initial");
          phaseStartTime.current = state.clock.getElapsedTime();
        }
        break;

      case "idle":
      default:
        // **Parallax Effect:** Sun follows mouse movement
        if (parallaxStarted.current) {
          sunRef.current.position.lerp(
            new THREE.Vector3(
              -pointer.x * 1.25,
              -pointer.y * 1,
              sunRef.current.position.z
            ),
            0.006
          );
        }
        break;
    }
  });

  return (
    <>
      <mesh visible={Hotspot < 2} ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <SunMoonMaterial
          materialRef={shaderMaterialRef}
          sunOpacity={sunOpacity}
        />
      </mesh>
      {sunRef.current && (
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
