import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
export default function Projects() {
  const ordered = [projects[1], projects[0], projects[2]];
  return (
    <section
      id="projects"
      className="section-space site-container scroll-mt-24"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>
            Setiap kebutuhan,
            <br />
            <span className="text-muted">punya ceritanya.</span>
          </h2>
        </div>
        <p>
          Eksplorasi solusi yang saya bangun, dari pengelolaan data hingga
          pengalaman percakapan.
        </p>
      </div>
      <div className="work-grid">
        {ordered.map((project, index) => (
          <article
            key={project.slug}
            className={`work-card ${index === 0 ? "work-featured" : ""}`}
          >
            <Link
              href={`/studi-kasus/${project.slug}`}
              className="work-image"
              aria-label={`Lihat studi kasus ${project.title}`}
            >
              <ProjectVisual kind={project.slug} />
              <span className="work-open" aria-hidden="true">
                ↗
              </span>
            </Link>
            <div className="work-body">
              <div className="work-meta">
                <span>
                  0{index + 1} / {project.status}
                </span>
                <span>DEVELOPMENT</span>
              </div>
              <Link
                href={`/studi-kasus/${project.slug}`}
                className="work-title"
              >
                <h3>{project.title}</h3>
                <span aria-hidden="true">↗</span>
              </Link>
              <p>{project.summary}</p>
              <div className="work-tags">
                {project.technologies.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-5 text-sm font-semibold">
                <Link
                  href={`/studi-kasus/${project.slug}`}
                  className="hover:underline"
                >
                  Baca studi kasus →
                </Link>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:underline"
                  >
                    Live demo ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
