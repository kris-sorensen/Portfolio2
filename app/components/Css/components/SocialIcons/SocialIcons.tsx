"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const SocialIcons: React.FC = () => {
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconsRef.current) {
      // Initial fade-in animation for icons
      gsap.fromTo(
        iconsRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          delay: 2,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // Add hover animations for each icon
      Array.from(iconsRef.current.children).forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.2,
            ease: "power1.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.2,
            ease: "power1.in",
          });
        });

        // Add click animation (bounce effect)
        icon.addEventListener("click", () => {
          gsap.to(icon, {
            scale: 0.9,
            y: -5,
            duration: 0.1,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          });
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center z-30 absolute">
      <div
        ref={iconsRef}
        className="fixed bottom-4 right-4 z-30 flex flex-col space-y-4"
      >
        <a
          href="https://www.linkedin.com/in/kris-sorensen/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer pointer-events-auto"
        >
          <FaLinkedin className="w-8 h-8 text-blue-600" />
        </a>
        <a
          target="_blank"
          href="mailto:krismsorensen@gmail.com"
          className="cursor-pointer pointer-events-auto"
        >
          <AiOutlineMail className="w-8 h-8 text-gray-300" />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
