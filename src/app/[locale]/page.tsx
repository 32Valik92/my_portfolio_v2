import Image from "next/image";

import Section from "@/components/common/Section";
import HomeHero from "@/components/HomeHero";
import AboutSection from "@/components/sections/about/AboutSection";

export default function HomePage(){
  return (
    <div className="relative w-full">
      <Image
        src="/images/hero/hero_bg.png"
        alt="hero left"
        height={1286}
        width={475}
        className="w-full absolute left-0 top-0 z-[-1]"
      />

      <Section id="hero">
        <HomeHero />
      </Section>

      <Section id="about-section">
        <AboutSection />
      </Section>
    </div>
  );
}