import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import SunMoonMaterial from "./shader/SunMoonMaterial";
import { sunMoonPropChangeDelay } from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";

const scaleFactor = 1.85;
const totalDuration = 10.0;
const xParallaxFactor = 0.5;
const yParallaxFactor = 0.5;

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
  const { scene } = useThree();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [applyPage2Props, setApplyPage2Props] = useState(false);
  const page2TimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialized = useRef(true);
  const { pointer, viewport } = useThree();
  const sunRef = useRef<THREE.Mesh | null>(null);
  const group = useRef<THREE.Group | null>(null);
  const godRaysRef = useRef(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null); // Reference for the directional light

  const animationPhase = useRef<
    "initial" | "reverseInitial" | "newArc" | "reverseNewArc" | "idle"
  >("initial");

  const phaseStartTime = useRef(0);
  const prevPage = useRef(Page);
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
  } = useGodRaysControls(Page);

  useEffect(() => {
    if (Page === 2) {
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(true);
      }, sunMoonPropChangeDelay);
    } else {
      page2TimeoutRef.current = setTimeout(() => {
        setApplyPage2Props(false);
      }, sunMoonPropChangeDelay);
    }

    return () => {
      if (page2TimeoutRef.current) {
        clearTimeout(page2TimeoutRef.current);
      }
    };
  }, [Page]);

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
    if (!sunRef.current || !lightRef.current) return;

    if (initialized.current) {
      initialized.current = false;
      setIsInitialRender(false);
    }

    const arcRadius = 0.3 * viewport.width * scaleFactor;
    const centerY = -0.2 * viewport.height * scaleFactor;
    const leftArcRadius = 0.35 * viewport.width * scaleFactor;
    const rightArcRadius = 0.3 * viewport.width * scaleFactor;
    const rightArcCenterY = -0.2 * viewport.height * scaleFactor;
    const leftArcCenterY =
      -0.2 * viewport.height * scaleFactor - leftArcRadius * 0.07;

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
    const easedProgress = Math.sin(progress * Math.PI * 0.5);
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

    // Update the directional light's position to match the sun/moon
    lightRef.current.position.copy(sunRef.current.position);
    lightRef.current.target.position.set(0, 0, 0); // Always point the light to the center of the scene
  });

  console.log(`scene`, scene.children[4]);

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

      {/* Directional light that follows the sun/moon */}
      <directionalLight
        ref={lightRef}
        position={[0, 500, 100]} // Initial position (will be updated in useFrame)
        intensity={1}
        castShadow={true}
        color={"#349ef5"}
        // target={scene.children[4]}
      />
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
            blur={true}
          />
        </EffectComposer>
      )}
    </group>
  );
};

export default SunMoon;
