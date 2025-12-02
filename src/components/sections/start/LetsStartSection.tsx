"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import LetsStart3DText from "@/components/sections/start/LetsStart3DText";
import { Link } from "@/i18n/navigation";

const LetsStartSection = () => {
  const t = useTranslations("home.start");

  return (
    <section className="w-full flex justify-center sm:py-[80px]">
      <div className="mb-[50px] md:mb-0 w-full max-w-[1400px] flex flex-col lg:flex-row justify-center items-center md:items-start md:justify-around gap-[40px] sm:px-[24px] md:px-[40px]">

        {/* LET'S START */}
        <div className="md:order-2 flex flex-col items-center lg:items-end text-center lg:text-right">
          <LetsStart3DText />
        </div>

        {/* Second  part */}
        <div className="md:order-1 flex flex-col justify-center items-center p-[6px]  bg-[var(--white)] text-[var(--main-back)] rounded-[42px] w-[300px] sm:w-[340px] md:w-[440px] overflow-hidden">
          <div className="relative w-full">
            <Image
              src="/images/contact/contact_me.png"
              alt={t("photoAlt")}
              width={439}
              height={439}
              className="w-full"
              priority
            />
          </div>

          <div className="w-full px-[20px] pt-[16px] pb-[18px] flex flex-col gap-[12px]">
            <div className="text-[20px] sm:text-[22px] font-[700]">
              {t("name")}
            </div>

            <div className="flex flex-col gap-[8px] text-[14px] sm:text-[15px]">
              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/contact/linkedin.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
                <Link
                  href={t("linkedin.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-[0.8] hover:text-[var(--main-first)] hover:scale-[1.05] transition-all duration-200"
                >
                  {t("linkedin.label")}
                </Link>
              </div>

              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/contact/email.svg"
                  alt="Email"
                  width={20}
                  height={20}
                />
                <Link
                  href={`mailto:${t("email")}`}
                  className="hover:opacity-[0.8] hover:text-[var(--main-first)] hover:scale-[1.05] transition-all duration-200"
                >
                  {t("email")}
                </Link>
              </div>

              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/contact/whatsapp.svg"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                />
                <span className="hover:text-[var(--main-first)] hover:scale-[1.05]">{t("whatsapp")}</span>
              </div>

              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/contact/telegram.svg"
                  alt="Telegram"
                  width={20}
                  height={20}
                />
                <Link
                  href={t("telegram_url")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-[0.8] hover:text-[var(--main-first)] hover:scale-[1.05] transition-all duration-200"
                >
                  {t("telegram")}
                </Link>
              </div>

              <div className="flex items-center gap-[10px]">
                <Image
                  src="/images/contact/github.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
                />
                <Link
                  href={t("github.url")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-[0.8] hover:text-[var(--main-first)] hover:scale-[1.05] transition-all duration-200"
                >
                  {t("github.label")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsStartSection;
