import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import SunMoonMaterial from "./shader/SunMoonMaterial";
import { sunMoonPropChangeDelay } from "@/app/anim/animManager";

const arcRadius = 1.45; // Radius of the arc
const centerY = -0.5; // Y center of the arc
const totalDuration = 10.0; // Duration in seconds

export interface GodRayProps {
  currentPage: number;
}

const GodRaysComponent: React.FC<GodRayProps> = ({ currentPage }) => {
  const { pointer } = useThree();
  const sunRef = useRef<THREE.Mesh | null>(null);
  const godRaysRef = useRef(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "reverseInitial" | "newArc" | "reverseNewArc" | "idle"
  >("initial");

  const [isInitialRender, setIsInitialRender] = useState(true);
  const initialized = useRef(true);

  const phaseStartTime = useRef(0);
  const prevPage = useRef(currentPage);
  const parallaxStarted = useRef(false);
  const parallaxReady = useRef(false);

  // State to control when to apply page 2 props
  const [applyPage2Props, setApplyPage2Props] = useState(false);
  const page2TimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get GodRays properties from the control hook
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
  } = useGodRaysControls(currentPage);

  // Define the page 2 properties directly
  const page2GodRaysProps = {
    samples: 45,
    density: 0.8,
    decay: 0.9,
    weight: 0.6,
    exposure: 1,
    clampMax: 1.0,
    blur: 1,
    sunOpacity: 0.2,
  };

  useEffect(() => {
    if (currentPage === 2) {
      // Set timeout to apply page 2 props after 6 seconds
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(true);
      }, sunMoonPropChangeDelay);
    } else {
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(false);
      }, sunMoonPropChangeDelay);
      // If not on page 2, reset applyPage2Props
    }

    return () => {
      // Clean up timeout on unmount or when currentPage changes
      if (page2TimeoutRef.current) {
        clearTimeout(page2TimeoutRef.current);
      }
    };
  }, [currentPage]);

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
    // * Bug workaround. Without this, the sun isn't illuminated at first
    if (initialized.current) {
      initialized.current = false;
      setIsInitialRender(false);
    }

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
      <mesh visible={true} ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[sphereRadius, 36, 36]} />
        <SunMoonMaterial
          materialRef={shaderMaterialRef}
          sunOpacity={0.4}
          applyPage2Props={applyPage2Props}
        />
      </mesh>
      {sunRef.current && !isInitialRender && (
        <EffectComposer multisampling={4}>
          <GodRays
            ref={godRaysRef}
            sun={sunRef.current}
            // Use page 2 properties after 6 seconds if on page 2
            samples={applyPage2Props ? page2GodRaysProps.samples : samples}
            density={applyPage2Props ? page2GodRaysProps.density : density}
            decay={applyPage2Props ? page2GodRaysProps.decay : decay}
            weight={applyPage2Props ? page2GodRaysProps.weight : weight}
            exposure={applyPage2Props ? page2GodRaysProps.exposure : exposure}
            clampMax={applyPage2Props ? page2GodRaysProps.clampMax : clampMax}
            blur={applyPage2Props ? page2GodRaysProps.blur : blur}
          />
        </EffectComposer>
      )}
    </>
  );
};

export default GodRaysComponent;
