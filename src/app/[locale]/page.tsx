import Image from "next/image";
import { useTranslations } from "next-intl";

import Section from "@/components/common/Section";

export default function HomePage(){
  const t = useTranslations("home");

  return (
    <div className="relative w-full">
      <Image
        src="/images/hero/hero_bg.png"
        alt="hero left"
        height={1286}
        width={475}
        className="w-full absolute left-0 top-0"
      />
      
      <Section id="hero" className="pt-[80px] pb-[80px]">
        <div className="flex flex-col gap-[16px]">
          <span className="text-[14px] tracking-[2px] uppercase text-[var(--white)]">
            {t("label")}
          </span>

          <h1 className="text-[40px] leading-[44px] font-semibold">
            {t("title")}
          </h1>

          <p className="max-w-[600px] text-[16px] leading-[24px] text-[var(--white)]">
            {t("description")}
          </p>
        </div>
      </Section>
    </div>
  );
}