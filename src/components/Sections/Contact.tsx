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

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormState({ name: '', email: '', message: '' });

      // Reset after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-container">
        <div className="contact-wrapper">
          <div className="contact-intro">
            <h2 className="section-title">Let's build something great</h2>
            <p className="section-subtitle">Got an idea? Need a developer? Just want to chat about tech? Let's connect.</p>
          </div>

          <div className="contact-content">
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
                  rows={5}
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
      </div>
    </section>
  );
}