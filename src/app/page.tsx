import AtlasChrome from "@/components/atlas/AtlasChrome";
import Plate00 from "@/components/atlas/plates/Plate00";
import Plate01 from "@/components/atlas/plates/Plate01";
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
        <Plate00 />
        <Plate01 />
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
