"use client";

import { useState } from "react";

import AboutTab from "./AboutTab";
import ProjectsTab from "./ProjectsTab";
import SkillsTab from "./SkillsTab";
import TabsNavigation from "./TabsNavigation";

type Tab = "about" | "skills" | "projects";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  return (
    <div
      className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center bg-[var(--gray-1)] rounded-[32px] sm:rounded-[40px] md:rounded-[60px] lg:rounded-[85px] px-[16px] sm:px-[2px] lg:px-[25px] pt-[24px] sm:pt-[30px] md:pt-[40px] pb-[32px] sm:pb-[40px] md:pb-[50px] lg:pb-[60px] gap-[30px] sm:gap-[40px] lg:gap-[60px]"
    >
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full flex flex-col lg:flex-row gap-[40px] md:gap-[70px] lg:gap-[100px]">
        {activeTab === "about" && <AboutTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "projects" && <ProjectsTab />}
      </div>
    </div>
  );
};

export default AboutSection;
