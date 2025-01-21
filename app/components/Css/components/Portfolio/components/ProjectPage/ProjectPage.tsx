import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ProjectPageProps } from "../../types/portfolio.types";

const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  setSelectedProject,
  setShowOverview,
  ShowProjectPage,
  setShowProjectPage,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const closePage = () => {
    setShowOverview(true);
    setShowProjectPage(false);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (ShowProjectPage) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, delay: 1, duration: 2, ease: "power3.out" }
      );
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.75,
        ease: "power3.in",
        onComplete: () => setSelectedProject(-1),
      });
    }
  }, [ShowProjectPage]);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="z-50 absolute w-screen h-screen bg-black bg-opacity-85"
    >
      {/* Close Button */}
      <button
        onClick={closePage}
        className="absolute top-4 left-4 z-20 text-white font-bold py-2 px-4 rounded pointer-events-auto cursor-pointer"
      >
        Close
      </button>
      {/* Main Content */}
      <div className="p-8 flex items-center justify-between h-full">
        <div className="max-w-[50%] text-white pr-8">
          <h1 className="font-sans text-4xl font-bold mb-4">{project.title}</h1>
          <p className="font-sans uppercase text-sm tracking-wider mb-2">
            {project.role} {project.awards && ` | ${project.awards}`}
          </p>
          <p className="font-sans text-lg mb-4">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
