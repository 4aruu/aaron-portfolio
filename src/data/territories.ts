/*
 * Plate I, the four territories. Every note states something shown elsewhere
 * in the atlas, and `plate` is the anchor of the plate that shows it.
 * x / y place each spot on the map, in percent of the figure.
 */
export interface Place {
  name: string;
  note: string;
  plate: string;
  x: number;
  y: number;
}

export interface Territory {
  name: string;
  experimental?: boolean;
  /* the territory's outline on the map, in percent */
  area: { x: number; y: number; w: number; h: number; radius: string };
  label: { x: number; y: number };
  places: Place[];
}

export const TERRITORIES: Territory[] = [
  {
    name: "AI systems",
    area: { x: 4, y: 6, w: 44, h: 44, radius: "46% 54% 38% 62% / 52% 40% 60% 48%" },
    label: { x: 7, y: 9 },
    places: [
      { name: "Retrieval (RAG)", note: "Lumira answers only from the exhibitor’s own documents, through LangChain over ChromaDB.", plate: "lumira", x: 14, y: 20 },
      { name: "Speech in and out", note: "faster-whisper turns a spoken question into text; edge-tts reads the answer back.", plate: "lumira", x: 24, y: 29 },
      { name: "Local LLMs", note: "LLaMA 3.2 runs through Ollama on the exhibitor’s own machine.", plate: "lumira", x: 10, y: 37 },
      { name: "Bilingual chatbot", note: "Answers prospective students in English and Malayalam, for Sreenarayanaguru Open University.", plate: "timeline", x: 27, y: 44 },
    ],
  },
  {
    name: "Cloud architecture",
    area: { x: 52, y: 4, w: 44, h: 48, radius: "60% 40% 55% 45% / 45% 55% 45% 55%" },
    label: { x: 70, y: 7 },
    places: [
      { name: "High availability", note: "A load balancer and an Auto Scaling group across two Availability Zones. Terminate an instance and the group replaces it.", plate: "experience", x: 56, y: 17 },
      { name: "Private networking", note: "EC2 reaches S3 through a Gateway VPC Endpoint, with no path over the public internet.", plate: "experience", x: 68, y: 26 },
      { name: "Auto scaling", note: "Target tracking at 50% CPU: under load the group grew from 2 instances to 3, then shrank back to 2.", plate: "experience", x: 57, y: 35 },
      { name: "Monitoring", note: "CloudWatch metrics drive the scaling policy and record every scaling event.", plate: "experience", x: 72, y: 43 },
    ],
  },
  {
    name: "Software engineering",
    area: { x: 6, y: 56, w: 52, h: 40, radius: "40% 60% 50% 50% / 60% 40% 60% 40%" },
    label: { x: 9, y: 89 },
    places: [
      { name: "APIs (FastAPI)", note: "NutriSwap’s rate-limited API on Render. Lumira and InfoBot run on FastAPI too.", plate: "nutriswap", x: 14, y: 61 },
      { name: "CI and security scans", note: "Every push runs tests and a production build in GitHub Actions; Trivy scans the image and OWASP ZAP the running app.", plate: "nutriswap", x: 30, y: 69 },
      { name: "Data modelling", note: "231 dishes in PostgreSQL, each with nutrition, allergen and sustainability data.", plate: "nutriswap", x: 12, y: 77 },
      { name: "Fail-closed rules", note: "Avoid an allergen and a dish is shown only if its recipe and its preparation are both recorded as free of it.", plate: "nutriswap", x: 34, y: 82 },
    ],
  },
  {
    name: "Experiments",
    experimental: true,
    area: { x: 64, y: 58, w: 32, h: 34, radius: "50% 50% 40% 60% / 50% 60% 40% 50%" },
    label: { x: 76, y: 89 },
    places: [
      { name: "Timetable generator", note: "The college’s rules go in as data; timetables for three semesters come out in under two minutes.", plate: "infobot", x: 68, y: 65 },
      { name: "This atlas", note: "The site you are reading: Next.js, self-hosted type, and one cube that comes apart.", plate: "contact", x: 71, y: 75 },
    ],
  },
];
