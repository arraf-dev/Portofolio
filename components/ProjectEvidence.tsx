import type { Project } from "@/data/projects";

export default function ProjectEvidence({ project }: { project: Project }) {
  if (!project.testimonial && !project.outcomes?.length) return null;

  return (
    <section
      aria-labelledby="bukti-proyek"
      className="rounded-2xl border-[1.5px] border-line bg-card p-6 sm:p-8"
    >
      <h2
        id="bukti-proyek"
        className="font-display text-2xl font-extrabold tracking-tight"
      >
        Hasil &amp; Bukti Proyek
      </h2>

      {project.outcomes?.length ? (
        <ul className="mt-5 space-y-3">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3 leading-relaxed text-muted">
              <span aria-hidden="true" className="font-bold text-accent">
                ✓
              </span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {project.testimonial ? (
        <figure className="mt-6 border-l-4 border-accent pl-5">
          <blockquote className="text-[17px] leading-relaxed text-ink/85">
            “{project.testimonial.quote}”
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-muted">
            {project.testimonial.author}
            {project.testimonial.role ? ` — ${project.testimonial.role}` : ""}
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}
