"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { EducationItem } from "@/types";

const AboutTab = () => {
  const t = useTranslations("home.about");

  const educationItems: EducationItem[] = t.raw("education.items");
  const rawData = t.raw("leftColumnDescription");

  const descriptionParagraphs: string[] = Array.isArray(rawData)
    ? (rawData as string[])
    : [];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-[15px] md:gap-[20px] lg:gap-[25px]">
      {/* left tab */}
      <div className="flex-4 flex flex-col gap-[32px] md:gap-[40px] lg:gap-[60px] pb-[20px] md:pb-0">
        <div className="flex flex-col gap-[20px] md:gap-[24px] lg:gap-[32px]">
          <h2
            className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[1.1] text-[var(--white)]"
          >
            {t("leftColumnTitle")}
          </h2>
          <div
            className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[30px] lg:leading-[32px] text-[var(--white)] space-y-[15px]"
          >
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* center tab */}
      <div
        className="flex-2 flex flex-col gap-[24px] md:gap-[32px] px-0 md:px-[20px] py-[16px] md:py-0 border-[var(--gray-3)] border-t-[3px] border-b-[3px] border-l-0 border-r-0 md:border-t-0 md:border-b-0 md:border-l-[3px] md:border-r-[3px]"
      >
        <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[var(--white)]">
          {t("education.title")}
        </h3>
        <div className="space-y-[30px] sm:space-y-[36px] md:space-y-[45px]">
          {educationItems.map((item: EducationItem, index: number) => (
            <div
              key={index}
              className="bg-[var(--white)] rounded-[20px] px-[15px] py-[13px] flex flex-col gap-[8px] text-[var(--main-back)]"
            >
              <div className="flex justify-between items-center text-[13px] sm:text-[14px] md:text-[15px] gap-[8px]">
                <span
                  className="px-[12px] sm:px-[15px] py-[5px] text-[16px] sm:text-[18px] md:text-[20px] rounded-[15px] bg-[var(--gray-3)] text-[var(--white)]"
                >
                  {item.period}
                </span>
                <span className="text-[14px] sm:text-[15px] md:text-[16px]">
                  {item.degree}
                </span>
              </div>
              <div className="text-[13px] sm:text-[14px] md:text-[14px]">
                {item.institution}
              </div>
              <div className="font-semibold text-[16px] sm:text-[17px] md:text-[18px]">
                {item.specialization}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right tab */}
      <div className="flex-3 flex flex-col gap-[32px] md:gap-[40px] pt-[20px] md:pt-0">
        <div>
          <h3
            className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[40px] font-bold mb-[20px] md:mb-[24px] leading-[1.1] text-[var(--white)]"
          >
            {t("experience.title")}
          </h3>
          <div className="space-y-[16px] md:space-y-[20px]">
            <div className="w-full">
              <div className="flex justify-between items-center mb-[12px] md:mb-[16px] w-full gap-[10px]">
                <div>
                  <Image
                    src="/images/about/last_logo.png"
                    alt="last_logo"
                    width={200}
                    height={106}
                    className="max-w-[110px] sm:max-w-[125px] md:max-w-[135px]"
                  />
                </div>
                <div className="border-l-[1px] border-b-[1px] border-[var(--white)] px-[8px] md:px-[10px] py-[4px] font-semibold text-center text-[12px] sm:text-[13px] md:text-[18px]">
                  {t("experience.active")}
                </div>
              </div>
              <div className="text-[18px] sm:text-[19px] md:text-[20px] font-bold mb-[4px] text-[var(--white)] flex flex-col">
                <span>{t("experience.current.position")}</span>
                <span className="text-[13px] sm:text-[14px] md:text-[15px] text-[var(--gray-4)] font-semibold">
                  {t("experience.current.type")} · {t("experience.current.company")}
                </span>
              </div>

              <ul className="space-y-[6px] md:space-y-[8px] text-[16px] sm:text-[18px] md:text-[20px] text-[var(--white)] list-disc pl-[20px]">
                {t.raw("experience.current.description").map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
