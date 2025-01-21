export interface Project {
  id: number;
  title: string;
  role: string;
  awards?: string;
  description: string;
  image?: string;
  website?: string;
  caseStudy?: string;
}

export interface OverviewProps {
  projects: Project[];
  setSelectedProject: (id: number) => void;
  ShowOverview: boolean;
  setShowOverview: (show: boolean) => void;
  setShowProjectPage: (show: boolean) => void;
}

export interface ProjectPageProps {
  project: Project | null;
  setSelectedProject: (id: number) => void;
  setShowOverview: (show: boolean) => void;
  ShowProjectPage: boolean;
  setShowProjectPage: (show: boolean) => void;
}

export interface PortfolioProps {
  ShowWorkExperience: boolean;
}
