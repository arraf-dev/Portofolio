import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectMediaProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

export default function ProjectMedia({
  project,
  className = "",
  priority = false,
}: ProjectMediaProps) {
  const screenshot = project.screenshots[0];

  if (!screenshot) {
    return (
      <div
        className={`flex aspect-video w-full items-center justify-center rounded-lg border-[1.5px] border-line bg-paper px-5 text-center ${className}`}
        role="img"
        aria-label={`Screenshot ${project.title} belum tersedia`}
      >
        <div>
          <p className="font-display text-lg font-extrabold text-ink">
            {project.title}
          </p>
          <p className="mt-1.5 text-sm text-faint">
            Screenshot segera tersedia
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={screenshot.src}
      alt={screenshot.alt}
      width={screenshot.width}
      height={screenshot.height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, 640px"
      className={`aspect-video w-full rounded-lg border-[1.5px] border-line object-cover ${className}`}
    />
  );
}
