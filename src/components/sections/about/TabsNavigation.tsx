"use client";

import { useTranslations } from "next-intl";

type Props = {
	activeTab: "about" | "skills" | "projects";
	setActiveTab: (_tab: "about" | "skills" | "projects") => void;
};

const TabsNavigation = ({ activeTab, setActiveTab }: Props) => {
  const t = useTranslations("home.about.tabs");

  const baseButtonClasses =
		"w-full sm:w-[calc(100%/3)] rounded-full text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] text-[var(--white)] font-semibold transition-all duration-300 hover:cursor-pointer border-[2px]";

  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-[1000px] bg-[var(--gray-3)] rounded-[32px] sm:rounded-[80px] p-[6px] sm:p-[8px] gap-[8px] sm:gap-[12px] md:gap-[0px]"
    >
      <button
        onClick={() => setActiveTab("about")}
        className={
          baseButtonClasses +
					" py-[12px] sm:py-[16px] md:py-[22px] lg:py-[30px] " +
					(activeTab === "about"
					  ? "bg-[var(--main-first)] border-[var(--main-first)]"
					  : "hover:border-[var(--white)] border-[var(--gray-3)]")
        }
      >
        {t("about")}
      </button>

      <button
        onClick={() => setActiveTab("skills")}
        className={
          baseButtonClasses +
					" py-[12px] sm:py-[16px] md:py-[22px] lg:py-[30px] " +
					(activeTab === "skills"
					  ? "bg-[var(--main-first)] border-[var(--main-first)]"
					  : "hover:border-[var(--white)] border-[var(--gray-3)]")
        }
      >
        {t("skills")}
      </button>

      <button
        onClick={() => setActiveTab("projects")}
        className={
          baseButtonClasses +
					" py-[12px] sm:py-[16px] md:py-[22px] lg:py-[30px] " +
					(activeTab === "projects"
					  ? "bg-[var(--main-first)] border-[var(--main-first)]"
					  : "hover:border-[var(--white)] border-[var(--gray-3)]")
        }
      >
        {t("projects")}
      </button>
    </div>
  );
};

export default TabsNavigation;
