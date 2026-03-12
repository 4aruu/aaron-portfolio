import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS } from "@/data/projects";

const project = PROJECTS.find((p) => p.id === "pharmacy")!;

export const metadata = {
  title: `${project.title} — Aaron Jacob Sunil`,
  description: project.description,
};

export default function PharmacyPage() {
  return <ProjectDetail projectId="pharmacy" />;
}
