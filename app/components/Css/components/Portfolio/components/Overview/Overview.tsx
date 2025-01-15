import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Overview = ({
  projects,
  SelectedProject,
  setSelectedProject,
  ShowOverview,
  setShowOverview,
}) => {
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
  };

  return (
    <div
      ref={containerRef}
      className="z-20 absolute right-0 w-1/3 h-screen flex flex-col justify-center items-end pr-8 bg-blue-900 bg-opacity-95 pointer-events-none rounded-l-sm opacity-0"
    >
      {projects.map((project) => (
        <div key={project.id} className="w-full hover:bg-gray-500 rounded-sm">
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
    </div>
  );
};

export default Overview;
