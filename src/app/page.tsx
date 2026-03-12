"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Philosophy from "@/components/Philosophy";
import Protocol from "@/components/Protocol";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Page() {
  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <ProjectsShowcase />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}