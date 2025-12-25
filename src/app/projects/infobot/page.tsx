import { PROJECTS } from '@/data/projects';

const project = PROJECTS.find(p => p.id === 'infobot')!;

export const metadata = { title: project.title };

export default function InfobotPage() {
  return (
    <main className="section">
      <div className="section-container">
        <h1 className="section-title">{project.title}</h1>
        <p className="section-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>

        <h3>Tech Stack</h3>
        <p>{project.tech?.join(' · ')}</p>

        {project.repo && <p><a href={project.repo} className="card-link">Repository</a></p>}
      </div>
    </main>
  );
}
