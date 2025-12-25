import React from 'react';
import type { Project } from '../../data/projects';
import Link from 'next/link';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="project-link" aria-label={`Open ${project.title}`}>
      <article className="project-card glass-card" aria-labelledby={`proj-${project.id}`}>
        <div className="glass-hover-overlay" />
        <div className="project-card-inner">
          <div className="project-icon">{project.icon ?? '🔍'}</div>
          <h3 id={`proj-${project.id}`} className="card-title">{project.title}</h3>
          <p className="card-description">{project.subtitle ?? project.description}</p>
        </div>
      </article>
    </Link>
  );
}
