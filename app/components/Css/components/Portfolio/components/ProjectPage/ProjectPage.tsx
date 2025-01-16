import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

const ProjectPage = ({
  project,
  SelectedProject,
  setSelectedProject,
  setShowOverview,
  ShowProjectPage,
  setShowProjectPage,
}) => {
  const containerRef = useRef(null);

  const closePage = () => {
    setShowOverview(true);
    setShowProjectPage(false);
  };

  useEffect(() => {
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
        onComplete: () => {
          setSelectedProject(-1);
        },
      });
    }
  }, [ShowProjectPage]);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="z-50 absolute w-screen h-screen bg-black bg-cover bg-center bg-opacity-85"
      style={{ backgroundImage: `url('/path-to-your-background-image.jpg')` }}
    >
      {/* Close Button */}
      <button
        onClick={closePage}
        className="absolute top-4 left-4 z-20 text-white font-bold py-2 px-4 rounded pointer-events-auto cursor-pointer"
      >
        <svg width="192" height="61" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M190.67 59.618c-3.755-6.474-8.055-8.114-15.08-12.037-29.012-16.203-60.856-27.41-93.698-33.032-23.62-4.042-47.563-3.598-70.249 3.098.924 1.042 2.057.631 3.013 1.476.703.62 1.135 1.93 1.81 2.68 1.814 2.007 10 9.118 12.865 7.498-2.329-1.766-5.88-3.105-8.504-4.314-5.608-2.583-11.812-7.142-17.819-8.491 2.17-2.823 19.724-19.765 22.96-12.718"
            stroke="#FFF"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Main Content */}
      <div className="p-8 flex items-center justify-between h-full">
        {/* Left Section */}
        <div className="max-w-[50%] text-white pr-8">
          <h1 className="font-sans text-4xl font-bold mb-4">{project.title}</h1>
          <p className="font-sans uppercase text-sm tracking-wider mb-2">
            {project.role} {project.awards && ` | ${project.awards}`}
          </p>
          <div className="border-b border-gray-400 my-4"></div>
          <p className="font-sans text-lg mb-4">{project.description}</p>
        </div>

        {/* Right Section */}
        <div className="relative w-[50%] h-full">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="contain"
              loading="eager"
            />
          )}
        </div>

        {/* Bottom-Right Links */}
        <div className="font-sans absolute bottom-4 right-4 flex space-x-4">
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              target="_blank"
              className="text-gray-300 hover:underline text-lg pointer-events-auto flex items-center group"
            >
              Case Study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:scale-x-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H7"
                />
              </svg>
            </Link>
          )}
          {project.website && (
            <Link
              href={project.website}
              target="_blank"
              className="text-gray-300 hover:underline text-lg pointer-events-auto flex items-center group"
            >
              Website
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1 transform -rotate-45 transition-transform duration-300 group-hover:scale-x-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H7"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
