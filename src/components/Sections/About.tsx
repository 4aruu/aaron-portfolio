'use client';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-container about-container">
        <div className="about-content">
          <h2 className="section-title">About me</h2>
          
          <div className="about-grid">
            <div className="about-text">
              <p className="about-intro">
                I'm Aaron, a <span className="accent">full-stack developer</span> and designer passionate about building intelligent systems that solve real problems.
              </p>

              <p>
                With experience across <span className="accent">React, FastAPI, Node.js, and cloud architecture</span>, I specialize in creating scalable applications that seamlessly blend user experience with technical rigor. From AI-powered platforms to real-time systems, I approach each project with a focus on clarity, performance, and elegant design.
              </p>

              <p>
                I'm particularly drawn to systems that leverage <span className="accent">machine learning and automation</span>—building context-aware AI assistants, intelligent recommendation engines, and smart automation workflows that genuinely improve how people work.
              </p>

              <p>
                Beyond code, I care about <span className="accent">thoughtful architecture</span>. I believe great software isn't just about what it does—it's about how it's built. Every system should be fault-tolerant, maintainable, and designed with the future in mind.
              </p>

              <p className="about-cta">
                Currently studying at <span className="accent">Amal Jyothi College of Engineering</span>, interning at <span className="accent">Cybercell–SGOU</span>, and always exploring what's next in full-stack development.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects</div>
                <div className="stat-desc">Full-stack systems built</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">30+</div>
                <div className="stat-label">Skills</div>
                <div className="stat-desc">Languages & frameworks</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">1+</div>
                <div className="stat-label">Years</div>
                <div className="stat-desc">Professional experience</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">∞</div>
                <div className="stat-label">Curiosity</div>
                <div className="stat-desc">For elegant solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}