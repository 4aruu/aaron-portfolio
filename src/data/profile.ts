export const PROFILE = {
  name: "Aaron Jacob Sunil",
  role: "Cloud & AI Engineer",
  location: "Kuwait · open to relocation",
  email: "aaronjacobsunil@gmail.com",
  github: "https://github.com/4aruu",
  linkedin: "https://www.linkedin.com/in/aaron-jacob-sunil",
  resume: "/resume.pdf",
} as const;

export interface Experience {
  role: string;
  org: string;
  place: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  diagram?: "aws-multi-az";
  facts?: { k: string; v: string }[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "Cloud Infrastructure Intern (AWS)",
    org: "IPSR Solutions",
    place: "Remote",
    period: "May – Nov 2026",
    summary:
      "Designed and deployed a web tier on AWS that keeps serving when an instance or an Availability Zone fails.",
    points: [
      "Spread an Application Load Balancer and an Auto Scaling group across two Availability Zones, with instances built from a Launch Template.",
      "Wrote CloudWatch scaling policies and validated them under synthetic CPU load: the group scaled out, and unhealthy instances were replaced without manual action.",
      "Gave EC2 private access to S3 through a Gateway VPC Endpoint, so that traffic never crosses the public internet.",
      "Locked access down to least privilege with Security Groups and network ACLs.",
    ],
    stack: ["EC2", "ALB", "Auto Scaling", "Launch Templates", "CloudWatch", "S3", "VPC endpoints", "Security Groups", "NACLs"],
    diagram: "aws-multi-az",
  },
  {
    role: "Developer Intern",
    org: "Sreenarayanaguru Open University, Cybercell",
    place: "Kollam, Kerala",
    period: "May – Jun 2025",
    summary:
      "Built and shipped a bilingual chatbot that answers prospective students' questions in English and Malayalam.",
    points: [
      "Added JWT-based authentication and worked with university IT to deploy it.",
      "Cut backend response times by caching frequent queries and reworking database access patterns.",
    ],
    stack: ["Chatbot", "JWT", "Query caching"],
    facts: [
      { k: "Languages", v: "English and Malayalam" },
      { k: "Users", v: "Prospective students" },
      { k: "Auth", v: "JWT" },
      { k: "Shipped with", v: "University IT" },
    ],
  },
];

export interface SkillGroup {
  area: string;
  items: string;
}

/** Grouped by what has actually been shipped, not by what has been read about. */
export const SKILLS: SkillGroup[] = [
  { area: "Cloud & infrastructure", items: "AWS (EC2, ALB, Auto Scaling, CloudWatch, S3, VPC), Docker, GitHub Actions, Vercel, Render, Aiven" },
  { area: "AI & retrieval", items: "RAG, LangChain, ChromaDB, vector search, Ollama (LLaMA 3.2), faster-whisper, prompt engineering" },
  { area: "Backend", items: "Python, FastAPI, Node.js, Express, Django, REST APIs, JWT authentication" },
  { area: "Data", items: "PostgreSQL, MySQL, MongoDB, SQLite, SQLAlchemy" },
  { area: "Frontend", items: "React, JavaScript, TypeScript, Next.js, Tailwind CSS" },
];

export interface Credential {
  title: string;
  issuer: string;
  detail: string;
}

export const CREDENTIALS: Credential[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    detail: "SAA-C03",
  },
  {
    title: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    detail: "Short course",
  },
];

export type MilestoneKind = "Education" | "Project" | "Internship" | "Certification" | "Now";

export interface Milestone {
  when: string;
  kind: MilestoneKind;
  title: string;
  place?: string;
  body: string;
  /** What was new at this step: shows the growth from one entry to the next. */
  stack?: string;
  href?: string;
  external?: boolean;
}

/** School to now, oldest first. Dates come from the résumé and GitHub push dates. */
export const TIMELINE: Milestone[] = [
  {
    when: "2022",
    kind: "Education",
    title: "Higher secondary, CBSE",
    place: "Kuwait",
    body: "Finished school in Kuwait.",
  },
  {
    when: "2022",
    kind: "Education",
    title: "B.Tech in Information Technology begins",
    place: "APJ Abdul Kalam Technological University, Kottayam",
    body: "Principal's List in the first semester.",
  },
  {
    when: "Aug 2024",
    kind: "Project",
    title: "First web page",
    body: "A hand-written page with a header, navigation and a table, styled in plain CSS.",
    stack: "HTML · CSS",
    href: "https://github.com/4aruu/codes",
    external: true,
  },
  {
    when: "Nov 2024",
    kind: "Project",
    title: "TaskIT",
    body: "My first REST API: a task manager with priorities and status tracking.",
    stack: "Node.js · Express · MongoDB",
    href: "https://github.com/4aruu/TaskIT",
    external: true,
  },
  {
    when: "Nov 2024",
    kind: "Project",
    title: "Pharmacy Management System",
    body: "A desktop app for booking doctor appointments, with records in MySQL.",
    stack: "Java · Swing · MySQL · JDBC",
    href: "https://github.com/4aruu/Pharmacy-Management-System",
    external: true,
  },
  {
    when: "Feb – Apr 2025",
    kind: "Project",
    title: "InfoBot",
    body: "A campus assistant whose timetable generator cut weeks of coordination to under two minutes.",
    stack: "Python · FastAPI · React · MySQL",
    href: "/projects/infobot",
  },
  {
    when: "May – Jun 2025",
    kind: "Internship",
    title: "Developer Intern",
    place: "Sreenarayanaguru Open University, Cybercell",
    body: "Shipped a bilingual English and Malayalam chatbot for prospective students.",
    stack: "JWT authentication · query caching",
    href: "#experience",
  },
  {
    when: "Nov 2025 – Apr 2026",
    kind: "Project",
    title: "Lumira",
    body: "A voice assistant for exhibition booths, built with a team of four, that answers from the exhibitor's own documents.",
    stack: "RAG · LangChain · ChromaDB · LLaMA 3.2 · faster-whisper",
    href: "/projects/lumira",
  },
  {
    when: "Dec 2025 – Apr 2026",
    kind: "Project",
    title: "NutriSwap",
    body: "A full-stack food alternatives finder with CI, security scans and three-cloud deployment.",
    stack: "Docker · PostgreSQL · GitHub Actions · Vercel · Render · Aiven",
    href: "/projects/nutriswap",
  },
  {
    when: "2026",
    kind: "Education",
    title: "B.Tech completed, First Class",
    place: "APJ Abdul Kalam Technological University",
    body: "Principal's List again in the seventh and eighth semesters.",
  },
  {
    when: "May – Nov 2026",
    kind: "Internship",
    title: "Cloud Infrastructure Intern (AWS)",
    place: "IPSR Solutions · remote",
    body: "Built a multi-AZ, self-healing web tier on AWS.",
    stack: "EC2 · ALB · Auto Scaling · CloudWatch · VPC",
    href: "#experience",
  },
  {
    when: "Oct 13, 2026",
    kind: "Certification",
    title: "AWS Certified Solutions Architect – Associate",
    place: "SAA-C03",
    body: "Passed after preparing through the IPSR programme.",
  },
  {
    when: "Now",
    kind: "Now",
    title: "Looking for my first full-time role",
    body: "Cloud and AI engineering, in the UAE, Kuwait or India.",
    href: "#contact",
  },
];
