import AtlasChrome from "@/components/atlas/AtlasChrome";
import Hero from "@/components/home/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import WorkSection from "@/components/home/WorkSection";
import TimelineSection from "@/components/home/TimelineSection";
import ToolkitSection from "@/components/home/ToolkitSection";
import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Page() {
  return (
    <AtlasChrome onHome>
      <main id="main">
        <Hero />
        <ExperienceSection />
        <WorkSection />
        <TimelineSection />
        <ToolkitSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </AtlasChrome>
  );
}
