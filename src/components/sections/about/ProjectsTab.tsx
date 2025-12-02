"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import type { Project } from "@/types";

import ProjectModal from "./ProjectModal";
import ProjectsCarousel from "./ProjectsCarousel";

const projectCardImages: Record<string, string> = {
  "project-1": "/images/about/projects/placeholder.png",
  "project-2": "/images/projects/project-2.png",
  "project-3": "/images/projects/project-3.png",
  "project-4": "/images/projects/project-3.png",
  "project-5": "/images/projects/project-3.png",
  "project-6": "/images/projects/project-3.png",
};

const ProjectsTab = () => {
  const t = useTranslations("home.about.projects");

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // useMemo for not rerender after click to next or prev
  const projects: Project[] = useMemo(() => {
    const items = t.raw("items") as Omit<Project, "image">[];

    return items.map((item) => ({
      ...item,
      image: projectCardImages[item.slug] || "/images/about/projects/placeholder.png",
    }))
      .filter((item) => !!item.image);
  }, [t]);

  const modalTexts = {
    techStackLabel: t("modal.techStackLabel"),
    buttonLabel: t("modal.buttonLabel"),
    closeLabel: t("modal.closeLabel"),
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-[24px]">
      <ProjectsCarousel
        projects={projects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onProjectClick={handleOpenModal}
      />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
        techStackLabel={modalTexts.techStackLabel}
      />
    </div>
  );
};

export default ProjectsTab;
