export interface CVData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolio?: string;
  professionalProfile: string;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  technicalSkills: TechnicalSkills;
  interpersonalSkills: string[];
  aboutMe?: {
    description: string[];
    motivation: {
      title: string;
      description: string;
    };
    values: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  skillsDetails?: {
    descriptions: {
      frontend: string;
      backend: string;
      databases: string;
      tools: string;
    };
    labels: {
      frontend: string;
      backend: string;
      databases: string;
      tools: string;
    };
  };
}

export interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  image?: string;
  url?: string;
  github?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface TechnicalSkills {
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
  dataAnalysis: string[];
  design: string[];
  methodologies: string[];
  languages: string[];
}

export type Language = 'es' | 'en';