"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";

import Systems from "@/components/Sections/Systems";
import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Projects from "@/components/Sections/Projects";
import Skills from "@/components/Sections/Skills";
import Contact from "@/components/Sections/Contact";

import { useSection } from "@/hooks/useSection";
import { SECTIONS } from "@/data/sections";
import { setAccentColor } from "@/animations/colors";

export default function Page() {
  useLenis();
  const activeSection = useSection();

  useEffect(() => {
    const section = SECTIONS.find((s) => s.id === activeSection);
    if (section) {
      setAccentColor(section.color);
    }
  }, [activeSection]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Systems />
      <Skills />
      <Contact />
    </>
  );
} 