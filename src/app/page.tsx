import AtlasChrome from "@/components/atlas/AtlasChrome";
import Plate00 from "@/components/atlas/plates/Plate00";
import Plate01 from "@/components/atlas/plates/Plate01";
import Plate02 from "@/components/atlas/plates/Plate02";
import Plate03 from "@/components/atlas/plates/Plate03";
import Plate04 from "@/components/atlas/plates/Plate04";
import Plate05 from "@/components/atlas/plates/Plate05";
import PlateMotion from "@/components/atlas/motion/PlateMotion";
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
        <Plate02 />
        <Plate03 />
        <Plate04 />
        <Plate05 />
        <TimelineSection />
        <ToolkitSection />
        <ContactSection />
        <PlateMotion />
      </main>
      <SiteFooter />
    </AtlasChrome>
  );
}
