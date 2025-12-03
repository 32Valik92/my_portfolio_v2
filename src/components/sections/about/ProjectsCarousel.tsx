"use client";

import "swiper/css";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Project } from "@/types";

type Props = {
  projects: Project[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onProjectClick: (_project: Project) => void;
};

const ProjectsCarousel = ({
  projects,
  activeIndex,
  setActiveIndex,
  onProjectClick,
}: Props) => {
  const t = useTranslations("home.about.projects");

  const total = projects.length;
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (!total) return;
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    if (!total) return;
    swiperRef.current?.slidePrev();
  };

  const handleSelectProject = (project: Project, index: number) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
    onProjectClick(project);
  };

  useEffect(() => {
    if (!swiperRef.current) return;
    if (swiperRef.current.realIndex !== activeIndex) {
      swiperRef.current.slideToLoop(activeIndex);
    }
  }, [activeIndex]);

  if (!total) {
    return (
      <div className="w-full flex justify-center items-center min-h-[200px] text-[18px] text-[var(--gray-4)]">
        {t("no_items")}
      </div>
    );
  }

  return (
    <>
      {/* Carousel (Swiper) */}
      <div className="w-full flex justify-center min-h-[345px]">
        <Swiper
          onSwiper={(swiperInstance) => {
            swiperRef.current = swiperInstance;
          }}
          initialSlide={activeIndex}
          loop={true}
          onSlideChange={(swiperInstance) => {
            setActiveIndex(swiperInstance.realIndex);
          }}
          slidesPerView={1}
          spaceBetween={24}
          centeredSlides
          breakpoints={{
            640: {
              slidesPerView: 3,
              centeredSlides: true,
            },
          }}
          className="w-full flex justify-center"
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide
                key={project.slug}
                className="group flex flex-col items-start gap-[5px] !w-auto"
              >
                {/* Card */}
                <div
                  onClick={() => handleSelectProject(project, index)}
                  className={`cursor-pointer relative overflow-hidden rounded-[32px] bg-[var(--gray-2)] border-[2px] border-[var(--gray-2)]
                    ${
              isActive
                ? "w-[290px] h-[260px] sm:w-[520px] sm:h-[320px]"
                : "w-[290px] h-[260px] sm:w-[260px] sm:h-[260px]"
              }
                    flex-shrink-0
                    transition-all duration-300
                    ${
              isActive
                ? "scale-[1] filter-none opacity-[1]"
                : "scale-[0.9] opacity-[0.7] blur-[2px]"
              }
                    hover:scale-[1.02] hover:opacity-[1] hover:blur-[0px]
                  `}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />

                  <div
                    className={`absolute right-[20px] bottom-[20px] ${
                      isActive ? "z-[20]" : "z-0"
                    }`}
                  >
                    <div className="w-[40px] h-[40px]">
                      <Image
                        src="/images/about/projects/go-project.svg"
                        alt="open project"
                        width={40}
                        height={40}
                        className="transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="absolute w-full left-0 right-0 bottom-0 translate-y-[100%] group-hover:translate-y-[0%] transition-all duration-300 bg-[rgba(0,0,0,0.85)] text-[var(--white)] px-[16px] py-[14px] text-left z-[4]">
                    <div className="text-[14px] leading-[20px] w-[85%]">
                      {project.shortDescription}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div
                  className={`text-[16px] leading-[20px] font-semibold text-[var(--white)] text-center w-full transition-all duration-300
                    ${
              isActive
                ? ""
                : "blur-[2px] group-hover:blur-[0px]"
              }
                  `}
                >
                  {project.title}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Pagination / controls */}
      <div className="flex flex-row items-center gap-[16px] mt-[8px]">
        {/* Prev */}
        <button
          type="button"
          onClick={handlePrev}
          className="w-[60px] h-[34px] rounded-full bg-[var(--main-first)] flex items-center justify-center hover:scale-[1.1] transition-all duration-200 cursor-pointer"
        >
          <Image
            src="/images/about/projects/prev-project.svg"
            alt="prev"
            width={60}
            height={34}
          />
        </button>

        {/* Dots */}
        <div className="flex flex-row items-center gap-[8px]">
          {projects.map((_, index) => {
            const isActiveDot = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-[9px] rounded-[3px] border-[2px] border-[var(--white)] transition-all duration-200
                  ${
              isActiveDot
                ? "w-[30px] bg-[var(--white)]"
                : "w-[12px] bg-[var(--gray-1)]"
              }
                `}
              />
            );
          })}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={handleNext}
          className="w-[60px] h-[34px] rounded-full bg-[var(--main-first)] flex items-center justify-center hover:scale-[1.1] transition-all duration-200 cursor-pointer"
        >
          <Image
            src="/images/about/projects/next-project.svg"
            alt="next"
            width={60}
            height={34}
          />
        </button>
      </div>
    </>
  );
};

export default ProjectsCarousel;
