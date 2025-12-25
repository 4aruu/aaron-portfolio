import { useEffect, useRef } from 'react';

export default function Hero() {
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
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 80 + 50;
        this.opacity = Math.random() * 0.25 + 0.08;
        this.color = Math.random() > 0.5 
          ? 'rgba(139, 92, 246, ' 
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
        gradient.addColorStop(0.7, this.color + (this.opacity * 0.3) + ')');
        gradient.addColorStop(1, this.color + '0)');

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < 8; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  const handleHeroClick = () => {
    const sections = document.querySelectorAll('section');
    if (sections && sections[1]) {
      sections[1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" onClick={handleHeroClick}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-content">
        <div className="hero-panel">
          <div className="role-badge">Senior Developer & Designer</div>
          <h1 className="hero-title">Aaron</h1>
          <p className="hero-subtitle">Building thoughtful, usable interfaces and backend systems.</p>
          <div className="hero-actions">
            <button className="hero-cta" type="button" onClick={(e) => { e.stopPropagation(); handleHeroClick(); }}>Explore ↓</button>
          </div>
        </div>
      </div>
    </section>
  );
}