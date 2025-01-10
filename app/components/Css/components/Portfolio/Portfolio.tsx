import React, { useState } from "react";
import Overview from "./components/Overview/Overview";
import ProjectPage from "./components/ProjectPage/ProjectPage";

const projects = [
  {
    title: "Warner Brothers (Scooby Doo) AI Experience",
    description: "",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/scoobydoo.webp",
    caseStudy:
      "https://www.groovejones.com/scooby-doo-character-studio-an-interactive-customized-collectible-e-commerce-experience",
    website: "https://scoobydoo.characterstudio.com/",
    id: 0,
  },
  {
    title: "FuelCell Energy WebGL Walkthrough",
    description: "",
    role: "Lead Frontend Developer",
    awards: "GOLD 2024 Horizon Interactive Awards",
    image: "/images/fuelcell.webp",
    caseStudy:
      "https://www.groovejones.com/using-webgl-for-co2-recovery-walkthrough",
    website: "https://go.fuelcellenergy.com/carbon-recovery-walkthrough",
    id: 1,
  },
  {
    title: "Toyota Crown 3D Virtual Showroom",
    description: "",
    role: "Lead Frontend Developer",
    awards: "Winner of 13 Industry Awards",
    image: "/images/crown.webp",
    caseStudy:
      "https://www.groovejones.com/toyota-crown-webgl-interactive-experience",
    website: "https://dijgcc9z3yval.cloudfront.net/",
    id: 2,
  },
  {
    title: "Toyota Mirai 3D Virtual Showroom",
    description: "",
    role: "Advisor",
    awards:
      "PLATINUM 2024 MUSE Creative Awards, GOLD 2025 HORIZON INTERACTIVE AWARDS",
    image: "/images/mirai.webp",
    caseStudy: "https://www.groovejones.com/toyota-mirai-webgl",
    website: "https://toyotamirai.groove-tech.com/",
    id: 3,
  },
  {
    title: "University of South Florida 3D/AR Remembrance Experience",
    description: "",
    role: "Lead Frontend Developer",
    awards:
      "GOLD 2023 Vega Digital Awards, PLATINUM 2023 Hermes Creative Awards",
    image: "/images/usf.webp",
    caseStudy:
      "https://www.groovejones.com/journey-to-revive-zion-cemetery-through-immersive-technology",
    website: "https://zioncemeteryremembrance.com/",
    id: 4,
  },
  {
    title: "Hoosier Lottery Flurry of Fun Holiday AR Experience",
    description: "",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/hoosier.webp",
    caseStudy:
      "https://www.groovejones.com/hoosier-lottery-flurry-of-fun-holiday-ar-experience",
    website: "",
    id: 5,
  },
  {
    title: "BAYER Crop Science AR Experience",
    description: "",
    role: "Lead Frontend Developer",
    awards: "",
    image: "/images/bayer.webp",
    caseStudy:
      "https://www.groovejones.com/bayer-crop-science-group-leverages-ar-for-weather-damage-demonstration-to-corn-crops",
    website: "",
    id: 6,
  },
];

const Portfolio = () => {
  const [SelectedProject, setSelectedProject] = useState(-1); // * -1 means show all projects, Anything above is a selected Project and should show a specific Project

  return (
    <div className="w-screen h-screen z-20 select-none">
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
