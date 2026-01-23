import React, { useEffect, useRef, useState } from "react";
import { GodRays } from "@react-three/postprocessing";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useGodRaysControls } from "./hooks/useGodRayControls";
import SunMoonMaterial from "./shader/SunMoonMaterial";
import {
  sunMoonPropChangeDelay,
  getAnimProgress,
} from "@/app/anim/animManager";
import useStore from "@/app/store/useStore";
import { page2GodRaysProps, totalDuration } from "./constants/sunMoon.constant";

export interface SunMoonProps {}

const SunMoon: React.FC<SunMoonProps> = () => {
  const Page = useStore((state) => state.Page);
  const Page2PropsActive = useStore((state) => state.Page2PropsActive);
  const setPage2PropsActive = useStore((state) => state.setPage2PropsActive);


  const [isInitialRender, setIsInitialRender] = useState(true);
  const page2TimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialized = useRef(true);
  const { pointer, viewport } = useThree();
  const sunRef = useRef<THREE.Mesh | null>(null);
  const group = useRef<THREE.Group | null>(null);
  const godRaysRef = useRef(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

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
        setPage2PropsActive(true);
      }, sunMoonPropChangeDelay);
    } else {
      page2TimeoutRef.current = setTimeout(() => {
        setPage2PropsActive(false);
      }, sunMoonPropChangeDelay);
    }

    return () => {
      if (page2TimeoutRef.current) {
        clearTimeout(page2TimeoutRef.current);
      }
    };
  }, [Page, setPage2PropsActive]);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!parallaxStarted.current && parallaxReady.current) {
        parallaxStarted.current = true;
        // window.removeEventListener("mousemove", handleMouseMove);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // * Animation and Parallax effect
  const animationPhase = useRef<
    "initial" | "reverseInitial" | "newArc" | "reverseNewArc" | "idle"
  >("initial");

  const phaseStartTime = useRef(0);
  const prevPage = useRef(Page);
  const parallaxStarted = useRef(false);
  const parallaxReady = useRef(false);

  // Define the variable to store the initial position at the start of reverseInitial animation
  const initialSunPosition = useRef<THREE.Vector3 | null>(null);

  useFrame((state, delta) => {
    if (!sunRef.current || !lightRef.current || !ambientLightRef.current)
      return;

    if (initialized.current) {
      initialized.current = false;
      setIsInitialRender(false);
    }

    // Adjusting the arc radius and positions
    const arcRadius = (0.3 * viewport.width) / 2;
    const leftArcRadius = (1 * viewport.width) / 2 - 50;
    const rightArcRadius = (1 * viewport.width) / 2 + 150;
    const rightArcCenterY = (-1 * viewport.height) / 2 - 200;
    const leftArcCenterY = (-1 * viewport.height) / 2 - 200; //- leftArcRadius * 0.07;

    if (Page !== prevPage.current) {
      parallaxReady.current = false;
      parallaxStarted.current = false;

      // Capture the sun's current position when animation starts
      if (sunRef.current) {
        initialSunPosition.current = sunRef.current.position.clone();
      }

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
          // Capture the sun's current position when reverseNewArc starts
          if (sunRef.current) {
            initialSunPosition.current = sunRef.current.position.clone();
          }
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

    switch (animationPhase.current) {
      case "initial":
        if (progress < 1) {
          const currentAngle = Math.PI * 0.63 * easedProgress;

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
          if (initialSunPosition.current) {
            sunRef.current.position.lerpVectors(
              initialSunPosition.current,
              new THREE.Vector3(
                rightArcRadius * Math.cos(Math.PI * 0.75 * (1 - easedProgress)),
                rightArcCenterY +
                  rightArcRadius *
                    Math.sin(Math.PI * 0.75 * (1 - easedProgress)),
                sunRef.current.position.z
              ),
              easedProgress
            );
          }
        } else {
          sunRef.current.position.set(
            -leftArcRadius,
            leftArcCenterY,
            sunRef.current.position.z
          );
          animationPhase.current = "newArc";
          phaseStartTime.current = state.clock.getElapsedTime();
          parallaxReady.current = true;
        }
        break;

      case "newArc":
        if (progress < 1) {
          const currentAngle = Math.PI - Math.PI * 0.68 * easedProgress;
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
          if (initialSunPosition.current) {
            // Interpolate from the initial saved position to the reverse new arc position
            sunRef.current.position.lerpVectors(
              initialSunPosition.current,
              new THREE.Vector3(
                leftArcRadius *
                  Math.cos(Math.PI - Math.PI * 0.68 * (1 - easedProgress)),
                leftArcCenterY +
                  leftArcRadius *
                    Math.sin(Math.PI - Math.PI * 0.68 * (1 - easedProgress)),
                sunRef.current.position.z
              ),
              easedProgress
            );
          }
        } else {
          sunRef.current.position.set(
            rightArcRadius,
            rightArcCenterY,
            sunRef.current.position.z
          );
          animationPhase.current = "initial";
          phaseStartTime.current = state.clock.getElapsedTime();
          parallaxReady.current = true;
        }
        break;

      case "idle":
      default:
        if (parallaxStarted.current) {
          sunRef.current.position.lerp(
            new THREE.Vector3(
              -pointer.x * viewport.width,
              -pointer.y * viewport.height,
              sunRef.current.position.z
            ),
            0.006
          );
        }
        break;
    }

    lightRef.current.position.copy(sunRef.current.position);
    // lightRef.current.target.position.set(0, -sunRef.current.position.y, 0);

    const animProgress = getAnimProgress();
    ambientLightRef.current.intensity = THREE.MathUtils.lerp(
      0.1,
      2 * (1 + sunRef.current.position.y / window.innerHeight),
      animProgress * 0.5
    );

    lightRef.current.intensity = THREE.MathUtils.lerp(
      0,
      1,
      sunRef.current.position.y / window.innerHeight + 0.5
    );
    lightRef.current.target.position.set(0, 0, -100);
  });

  return (
    <>
      <group ref={group} name="sunMoonGroup">
        <mesh
          visible={true}
          ref={sunRef}
          name={"sunMoonMesh"}
          position={[viewport.width / 2, viewport.height / 2, -1050]}
        >
          <sphereGeometry args={[sphereRadius, 36, 36]} />
          <SunMoonMaterial
            materialRef={shaderMaterialRef}
            sunOpacity={0.4}
            applyPage2Props={Page2PropsActive}
          />
        </mesh>
        {/* ECLIPSE MOON*/}
        {/* <mesh visible={true} position={[0, 0, -600]}>
          <circleGeometry args={[sphereRadius * 0.95, 72, 72]} />
          <meshBasicMaterial transparent color={"black"} opacity={0} />
        </mesh> */}

        <directionalLight
          ref={lightRef}
          position={[viewport.width / 2, viewport.height / 2, 0]}
          intensity={1}
          castShadow={true}
          color={Page2PropsActive ? "#fcffc4" : "#349ef5"}
        />

        <ambientLight ref={ambientLightRef} intensity={0.1} />

        {sunRef.current && !isInitialRender && (
          <EffectComposer multisampling={4}>
            <GodRays
              ref={godRaysRef}
              sun={sunRef.current}
              samples={Page2PropsActive ? page2GodRaysProps.samples : samples}
              density={Page2PropsActive ? page2GodRaysProps.density : density}
              decay={Page2PropsActive ? page2GodRaysProps.decay : decay}
              weight={Page2PropsActive ? page2GodRaysProps.weight : weight}
              exposure={
                Page2PropsActive ? page2GodRaysProps.exposure : exposure
              }
              clampMax={
                Page2PropsActive ? page2GodRaysProps.clampMax : clampMax
              }
              blur={true}
            />
          </EffectComposer>
        )}
      </group>
    </>
  );
};

export default SunMoon;
