"use client";

import Image from "next/image";

import type { Project } from "@/types";

type Props = {
	project: Project | null;
	onClose: () => void;
	techStackLabel: string;
	buttonLabel: string;
	closeLabel: string;
};

const ProjectModal = ({
	                      project,
	                      onClose,
	                      techStackLabel,
	                      buttonLabel,
	                      closeLabel,
}: Props) => {
  if (!project) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-[rgba(0,0,0,0.6)]
        flex items-center justify-center
        z-[50]
      "
      onClick={onClose}
    >
      <div
        className="
          bg-[var(--gray-1)]
          rounded-[24px]
          max-w-[720px]
          w-[90%]
          max-h-[80vh]
          overflow-y-auto
          p-[24px]
          text-[var(--white)]
          relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закриття */}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="
            absolute right-[16px] top-[12px]
            text-[20px]
            text-[var(--white)]
          "
        >
					✕
        </button>

        <h2 className="text-[24px] font-semibold mb-[12px]">
          {project.title}
        </h2>

        <div className="w-full mb-[16px] rounded-[16px] overflow-hidden bg-[var(--gray-2)]">
          <div className="relative w-full h-[260px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <p className="text-[16px] leading-[24px] mb-[12px]">
          {project.description}
        </p>

        <div className="text-[14px] leading-[20px] mb-[16px] text-[var(--gray-4)]">
          {techStackLabel}: {project.techStack}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center
              px-[18px] py-[10px]
              rounded-[999px]
              bg-[var(--main-first)]
              text-[14px]
              font-semibold
              text-[var(--white)]
              hover:opacity-[0.9]
              transition-all duration-200
            "
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
