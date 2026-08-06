import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectEvidence from "@/components/ProjectEvidence";
import ProjectMedia from "@/components/ProjectMedia";
import { getProjectBySlug, projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  const title = `${project.title} — Studi Kasus Abdul Rafi`;
  const url = `${SITE_URL}/studi-kasus/${project.slug}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.summary,
      url,
      siteName: "Abdul Rafi",
      locale: "id_ID",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-2xl font-extrabold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 text-[16px] leading-[1.75] text-ink/80">
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main id="main-content">
        <article className="mx-auto max-w-[980px] px-5 pb-20 pt-12 sm:px-8 sm:pt-20 lg:px-14">
          <Link
            href="/#projects"
            className="text-sm font-bold text-accent hover:underline"
          >
            ← Kembali ke studi kasus
          </Link>

          <header className="mt-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-accent">
              {project.category}
            </p>
            <h1 className="mt-3 max-w-[800px] font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[760px] text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-line bg-card px-4 py-2 font-semibold">
                Sasaran: {project.audience}
              </span>
              <span className="rounded-full border border-line bg-card px-4 py-2 font-semibold">
                Status: {project.status}
              </span>
            </div>
          </header>

          <ProjectMedia project={project} priority className="mt-10 sm:mt-12" />

          <div className="mt-12 space-y-10">
            <DetailSection title="Ringkasan Proyek">
              <p>{project.summary}</p>
            </DetailSection>

            <DetailSection title="Latar Belakang & Masalah">
              <p>{project.problem}</p>
            </DetailSection>

            <DetailSection title="Sasaran Pengguna">
              <p>{project.audience}</p>
            </DetailSection>

            <DetailSection title="Solusi yang Dibuat">
              <p>{project.solution}</p>
            </DetailSection>

            <DetailSection title="Fitur Utama">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-xl border border-line bg-card p-4"
                  >
                    <span aria-hidden="true" className="font-bold text-accent">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>

            {project.process.length ? (
              <DetailSection title="Proses Pengerjaan">
                <ol className="space-y-4">
                  {project.process.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </DetailSection>
            ) : null}

            <DetailSection title="Screenshot & Gallery">
              <ProjectMedia project={project} />
            </DetailSection>

            <DetailSection title="Teknologi">
              <div className="flex flex-wrap gap-2.5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-ink/[0.06] px-4 py-2 text-sm font-semibold text-ink/85"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </DetailSection>

            <DetailSection title="Status Proyek">
              <p>{project.status}</p>
            </DetailSection>

            <ProjectEvidence project={project} />

            <section className="rounded-2xl bg-ink p-6 text-paper sm:p-9">
              <h2 className="font-display text-2xl font-extrabold">
                Punya kebutuhan sistem yang serupa?
              </h2>
              <p className="mt-3 max-w-[620px] leading-relaxed text-paper/75">
                Ceritakan kebutuhan, pengguna, dan alur kerja organisasi Anda
                untuk memulai diskusi.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/#kontak"
                  className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  Diskusikan Kebutuhan
                </Link>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-paper/35 px-5 py-3 text-sm font-bold text-paper"
                  >
                    Lihat Demo ↗
                  </a>
                ) : null}
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-paper/35 px-5 py-3 text-sm font-bold text-paper"
                  >
                    Lihat Kode ↗
                  </a>
                ) : null}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
