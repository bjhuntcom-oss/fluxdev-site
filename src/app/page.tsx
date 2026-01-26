import {
  HeroSection,
  ServicesSection,
  TechStackSection,
  MethodologySection,
  ContactSection,
} from "@/components/sections";
import { SectionConnector } from "@/components/ui/section-connector";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <SectionConnector />
      <ServicesSection />
      <SectionConnector />
      <TechStackSection />
      <SectionConnector />
      <MethodologySection />
      <SectionConnector />
      <ContactSection />
    </div>
  );
}
