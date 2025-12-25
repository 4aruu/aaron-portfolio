'use client';

import { useEffect, useRef } from 'react';
import { SKILLS } from '@/data/skills';

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    let animationId = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 100 + 60;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.color = Math.random() > 0.5
          ? 'rgba(90, 150, 255, '
          : 'rgba(167, 139, 250, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.radius < 0) this.x = canvas!.width + this.radius;
        if (this.x - this.radius > canvas!.width) this.x = -this.radius;
        if (this.y + this.radius < 0) this.y = canvas!.height + this.radius;
        if (this.y - this.radius > canvas!.height) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(0.6, this.color + (this.opacity * 0.4) + ')');
        gradient.addColorStop(1, this.color + '0)');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    // Create more particles for fuller effect
    for (let i = 0; i < 12; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx!.fillStyle = 'rgba(11, 13, 16, 0.03)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    const tags = document.querySelectorAll('.skill-tag');
    tags.forEach(tag => observer.observe(tag));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills">
      <canvas ref={canvasRef} className="skills-canvas" />
      <div className="section-container skills-content">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Languages, frameworks, and tools I work with</p>
        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <div key={i} className="skill-tag" style={{ animationDelay: `${i * 0.03}s` }}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}