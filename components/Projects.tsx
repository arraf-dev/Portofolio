import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectMedia from "@/components/ProjectMedia";
import Tilt from "@/components/Tilt";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-y border-line bg-tint">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
      <p className="mb-3 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.1em] text-accent">
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
        01 — PROJECT
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Studi Kasus &amp; Project
      </h2>
      <p className="mt-3 max-w-[680px] text-base leading-relaxed text-muted">
        Beberapa sistem yang saya bangun untuk membantu pengelolaan data,
        administrasi, dan layanan informasi.
      </p>

      <div className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {projects.map((project) => (
          <Tilt key={project.slug} className="h-full">
          <article
            className="flex h-full flex-col rounded-2xl border-[1.5px] border-line bg-card p-6 shadow-sm transition-[border-color,box-shadow] hover:border-accent hover:shadow-md sm:p-[30px]"
          >
            <ProjectMedia project={project} className="mb-5" />

            <p className="text-xs font-bold uppercase tracking-[0.08em] text-accent">
              {project.category}
            </p>
            <h3 className="mt-2 font-display text-[21px] font-extrabold">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-faint">
              Untuk: {project.audience}
            </p>

            <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed">
              <div>
                <h4 className="font-bold text-ink">Masalah</h4>
                <p className="mt-1 text-ink/70">{project.problem}</p>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-ink">Solusi</h4>
                <p className="mt-1 text-ink/70">{project.solution}</p>
              </div>
            </div>

            <div
              className="mt-5 flex flex-wrap gap-2"
              aria-label={`Teknologi ${project.title}`}
            >
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-ink/[0.06] px-3 py-[5px] text-xs font-semibold text-ink/75"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href={`/studi-kasus/${project.slug}`}
                className="text-sm font-bold text-accent hover:underline"
              >
                Lihat Studi Kasus →
              </Link>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-ink/65 hover:underline"
                >
                  Lihat Demo ↗
                </a>
              ) : null}
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-ink/65 hover:underline"
                >
                  Lihat Kode ↗
                </a>
              ) : null}
            </div>
          </article>
          </Tilt>
        ))}
      </div>
      </div>
    </section>
  );
}
