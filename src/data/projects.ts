export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  subtitle?: string;
  icon?: string;
  image?: string;
  // Detail page fields
  problem?: string;
  architecture?: string;
  features: string[];
  highlights: ProjectHighlight[];
  role?: string;
  // Exotic styling
  accentColor: string;
  gradientClass: string;
}

export const PROJECTS: Project[] = [
  {
    id: "nutriswap",
    accentColor: "#2DD4BF",
    gradientClass: "nutriswap",
    title: "Nutriswap",
    description:
      "AI-powered nutrition platform with hybrid recommendation engine",
    longDescription:
      "A full-stack nutritional intelligence platform designed to help users identify healthier food alternatives based on specific health goals (e.g., Diabetic-friendly, Heart Health, Muscle Gain). The system processes complex nutritional data to provide real-time, context-aware food swaps using a React + FastAPI architecture.",
    problem:
      "People with specific dietary needs — diabetes, heart conditions, muscle-building goals — struggle to find food alternatives that actually match their nutritional requirements. Existing tools are either too generic or require manual research across scattered databases.",
    architecture:
      "React 18 frontend built with Vite for fast HMR, backed by a FastAPI Python server connected to PostgreSQL via SQLAlchemy. The frontend leverages Redux Toolkit for state management, D3.js and Recharts for data visualization, React Hook Form for efficient search input, and Framer Motion for UI animations. The backend exposes RESTful endpoints through organized routers, with Pydantic schemas for validation and a seed script to populate the nutritional database.",
    features: [
      "Intelligent food substitution engine with health-goal filtering",
      "Interactive nutrition explorer with D3.js data visualization",
      "Side-by-side food comparison tool with real-time data",
      "Aurora-animated landing page with responsive grid layout",
      "Redux Toolkit state management for complex search flows",
      "Framer Motion micro-animations across all UI components",
    ],
    highlights: [
      { label: "Tech Layers", value: "Full-Stack" },
      { label: "Data Points", value: "100+" },
      { label: "Visualizations", value: "D3.js + Recharts" },
      { label: "API Framework", value: "FastAPI" },
    ],
    tech: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
      "Framer Motion",
      "SQLAlchemy",
      "Redux Toolkit",
      "D3.js",
      "Recharts",
      "Vite",
    ],
    github: "https://github.com/4aruu/food_alternate",
    image: "/projects/bg-nutriswap.png",
    featured: true,
    role: "Sole developer — designed the database schema, built the FastAPI backend with seed scripts, and developed the full React frontend including data visualizations and comparison logic.",
  },
  {
    id: "lumira",
    accentColor: "#C084FC",
    gradientClass: "lumira",
    title: "Lumira",
    description:
      "Voice-activated AI guide for exhibitions with context-locking architecture",
    longDescription:
      "LUMIRA is a context-aware AI-powered project assistant built for expos and exhibitions. Give it a PDF, it studies the content, vectorizes it, and answers questions like a pro — with zero hallucinations. Built on a RAG (Retrieval-Augmented Generation) pipeline using LangChain, Llama 3.2, and ChromaDB.",
    problem:
      "At project expos and viva presentations, students panic when asked unexpected questions about their own projects. Documentation is scattered, and there's no fast way to query specific technical details from your own project report.",
    architecture:
      "PDF → Vector → LLM pipeline. PyPDFLoader extracts and sections the PDF (Executive Summary, Methodology, etc.). mxbai-embed-large creates vector embeddings of each section. ChromaDB stores the vectorized content. At query time, relevant context is retrieved from the vector store and fed to Llama 3.2 via LangChain, which generates responses based strictly on the project PDF — no hallucinations.",
    features: [
      "PDF ingestion with automatic section extraction",
      "Vector embedding using mxbai-embed-large model",
      "ChromaDB vector store for fast similarity search",
      "Context-locked responses — answers only from your PDF data",
      "Zero-hallucination Llama 3.2 inference via Ollama",
      "Lightweight, local, and fully private — no cloud dependencies",
    ],
    highlights: [
      { label: "LLM", value: "Llama 3.2" },
      { label: "Embeddings", value: "mxbai-embed-large" },
      { label: "Vector DB", value: "ChromaDB" },
      { label: "Hallucination Rate", value: "Zero" },
    ],
    tech: [
      "Python",
      "LangChain",
      "Ollama",
      "Llama 3.2",
      "ChromaDB",
      "mxbai-embed-large",
      "PyPDFLoader",
      "FastAPI",
      "React",
      "TypeScript",
    ],
    github: "https://github.com/4aruu/Lumira",
    image: "/projects/bg-lumira.png",
    featured: true,
    role: "Sole developer — designed the RAG pipeline, built the vectorization engine, integrated Llama 3.2 via Ollama, and developed both the Python backend and React frontend.",
  },
  {
    id: "infobot",
    accentColor: "#FF6B9D",
    gradientClass: "infobot",
    title: "INFOBOT",
    description: "Intelligent academic management system with AI chatbot",
    longDescription:
      "InfoBot is an intelligent chatbot system designed to streamline academic management for students and teachers. It provides instant access to syllabi, study materials, timetables, and facilitates tasks like multi-batch scheduling and exam tracking — all powered by a Claude Sonnet AI chatbot.",
    problem:
      "Students and faculty waste hours navigating complex academic systems to find syllabi, timetables, and study materials. Scheduling across multiple batches creates conflicts, and there's no unified system to query academic information conversationally.",
    architecture:
      "React frontend connected to a Node.js/Express backend with dual database architecture — MySQL for structured academic data (syllabi, timetables, student records) and MongoDB for flexible chatbot conversation storage. The Claude Sonnet AI powers the conversational interface, processing natural language queries against the academic database to provide instant, relevant answers.",
    features: [
      "Claude Sonnet AI-powered conversational chatbot",
      "Instant access to syllabi, study materials, and timetables",
      "Automated multi-batch scheduling with conflict resolution",
      "Exam tracking and academic calendar management",
      "Smart search across academic resources",
      "Secure role-based access for students and faculty",
    ],
    highlights: [
      { label: "AI Model", value: "Claude Sonnet" },
      { label: "Databases", value: "MySQL + MongoDB" },
      { label: "Semesters", value: "8 Supported" },
      { label: "User Roles", value: "Student + Faculty" },
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "MongoDB",
      "Claude AI",
      "PhpMyAdmin",
    ],
    github: "https://github.com/4aruu/InfoBot",
    image: "/projects/bg-infobot.png",
    featured: true,
    role: "Sole developer — designed the dual-database architecture, integrated Claude Sonnet AI, built the automated timetable generator, and developed the full-stack application.",
  },
  {
    id: "taskit",
    accentColor: "#FBBF24",
    gradientClass: "taskit",
    title: "TaskIT",
    description: "Task management web app with priority-based organization",
    longDescription:
      "A web application for managing tasks efficiently by prioritizing them based on importance and tracking their completion status. Built using Node.js, Express.js, and MongoDB for the backend, with a clean HTML/CSS/JavaScript frontend for interactive task management.",
    problem:
      "Daily productivity suffers when tasks pile up without clear prioritization. Generic to-do apps don't distinguish between urgency levels, leading to important tasks getting buried under less critical ones.",
    architecture:
      "Node.js server with Express.js handling RESTful API routes for CRUD operations. MongoDB provides persistent storage for tasks with priority and status metadata. The frontend uses vanilla HTML, CSS, and JavaScript for a lightweight, responsive interface that communicates with the backend via fetch API calls.",
    features: [
      "Full CRUD operations — add, view, update, and delete tasks",
      "Three-tier priority system — Low, Medium, High",
      "Status tracking — Pending, Completed, Incomplete",
      "Persistent storage with MongoDB",
      "RESTful API architecture with Express.js middleware",
      "Responsive frontend with clean, minimal UI",
    ],
    highlights: [
      { label: "Architecture", value: "RESTful API" },
      { label: "Database", value: "MongoDB" },
      { label: "Priority Levels", value: "3 Tiers" },
      { label: "Stack", value: "MERN-lite" },
    ],
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    github: "https://github.com/4aruu/TaskIT",
    image: "/projects/bg-taskit.png",
    featured: true,
    role: "Sole developer — designed the REST API, implemented MongoDB schemas for task prioritization, and built the interactive frontend.",
  },
  {
    id: "pharmacy",
    accentColor: "#FB923C",
    gradientClass: "pharmacy",
    title: "Pharmacy Management System",
    description:
      "Admin appointment booking system with MySQL database integration",
    longDescription:
      "An admin-use-only system designed to streamline the scheduling and management of doctor appointments. Built using Java in Eclipse IDE, with all doctor and patient data managed directly in a MySQL database for secure and centralized record-keeping.",
    problem:
      "Small clinics and pharmacies rely on paper-based or spreadsheet records for managing appointments, leading to scheduling conflicts, lost patient records, and inefficient daily operations.",
    architecture:
      "Desktop application built with Java Swing for the UI layer, connected to a MySQL database via MySQL Connector/J (JDBC). The system follows a traditional MVC pattern — Java handles business logic and UI rendering, while MySQL stores and manages all persistent data for doctors, patients, and appointments.",
    features: [
      "Book appointments based on doctor availability",
      "Update or delete existing appointments",
      "View all appointment records with filtering",
      "Direct MySQL data management for doctors and patients",
      "Secure admin-only access control",
      "Centralized database for all clinic records",
    ],
    highlights: [
      { label: "Platform", value: "Desktop (Java)" },
      { label: "Database", value: "MySQL" },
      { label: "Pattern", value: "MVC" },
      { label: "Access", value: "Admin-Only" },
    ],
    tech: ["Java", "MySQL", "Java Swing", "Eclipse", "JDBC"],
    github: "https://github.com/4aruu/Pharmacy-Management-System",
    image: "/projects/bg-pharmacy.png",
    featured: true,
    role: "Sole developer — designed the database schema, built the Java Swing interface, and implemented the appointment management logic.",
  },
];