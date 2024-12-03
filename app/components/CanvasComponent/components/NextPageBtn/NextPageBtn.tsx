import React, { useRef, useState } from "react";
import NextPageBtnMaterial from "./shader/NextPageBtnMaterial";
import { Plane, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useStore from "@/app/store/useStore";
import { setHovered } from "./constants/nextPageBtn.constant";
import {
  btnAnimationDuration,
  btnAnimationRevealDelay,
} from "@/app/anim/animManager";

// Custom easeOutBack function for smooth animation
function easeOutBack(t, overshoot = 1.70158) {
  return (
    1 + (overshoot + 1) * Math.pow(t - 1, 3) + overshoot * Math.pow(t - 1, 2)
  );
}

const NextPageBtn = () => {
  const setPage = useStore((state) => state.setPage);
  const Page = useStore((state) => state.Page);

  const group = useRef(null);
  const textRef = useRef(null);
  const scaleRef = useRef(1); // Track scale value
  const isAnimatingRef = useRef(false); // Track if animation is in progress
  const isRevealingRef = useRef(false); // Track if it's in revealing phase
  const animationStartTimeRef = useRef(0); // Track when animation starts
  const [buttonText, setButtonText] = useState("WORK"); // UseState for button text

  const handleClick = (e) => {
    e.stopPropagation();
    setPage(Page === 2 ? 1 : 2);
    setHovered(false);

    // Start the disappearance animation
    isAnimatingRef.current = true;
    isRevealingRef.current = false; // Set to disappearing
    animationStartTimeRef.current = performance.now();

    setTimeout(() => {
      setButtonText("HOME"); // Change text after 1 second
    }, btnAnimationDuration * 1000);

    // Start the reveal animation after 10 seconds
    setTimeout(() => {
      isRevealingRef.current = true; // Set to revealing
      isAnimatingRef.current = true; // Start animation
      animationStartTimeRef.current = performance.now(); // Reset the animation time
    }, btnAnimationRevealDelay);
  };

  useFrame(() => {
    if (isAnimatingRef.current) {
      const elapsedTime =
        (performance.now() - animationStartTimeRef.current) / 1000; // Time since animation started
      const progress = Math.min(elapsedTime / btnAnimationDuration, 1); // Ensure progress does not exceed 1

      // Use the reverse of easeOutBack for the revealing animation
      const newScale = isRevealingRef.current
        ? easeOutBack(progress) // Revealing (scale from 0 to 1)
        : easeOutBack(1 - progress); // Disappearing (scale from 1 to 0)

      scaleRef.current = newScale; // Store the new scale

      if (group.current) {
        group.current.scale.set(
          scaleRef.current,
          scaleRef.current,
          scaleRef.current
        ); // Apply the new scale
      }

      if (progress === 1) {
        isAnimatingRef.current = false; // Stop animation when done
      }
    }
  });

  return (
    <group
      visible={false}
      ref={group}
      position={[0, -350, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <mesh position={[0, 0, 1]}>
        <Text
          ref={textRef}
          letterSpacing={0.1}
          fontSize={25}
          anchorX={"center"}
          font="./fonts/dessau-heavy-regular.woff"
        >
          <NextPageBtnMaterial color={"#e1e1e1"} />
          {buttonText} {/* UseState to manage the text */}
        </Text>
      </mesh>
      <mesh>
        <Plane args={[130, 66]}>
          <NextPageBtnMaterial color={"#008261"} />
        </Plane>
      </mesh>
    </group>
  );
};

export default NextPageBtn;
