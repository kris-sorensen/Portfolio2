"use client";
import React, { useEffect, useState } from "react";
import Overview from "./components/Overview/Overview";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import useStore from "@/app/store/useStore";
import { projects } from "./data/portfolio.data";

const Portfolio = () => {
  const ShowWorkExperience = useStore((state) => state.ShowWorkExperience);
  const [SelectedProject, setSelectedProject] = useState(-1);
  const [ShowOverview, setShowOverview] = useState(false);
  const [ShowProjectPage, setShowProjectPage] = useState(false);

  // Reset SelectedProject to -1 when ShowWorkExperience changes to false
  useEffect(() => {
    if (!ShowWorkExperience) {
      setSelectedProject(-1);
      setShowOverview(false);
    } else {
      setShowOverview(true);
    }
  }, [ShowWorkExperience]);

  // Hide or show the Portfolio content based on ShowWorkExperience
  return (
    <div className={`w-screen h-screen z-20 select-none`}>
      {/* <div
        className="z-20 absolute w-screen h-screen bg-black bg-cover bg-center bg-opacity-45"
        style={{ backgroundImage: `url('/path-to-your-background-image.jpg')` }}
      > */}
      <Overview
        projects={projects}
        setSelectedProject={setSelectedProject}
        ShowOverview={ShowOverview}
        setShowOverview={setShowOverview}
        setShowProjectPage={setShowProjectPage}
      />
      <ProjectPage
        project={projects[SelectedProject]}
        SelectedProject={SelectedProject}
        setSelectedProject={setSelectedProject}
        setShowOverview={setShowOverview}
        ShowProjectPage={ShowProjectPage}
        setShowProjectPage={setShowProjectPage}
      />
      {/* </div> */}
    </div>
  );
};

export default Portfolio;
