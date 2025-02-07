"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Intro: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade out intro on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (introRef.current) {
        gsap.to(introRef.current, {
          opacity: 1 - scrollPosition / window.innerHeight,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    // Animate background fade on load
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 0.75, duration: 5, ease: "power2.out" }
      );
    }
    // if (introRef.current) {
    //   gsap.fromTo(
    //     introRef.current,
    //     { opacity: 0 },
    //     { opacity: 0.75, duration: 5, ease: "power2.out" }
    //   );
    // }

    // Animate scroll icon on page load
    if (scrollIconRef.current) {
      gsap.fromTo(
        scrollIconRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={introRef}
      className="absolute w-full h-screen bg-black/75 flex items-center justify-center z-20"
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
        <p className="mt-5 text-2xl md:text-4xl font-medium text-gray-300 font-mono">
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
        <p className="mt-2 text-white text-sm uppercase tracking-widest font-sans animate-pulse delay-500 duration-1000 ease-in">
          Scroll
        </p>
      </div>
    </div>
  );
};

export default Intro;
