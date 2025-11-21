"use client";

import { useTranslations } from "next-intl";

type Props = {
	activeTab: "about" | "skills" | "projects";
	setActiveTab: (tab: "about" | "skills" | "projects") => void;
};

const TabsNavigation = ({ activeTab, setActiveTab }: Props) => {
  const t = useTranslations("home.about.tabs");

  return (
    <div className="flex flex-col sm:flex-row gap-[16px] md:gap-0 bg-[var(--gray-3)] rounded-[80px] w-[80%] max-w-[1000px]">
      <button
        onClick={() => setActiveTab("about")}
        className={`w-full md:w-[calc(100%/3)] py-[30px] rounded-full text-[40px] text-[var(--white)] font-semibold transition-all duration-300 hover:cursor-pointer border-[2px] ${
          activeTab === "about"
	          ? "bg-[var(--main-first)] border-[var(--main-first)]"
	          : "hover:border-[var(--white)] border-[var(--gray-3)]"
        }`}
      >
        {t("about")}
      </button>

      <button
        onClick={() => setActiveTab("skills")}
        className={`w-full md:w-[calc(100%/3)] py-[30px] rounded-full text-[40px] text-[var(--white)] font-semibold transition-all duration-300 hover:cursor-pointer border-[2px] ${
	        activeTab === "skills"
		        ? "bg-[var(--main-first)] border-[var(--main-first)]"
		        : "hover:border-[var(--white)] border-[var(--gray-3)]"
        }`}
      >
        {t("skills")}
      </button>

      <button
        onClick={() => setActiveTab("projects")}
        className={`w-full md:w-[calc(100%/3)] py-[30px] rounded-full text-[40px] text-[var(--white)] font-semibold transition-all duration-300 hover:cursor-pointer border-[2px] ${
	        activeTab === "projects"
		        ? "bg-[var(--main-first)] border-[var(--main-first)]"
		        : "hover:border-[var(--white)] border-[var(--gray-3)]"
        }`}
      >
        {t("projects")}
      </button>
    </div>
  );
};

export default TabsNavigation;