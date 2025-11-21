// src/components/sections/about/AboutTab.tsx
"use client";

import { useTranslations } from "next-intl";

import { EducationItem, ExperienceItem } from "@/types";

const AboutTab = () => {
  const t = useTranslations("home.about");

  const educationItems: EducationItem[] = t.raw("education.items");
  const pastExperience: ExperienceItem[] = t.raw("experience.past");

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col gap-[60px] pr-0 md:pr-[20px] pb-[20px] md:pb-0">
        {/* ЛІВА КОЛОНКА - Заголовок + опис */}
        <div className="flex flex-col gap-[32px]">
          <h2 className="text-[48px] font-bold leading-[1.1] text-white">
            {t("leftColumnTitle")}
          </h2>
          <div className="text-[18px] leading-[32px] text-[#A7A7A7] space-y-[20px]">
            <p>{t("leftColumnDescription.0")}</p>
            <p>{t("leftColumnDescription.1")}</p>
            <p>{t("leftColumnDescription.2")}</p>
          </div>
        </div>

        {/* Контакти */}
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[24px] font-bold text-white">{t("contact.title")}</h3>
          <div className="text-[18px] text-[#A7A7A7] space-y-[10px]">
            <p>{t("contact.phone")}</p>
            <p>{t("contact.email")}</p>
            <p>{t("contact.location")}</p>
            <p>
              <a href={`https://linkedin.com/in/${t("contact.linkedin")}`} target="_blank" rel="noopener noreferrer"
							   className="text-[#E85002] hover:underline">
                {t("contact.linkedin")}
              </a>
            </p>
            <p>
              <a href="#" className="text-[#E85002] hover:underline">
                {t("contact.portfolio")}
              </a>
            </p>
          </div>
        </div>

        {/* Мови */}
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[24px] font-bold text-white">{t("language.title")}</h3>
          <div className="text-[18px] text-[#A7A7A7] space-y-[10px]">
            <p>{t("language.english")}</p>
            <p>{t("language.ukrainian")}</p>
            <p>{t("language.polish")}</p>
          </div>
        </div>
      </div>

      {/* СЕРЕДНЯ КОЛОНКА — Освіта */}
      <div className="flex-1 flex flex-col gap-[60px] px-0 md:px-[20px] py-[20px] md:py-0

			  border-[var(--gray-3)]

			  border-t-4 border-b-4 border-l-0 border-r-0

			  md:border-t-0 md:border-b-0 md:border-l-4 md:border-r-4
			">
        {/* Освіта */}
        <div>
          <h3 className="text-[24px] font-bold mb-[24px] text-white">{t("education.title")}</h3>
          <div className="space-y-[20px]">
            {educationItems.map((item: EducationItem, index: number) => ( // Використовуємо EducationItem
              <div key={index}
							     className="bg-white/10 backdrop-blur-sm rounded-[24px] px-[20px] py-[20px] border border-white/10 flex flex-col gap-[8px]">
                <div className="flex justify-between items-center text-[15px] text-[#A7A7A7]">
                  <span>{item.period}</span>
                  <span className="text-[#E85002] font-bold text-[16px]">{item.degree}</span>
                </div>
                <div className="font-semibold text-[18px] text-white">{item.institution}</div>
                <div className="text-[14px] text-[#A7A7A7]">{item.specialization}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Навички */}
        <div>
          <h3 className="text-[24px] font-bold mb-[24px] text-white">{t("skills.title")}</h3>
          <div className="flex flex-wrap gap-[10px]">
            {t.raw("skills.frontend").map((skill: string, index: number) => (
              <span key={index}
							      className="bg-white/5 text-[#A7A7A7] text-[14px] px-[12px] py-[6px] rounded-full border border-white/10">
                {skill}
              </span>
            ))}
            {t.raw("skills.backend").map((skill: string, index: number) => (
              <span key={index}
							      className="bg-white/5 text-[#A7A7A7] text-[14px] px-[12px] py-[6px] rounded-full border border-white/10">
                {skill}
              </span>
            ))}
            {t.raw("skills.tools").map((skill: string, index: number) => (
              <span key={index}
							      className="bg-white/5 text-[#A7A7A7] text-[14px] px-[12px] py-[6px] rounded-full border border-white/10">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ПРАВА КОЛОНКА — Досвід роботи */}
      <div className="flex-1 flex flex-col gap-[60px] pl-0 md:pl-[20px] pt-[20px] md:pt-0">
        {/* Останнє місце роботи */}
        <div>
          <h3 className="text-[24px] font-bold mb-[24px] text-white">{t("experience.title")}</h3>
          <div className="space-y-[20px]">
            {/* Поточна позиція */}
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

            {/* Попередні місця роботи */}
            {pastExperience.map((job: ExperienceItem, index: number) => ( // Використовуємо ExperienceItem
              <div key={index}
							     className="bg-white/10 backdrop-blur-sm rounded-[24px] px-[20px] py-[20px] border border-white/10">
                <div className="text-[15px] text-[#A7A7A7] mb-[16px]">{job.period}</div>
                <div className="text-[20px] font-bold mb-[4px] text-white">{job.position}</div>
                <div className="text-[16px] text-[#E85002] mb-[16px]">{job.company}</div>
                <ul className="space-y-[8px] text-[15px] text-[#A7A7A7] list-disc pl-[20px]">
                  {job.description.map((item: string, descIndex: number) => (
                    <li key={descIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;