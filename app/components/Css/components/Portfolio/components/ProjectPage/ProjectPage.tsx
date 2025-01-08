import React from "react";

const ProjectPage = ({ project, SelectedProject, setSelectedProject }) => {
  const closePage = () => {
    setSelectedProject(-1);
  };
  if (SelectedProject === -1) return null;
  return <div className="z-20 absolute">{project.id}</div>;
};

export default ProjectPage;
