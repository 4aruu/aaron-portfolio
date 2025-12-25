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
}
export const PROJECTS: Project[] = [
  {
    id: 'nutriswap',
    title: 'Nutriswap',
    description: 'AI-powered nutrition platform with hybrid recommendation engine',
    longDescription: 'Developed a full-stack nutritional intelligence platform designed to help users identify healthier food alternatives based on specific health goals (e.g., Diabetic-friendly, Heart Health, Muscle Gain). The system processes complex nutritional data to provide real-time, context-aware food swaps.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Framer Motion', 'SQLAlchemy'],
    github: '#',
    featured: true,
  },
  {
    id: 'lumira',
    title: 'Lumira',
    description: 'Voice-activated AI guide for exhibitions with context-locking architecture',
    longDescription: 'A voice-activated AI guide that lets visitors talk to products. Instead of searching for specs in documents, you simply ask questions and get instant, spoken answers. Scan QR codes to chat with specific products using RAG technology.',
    tech: ['React', 'FastAPI', 'LangChain', 'ChromaDB', 'Llama 3.2', 'TypeScript'],
    github: 'https://github.com/4aruu/Lumira',
    featured: true,
  },
  {
    id: 'infobot',
    title: 'INFOBOT',
    description: 'Intelligent academic management system with AI chatbot',
    longDescription: 'An intelligent academic management system designed to streamline student and faculty operations. Features a Claude Sonnet AI-powered chatbot and automated timetable generation for 8 semesters with conflict resolution.',
    tech: ['React', 'MySQL', 'Claude AI', 'PhpMyAdmin', 'Node.js', 'Express'],
    github: 'https://github.com/4aruu/InfoBot',
    featured: true,
  },
  {
    id: 'taskit',
    title: 'TaskIT',
    description: 'Task management web app with priority-based organization',
    longDescription: 'An intuitive task management web application designed to simplify and optimize productivity. Users can register, log in, and efficiently manage tasks with dynamic categorization based on priority and status.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/4aruu/TaskIT',
    featured: true,
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy Management System',
    description: 'Scalable pharmacy operations system with inventory control',
    longDescription: 'A scalable and efficient solution for streamlining pharmacy operations. Emphasizes inventory control, sales tracking, and customer record management, ensuring a robust framework for managing day-to-day activities.',
    tech: ['Java', 'MySQL', 'Java Swing', 'Eclipse'],
    github: '#',
    featured: true,
  },
];