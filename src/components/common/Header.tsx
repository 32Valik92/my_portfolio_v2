"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Link } from "@/i18n/navigation";

const Header = () => {
  const t = useTranslations("header");
  // state for open or close our menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // function for open or close our menu
  const toggleMenu = () => setIsOpen((prevState) => !prevState);
  // function for close our menu
  const closeMenu = () => setIsOpen(false);
    
  return (
    <header className="w-full flex justify-center bg-[var(--main-back)]">
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
        <nav className="hidden md:flex items-center gap-[80px]">
          <Link href="/" className="text-[25px] text-[var(--white)] hover:opacity-70">
            {t("home")}
          </Link>

          <Link href="/about" className="text-[25px] text-[var(--white)] hover:opacity-70">
            {t("about")}
          </Link>

          <Link href="/skills" className="text-[25px] text-[var(--white)] hover:opacity-70">
            {t("skills")}
          </Link>

          <Link href="/projects" className="text-[25px] text-[var(--white)] hover:opacity-70">
            {t("projects")}
          </Link>

          <Link
            href="/contact"
            className="bg-[var(--main-first)] text-[var(--white)] font-bold text-[25px] px-[20px] py-[10px] rounded-[12px] hover:opacity-90"
          >
            {t("contact")}
          </Link>
        </nav>
        {/* ======= end DESKTOP HEADER ======= */}


        {/* ======= MOBILE HEADER ======= */}
        {/* burger for open menu only mobile */}
        <button
          type="button"
          onClick={toggleMenu}
          className="flex md:hidden items-center justify-center w-[32px] h-[32px] rounded-[8px] bg-[var(--main-back)]"
          aria-label="Toggle navigation"
        >
          {/* burger by 3 lines */}
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
            ${isOpen ? "opacity-100 translate-y-[0px] pointer-events-auto" : "opacity-0 translate-y-[-20px] pointer-events-none"}
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

            {/* button close lice x */}
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

          {/* mob navigation with menu items and slow show effect with transition and delay */}
          <nav className="px-[16px] pt-[18px]">
            <Link
              href="/"
              onClick={closeMenu}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "120ms" : "0ms",
              }}
            >
              {t("home")}
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "220ms" : "0ms",
              }}
            >
              {t("about")}
            </Link>

            <Link
              href="/skills"
              onClick={closeMenu}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "320ms" : "0ms",
              }}
            >
              {t("skills")}
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className={`
                block text-[18px] text-[var(--white)] py-[8px] font-medium tracking-[0.5px] transition-opacity duration-[350ms]
                ${isOpen ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transitionDelay: isOpen ? "420ms" : "0ms",
              }}
            >
              {t("projects")}
            </Link>

            <Link
              href="/contact"
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
          </nav>
        </div>
        {/* ======= end MOBILE HEADER ======= */}
      </div>
    </header>
  );
};

export default Header;