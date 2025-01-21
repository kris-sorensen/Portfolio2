"use client";
import React, { useEffect, useState } from "react";
import Overview from "./components/Overview/Overview";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import useStore from "@/app/store/useStore";
import { projects } from "./data/portfolio.data";
import { PortfolioProps } from "./types/portfolio.types";

const Portfolio: React.FC = () => {
  const ShowWorkExperience = useStore(
    (state: PortfolioProps) => state.ShowWorkExperience
  );
  const [SelectedProject, setSelectedProject] = useState<number>(-1);
  const [ShowOverview, setShowOverview] = useState<boolean>(false);
  const [ShowProjectPage, setShowProjectPage] = useState<boolean>(false);

  // Reset SelectedProject when ShowWorkExperience changes
  useEffect(() => {
    if (!ShowWorkExperience) {
      setSelectedProject(-1);
      setShowOverview(false);
    } else {
      setShowOverview(true);
    }
  }, [ShowWorkExperience]);

  return (
    <div className="w-screen h-screen z-20 select-none">
      <Overview
        projects={projects}
        setSelectedProject={setSelectedProject}
        ShowOverview={ShowOverview}
        setShowOverview={setShowOverview}
        setShowProjectPage={setShowProjectPage}
      />
      <ProjectPage
        project={projects[SelectedProject] ?? null}
        setSelectedProject={setSelectedProject}
        setShowOverview={setShowOverview}
        ShowProjectPage={ShowProjectPage}
        setShowProjectPage={setShowProjectPage}
      />
    </div>
  );
};

export default Portfolio;
