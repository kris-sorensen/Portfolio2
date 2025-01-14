import React from "react";

const Overview = ({ projects, SelectedProject, setSelectedProject }) => {
  const openProject = (projectID: number) => {
    setSelectedProject(projectID);
  };

  if (SelectedProject >= 0) return null; // Only show if no project is selected

  return (
    <div className="z-20 absolute right-0 w-1/3 h-screen flex flex-col justify-center items-end pr-8 bg-blue-900 bg-opacity-95 pointer-events-none rounded-l-sm">
      {projects.map((project) => (
        <div className="w-full hover:bg-gray-500 rounded-sm">
          <div
            key={project.id}
            onClick={() => openProject(project.id)}
            className="cursor-pointer mb-4  p-2 rounded-lg transition pointer-events-auto "
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
