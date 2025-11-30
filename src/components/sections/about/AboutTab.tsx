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
    <div className="w-full flex flex-col lg:flex-row gap-[60px] lg:gap-[20px]">
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
                <span className="px-[15px] py-[5px] text-[20px] rounded-[15px] bg-[var(--gray-3)] text-white">{item.period}</span>
                <span className="text-[16px]">{item.degree}</span>
              </div>
              <div className="text-[14px]">{item.institution}</div>
              <div className="font-semibold text-[18px]">{item.specialization}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-[60px] pt-[20px] md:pt-0">
        <div>
          <h3 className="text-[40px] font-bold mb-[24px] leading-[1.1] text-white">{t("experience.title")}</h3>
          <div className="space-y-[20px]">
            <div className="w-full">
              <div className="flex justify-between items-center mb-[16px] w-full gap-[10px]">
                <div className="">
                  <Image
                    src="/images/about/last_logo.png"
                    alt="last_logo"
                    width={200}
                    height={106}
                    className="max-w-[135px]"
                  />
                </div>
                <div className="border-l-[1px] border-b-[1px] border-[var(--white)] px-[10px] font-semibold text-center">
                  {t("experience.active")}
                </div>
              </div>
              <div className="text-[20px] font-bold mb-[4px] text-white flex flex-col">
                <span>{t("experience.current.position")}</span>
                <span className="text-[15px] text-[var(--gray-4)] font-semibold">
                  {t("experience.current.type")} · {t("experience.current.company")}
                </span>
              </div>

              <ul className="space-y-[8px] text-[20px] text-[var(--white)] list-disc pl-[20px]">
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