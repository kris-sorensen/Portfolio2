import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import SunMoonMaterial from "./shader/SunMoonMaterial";
import { sunMoonPropChangeDelay } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const scaleFactor = 1.85; // Adjust this factor to match your new scale
const totalDuration = 10.0; // Duration in seconds
const xParallaxFactor = 0.5;
const yParallaxFactor = 0.5;

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

export interface SunMoonProps {}

const SunMoon: React.FC<SunMoonProps> = () => {
  const Page = useStore((state) => state.Page);
  // Prevents bug where god rays don't activate on initial render
  const [isInitialRender, setIsInitialRender] = useState(true);
  // State to control when to apply page 2 props
  const [applyPage2Props, setApplyPage2Props] = useState(false);
  const page2TimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const initialized = useRef(true);

  const { pointer, viewport } = useThree();
  const sunRef = useRef<THREE.Mesh | null>(null);
  const group = useRef<THREE.Group | null>(null);
  const godRaysRef = useRef(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const animationPhase = useRef<
    "initial" | "reverseInitial" | "newArc" | "reverseNewArc" | "idle"
  >("initial");

  const phaseStartTime = useRef(0);
  const prevPage = useRef(Page);
  const parallaxStarted = useRef(false);
  const parallaxReady = useRef(false);

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
  } = useGodRaysControls(Page);

  // * Update GodRay Props Boolean when switching from Moon to Sun or back
  useEffect(() => {
    if (Page === 2) {
      // Set timeout to apply page 2 props after 6 seconds
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(true);
      }, sunMoonPropChangeDelay);
    } else {
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(false);
      }, sunMoonPropChangeDelay);
    }

    return () => {
      // Clean up timeout on unmount or when Page changes
      if (page2TimeoutRef.current) {
        clearTimeout(page2TimeoutRef.current);
      }
    };
  }, [Page]);

  // * Only start Parallax effect after mouse movement
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

    // Calculate normalized arc parameters based on viewport size
    const arcRadius = 0.3 * viewport.width * scaleFactor; // 30% of the viewport width
    const centerY = -0.2 * viewport.height * scaleFactor; // Adjust the Y center based on viewport height

    const leftArcRadius = 0.35 * viewport.width * scaleFactor; // Left arc radius as 35% of the viewport width
    const rightArcRadius = 0.3 * viewport.width * scaleFactor; // Right arc radius as 30% of the viewport width
    const rightArcCenterY = -0.2 * viewport.height * scaleFactor; // Y center for the right arc
    const leftArcCenterY =
      -0.2 * viewport.height * scaleFactor - leftArcRadius * 0.07; // Lower the left arc by 7% of its radius

    // Detect page changes
    if (Page !== prevPage.current) {
      if (Page === 2) {
        if (
          animationPhase.current !== "reverseInitial" &&
          animationPhase.current !== "newArc"
        ) {
          animationPhase.current = "reverseInitial";
          phaseStartTime.current = state.clock.getElapsedTime();
        }
      } else if (Page === 1) {
        if (
          animationPhase.current !== "reverseNewArc" &&
          animationPhase.current !== "initial"
        ) {
          animationPhase.current = "reverseNewArc";
          phaseStartTime.current = state.clock.getElapsedTime();
        }
      }
      prevPage.current = Page;
    }

    const elapsedPhaseTime =
      state.clock.getElapsedTime() - phaseStartTime.current;
    let progress = Math.min(elapsedPhaseTime / totalDuration, 1);
    const easedProgress = Math.sin(progress * Math.PI * 0.5); // Ease in/out
    let currentAngle = 0;

    switch (animationPhase.current) {
      case "initial":
        if (progress < 1) {
          currentAngle = Math.PI * 0.75 * easedProgress;
          sunRef.current.position.x = rightArcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            rightArcCenterY + rightArcRadius * Math.sin(currentAngle);
        } else {
          animationPhase.current = "idle";
          parallaxReady.current = true;
        }
        break;

      case "reverseInitial":
        if (progress < 1) {
          currentAngle = Math.PI * 0.75 * (1 - easedProgress);
          sunRef.current.position.x = rightArcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            rightArcCenterY + rightArcRadius * Math.sin(currentAngle);
        } else {
          sunRef.current.position.set(
            -leftArcRadius,
            leftArcCenterY,
            sunRef.current.position.z
          );
          animationPhase.current = "newArc";
          phaseStartTime.current = state.clock.getElapsedTime();
        }
        break;

      case "newArc":
        if (progress < 1) {
          currentAngle = Math.PI - Math.PI * 0.68 * easedProgress;
          sunRef.current.position.x = leftArcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            leftArcCenterY + leftArcRadius * Math.sin(currentAngle);
        } else {
          animationPhase.current = "idle";
          parallaxReady.current = true;
        }
        break;

      case "reverseNewArc":
        if (progress < 1) {
          currentAngle = Math.PI - Math.PI * 0.68 * (1 - easedProgress);
          sunRef.current.position.x = leftArcRadius * Math.cos(currentAngle);
          sunRef.current.position.y =
            leftArcCenterY + leftArcRadius * Math.sin(currentAngle);
        } else {
          sunRef.current.position.set(
            rightArcRadius,
            rightArcCenterY,
            sunRef.current.position.z
          );
          animationPhase.current = "initial";
          phaseStartTime.current = state.clock.getElapsedTime();
        }
        break;

      case "idle":
      case "idle":
      default:
        if (parallaxStarted.current) {
          sunRef.current.position.lerp(
            new THREE.Vector3(
              -pointer.x * xParallaxFactor * viewport.width,
              -pointer.y * yParallaxFactor * viewport.height,
              sunRef.current.position.z
            ),
            0.006
          );
        }
        break;
    }
  });

  return (
    <group ref={group}>
      <mesh
        visible={true}
        ref={sunRef}
        position={[viewport.width / 2, viewport.height / 2, -200]}
      >
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
    </group>
  );
};

export default SunMoon;
