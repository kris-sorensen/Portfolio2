import React from "react";
import Link from "next/link";

const ProjectPage = ({ project, SelectedProject, setSelectedProject }) => {
  const closePage = () => {
    setSelectedProject(-1);
  };

  if (SelectedProject === -1) return null;

  return (
    <div className="z-20 absolute w-screen h-screen bg-black pointer-events-auto">
      <button
        onClick={closePage}
        className="absolute top-4 left-4 z-20 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
      >
        Close
      </button>
      <div className="p-4 flex items-center justify-center h-full text-center">
        <div>
          <h1 className="text-xl font-bold text-white">{project.title}</h1>
          <p className="text-white">{project.role}</p>
          {project.awards && (
            <p className="text-white">Awards: {project.awards}</p>
          )}
          {project.caseStudy && (
            <p className="text-white">
              Case Study:{" "}
              <Link
                href={project.caseStudy}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                View Case Study
              </Link>
            </p>
          )}
          {project.website && (
            <p className="text-white">
              Website:{" "}
              <Link
                href={project.website}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                Visit Website
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
