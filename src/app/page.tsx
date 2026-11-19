import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import WorkSection from "@/components/home/WorkSection";
import TimelineSection from "@/components/home/TimelineSection";
import ToolkitSection from "@/components/home/ToolkitSection";
import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ExperienceSection />
        <WorkSection />
        <TimelineSection />
        <ToolkitSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
