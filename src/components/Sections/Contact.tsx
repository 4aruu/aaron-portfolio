'use client';

import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormState({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-grid">
        {/* Left Side - Image/Visual */}
        <div className="contact-visual">
          <div className="contact-image-frame">
            <div className="contact-image-placeholder">
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="180" stroke="rgba(90, 150, 255, 0.3)" strokeWidth="2"/>
                <circle cx="200" cy="150" r="50" fill="rgba(90, 150, 255, 0.2)"/>
                <path d="M 150 250 Q 200 280 250 250" stroke="rgba(90, 150, 255, 0.3)" strokeWidth="2" fill="none"/>
                <circle cx="180" cy="140" r="8" fill="rgba(90, 150, 255, 0.4)"/>
                <circle cx="220" cy="140" r="8" fill="rgba(90, 150, 255, 0.4)"/>
                <text x="200" y="380" textAnchor="middle" fill="rgba(90, 150, 255, 0.3)" fontSize="16">Let's Connect</text>
              </svg>
            </div>
            <div className="contact-glow"></div>
          </div>
        </div>

        {/* Right Side - Form & Links */}
        <div className="contact-form-section">
          <div className="contact-intro">
            <h2 className="section-title">Let's build something great</h2>
            <p className="section-subtitle">Got an idea? Need a developer? Just want to chat about tech? Let's connect.</p>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formState.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="What's on your mind?"
                rows={4}
                value={formState.message}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? 'Sending...' : submitted ? '✓ Message sent!' : 'Send message'}
            </button>
          </form>

          {/* Direct Links */}
          <div className="contact-direct">
            <h3 className="contact-subtitle">Or reach out directly</h3>
            <div className="contact-links">
              <a href="mailto:aaronjacobsunil@gmail.com" className="contact-link email">
                <span className="link-icon">✉</span>
                <span className="link-text">aaronjacobsunil@gmail.com</span>
              </a>
              <a href="https://github.com/4aruu" target="_blank" rel="noopener noreferrer" className="contact-link github">
                <span className="link-icon">→</span>
                <span className="link-text">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/aaron-jacob-sunil" target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
                <span className="link-icon">in</span>
                <span className="link-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}