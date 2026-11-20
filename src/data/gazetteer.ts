/*
 * Plate VII, the gazetteer: an index of tools by where they appear.
 * Rule: a tool is listed only if it was used in a project or a job the atlas
 * shows, and `plates` names the plates that show it (numerals from plates.ts).
 *   II   AWS internship        III  Lumira          IV  NutriSwap
 *   V    InfoBot              VI   the route (TaskIT, pharmacy system,
 *                                  first web page, the SOU chatbot internship)
 *   VIII this site (the colophon)
 */
export type Territory = "AI" | "Cloud" | "Backend" | "Data" | "Frontend";

export const TERRITORY_ORDER: Territory[] = ["AI", "Cloud", "Backend", "Data", "Frontend"];

export interface Entry {
  name: string;
  territory: Territory;
  plates: string[];
}

export const GAZETTEER: Entry[] = [
  // AI
  { name: "RAG (retrieval)", territory: "AI", plates: ["III"] },
  { name: "LangChain", territory: "AI", plates: ["III"] },
  { name: "ChromaDB", territory: "AI", plates: ["III"] },
  { name: "LLaMA 3.2 (Ollama)", territory: "AI", plates: ["III"] },
  { name: "faster-whisper", territory: "AI", plates: ["III"] },
  { name: "edge-tts", territory: "AI", plates: ["III"] },
  // Cloud
  { name: "EC2", territory: "Cloud", plates: ["II"] },
  { name: "Application Load Balancer", territory: "Cloud", plates: ["II"] },
  { name: "Auto Scaling", territory: "Cloud", plates: ["II"] },
  { name: "CloudWatch", territory: "Cloud", plates: ["II"] },
  { name: "S3 + VPC endpoints", territory: "Cloud", plates: ["II"] },
  { name: "Docker", territory: "Cloud", plates: ["IV"] },
  { name: "GitHub Actions", territory: "Cloud", plates: ["IV"] },
  { name: "Vercel", territory: "Cloud", plates: ["IV"] },
  { name: "Render", territory: "Cloud", plates: ["IV"] },
  { name: "Aiven", territory: "Cloud", plates: ["IV"] },
  // Backend
  { name: "Python", territory: "Backend", plates: ["III", "IV", "V"] },
  { name: "FastAPI", territory: "Backend", plates: ["III", "IV", "V"] },
  { name: "Node.js + Express", territory: "Backend", plates: ["VI"] },
  { name: "JWT authentication", territory: "Backend", plates: ["VI"] },
  { name: "Java", territory: "Backend", plates: ["VI"] },
  // Data
  { name: "PostgreSQL", territory: "Data", plates: ["IV"] },
  { name: "SQLAlchemy", territory: "Data", plates: ["IV"] },
  { name: "MySQL", territory: "Data", plates: ["V", "VI"] },
  { name: "SQLite", territory: "Data", plates: ["III"] },
  { name: "MongoDB", territory: "Data", plates: ["VI"] },
  // Frontend
  { name: "React", territory: "Frontend", plates: ["III", "IV", "V"] },
  { name: "Redux Toolkit", territory: "Frontend", plates: ["IV"] },
  { name: "Next.js + TypeScript", territory: "Frontend", plates: ["VIII"] },
  { name: "HTML + CSS", territory: "Frontend", plates: ["VI", "VIII"] },
];
