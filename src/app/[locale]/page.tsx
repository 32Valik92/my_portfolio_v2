import Image from "next/image";

import Section from "@/components/common/Section";
import HomeHero from "@/components/HomeHero";
import AboutSection from "@/components/sections/about/AboutSection";
import LetsStartSection from "@/components/sections/start/LetsStartSection";

export default function HomePage(){
  return (
    <div className="relative w-full">
      <Image
        src="/images/hero/hero_bg.webp"
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

      <Section id="lets-start-section">
        <div className="w-full mt-[70px] md:px-[50px] relative">
          <Image
            src="/images/contact/contact_bg.webp"
            alt="contact_bg"
            width={1866}
            height={954}
            className="w-[100%] absolute left-0 top-0 z-[-1] hidden md:block"
          />

          <LetsStartSection />
        </div>
      </Section>
    </div>
  );
}