"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/types";

type Props = {
  project: Project | null;
  onClose: () => void;
  techStackLabel: string;
};

const ProjectModal = ({
  project,
  onClose,
  techStackLabel,
}: Props) => {
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isGithubHovered, setIsGithubHovered] = useState(false);

  useEffect(() => {
    if (!project) return;

    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.65)] backdrop-blur-[6px] flex sm:block md:flex md:items-center md:justify-center"
      onClick={onClose}
    >
      <div
        className="w-full sm:mt-[20px] md:mt-0 md:mb-0 px-[12px] sm:px-[16px] md:w-auto md:max-w-[920px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[var(--white)] text-[var(--black)] rounded-[22px] overflow-hidden animate-fadeIn shadow-[inset_1px_4px_5.3px_0px_#00000040] max-h-[92vh] overflow-y-auto">
          {/* HEADER */}
          <div className="flex justify-end p-[15px]">
            <Image
              src="/images/about/projects/close.svg"
              alt="close"
              width={25}
              height={24}
              onClick={onClose}
              className="w-[25px] h-[24px] cursor-pointer hover:scale-[1.05] transition-all duration-200"
            />
          </div>

          {/* CONTENT */}
          <div className="px-[16px] pb-[30px] space-y-[35px]">
            <div className="flex flex-col md:flex-row gap-[22px] p-[15px] shadow-[inset_1px_4px_5.3px_0px_#00000040] bg-[var(--gray-3)] rounded-[20px]">
              {/* IMAGE */}
              <div className="flex-1 rounded-[18px] overflow-hidden bg-[var(--gray-2)]">
                <div className="relative w-full h-[240px] md:h-[100%] min-h-[260px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-[12px] w-full md:w-[50%] justify-around">
                {/* TITLE + LINKS */}
                <div className="flex flex-col gap-[10px]">
                  <h2 className="font-semibold text-[28px] leading-[1] md:text-[40px]">
                    {project.title}
                  </h2>

                  {/* Links */}
                  <div className="flex items-center gap-[14px] mt-[4px]">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-[40px] h-[40px] hover:scale-[1.05] transition-all duration-200"
                        onMouseEnter={() => setIsLinkHovered(true)}
                        onMouseLeave={() => setIsLinkHovered(false)}
                      >
                        <Image
                          src={
                            isLinkHovered
                              ? "/images/about/projects/link_hover.svg"
                              : "/images/about/projects/link.svg"
                          }
                          alt="link"
                          width={50}
                          height={50}
                        />
                      </Link>
                    )}

                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] hover:scale-[1.05] transition-all duration-200"
                        onMouseEnter={() => setIsGithubHovered(true)}
                        onMouseLeave={() => setIsGithubHovered(false)}
                      >
                        <Image
                          src={
                            isGithubHovered
                              ? "/images/about/projects/git_hover.svg"
                              : "/images/about/projects/git.svg"
                          }
                          alt="github"
                          width={50}
                          height={50}
                        />
                      </Link>
                    )}
                  </div>
                </div>

                {/* TECH STACK */}
                <div>
                  <div className="text-[20px] md:text-[25px] uppercase font-semibold mb-[15px] md:mb-[20px]">
                    {techStackLabel}
                  </div>

                  <div className="flex flex-wrap gap-[10px]">
                    {project.techStack.map((item, i) => (
                      <p
                        key={i}
                        className="bg-[var(--gray-1)] rounded-[18px] px-[10px] py-[3px] text-[16px] md:text-[20px] leading-[1] text-center hover:scale-[1.05] cursor-pointer transition-all duration-200"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-[15px]">
              {project.description.map((p, i) => (
                <p
                  key={i}
                  className="text-[18px] md:text-[25px] text-[#000000] leading-[1.2]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
