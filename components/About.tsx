const stack = ["Laravel", "Livewire", "Tailwind CSS", "React / Next.js", "MySQL"];

export default function About() {
  return (
    <section
      id="tentang"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14"
    >
      <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-faint">
        03 — TENTANG
      </p>
      <h2 className="mb-8 font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Tentang Saya
      </h2>
      <div className="grid items-start gap-12 md:grid-cols-[200px_1fr]">
        <div className="flex flex-col gap-3.5">
          {/* Ganti div ini dengan <Image> foto asli di public/foto.jpg */}
          <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-ink font-display text-[38px] font-extrabold text-paper">
            AR
          </div>
          <a
            href="https://github.com/arraf-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-lg border-[1.5px] border-line px-3.5 py-2.5 text-[13.5px] font-semibold text-ink"
          >
            github.com/arraf-dev ↗
          </a>
          <span className="w-fit rounded-lg border-[1.5px] border-line px-3.5 py-2.5 text-[13.5px] font-semibold text-ink">
            Univ. Negeri Yogyakarta
          </span>
        </div>
        <div>
          <p className="text-[16.5px] leading-[1.7] text-ink/85">
            Saya Abdul Rafi, mahasiswa IT di Universitas Negeri Yogyakarta.
            Selama magang di DISKOMINFO Yogyakarta, saya terlibat dalam rebuild
            website pemerintah — pengalaman yang membentuk cara saya membangun
            sistem: rapi, terdokumentasi, dan mudah dikelola oleh institusi.
          </p>
          <p className="mt-[18px] text-[16.5px] leading-[1.7] text-ink/85">
            Fokus saya adalah membantu organisasi kecil — ormawa, kopma, prodi,
            sekolah, klinik, dan komunitas — memiliki sistem informasi yang
            benar-benar sesuai kebutuhan mereka, bukan template generik.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-ink/[0.06] px-4 py-2 text-[13px] font-semibold text-ink/85"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
