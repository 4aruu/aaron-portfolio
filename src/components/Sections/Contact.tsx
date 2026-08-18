'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name || 'a visitor'}`);
        const body = encodeURIComponent(
            `${formState.message}\n\n— ${formState.name}\nReply to: ${formState.email}`
        );
        // Opens the visitor's own mail client with the message prefilled.
        // No backend needed, but does require them to have a mail client configured.
        window.location.href = `mailto:aaronjacobsunil@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <section
            id="contact"
            className="min-h-screen bg-canvas dark:bg-dark-canvas pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-content mx-auto">
                <span className="block text-signal-blue dark:text-signal-blue-dark text-xs font-semibold font-text tracking-[0.15em] uppercase mb-5">
                    Get In Touch
                </span>
                <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-obsidian dark:text-dark-text tracking-[-0.02em] mb-4">
                    Let&apos;s build something great
                </h1>
                <p className="text-obsidian/60 dark:text-dark-text-secondary text-base sm:text-lg mb-14 max-w-xl">
                    Got an idea? Need a developer? Just want to talk shop? Send a message
                    and it&apos;ll open straight in your mail client, ready to send.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-link bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border px-4 py-3 text-obsidian dark:text-dark-text text-sm placeholder:text-obsidian/35 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:border-signal-blue dark:focus:border-signal-blue-dark transition-colors"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-link bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border px-4 py-3 text-obsidian dark:text-dark-text text-sm placeholder:text-obsidian/35 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:border-signal-blue dark:focus:border-signal-blue-dark transition-colors"
                        />
                        <textarea
                            name="message"
                            placeholder="What's on your mind?"
                            rows={5}
                            value={formState.message}
                            onChange={handleChange}
                            required
                            className="w-full rounded-card bg-paper dark:bg-dark-surface border border-fog dark:border-dark-border px-4 py-3 text-obsidian dark:text-dark-text text-sm placeholder:text-obsidian/35 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:border-signal-blue dark:focus:border-signal-blue-dark transition-colors resize-none"
                        />
                        <button type="submit" className="btn-primary-pill inline-flex items-center gap-2.5 text-sm">
                            <Send size={15} />
                            Send message
                        </button>
                    </form>

                    {/* Direct links */}
                    <div>
                        <h3 className="text-obsidian/40 dark:text-dark-text-secondary/60 text-[11px] font-semibold tracking-[0.1em] uppercase mb-5">
                            Or reach out directly
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="mailto:aaronjacobsunil@gmail.com"
                                className="flex items-center gap-3 text-obsidian/70 dark:text-dark-text-secondary text-sm hover:text-signal-blue dark:hover:text-signal-blue-dark no-underline transition-colors"
                            >
                                <Mail size={16} />
                                aaronjacobsunil@gmail.com
                            </a>
                            <a
                                href="https://github.com/4aruu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-obsidian/70 dark:text-dark-text-secondary text-sm hover:text-signal-blue dark:hover:text-signal-blue-dark no-underline transition-colors"
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/aaron-jacob-sunil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-obsidian/70 dark:text-dark-text-secondary text-sm hover:text-signal-blue dark:hover:text-signal-blue-dark no-underline transition-colors"
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
