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
    <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center gap-[60px] bg-[var(--gray-1)] rounded-[85px] px-[50px] pb-[60px]">

      {/* Navigation manu on about component */}
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* content */}
      <div className="flex flex-col lg:flex-row gap-[100px]">

        {activeTab === "about" && <AboutTab />}
        {activeTab === "skills" && <SkillsTab />}
        {activeTab === "projects" && <ProjectsTab />}

      </div>
    </div>
  );
};

export default AboutSection;