import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        {/* Outer Glow Effect */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Moon Shape */}
        <circle cx="50" cy="50" r="30" fill="#f4e3b2" filter="url(#glow)" />

        {/* Crescent Effect */}
        <circle cx="60" cy="45" r="28" fill="black" />
      </svg>
    </div>
  );
};

export default Loader;
