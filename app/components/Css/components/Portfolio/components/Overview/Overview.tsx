import React from "react";

const Overview = ({ projects, SelectedProject, setSelectedProject }) => {
  const openProject = (projectID: number) => {
    setSelectedProject(projectID);
  };

  if (SelectedProject >= 0) return null; // Only show if no project is selected

  return (
    <div className="z-20 absolute right-0 w-1/3 h-screen flex flex-col justify-center items-end pr-8">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => openProject(project.id)}
          className="cursor-pointer mb-4 hover:bg-gray-100 p-2 rounded-lg transition pointer-events-auto"
        >
          <h2 className="text-right text-lg font-bold hover:underline">
            {project.title}
          </h2>
          <p className="text-right text-sm text-gray-600">
            {project.role} | {project.awards}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
