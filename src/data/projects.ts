/**
 * Project content. Every claim here should be traceable to the repo or the
 * résumé — if a number cannot be explained in an interview, it does not go in.
 */

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface FlowStep {
  label: string;
  detail?: string;
}

export interface Project {
  id: string;
  title: string;
  /** One-line, outcome-first summary used on cards and in metadata. */
  description: string;
  /** Short line under the title on the homepage. */
  tagline: string;
  period: string;
  /** Who built it. Never claim sole ownership of team work. */
  context: string;
  longDescription: string;
  problem?: string;
  architecture?: string;
  /** The one engineering trade-off worth asking about in an interview. */
  decision?: { title: string; body: string };
  flow: FlowStep[];
  metrics: ProjectMetric[];
  features: string[];
  highlights: ProjectHighlight[];
  tech: string[];
  github?: string;
  live?: string;
  role?: string;
  tier: "featured" | "earlier";
}

export const PROJECTS: Project[] = [
  {
    id: "lumira",
    tier: "featured",
    title: "Lumira",
    tagline: "A voice assistant for exhibition booths that answers only from the exhibitor's own documents.",
    description:
      "Voice-driven RAG assistant for exhibitions: speech in, grounded answer out, with retrieval and the LLM on local hardware.",
    period: "Nov 2025 – Apr 2026",
    context: "Final-year project · team of four",
    longDescription:
      "Exhibitors upload their project documents (PDF, TXT or DOCX) and get a QR code for their booth. Visitors scan it and ask questions by voice or text. Lumira transcribes the question, retrieves the relevant passages from a ChromaDB vector store and has LLaMA 3.2 answer from that context alone, then reads the answer back with neural text-to-speech.",
    problem:
      "At project expos, visitors ask detailed questions faster than a team can answer them, and the answers live in a long report nobody can search on the spot.",
    architecture:
      "React (Vite) frontend served to visitors' phones. A FastAPI backend exposes /api/stt, /api/chat and /api/speak. Speech is transcribed with faster-whisper on the GPU; the RAG engine uses LangChain retrievers over ChromaDB and calls LLaMA 3.2 through Ollama; answers are synthesised with edge-tts. Exhibitors sign in with an OTP, manage files, and can pause, destroy or regenerate the booth QR code. Session analytics are stored in SQLite in WAL mode.",
    decision: {
      title: "Run the model locally",
      body: "LLaMA 3.2 runs through Ollama on the exhibitor's own machine, so the documents and the model never leave it and a question costs nothing to answer. Only the finished answer goes to edge-tts for speech. The price is hardware: speech-to-text needs a GPU to stay responsive.",
    },
    flow: [
      { label: "Voice", detail: "visitor's phone" },
      { label: "faster-whisper", detail: "speech to text" },
      { label: "ChromaDB", detail: "retrieve context" },
      { label: "LLaMA 3.2", detail: "answer via Ollama" },
      { label: "edge-tts", detail: "text to speech" },
    ],
    metrics: [
      { value: "92%", label: "semantic relevance on our evaluation set" },
    ],
    features: [
      "QR code per booth; exhibitors can pause, destroy or regenerate it",
      "Voice and text questions from a visitor's phone",
      "Answers grounded in the uploaded documents only",
      "OTP sign-in and file management for exhibitors",
      "Per-session analytics stored in SQLite",
    ],
    highlights: [
      { label: "LLM", value: "LLaMA 3.2 (Ollama)" },
      { label: "Vector store", value: "ChromaDB" },
      { label: "Speech", value: "faster-whisper · edge-tts" },
      { label: "Relevance", value: "92% on eval set" },
    ],
    tech: ["Python", "FastAPI", "LangChain", "ChromaDB", "Ollama", "LLaMA 3.2", "faster-whisper", "edge-tts", "React", "SQLite"],
    github: "https://github.com/4aruu/Lumira",
  },
  {
    id: "nutriswap",
    tier: "featured",
    title: "NutriSwap",
    tagline: "Find a healthier swap for a dish you already eat, filtered by health goal and allergen.",
    description:
      "Full-stack food alternatives finder for 231 Kerala and international dishes, with fail-closed allergen filtering.",
    period: "Dec 2025 – Apr 2026",
    context: "Solo project",
    longDescription:
      "A search over 231 curated dishes, Kerala cuisine first, with nutrition, allergen and sustainability data for each. Pick a goal such as Diabetic, Heart-Safe or Weight Loss, mark what you avoid, and NutriSwap suggests alternatives from the same food group and compares any two side by side.",
    problem:
      "Generic nutrition apps rarely know Kerala dishes, and allergen data is often missing. Treating missing data as safe is the dangerous default.",
    architecture:
      "React 18 (Vite, Redux Toolkit, Recharts, D3) on Vercel. FastAPI with SQLAlchemy and Pydantic on Render, backed by PostgreSQL on Aiven. Frontend and backend each ship as a Docker image. GitHub Actions runs unit tests, pytest and a production build on every push, and a separate pipeline scans the image with Trivy and runs an OWASP ZAP baseline scan against the running container. The API applies rate limits per endpoint with SlowAPI.",
    decision: {
      title: "Fail closed on allergens",
      body: "A dish is shown for an avoided allergen only when the data records that allergen as absent. Unknown counts as unsafe, so the list is shorter, and it is never wrong in the direction that hurts someone.",
    },
    flow: [
      { label: "PostgreSQL", detail: "Aiven" },
      { label: "FastAPI", detail: "Docker on Render" },
      { label: "14.8 KB JSON", detail: "one fetch" },
      { label: "React", detail: "filters in the browser" },
    ],
    metrics: [
      { value: "231", label: "curated dishes with nutrition and allergen data" },
      { value: "14.8 KB", label: "one payload; every filter runs client-side" },
    ],
    features: [
      "Health-goal presets: Diabetic, Heart-Safe, Weight Loss",
      "Fail-closed allergen filtering",
      "Side-by-side comparison of any two dishes",
      "Sustainability scores: carbon, water and land use",
      "CI on every push; Trivy and OWASP ZAP security scans",
    ],
    highlights: [
      { label: "Dishes", value: "231" },
      { label: "Payload", value: "14.8 KB, one fetch" },
      { label: "Hosting", value: "Vercel · Render · Aiven" },
      { label: "Security CI", value: "Trivy + OWASP ZAP" },
    ],
    tech: ["React", "Redux Toolkit", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "GitHub Actions", "Vercel", "Render", "Aiven"],
    github: "https://github.com/4aruu/food_alternate",
    live: "https://food-alternate.vercel.app",
    role: "Sole developer: database schema, FastAPI backend and seed data, React frontend, Docker images, CI/CD and deployment.",
  },
  {
    id: "infobot",
    tier: "featured",
    title: "InfoBot",
    tagline: "A campus assistant that answers timetable and grade questions and generates the timetable itself.",
    description:
      "Campus assistant whose timetable generator cut multi-staff scheduling from weeks of coordination to under two minutes.",
    period: "Feb 2025 – Apr 2025",
    context: "Academic project",
    longDescription:
      "Students ask InfoBot about timetables, syllabi and grades in plain language. Behind it, a generator turns course data (teachers, subjects, lecture and practical hours per semester) into weekly timetables for several semesters at once, inside the college's fixed period and break structure.",
    problem:
      "Building timetables for three semesters meant weeks of back-and-forth between staff, and every change restarted the negotiation.",
    architecture:
      "React frontend on a FastAPI backend with async endpoints, so concurrent student sessions do not block each other. Academic data lives in MySQL, administered through phpMyAdmin. The timetable generator feeds structured course data and the period rules to a language model and receives the timetables back as CSV.",
    decision: {
      title: "Keep the timetable rules in data",
      body: "Period times, breaks and per-subject hours are passed to the generator as structured input. When the college changes its schedule, only the rules change; the program stays the same.",
    },
    flow: [
      { label: "Course data", detail: "MySQL" },
      { label: "FastAPI", detail: "async endpoints" },
      { label: "Generator", detail: "rules + course load" },
      { label: "Timetables", detail: "CSV per semester" },
    ],
    metrics: [
      { value: "< 2 min", label: "to generate timetables that took weeks to agree" },
      { value: "50+", label: "student queries on timetables and grades" },
    ],
    features: [
      "Natural-language questions on timetables, syllabi and grades",
      "Timetables for multiple semesters generated together",
      "Period and break rules supplied as data",
      "Async FastAPI endpoints for concurrent sessions",
    ],
    highlights: [
      { label: "Generation time", value: "< 2 minutes" },
      { label: "Backend", value: "FastAPI (async)" },
      { label: "Database", value: "MySQL" },
      { label: "Users", value: "Students and staff" },
    ],
    tech: ["Python", "FastAPI", "React", "MySQL", "phpMyAdmin"],
    github: "https://github.com/4aruu/InfoBot",
  },
  {
    id: "taskit",
    tier: "earlier",
    title: "TaskIT",
    tagline: "Priority-based task manager with a REST API.",
    description: "Task manager with a Node.js and Express REST API on MongoDB.",
    period: "2024",
    context: "Solo project",
    longDescription:
      "A task manager that sorts work by priority (low, medium, high) and status. Node.js and Express expose CRUD endpoints over MongoDB; the frontend is plain HTML, CSS and JavaScript talking to the API with fetch.",
    architecture:
      "Express routes for create, read, update and delete over a MongoDB collection that stores priority and status with each task. Vanilla JavaScript frontend.",
    flow: [],
    metrics: [],
    features: ["CRUD over a REST API", "Three priority levels", "Status tracking", "MongoDB persistence"],
    highlights: [
      { label: "API", value: "REST (Express)" },
      { label: "Database", value: "MongoDB" },
    ],
    tech: ["Node.js", "Express", "MongoDB", "JavaScript"],
    github: "https://github.com/4aruu/TaskIT",
  },
  {
    id: "pharmacy",
    tier: "earlier",
    title: "Pharmacy Management System",
    tagline: "Desktop appointment booking for a clinic, in Java Swing and MySQL.",
    description: "Admin desktop app for booking doctor appointments, built with Java Swing and MySQL over JDBC.",
    period: "2024",
    context: "Academic project",
    longDescription:
      "An admin-only desktop application for booking, updating and cancelling doctor appointments, with doctor and patient records stored in MySQL.",
    architecture:
      "Java Swing user interface; MySQL over JDBC (Connector/J) for doctors, patients and appointments.",
    flow: [],
    metrics: [],
    features: ["Book by doctor availability", "Update and cancel appointments", "Admin-only access"],
    highlights: [
      { label: "Platform", value: "Java desktop" },
      { label: "Database", value: "MySQL (JDBC)" },
    ],
    tech: ["Java", "Swing", "MySQL", "JDBC"],
    github: "https://github.com/4aruu/Pharmacy-Management-System",
  },
];

export const FEATURED = PROJECTS.filter((p) => p.tier === "featured");
export const EARLIER = PROJECTS.filter((p) => p.tier === "earlier");
