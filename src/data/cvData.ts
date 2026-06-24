import type { CVData } from '../types';

export const cvDataES: CVData = {
  name: "Irvin Benitez",
  title: "Desarrollador de Software",
  location: "Panamá Oeste, Panamá",
  email: "Irvin.benitezs.26@gmail.com",
  phone: "+507 6361-5832",
  linkedin: "https://www.linkedin.com/in/irvin-benitez-11313231b/",
  github: "https://github.com/IrvinngB",
  instagram: "https://www.instagram.com/_irvin.gg/",
  portfolio: "https://irvincodes.dev/",
  professionalProfile: "Desarrollador Full-Stack especializado en tecnologías modernas como React, Vue.js, Django y Flask. Experto en desarrollo móvil con React Native, gestión de bases de datos e implementación de prácticas DevOps. Apasionado por crear soluciones innovadoras y eficientes.",
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
      title: "Chatbot de WhatsApp con IA (VentiBot)",
      description: "Bot personalizado de WhatsApp con respuestas inteligentes usando Gemini AI. Procesamiento de lenguaje natural, respuestas contextuales y atención al cliente automatizada 24/7.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "/proyectos/Chatbot.png",
      github: "https://github.com/IrvinngB/JIC-VentiBot",
      status: "completed"
    },
    {
      title: "Sistema IoT de Alerta para Canaletas",
      description: "Canaleta inteligente IoT con ESP32, sensores de temperatura y ultrasonido para detectar desbordes en edificios residenciales. Envía notificaciones automáticas por WhatsApp cuando detecta niveles críticos de agua.",
      technologies: ["ESP32", "IoT", "MicroPython", "WhatsApp API", "Sensores"],
      image: "/proyectos/IoT.png",
      github: "https://github.com/IrvinngB/alerta-microcotrolador",
      status: "completed"
    },
    {
      title: "Web para Empresa de Diseño Gráfico",
      description: "Sitio web profesional con sistema de login, gestión de portafolio, panel de administración y contenido dinámico. Landing page moderna optimizada para conversiones.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/IrvinngB/Pagina-Aterrizaje",
      status: "completed"
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
  github: "https://github.com/IrvinngB",
  instagram: "https://www.instagram.com/_irvin.gg/",
  portfolio: "https://irvincodes.dev/",
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
      title: "AI-Powered WhatsApp Chatbot (VentiBot)",
      description: "Custom WhatsApp bot with intelligent responses using Gemini AI. Natural language processing, contextual responses and 24/7 automated customer service.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      github: "https://github.com/IrvinngB/JIC-VentiBot",
      status: "completed"
    },
    {
      title: "IoT Gutter Alert System",
      description: "Smart IoT gutter with ESP32, temperature and ultrasonic sensors to detect overflows in residential buildings. Sends automatic WhatsApp notifications when critical water levels are detected.",
      technologies: ["ESP32", "IoT", "MicroPython", "WhatsApp API", "Sensors"],
      github: "https://github.com/IrvinngB/alerta-microcotrolador",
      status: "completed"
    },
    {
      title: "Graphic Design Company Website",
      description: "Professional website with login system, portfolio management, admin panel and dynamic content. Modern landing page optimized for conversions.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/IrvinngB/Pagina-Aterrizaje",
      status: "completed"
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

export interface ActiveProject {
  id: string
  title: string
  description: string
  tags: string[]
  status: 'building' | 'planning' | 'completed'
  url?: string
  demoUrl?: string
  lastUpdated?: string // ISO date string, e.g. "2026-06-20"
}

export const activeProjects: ActiveProject[] = [
  {
    id: 'risktrail',
    title: 'RiskTrail',
    description: 'Sistema web de evaluación dinámica de riesgo para senderismo. Integra archivos GPX, datos meteorológicos en tiempo real (Open-Meteo) y modelos biomecánicos (Minetti, Tobler-Irmischer, Pandolf) sobre PostgreSQL/PostGIS + pgRouting. Clasifica segmentos en 5 niveles de riesgo según metodología MIDE.',
    tags: ['FastAPI', 'PostGIS', 'pgRouting', 'Vue.js', 'Open-Meteo'],
    status: 'building',
    url: 'https://github.com/IrvinngB/risktrail',
    lastUpdated: '2026-06-23'
  },
  {
    id: 'ventibot-v2',
    title: 'VentiBot v2',
    description: 'WhatsApp chatbot con IA, integración RAG y flujos conversacionales avanzados.',
    tags: ['Python', 'WhatsApp API', 'OpenAI', 'RAG'],
    status: 'building',
    url: 'https://github.com/IrvinngB/JIC-VentiBot',
    lastUpdated: '2026-06-20'
  },
  {
    id: 'iot-monitoreo',
    title: 'Sistema IoT de Monitoreo',
    description: 'Plataforma de alerta temprana con microcontroladores y dashboard en tiempo real.',
    tags: ['IoT', 'ESP32', 'MQTT', 'React'],
    status: 'planning',
    url: 'https://github.com/IrvinngB/alerta-microcotrolador',
    lastUpdated: '2026-06-15'
  }
]
