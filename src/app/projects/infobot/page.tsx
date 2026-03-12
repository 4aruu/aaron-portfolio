import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS } from "@/data/projects";

const project = PROJECTS.find((p) => p.id === "infobot")!;

export const metadata = {
  title: `${project.title} — Aaron Jacob Sunil`,
  description: project.description,
};

export default function InfobotPage() {
  return <ProjectDetail projectId="infobot" />;
}
