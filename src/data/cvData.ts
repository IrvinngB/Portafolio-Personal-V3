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
      title: "RiskTrail — Evaluación Dinámica de Riesgo en Senderismo",
      description: "Sistema web de evaluación dinámica de riesgo para senderismo en Panamá. Integra archivos GPX, datos meteorológicos en tiempo real (Open-Meteo) y modelos biomecánicos (Minetti, Tobler-Irmischer, Pandolf) sobre PostgreSQL/PostGIS + pgRouting. Clasifica segmentos en 5 niveles de riesgo según metodología MIDE.",
      technologies: ["FastAPI", "PostGIS", "pgRouting", "Vue.js", "Open-Meteo", "Python"],
      url: "https://risktrail.irvincodes.dev/",
      problem: "Quien sale a hacer senderismo en Panamá no tiene cómo saber qué tan riesgoso es un sendero según su terreno y el clima de ese día.",
      category: "geo",
      featured: true,
      highlights: [
        "Ingesta de rutas GPX y análisis espacial con PostGIS + pgRouting",
        "Clima en tiempo real desde Open-Meteo por segmento",
        "Modelos biomecánicos Minetti, Tobler-Irmischer y Pandolf",
        "Clasificación en 5 niveles de riesgo según MIDE"
      ],
      status: "active"
    },
    {
      title: "Chatbot de WhatsApp con IA (VentiBot)",
      description: "Bot personalizado de WhatsApp con respuestas inteligentes usando Gemini AI. Procesamiento de lenguaje natural, respuestas contextuales y atención al cliente automatizada 24/7.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      image: "/proyectos/Chatbot.png",
      github: "https://github.com/IrvinngB/JIC-VentiBot",
      problem: "Responder por WhatsApp a toda hora le quita a un negocio pequeño tiempo que no tiene.",
      category: "ai",
      status: "completed"
    },
    {
      title: "Sistema IoT de Alerta para Canaletas",
      description: "Canaleta inteligente IoT con ESP32, sensores de temperatura y ultrasonido para detectar desbordes en edificios residenciales. Envía notificaciones automáticas por WhatsApp cuando detecta niveles críticos de agua.",
      technologies: ["ESP32", "IoT", "MicroPython", "WhatsApp API", "Sensores"],
      github: "https://github.com/IrvinngB/alerta-microcotrolador",
      problem: "Las canaletas de un edificio se desbordan sin aviso y nadie se entera hasta que ya hay daños.",
      category: "iot",
      status: "completed"
    },
    {
      title: "Web para Empresa de Diseño Gráfico",
      description: "Sitio web profesional con sistema de login, gestión de portafolio, panel de administración y contenido dinámico. Landing page moderna optimizada para conversiones.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/IrvinngB/Pagina-Aterrizaje",
      problem: "Una empresa de diseño gráfico necesitaba mostrar su trabajo y captar clientes con un sitio propio que pudiera administrar.",
      category: "web",
      status: "completed"
    }
  ],
  freelanceClients: [
    {
      name: "Jornada de Iniciación Científica (JIC)",
      kind: "Plataforma de evento · UTP",
      summary: "Iniciativa de la Universidad Tecnológica de Panamá que desde 2002 fomenta la investigación entre estudiantes de grado. Hoy es el principal evento de investigación juvenil del país.",
      contributions: ["Mantenimiento de la plataforma", "Nuevos módulos", "Ajustes de seguridad", "Mejoras de trazabilidad"]
    },
    {
      name: "FlexWMS",
      kind: "Sistema WMS",
      summary: "Sistema de gestión de bodegas (WMS) para controlar inventario y operaciones de almacén.",
      contributions: ["Corrección de bugs", "Nuevos módulos generales"]
    },
    {
      name: "LCDM",
      kind: "WMS personalizado",
      summary: "Versión personalizada de FlexWMS adaptada a la operación del cliente LCDM.",
      contributions: ["Módulos exclusivos para el cliente"]
    },
    {
      name: "PGT Logistics",
      kind: "App de pedidos y delivery",
      summary: "Aplicación de pedidos y entregas a domicilio.",
      contributions: ["Mejoras a la app", "Integración de APIs", "Colaboración en el módulo de delivery"]
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
    methodologies: ["Scrum", "DevSecOps", "Spec-Driven Development (SDD)", "Desarrollo asistido por IA", "Gestión de proyectos (Jira)"],
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
    // Drop a portrait in public/ and set: photo: "/me.jpg",
    description: [
      "Soy Irvin. Estudio Desarrollo y Gestión de Software en la Universidad Tecnológica de Panamá y desde 2024 hago proyectos freelance para clientes.",
      "Hoy trabajo en la UTP como desarrollador full stack en un sistema científico hecho con Django y PostgreSQL. En paralelo construyo RiskTrail, una herramienta para saber qué tan riesgoso es un sendero antes de salir.",
      "Fuera del código, me encontrarás explorando nuevas tecnologías, trabajando en proyectos personales o escuchando música."
    ]
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
      title: "RiskTrail — Dynamic Hiking Risk Assessment",
      description: "Web-based dynamic risk assessment system for hiking trails in Panama. Integrates GPX files, real-time weather data (Open-Meteo), and validated biomechanical models (Minetti, Tobler-Irmischer, Pandolf) on PostgreSQL/PostGIS + pgRouting. Classifies trail segments into 5 risk levels per MIDE methodology.",
      technologies: ["FastAPI", "PostGIS", "pgRouting", "Vue.js", "Open-Meteo", "Python"],
      url: "https://risktrail.irvincodes.dev/",
      problem: "Hikers in Panama have no way to know how risky a trail is given its terrain and that day's weather.",
      category: "geo",
      featured: true,
      highlights: [
        "GPX ingestion and spatial analysis with PostGIS + pgRouting",
        "Real-time weather from Open-Meteo per segment",
        "Minetti, Tobler-Irmischer and Pandolf biomechanical models",
        "5-level risk classification following MIDE"
      ],
      status: "active"
    },
    {
      title: "AI-Powered WhatsApp Chatbot (VentiBot)",
      description: "Custom WhatsApp bot with intelligent responses using Gemini AI. Natural language processing, contextual responses and 24/7 automated customer service.",
      technologies: ["Python", "Gemini AI", "WhatsApp API", "NLP"],
      github: "https://github.com/IrvinngB/JIC-VentiBot",
      problem: "Answering WhatsApp messages around the clock takes time a small business doesn't have.",
      category: "ai",
      status: "completed"
    },
    {
      title: "IoT Gutter Alert System",
      description: "Smart IoT gutter with ESP32, temperature and ultrasonic sensors to detect overflows in residential buildings. Sends automatic WhatsApp notifications when critical water levels are detected.",
      technologies: ["ESP32", "IoT", "MicroPython", "WhatsApp API", "Sensors"],
      github: "https://github.com/IrvinngB/alerta-microcotrolador",
      problem: "Building gutters overflow without warning, and nobody notices until there is damage.",
      category: "iot",
      status: "completed"
    },
    {
      title: "Graphic Design Company Website",
      description: "Professional website with login system, portfolio management, admin panel and dynamic content. Modern landing page optimized for conversions.",
      technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/IrvinngB/Pagina-Aterrizaje",
      problem: "A graphic design company needed its own site to showcase work and win clients, one it could manage itself.",
      category: "web",
      status: "completed"
    }
  ],
  freelanceClients: [
    {
      name: "Scientific Initiation Conference (JIC)",
      kind: "Event platform · UTP",
      summary: "An initiative of the Technological University of Panama that, since 2002, has encouraged research among undergraduate students. Today it is the country's main youth research event.",
      contributions: ["Platform maintenance", "New modules", "Security hardening", "Traceability improvements"]
    },
    {
      name: "FlexWMS",
      kind: "WMS",
      summary: "Warehouse management system (WMS) for inventory and warehouse operations.",
      contributions: ["Bug fixes", "New general modules"]
    },
    {
      name: "LCDM",
      kind: "Custom WMS",
      summary: "A customized version of FlexWMS adapted to the LCDM client's operation.",
      contributions: ["Client-exclusive modules"]
    },
    {
      name: "PGT Logistics",
      kind: "Ordering and delivery app",
      summary: "An app for orders and home delivery.",
      contributions: ["App improvements", "API integrations", "Contributed to the delivery module"]
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
    methodologies: ["Scrum", "DevSecOps", "Spec-Driven Development (SDD)", "AI-assisted development", "Project management (Jira)"],
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
    // Drop a portrait in public/ and set: photo: "/me.jpg",
    description: [
      "I'm Irvin. I study Software Development and Management at the Technological University of Panama, and I've been doing freelance projects for clients since 2024.",
      "Today I work at the university as a full stack developer on a scientific system built with Django and PostgreSQL. On the side I'm building RiskTrail, a tool to know how risky a trail is before you go.",
      "Outside of code, you'll find me exploring new technologies, working on personal projects or listening to music."
    ]
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
