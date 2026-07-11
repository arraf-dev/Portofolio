const projects = [
  {
    title: "TaniSync",
    description:
      "Sistem manajemen multi-organisasi berbasis Laravel 12 dengan role-based authentication, export data ke PDF/XLSX/CSV, dan audit logging lengkap. Dirancang untuk kebutuhan administrasi organisasi dengan banyak peran pengguna.",
    tags: ["Laravel 12", "Livewire", "Tailwind CSS", "MySQL"],
    link: "https://github.com/arraf-dev/TaniSync",
  },
  {
    title: "DocuVerify UNY",
    description:
      "Sistem verifikasi keaslian dokumen menggunakan SHA-256 hashing. Live digunakan di lingkungan pendidikan untuk memastikan dokumen resmi dapat diverifikasi keasliannya secara mandiri.",
    tags: ["Next.js 15", "TypeScript", "Prisma", "Supabase"],
    link: "https://github.com/arraf-dev/DocuVerify-",
  },
  {
    title: "Chatbot Kesehatan Mental",
    description:
      "Chatbot pendamping kesehatan mental berbasis AI untuk membantu pengguna melakukan self-assessment awal dan mendapatkan informasi dukungan yang relevan.",
    tags: ["Python", "NLP", "Machine Learning"],
    link: "https://github.com/arraf-dev/chatbot-mental-health",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14"
    >
      <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-faint">
        01 — PROJECT
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Featured Projects
      </h2>
      <p className="mt-3 max-w-[620px] text-base leading-relaxed text-muted">
        Beberapa project yang saya bangun — dari sistem informasi organisasi
        hingga tools verifikasi dokumen.
      </p>
      <div className="mt-10 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        {projects.map((p) => (
          <article
            key={p.title}
            className="flex flex-col rounded-[14px] border-[1.5px] border-line bg-card p-[30px] transition-colors hover:border-accent"
          >
            <h3 className="font-display text-[21px] font-extrabold">{p.title}</h3>
            <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink/70">
              {p.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ink/[0.06] px-3 py-[5px] text-xs font-semibold text-ink/75"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-sm font-bold text-accent hover:underline"
            >
              Lihat Detail →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
