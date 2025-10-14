import type { CVData } from '../types';

export const cvDataES: CVData = {
  name: "Irvin Benitez",
  title: "Desarrollador de Software",
  location: "Panamá Oeste, Panamá",
  email: "Irvin.benitezs.26@gmail.com",
  phone: "+507 6361-5832",
  linkedin: "https://linkedin.com/in/irvin-benitez",
  portfolio: "https://irvin-portfolio.com",
  professionalProfile: "Desarrollador Full-Stack especializado en tecnologías modernas como React, Vue.js, Django y Flask. Experto en desarrollo móvil con React Native, gestión de bases de datos y implementación de prácticas DevOps. Apasionado por crear soluciones innovadoras y eficientes.",
  workExperience: [
    {
      position: "Desarrollador Full-Stack",
      company: "Universidad Tecnológica de Panamá",
      duration: "Abril 2025 – Presente",
      description: "Desarrollo de sistema científico con Django y PostgreSQL. Implemento funcionalidades de investigación, integración ORCID y generación automatizada de informes internacionales."
    },
    {
      position: "Desarrollador Full-Stack (Pasantía)",
      company: "Universidad Tecnológica de Panamá",
      duration: "Febrero – Marzo 2025",
      description: "Plataforma web de gestión de mantenimiento con Flask, Vue.js y MariaDB. Gestión de solicitudes, mantenimientos preventivos y control de inventario."
    }
  ],
  projects: [
    {
      title: "Chatbot de WhatsApp Impulsado con Inteligencia Artificial",
      description: "Desarrollo de un bot personalizado de WhatsApp con respuestas inteligentes y adaptadas, utilizando la API de Gemini AI. Integración de funciones avanzadas para ofrecer atención al cliente eficiente y personalizada, con capacidad de procesamiento de lenguaje natural y respuestas contextuales.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "/proyectos/Chatbot.png"
    },
    {
      title: "Página Web para Empresa de Diseño Gráfico",
      description: "Creación de una página web completa para una empresa de diseño gráfico, utilizando PHP y MySQL. Incluye funcionalidades como sistema de inicio de sesión y registro de usuarios, gestión de servicios y portafolio, y un panel de administración completo para manejar contenido, usuarios y servicios ofrecidos.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      image: "/proyectos/Webside.png"
    }
  ],
  education: [
    {
      degree: "Licenciatura en Desarrollo y Gestión de Software",
      institution: "Universidad Tecnológica de Panamá",
      duration: "Marzo 2023 – Diciembre 2026"
    }
  ],
  technicalSkills: {
    frontend: ["React", "Next.js", "Vue.js", "React Native", "TypeScript"],
    backend: ["Django", "Flask", "Python", "PHP", "Laravel"],
    databases: ["PostgreSQL", "MySQL", "MariaDB", "SQLite", "SQL Server"],
    tools: ["Git/GitHub", "Docker", "CI/CD", "Jupyter Notebook"],
    dataAnalysis: ["Pandas", "DataBricks"],
    design: ["Figma", "UI/UX", "Principios MVC", "UML"],
    methodologies: ["Scrum", "DevSecOps", "Gestión de proyectos (Jira)"],
    languages: ["Español (Nativo)", "Inglés (Intermedio)"]
  },
  interpersonalSkills: [
    "Resolución de problemas",
    "Trabajo en equipo",
    "Adaptabilidad",
    "Gestión del tiempo",
    "Creatividad",
    "Comunicación efectiva",
    "Aprendizaje continuo"
  ]
};

export const cvDataEN: CVData = {
  name: "Irvin Benitez",
  title: "Software Developer",
  location: "Panamá Oeste, Panama",
  email: "Irvin.benitezs.26@gmail.com",
  phone: "+507 6361-5832",
  linkedin: "https://www.linkedin.com/in/irvin-benitez-11313231b/",
  portfolio: "https://irvin-benitez.software/",
  professionalProfile: "Full-Stack Developer specialized in modern technologies like React, Vue.js, Django, and Flask. Expert in mobile development with React Native, database management, and DevOps implementation. Passionate about creating innovative and efficient solutions.",
  workExperience: [
    {
      position: "Full-Stack Developer",
      company: "Technological University of Panama",
      duration: "April 2025 – Present",
      description: "Scientific system development with Django and PostgreSQL. Implement research functionalities, ORCID integration, and automated international reporting."
    },
    {
      position: "Full-Stack Developer (Internship)",
      company: "Technological University of Panama", 
      duration: "February – March 2025",
      description: "Web maintenance management platform with Flask, Vue.js, and MariaDB. Request management, preventive maintenance, and inventory control."
    }
  ],
  projects: [
    {
      title: "AI-Powered WhatsApp Chatbot",
      description: "Development of a custom WhatsApp bot with intelligent and adaptive responses, using the Gemini AI API. Integration of advanced features to provide efficient and personalized customer service, with natural language processing capabilities and contextual responses.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "/proyectos/Chatbot.png"
    },
    {
      title: "Website for Graphic Design Company",
      description: "Creation of a complete website for a graphic design company, using PHP and MySQL. Includes functionalities such as user login and registration system, service and portfolio management, and a comprehensive administration panel to manage content, users, and offered services.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      image: "/src/assets/images/project2.jpg"
    }
  ],
  education: [
    {
      degree: "Bachelor's Degree in Software Development and Management",
      institution: "Technological University of Panama",
      duration: "March 2023 – December 2026"
    }
  ],
  technicalSkills: {
    frontend: ["React", "Next.js", "Vue.js", "React Native", "TypeScript"],
    backend: ["Django", "Flask", "Python", "PHP", "Laravel"],
    databases: ["PostgreSQL", "MySQL", "MariaDB", "SQLite", "SQL Server"],
    tools: ["Git/GitHub", "Docker", "CI/CD", "Jupyter Notebook"],
    dataAnalysis: ["Pandas", "DataBricks"],
    design: ["Figma", "UI/UX", "MVC Principles", "UML"],
    methodologies: ["Scrum", "DevSecOps", "Project management (Jira)"],
    languages: ["Spanish (Native)", "English (Intermediate)"]
  },
  interpersonalSkills: [
    "Problem-solving",
    "Teamwork",
    "Adaptability",
    "Time management",
    "Creativity",
    "Effective communication",
    "Continuous learning"
  ]
};