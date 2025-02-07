"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Intro: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control component visibility
  const introRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLParagraphElement>(null);
  const allowWheelEvents = useRef<boolean>(false);

  const wheelEventsOn = () => {
    allowWheelEvents.current = true;
  };

  useEffect(() => {
    // Function to handle scroll event and unmount component
    const handleWheel = () => {
      if (!allowWheelEvents.current) return;
      if (introRef.current) {
        // Animate fade out
        gsap.to(introRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => setIsVisible(false), // Unmount component after fade out
        });
      }

      // Remove the wheel event listener after first trigger
      window.removeEventListener("wheel", handleWheel);
    };

    // Animate background fade on load
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 0.75, duration: 5, ease: "power2.out" }
      );
    }

    // Animate scroll icon on page load
    if (scrollIconRef.current) {
      gsap.fromTo(
        scrollIconRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 10,
          onComplete: wheelEventsOn,
        }
      );
    }

    // Animate name and title with blur effect
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, filter: "blur(20px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 6,
          ease: "power3.out",
          delay: 3,
          stagger: 0.3,
        }
      );
    }

    // Light switch effect for Scroll text synced with bounce
    if (scrollTextRef.current) {
      gsap.to(scrollTextRef.current, {
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 0.1,
        ease: "power1.inOut",
        repeatDelay: 0.9,
        delay: 10.9, // Sync with scrollIcon animation
      });
    }

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // If not visible, don't render the component
  if (!isVisible) return null;

  return (
    <div
      ref={introRef}
      className="absolute w-full h-screen bg-black/75 flex items-center justify-center z-20 select-none"
    >
      {/* Fog-like gradient background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-b from-black/75 to-gray-900/75 pointer-events-none opacity-0"
      ></div>

      {/* Centered Text */}
      <div ref={textRef} className="relative text-center mb-24">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white font-sans">
          Kris Sorensen
        </h1>
        <p className="mt-4 text-2xl md:text-4xl font-medium text-gray-300 font-mono">
          Creative Developer
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIconRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        {/* Animated Dots */}
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white rounded-full"></span>
        </div>
        {/* Scroll Text */}
        <p
          ref={scrollTextRef}
          className="mt-2 text-white text-sm uppercase tracking-widest font-sans"
        >
          Scroll
        </p>
      </div>
    </div>
  );
};

export default Intro;
