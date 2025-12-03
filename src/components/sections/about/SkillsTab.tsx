"use client";

import { useTranslations } from "next-intl";

const SkillsTab = () => {
  const t = useTranslations("home.about.skills");

  const skills: string[] = t.raw("items");

  const sizeClasses = [
    "text-[18px] sm:text-[20px] md:text-[22px] lg:text-[28px]",
    "text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]",
    "text-[17px] sm:text-[19px] md:text-[21px] lg:text-[24px]",
    "text-[19px] sm:text-[21px] md:text-[23px] lg:text-[30px]",
  ];

  const offsetClasses = [
    "mt-[0px] md:mt-[0px]",
    "mt-[4px] md:mt-[8px]",
    "mt-[6px] md:mt-[16px]",
    "mt-[2px] md:mt-[-8px]",
    "mt-[8px] md:mt-[20px]",
    "mt-[0px] md:mt-[12px]",
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-[32px] items-start">
      {/* left part and header */}
      <div className="flex-1 flex flex-col gap-[16px] md:gap-[24px]">
        <h2
          className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[54px] font-semibold leading-[1.1] text-[var(--white)]"
        >
          <span className="font-bold mr-[8px]">{t("titleBold")}</span>
          <span className="font-bold text-[var(--main-back)]">{t("titleRest")}</span>
        </h2>

        <p
          className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[1] text-[var(--white)]"
        >
          {t("description")}
        </p>
      </div>

      {/* right part */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
          <div className="flex flex-wrap justify-center gap-x-[24px] sm:gap-x-[28px] md:gap-x-[32px] gap-y-[14px] sm:gap-y-[18px] md:gap-y-[20px]">
            {skills.map((skill, index) => {
              const size = sizeClasses[index % sizeClasses.length];
              const offset = offsetClasses[index % offsetClasses.length];

              return (
                <span
                  key={skill + index}
                  className={`
                    ${size} ${offset} text-[var(--white)] font-medium transition-all duration-300 hover:scale-110 hover:text-[var(--main-first)] cursor-default hover:cursor-pointer
                  `}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
