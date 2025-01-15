"use client";
import React from "react";
import useStore from "@/app/store/useStore";

const ShowExperienceBtn = () => {
  const setShowWorkExperience = useStore(
    (state) => state.setShowWorkExperience
  );
  const ShowWorkExperience = useStore((state) => state.ShowWorkExperience);

  const toggleWorkExperience = () =>
    setShowWorkExperience(ShowWorkExperience ? false : true);

  return (
    <div
      className="select-none pointer-events-auto z-30 absolute bottom-4 left-4 flex items-center cursor-pointer text-white text-lg font-semibold group hover:text-blue-400 transition-all duration-300 font-sans"
      onClick={toggleWorkExperience}
    >
      <span>Show My Projects</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.75l4.5 4.5m0 0l-4.5 4.5m4.5-4.5H3"
        />
      </svg>
    </div>
  );
};

export default ShowExperienceBtn;
