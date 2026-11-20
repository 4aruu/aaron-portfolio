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

/** One thing the project does differently: why it matters, then how it is built. */
export interface ProjectIdea {
  title: string;
  why: string;
  how: string;
  tech?: string[];
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
  /** What the problem demanded of a solution. */
  needs?: string[];
  /** The constraint that shaped the design, if one did. */
  constraint?: string;
  /** What is different about it: the "why" first, then the tech. */
  ideas?: ProjectIdea[];
  architecture?: string;
  /** The one engineering trade-off worth asking about in an interview. */
  decision?: { title: string; body: string; points?: { k: string; v: string }[] };
  /** Extra facts for the at-a-glance strip. */
  facts?: { k: string; v: string }[];
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
    needs: [
      "Know the project as well as its report does",
      "Answer in seconds, out loud",
      "Never make things up",
    ],
    constraint: "The documents belong to the exhibitor, so they could not be sent anywhere to be answered.",
    ideas: [
      {
        title: "It is allowed to say “I don’t know”",
        why: "At a booth, a confident wrong answer is worse than none. When the documents don’t cover a question, Lumira says “I don’t have that information right now” instead of guessing.",
        how: "The model sees only the question and the passages retrieval returns, and its prompt forbids any name or term the documents don’t contain.",
        tech: ["LangChain retrievers", "ChromaDB", "LLaMA 3.2"],
      },
      {
        title: "Scan, speak, listen",
        why: "Nobody installs an app at a stall. A QR code opens a web page on the visitor’s own phone, and the whole exchange can happen by voice.",
        how: "A React web app records the question, faster-whisper transcribes it on the exhibitor’s GPU, and edge-tts reads the answer back.",
        tech: ["React", "faster-whisper", "edge-tts"],
      },
      {
        title: "The exhibitor controls the code",
        why: "Printed QR codes outlive the event they were printed for. An exhibitor can switch a booth off and on, destroy its code so every printed copy stops working, or issue a new one for the next expo.",
        how: "OTP sign-in to an exhibitor portal. An inactive or destroyed code answers nothing.",
        tech: ["FastAPI", "OTP sign-in", "SQLite"],
      },
    ],
    architecture:
      "React (Vite) frontend served to visitors' phones. A FastAPI backend exposes /api/stt, /api/chat and /api/speak. Speech is transcribed with faster-whisper on the GPU; the RAG engine uses LangChain retrievers over ChromaDB and calls LLaMA 3.2 through Ollama; answers are synthesised with edge-tts. Exhibitors sign in with an OTP, manage files, and can activate or deactivate the booth QR code, destroy it, or regenerate it. Session analytics are stored in SQLite in WAL mode.",
    decision: {
      title: "Run the model locally",
      body: "LLaMA 3.2 runs through Ollama on the exhibitor's own machine, so the documents and the model never leave it and a question costs nothing to answer. Only the finished answer goes to edge-tts for speech. The price is hardware: speech-to-text needs a GPU to stay responsive.",
      points: [
        { k: "Documents", v: "Never leave the machine (a hosted API would receive them)" },
        { k: "Cost per question", v: "None (a hosted API is paid per use)" },
        { k: "The price", v: "Hardware: speech-to-text needs a GPU" },
      ],
    },
    flow: [
      { label: "Voice", detail: "visitor's phone" },
      { label: "faster-whisper", detail: "speech to text" },
      { label: "ChromaDB", detail: "retrieve context" },
      { label: "LLaMA 3.2", detail: "answer via Ollama" },
      { label: "edge-tts", detail: "text to speech" },
    ],
    metrics: [
      { value: "3", label: "API endpoints: /api/stt, /api/chat and /api/speak" },
    ],
    features: [
      "QR code per booth; exhibitors can activate, deactivate, destroy or regenerate it",
      "Voice and text questions from a visitor's phone",
      "Answers grounded in the uploaded documents only",
      "OTP sign-in and file management for exhibitors",
      "Per-session analytics stored in SQLite",
    ],
    highlights: [
      { label: "LLM", value: "LLaMA 3.2 (Ollama)" },
      { label: "Vector store", value: "ChromaDB" },
      { label: "Speech", value: "faster-whisper · edge-tts" },
      { label: "Answers", value: "From the booth’s documents only" },
    ],
    tech: ["Python", "FastAPI", "LangChain", "ChromaDB", "Ollama", "LLaMA 3.2", "faster-whisper", "edge-tts", "React", "SQLite"],
    github: "https://github.com/4aruu/Lumira",
    facts: [{ k: "Presented", v: "AICERA-ICAISCST 2026" }],
    role: "Wrote the code, end to end, in a team of four.",
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
    needs: [
      "Know Kerala dishes, not just generic ones",
      "Suggest a swap that fits a specific health goal",
      "Never call a dish safe when its allergen data is missing",
    ],
    ideas: [
      {
        title: "Kerala dishes first",
        why: "Generic nutrition databases rarely list them, so the catalogue was built by hand: 231 dishes, each with nutrition, allergen and sustainability data.",
        how: "Seed data in PostgreSQL, modelled with SQLAlchemy and validated with Pydantic.",
        tech: ["PostgreSQL", "SQLAlchemy", "Pydantic"],
      },
      {
        title: "Swap, don’t just forbid",
        why: "A list of what not to eat leaves you with nothing to eat. NutriSwap suggests an alternative from the same food group that fits your goal, and puts the two side by side.",
        how: "Goal presets (Diabetic, Heart-Safe, Weight Loss) and a comparison view drawn with Recharts and D3.",
        tech: ["React", "Recharts", "D3"],
      },
      {
        title: "Filters that answer instantly",
        why: "Changing a goal or an allergen should feel immediate, not like a page load.",
        how: "The whole catalogue arrives in one request; every filter then runs in the browser with no further calls to the server.",
        tech: ["FastAPI", "Redux Toolkit"],
      },
      {
        title: "Tested and scanned on every push",
        why: "A health app gives advice people may act on, so it is built and checked like production software.",
        how: "GitHub Actions runs the tests and a production build; Trivy scans the Docker image and OWASP ZAP the running container; SlowAPI rate-limits the API.",
        tech: ["GitHub Actions", "Docker", "Trivy", "OWASP ZAP"],
      },
    ],
    architecture:
      "React 18 (Vite, Redux Toolkit, Recharts, D3) on Vercel. FastAPI with SQLAlchemy and Pydantic on Render, backed by PostgreSQL on Aiven. Frontend and backend each ship as a Docker image. GitHub Actions runs unit tests, pytest and a production build on every push, and a separate pipeline scans the image with Trivy and runs an OWASP ZAP baseline scan against the running container. The API applies rate limits per endpoint with SlowAPI.",
    decision: {
      title: "Fail closed on allergens",
      body: "A dish is shown for an avoided allergen only when both its recipe and its preparation are recorded as free of it. Possible or unknown counts as unsafe, so the list is shorter, and it is never wrong in the direction that hurts someone.",
    },
    flow: [
      { label: "PostgreSQL", detail: "Aiven" },
      { label: "FastAPI", detail: "Docker on Render" },
      { label: "231 foods", detail: "one fetch" },
      { label: "React", detail: "filters in the browser" },
    ],
    metrics: [
      { value: "231", label: "curated dishes with nutrition and allergen data" },
      { value: "1", label: "request for the whole catalogue; every filter runs in the browser" },
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
      { label: "Catalogue", value: "231 foods, one fetch" },
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
    tagline: "A campus assistant that answers timetable and syllabus questions and generates the timetable itself.",
    description:
      "Campus assistant whose timetable generator cut multi-staff scheduling from two weeks of coordination to under two minutes.",
    period: "Feb 2025 – Apr 2025",
    context: "Academic project",
    longDescription:
      "Students ask InfoBot about timetables, syllabi and study materials in plain language. Behind it, a generator turns course data (teachers, subjects, lecture and practical hours per semester) into weekly timetables for several semesters at once, inside the college's fixed period and break structure.",
    problem:
      "Building timetables for three semesters meant two weeks of back-and-forth between staff, and every change restarted the negotiation.",
    needs: [
      "Timetables for three semesters that never disagree",
      "A timetable for every teacher, with no clashes",
      "Answers to students’ everyday questions, on demand",
    ],
    ideas: [
      {
        title: "Every semester and every teacher, at once",
        why: "A teacher who teaches in several semesters can’t be in two rooms at the same time. Generating semesters 4, 6 and 8 together means that rule holds across all of them, and every teacher gets a timetable of their own.",
        how: "Course records (teacher, subject, lecture, practical and theory hours, semester) and the full rule set go to a language model; the timetables come back as CSV, one per semester and one per teacher.",
        tech: ["Python", "MySQL", "Language model"],
      },
      {
        title: "One assistant, two jobs",
        why: "Students needed syllabi, study materials and timetables on demand; staff needed the timetables made in the first place. One backend serves both.",
        how: "Async FastAPI endpoints keep concurrent student sessions from waiting on each other. MySQL holds courses, timetables, syllabi and study materials.",
        tech: ["FastAPI", "React", "MySQL"],
      },
    ],
    architecture:
      "React frontend on a FastAPI backend with async endpoints, so concurrent student sessions do not block each other. Academic data lives in MySQL, administered through phpMyAdmin. The timetable generator feeds structured course data and the period rules to a language model and receives the timetables back as CSV.",
    decision: {
      title: "Keep the timetable rules in data",
      body: "Period times, breaks and per-subject hours are passed to the generator as structured input. When the college changes its schedule, only the rules change; the program stays the same.",
      points: [
        { k: "Time", v: "Seven periods, three breaks, a shifted Friday afternoon" },
        { k: "Fixed", v: "Mentoring, Placement and Minor hours sit in set slots" },
        { k: "Shape", v: "Practicals are three consecutive hours" },
        { k: "People", v: "No teacher in two rooms at once" },
        { k: "Electives", v: "Semester 8’s three electives share one period" },
      ],
    },
    flow: [
      { label: "Course data", detail: "MySQL" },
      { label: "FastAPI", detail: "async endpoints" },
      { label: "Generator", detail: "rules + course load" },
      { label: "Timetables", detail: "CSV per semester" },
    ],
    metrics: [
      { value: "< 2 min", label: "to generate timetables that took two weeks to agree" },
      { value: "50+", label: "student queries answered" },
    ],
    features: [
      "Natural-language questions on timetables, syllabi and study materials",
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
    facts: [{ k: "For", v: "Semesters 4, 6 and 8" }],
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
    period: "2023",
    context: "Academic project · first Java project",
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
