import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProjectPage = ({ project, SelectedProject, setSelectedProject }) => {
  const closePage = () => {
    setSelectedProject(-1);
  };

  if (SelectedProject === -1) return null;

  return (
    <div
      className="z-20 absolute w-screen h-screen bg-black bg-cover bg-center bg-opacity-85"
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
          <h1 className="font-frantz text-4xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg mb-4">{project.description}</p>
          <div className="border-b border-gray-400 my-4"></div>
          <p className="uppercase text-sm tracking-wider mb-2">
            {project.role} {project.awards && ` | ${project.awards}`}
          </p>
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
        <div className="absolute bottom-4 right-4 flex space-x-4">
          {project.caseStudy && (
            <Link
              href={project.caseStudy}
              target="_blank"
              className="text-gray-300 hover:underline text-lg pointer-events-auto"
            >
              Case Study
            </Link>
          )}
          {project.website && (
            <Link
              href={project.website}
              target="_blank"
              className="text-gray-300 hover:underline text-lg pointer-events-auto"
            >
              Website
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
