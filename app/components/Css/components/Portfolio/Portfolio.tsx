import React, { useState } from "react";
import Overview from "./components/Overview/Overview";
import ProjectPage from "./components/ProjectPage/ProjectPage";

const projects = [
  {
    title: "Warner Brothers (Scooby Doo) AI Experience",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/scooby-doo.jpg",
    caseStudy:
      "https://www.groovejones.com/scooby-doo-character-studio-an-interactive-customized-collectible-e-commerce-experience",
    website: "https://scoobydoo.characterstudio.com/",
    id: 0,
  },
  {
    title: "FuelCell Energy WebGL Walkthrough",
    role: "Lead Frontend Developer",
    awards: "GOLD 2024 Horizon Interactive Awards",
    image: "/images/fuelcell.jpg",
    caseStudy:
      "https://www.groovejones.com/using-webgl-for-co2-recovery-walkthrough",
    website: "https://go.fuelcellenergy.com/carbon-recovery-walkthrough",
    id: 1,
  },
  {
    title: "Toyota Crown 3D Virtual Showroom",
    role: "Lead Frontend Developer",
    awards: "Winner of 13 Industry Awards",
    image: "/images/toyota-crown.jpg",
    caseStudy:
      "https://www.groovejones.com/toyota-crown-webgl-interactive-experience",
    website: "https://dijgcc9z3yval.cloudfront.net/",
    id: 2,
  },
  {
    title: "Toyota Mirai 3D Virtual Showroom",
    role: "Advisor",
    awards: "PLATINUM 2024 MUSE Creative Awards",
    image: "/images/toyota-mirai.jpg",
    caseStudy: "https://www.groovejones.com/toyota-mirai-webgl",
    website: "https://toyotamirai.groove-tech.com/",
    id: 3,
  },
  {
    title: "University of South Florida 3D/AR Remembrance Experience",
    role: "Lead Frontend Developer",
    awards:
      "GOLD 2023 Vega Digital Awards, PLATINUM 2023 Hermes Creative Awards",
    image: "/images/usf-remembrance.jpg",
    caseStudy:
      "https://www.groovejones.com/journey-to-revive-zion-cemetery-through-immersive-technology",
    website: "https://zioncemeteryremembrance.com/",
    id: 4,
  },
  {
    title: "Hoosier Lottery Flurry of Fun Holiday AR Experience",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/hoosier-lottery.jpg",
    caseStudy:
      "https://www.groovejones.com/hoosier-lottery-flurry-of-fun-holiday-ar-experience",
    website: "",
    id: 5,
  },
  {
    title: "BAYER Crop Science AR Experience",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/bayer-crop.jpg",
    caseStudy:
      "https://www.groovejones.com/bayer-crop-science-group-leverages-ar-for-weather-damage-demonstration-to-corn-crops",
    website: "",
    id: 6,
  },
];

const Portfolio = () => {
  const [SelectedProject, setSelectedProject] = useState(-1); // * -1 means show all projects, Anything above is a selected Project and should show a specific Project

  return (
    <div className="w-screen h-screen z-20">
      <Overview
        projects={projects}
        SelectedProject={SelectedProject}
        setSelectedProject={setSelectedProject}
      />
      <ProjectPage
        project={projects[SelectedProject]}
        SelectedProject={SelectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
};

export default Portfolio;
