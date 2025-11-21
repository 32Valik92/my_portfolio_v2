"use client";

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
    <div className="w-full flex flex-col lg:flex-row gap-[60px] lg:gap-[40px]">
      <div className="flex-2 flex flex-col gap-[60px] pr-0 md:pr-[20px] pb-[20px] md:pb-0">

        <div className="flex flex-col gap-[32px]">
          <h2 className="text-[48px] font-semibold leading-[1.1] text-[var(--white)]">
            {t("leftColumnTitle")}
          </h2>
          <div className="text-[25px] leading-[32px] text-[#FFFFFF] space-y-[15px]">
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-[40px] px-0 md:px-[20px] py-[20px] md:py-0 border-[var(--gray-3)] border-t-4 border-b-4 border-l-0 border-r-0 md:border-t-0 md:border-b-0 md:border-l-4 md:border-r-4">
        <h3 className="text-[24px] font-bold text-white">{t("education.title")}</h3>
        <div className="space-y-[45px]">
          {educationItems.map((item: EducationItem, index: number) => (
            <div key={index}
							     className="bg-[var(--white)] rounded-[20px] px-[15px] py-[13px] flex flex-col gap-[8px] text-[var(--main-back)]">
              <div className="flex justify-between items-center text-[15px]">
                <span>{item.period}</span>
                <span className="font-bold text-[16px]">{item.degree}</span>
              </div>
              <div className="font-semibold text-[18px]">{item.institution}</div>
              <div className="text-[14px]">{item.specialization}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-[60px] pl-0 md:pl-[20px] pt-[20px] md:pt-0">
        <div>
          <h3 className="text-[24px] font-bold mb-[24px] text-white">{t("experience.title")}</h3>
          <div className="space-y-[20px]">
            <div className="bg-white/10 backdrop-blur-sm rounded-[24px] px-[20px] py-[20px] border border-white/10">
              <div className="flex justify-between items-center mb-[16px]">
                <div className="text-[15px] text-[#A7A7A7]">{t("experience.current.period")}</div>
                <div className="bg-[#E85002]/20 text-[#E85002] text-[13px] px-[12px] py-[4px] rounded-full">
									Активна позиція
                </div>
              </div>
              <div className="text-[20px] font-bold mb-[4px] text-white">{t("experience.current.position")}</div>
              <div
                className="text-[16px] text-[#E85002] mb-[16px]">{t("experience.current.type")} · {t("experience.current.company")}</div>
              <ul className="space-y-[8px] text-[15px] text-[#A7A7A7] list-disc pl-[20px]">
                {t.raw("experience.current.description").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;