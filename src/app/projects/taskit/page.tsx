import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS } from "@/data/projects";

const project = PROJECTS.find((p) => p.id === "taskit")!;

export const metadata = {
  title: `${project.title} — Aaron Jacob Sunil`,
  description: project.description,
};

export default function TaskitPage() {
  return <ProjectDetail projectId="taskit" />;
}
