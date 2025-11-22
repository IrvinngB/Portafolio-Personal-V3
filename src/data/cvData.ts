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
    },
    {
      position: "Desarrollador Freelance",
      company: "Independiente",
      duration: "2024 – Presente",
      description: "Desarrollo de proyectos personalizados utilizando tecnologías modernas como Vue.js, React, Laravel, PHP, entre otras. Colaboro con clientes en la creación de soluciones web completas, desde el diseño hasta la implementación y mantenimiento."
    }
  ],
  projects: [
    {
      title: "Chatbot de WhatsApp Impulsado con Inteligencia Artificial",
      description: "Desarrollo de un bot personalizado de WhatsApp con respuestas inteligentes y adaptadas, utilizando la API de Gemini AI. Integración de funciones avanzadas para ofrecer atención al cliente eficiente y personalizada, con capacidad de procesamiento de lenguaje natural y respuestas contextuales.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "./proyectos/Chatbot.png"
    },
    {
      title: "Página Web para Empresa de Diseño Gráfico",
      description: "Creación de una página web completa para una empresa de diseño gráfico, utilizando PHP y MySQL. Incluye funcionalidades como sistema de inicio de sesión y registro de usuarios, gestión de servicios y portafolio, y un panel de administración completo para manejar contenido, usuarios y servicios ofrecidos.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      image: "./proyectos/Webside.jpg"
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
  ],
  aboutMe: {
    description: [
      "Soy un desarrollador Full Stack apasionado por crear soluciones que realmente importen. No solo escribo código, construyo experiencias digitales que resuelven problemas reales y mejoran la vida de las personas.",
      "Mi enfoque va más allá de la implementación técnica: me preocupo por el rendimiento, la accesibilidad, la escalabilidad y la experiencia del usuario. Cada proyecto es una oportunidad para aprender algo nuevo y superar los límites de lo posible.",
      "Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, trabajando en proyectos personales o escuchando música."
    ],
    motivation: {
      title: "Lo que me motiva",
      description: "Ver cómo mi código mejora la vida de las personas. Cada línea que escribo es una oportunidad para hacer el mundo digital un poco mejor, más rápido y más accesible."
    },
    values: [
      {
        title: "Innovación Constante",
        description: "Siempre explorando nuevas tecnologías y mejores prácticas. Me mantengo actualizado con las últimas tendencias del desarrollo web.",
        icon: "Rocket"
      },
      {
        title: "Orientado a Resultados",
        description: "El código debe resolver problemas, no crearlos. Me enfoco en entregar soluciones que generen valor real y medible.",
        icon: "Target"
      },
      {
        title: "Trabajo en Equipo",
        description: "Colaboración y comunicación clara son clave. Disfruto trabajando con equipos multidisciplinarios y compartiendo conocimientos.",
        icon: "Users"
      }
    ]
  },
  skillsDetails: {
    descriptions: {
      frontend: "Me encanta crear interfaces interactivas y llevar ideas a la vida en el navegador.",
      backend: "Disfruto construyendo la lógica del servidor y arquitecturas robustas.",
      databases: "Experto en diseño y optimización de bases de datos eficientes.",
      tools: "Domino herramientas modernas para desarrollo y diseño profesional."
    },
    labels: {
      frontend: "Tecnologías que uso",
      backend: "Lenguajes que domino",
      databases: "Bases de datos",
      tools: "Herramientas favoritas"
    }
  }
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
    },
    {
      position: "Freelance Developer",
      company: "Independent",
      duration: "2024 – Present",
      description: "Development of custom projects using modern technologies such as Vue.js, React, Laravel, PHP, among others. Collaborate with clients in creating complete web solutions, from design to implementation and maintenance."
    }
  ],
  projects: [
    {
      title: "AI-Powered WhatsApp Chatbot",
      description: "Development of a custom WhatsApp bot with intelligent and adaptive responses, using the Gemini AI API. Integration of advanced features to provide efficient and personalized customer service, with natural language processing capabilities and contextual responses.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "./proyectos/Chatbot.png"
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
  ],
  aboutMe: {
    description: [
      "I'm a Full Stack developer passionate about creating solutions that truly matter. I don't just write code, I build digital experiences that solve real problems and improve people's lives.",
      "My approach goes beyond technical implementation: I care about performance, accessibility, scalability and user experience. Every project is an opportunity to learn something new and push the boundaries of what's possible.",
      "When I'm not coding, you'll find me exploring new technologies, working on personal projects, or listening to music."
    ],
    motivation: {
      title: "What drives me",
      description: "Seeing how my code improves people's lives. Every line I write is an opportunity to make the digital world a little better, faster and more accessible."
    },
    values: [
      {
        title: "Constant Innovation",
        description: "Always exploring new technologies and best practices. I stay updated with the latest web development trends.",
        icon: "Rocket"
      },
      {
        title: "Results Oriented",
        description: "Code should solve problems, not create them. I focus on delivering solutions that generate real and measurable value.",
        icon: "Target"
      },
      {
        title: "Teamwork",
        description: "Collaboration and clear communication are key. I enjoy working with multidisciplinary teams and sharing knowledge.",
        icon: "Users"
      }
    ]
  },
  skillsDetails: {
    descriptions: {
      frontend: "I love creating interactive interfaces and bringing ideas to life in the browser.",
      backend: "I enjoy building server logic and robust architectures.",
      databases: "Expert in designing and optimizing efficient databases.",
      tools: "I master modern tools for professional development and design."
    },
    labels: {
      frontend: "Technologies I use",
      backend: "Languages I master",
      databases: "Databases",
      tools: "Favorite tools"
    }
  }
};