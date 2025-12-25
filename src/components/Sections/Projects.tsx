'use client';

import { useEffect } from 'react';
import { PROJECTS } from '@/data/projects';

export default function Projects() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section projects">
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Systems I've built—from AI assistants to full-stack platforms</p>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="project-card-inner">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" title="GitHub">
                        →
                      </a>
                    )}
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-expand">
                  <p className="project-long-desc">{project.longDescription}</p>
                  <div className="project-tech-full">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}