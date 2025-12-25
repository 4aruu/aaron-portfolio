'use client';

import { useEffect } from 'react';

export default function Systems() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.system-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const systems = [
    {
      name: 'Hybrid Intelligence',
      description: 'Systems that combine GenAI for language understanding with deterministic models for reliability. Fault-tolerant by design—automatic fallback ensures zero downtime.',
      examples: ['Nutriswap fallover engine', 'Context-aware AI assistants']
    },
    {
      name: 'Real-time Architectures',
      description: 'Backend systems built for speed. RESTful APIs, vector databases, and optimized queries that respond instantly to user needs.',
      examples: ['FastAPI backends', 'PostgreSQL with SQLAlchemy', 'Instant search & filtering']
    },
    {
      name: 'Context-Locking',
      description: 'Preventing AI hallucinations through strict knowledge boundaries. Each user interaction stays isolated and fact-checked within defined domains.',
      examples: ['Exhibition QR scanning', 'Document-scoped AI chat', 'Multi-tenant safety']
    },
    {
      name: 'Scalable Containerization',
      description: 'Docker-first approach. Frontend, backend, and database all orchestrated together, ensuring consistent deployment across development, staging, and production.',
      examples: ['Docker Compose setups', 'Microservice-ready architecture', 'Cloud-agnostic deployments']
    },
    {
      name: 'Dynamic UX',
      description: 'Interfaces that respond to user input in real time. Smooth animations, interactive visualizations, and immediate feedback that make systems feel responsive.',
      examples: ['Framer Motion', 'D3 data visualization', 'Real-time filters']
    },
    {
      name: 'Data-Driven Design',
      description: 'Every feature backed by structured data. Efficient querying, automated timetable generation, and smart recommendations powered by intelligent algorithms.',
      examples: ['Automated scheduling', 'Nutritional intelligence', 'Academic management systems']
    },
  ];

  return (
    <section id="systems" className="section systems">
      <div className="section-container">
        <div className="systems-header">
          <h2 className="section-title">
            Systems in <span className="accent">motion</span>
          </h2>
          <p className="section-subtitle">How I approach building intelligent, resilient systems</p>
        </div>

        <div className="systems-grid">
          {systems.map((system, i) => (
            <div key={i} className="system-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="system-name">{system.name}</div>
              <p className="system-description">{system.description}</p>
              <div className="system-examples">
                <span className="examples-label">Examples:</span>
                <ul className="examples-list">
                  {system.examples.map((example, j) => (
                    <li key={j}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}