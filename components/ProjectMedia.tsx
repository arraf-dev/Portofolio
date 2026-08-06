import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectMediaProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

// ponytail: icon inline per slug, bukan library — cuma 3 project.
// Screenshot asli belum ada (2 dari 3 project tidak di-hosting), jadi
// tampilan default adalah icon, bukan kotak placeholder kosong.
const icons: Record<string, React.ReactNode> = {
  "docuverify-uny": (
    <>
      <path d="M14 3v5h5" />
      <path d="M19 12V8l-5-5H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6" />
      <path d="m15 18 2 2 4-4" />
    </>
  ),
  tanisync: (
    <>
      <path d="M12 21V11" />
      <path d="M12 11c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" />
      <path d="M12 14c-3.3 0-6-2.7-6-6 3.3 0 6 2.7 6 6Z" />
    </>
  ),
  "chatbot-kesehatan-mental": (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
      <path d="M9 11h.01M13 11h.01" />
    </>
  ),
};

const fallbackIcon = (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m9 10-2 2 2 2M15 10l2 2-2 2" />
  </>
);

export default function ProjectMedia({
  project,
  className = "",
  priority = false,
}: ProjectMediaProps) {
  const screenshot = project.screenshots[0];

  if (!screenshot) {
    return (
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-tint text-accent ${className}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {icons[project.slug] ?? fallbackIcon}
        </svg>
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
