import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useStore from "@/app/store/useStore";

const Overview = ({
  projects,
  setSelectedProject,
  ShowOverview,
  setShowOverview,
  setShowProjectPage,
}) => {
  const toggleWorkExperience = useStore((state) => state.toggleWorkExperience);

  const containerRef = useRef(null); // Reference to the container element

  useEffect(() => {
    if (!ShowOverview) {
      // Animate the Overview off-screen when a project is selected
      gsap.to(containerRef.current, {
        x: "100%", // Move off-screen to the right
        opacity: 0,
        duration: 1, // Animation duration
        ease: "power3.inOut",
      });
    } else {
      // Animate the Overview onto the screen when no project is selected
      gsap.fromTo(
        containerRef.current,
        { x: "100%", opacity: 0 }, // Start off-screen
        {
          x: "0%", // End on-screen
          opacity: 1,
          duration: 1, // Animation duration
          ease: "power3.out",
        }
      );
    }
  }, [ShowOverview]); // Run animation on SelectedProject change

  const openProject = (projectID) => {
    setSelectedProject(projectID);
    setShowOverview(false);
    setShowProjectPage(true);
  };
  const handleToggleWorkExperience = () => toggleWorkExperience();

  return (
    <div
      ref={containerRef}
      className="z-40 absolute right-0 w-[35rem] h-screen flex flex-col justify-center items-end pr-8 bg-blue-900 bg-opacity-95 pointer-events-none rounded-l-sm opacity-0"
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-full hover:bg-indigo-800 rounded-sm pl-10"
        >
          <div
            onClick={() => openProject(project.id)}
            className="cursor-pointer mb-4 p-2 rounded-lg transition pointer-events-auto"
          >
            <h2 className="font-frantz tracking-wider text-right text-5xl font-bold hover:underline mb-1">
              {project.title}
            </h2>
            <p className="font-sans text-right text-sm text-orange-400">
              {project.role}
              {project.awards && ` | ${project.awards}`}
            </p>
          </div>
        </div>
      ))}

      {/* Return Arrow */}
      <button
        onClick={handleToggleWorkExperience}
        className="absolute bottom-4 left-5 z-30 flex items-center justify-center w-10 h-10 bg-orange-600 hover:bg-orange-400 rounded-full transition-all duration-300 group pointer-events-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-x-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Overview;
