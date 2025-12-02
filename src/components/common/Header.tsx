"use client";

import Image from "next/image";
import { useLocale,useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";

const Header = () => {
  const t = useTranslations("header");
  const locale = useLocale();

  // state for open or close our menu
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);

  // function for open or close our menu
  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  // function for close our menu
  const closeMenu = () => setIsOpen(false);

  // LANG SWITCHER DATA
  const languages: { code: Locale; label: string; flag: string }[] = [
    {
      code: "uk",
      label: t("languages.uk"),
      flag: "/images/lng_flags/uk.png",
    },
    {
      code: "en",
      label: t("languages.en"),
      flag: "/images/lng_flags/en.png",
    },
    {
      code: "de",
      label: t("languages.de"),
      flag: "/images/lng_flags/de.png",
    },
    {
      code: "pl",
      label: t("languages.pl"),
      flag: "/images/lng_flags/pl.png",
    },
  ];

  const currentLang =
    languages.find((l) => l.code === locale) ?? languages[0];

  const toggleLangMenu = () =>
    setIsLangOpen((prev) => !prev);
  const closeLangMenu = () => setIsLangOpen(false);

  // 🔽 допоміжна функція для плавного скролу
  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 🔗 обробник кліків по меню
  const handleNavClick = (
    target: "home" | "about" | "skills" | "projects",
    fromMobile?: boolean,
  ) => {

    if (fromMobile) {
      closeMenu();
    }

    if (typeof window === "undefined") return;

    if (target === "home") {
      // Вгору сторінки
      window.history.replaceState(null, "", "#");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Для всіх трьох пунктів скролимо до about-section
    let hash = "#about";

    if (target === "skills") hash = "#skills";
    if (target === "projects") hash = "#projects";

    window.location.hash = hash; // це тригерне hashchange → AboutSection сам поміняє таб
    scrollToSection("about-section");
  };

  return (
    <header className="w-full flex justify-center bg-[var(--main-back)] h-auto md:h-[90px]">
      <div className="relative w-full max-w-[1400px] flex items-center justify-between px-[16px] py-[16px]">
        <div className="flex flex-col leading-[23px]">
          <span className="text-[28px] font-semibold text-[var(--white)] tracking-[1px]">
            VALENTYN
          </span>
          <span className="text-[28px] font-semibold text-[var(--white)] tracking-[1px]">
            STRUKALO
          </span>
        </div>

        {/* ======= DESKTOP HEADER ======= */}
        <nav className="hidden md:flex items-center gap-[40px]">
          <div
            onClick={() => handleNavClick("home")}
            className="text-[25px] text-[var(--white)] hover:opacity-70 cursor-pointer"
          >
            {t("home")}
          </div>

          <div
            onClick={() => handleNavClick("about")}
            className="text-[25px] text-[var(--white)] hover:opacity-70 cursor-pointer"
          >
            {t("about")}
          </div>

          <div
            onClick={() => handleNavClick("skills")}
            className="text-[25px] text-[var(--white)] hover:opacity-70 cursor-pointer"
          >
            {t("skills")}
          </div>

          <div
            onClick={() => handleNavClick("projects")}
            className="text-[25px] text-[var(--white)] hover:opacity-70 cursor-pointer"
          >
            {t("projects")}
          </div>

          {/* LANG SWITCHER (desktop) */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleLangMenu}
              className="
                flex items-center gap-[8px]
                px-[12px] py-[6px]
                rounded-[999px]
                border border-[var(--gray-3)]
                bg-[var(--main-back)]
                hover:border-[var(--main-first)]
                hover:bg-[rgba(232,80,2,0.12)]
                transition-all duration-200 cursor-pointer
              "
            >
              <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                <Image
                  src={currentLang.flag}
                  alt={currentLang.label}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[16px] text-[var(--white)] uppercase tracking-[1px]">
                {currentLang.code}
              </span>
            </button>

            {isLangOpen && (
              <div
                className="
                  absolute right-0 mt-[8px]
                  min-w-[160px]
                  rounded-[16px]
                  bg-[var(--main-back)]
                  border border-[var(--gray-3)]
                  shadow-[0_8px_18px_rgba(0,0,0,0.45)]
                  py-[8px]
                  z-[60]
                "
              >
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href="/"
                    locale={lang.code}
                    onClick={() => {
                      closeLangMenu();
                    }}
                    className="
                      flex items-center gap-[10px]
                      px-[12px] py-[8px]
                      hover:bg-[rgba(232,80,2,0.16)]
                      transition-colors duration-150
                    "
                  >
                    <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                      <Image
                        src={lang.flag}
                        alt={lang.label}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[14px] text-[var(--white)]">
                      {lang.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="#lets-start-section"
            className="bg-[var(--main-first)] text-[var(--white)] font-bold text-[25px] px-[20px] py-[10px] rounded-[12px] hover:opacity-90"
          >
            {t("contact")}
          </Link>
        </nav>
        {/* ======= end DESKTOP HEADER ======= */}

        {/* ======= MOBILE HEADER ======= */}
        <button
          type="button"
          onClick={toggleMenu}
          className="flex md:hidden items-center justify-center w-[32px] h-[32px] rounded-[8px] bg-[var(--main-back)]"
          aria-label="Toggle navigation"
        >
          <div className="relative w-[18px] h-[14px]">
            <span
              className={`absolute left-0 right-0 h-[2px] bg-[var(--white)] transition-transform duration-[260ms] ${
                isOpen ? "top-[6px] rotate-[45deg]" : "top-[0px]"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-[2px] bg-[var(--white)] transition-opacity duration-[220ms] ${
                isOpen ? "opacity-0" : "top-[6px] opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-[2px] bg-[var(--white)] transition-transform duration-[260ms] ${
                isOpen ? "top-[6px] rotate-[-45deg]" : "top-[12px]"
              }`}
            />
          </div>
        </button>

        {/* open mob menu */}
        <div
          className={`
            fixed inset-0 z-[40] md:hidden bg-[var(--main-back)] transition-transform duration-[320ms] ease-out
            ${
    isOpen
      ? "opacity-100 translate-y-[0px] pointer-events-auto"
      : "opacity-0 translate-y-[-20px] pointer-events-none"
    }
          `}
        >
          <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[12px] border-b border-[var(--gray-3)]">
            <div className="flex flex-col leading-[18px]">
              <span className="text-[16px] font-semibold text-[var(--white)] tracking-[1px]">
                VALENTYN
              </span>
              <span className="text-[16px] font-semibold text-[var(--white)] tracking-[1px]">
                STRUKALO
              </span>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-[999px] bg-[var(--main-back)]"
              aria-label="Close navigation"
            >
              <span className="relative w-[14px] h-[14px]">
                <span className="absolute left-0 right-0 top-[6px] h-[2px] bg-[var(--white)] rotate-[45deg]" />
                <span className="absolute left-0 right-0 top-[6px] h-[2px] bg-[var(--white)] rotate-[-45deg]" />
              </span>
            </button>
          </div>

          <nav className="px-[16px] pt-[18px]">
            <div
              onClick={() => handleNavClick("home", true)}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "120ms" : "0ms",
              }}
            >
              {t("home")}
            </div>

            <div
              onClick={() => handleNavClick("about", true)}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "220ms" : "0ms",
              }}
            >
              {t("about")}
            </div>

            <div
              onClick={() => handleNavClick("skills", true)}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "320ms" : "0ms",
              }}
            >
              {t("skills")}
            </div>

            <div
              onClick={() => handleNavClick("projects", true)}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "420ms" : "0ms",
              }}
            >
              {t("projects")}
            </div>

            <Link
              href="#lets-start-section"
              onClick={closeMenu}
              className={`
                mt-[18px] inline-block w-full text-center bg-[var(--main-first)] text-[var(--white)] text-[16px] px-[20px] py-[12px] rounded-[999px] font-medium hover:opacity-90 transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "520ms" : "0ms",
              }}
            >
              {t("contact")}
            </Link>

            {/* LANG SWITCHER (mobile) */}
            <div className="mt-[24px] border-t border-[var(--gray-3)] pt-[16px]">
              <div className="mb-[10px] text-[14px] text-center text-[var(--gray-4)]">
                {t("languages.label")}
              </div>

              <div className="flex flex-wrap gap-[10px] justify-center">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href="/"
                    locale={lang.code}
                    onClick={closeMenu}
                    className={`
                      flex items-center gap-[8px]
                      px-[10px] py-[6px]
                      rounded-[999px]
                      border
                      ${
                  lang.code === locale
                    ? "border-[var(--main-first)] bg-[rgba(232,80,2,0.18)]"
                    : "border-[var(--gray-3)]"
                  }
                    `}
                  >
                    <div className="w-[18px] h-[18px] rounded-full overflow-hidden">
                      <Image
                        src={lang.flag}
                        alt={lang.label}
                        width={18}
                        height={18}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[13px] text-[var(--white)]">
                      {lang.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
        {/* ======= end MOBILE HEADER ======= */}
      </div>
    </header>
  );
};

export default Header;
