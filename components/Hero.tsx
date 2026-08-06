export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1180px] scroll-mt-24 overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-28 lg:px-14"
    >
      <div
        aria-hidden="true"
        className="hero-decor pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-16 -z-10 hidden lg:block"
      >
        <div className="float-3d h-40 w-64 rounded-2xl border border-line bg-card/80 shadow-md backdrop-blur-sm">
          <div className="flex gap-1.5 border-b border-line p-3">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </div>
          <div className="space-y-2 p-3">
            <div className="h-2 w-3/4 rounded bg-tint" />
            <div className="h-2 w-1/2 rounded bg-tint" />
            <div className="h-2 w-2/3 rounded bg-brand/40" />
          </div>
        </div>
        <div className="float-3d-slow -mt-10 ml-36 h-24 w-40 rounded-xl border border-line bg-tint/90 shadow-sm backdrop-blur-sm">
          <div className="space-y-2 p-3">
            <div className="h-2 w-2/3 rounded bg-brand/50" />
            <div className="h-2 w-1/2 rounded bg-card" />
          </div>
        </div>
      </div>
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-tint px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.14em] text-accent">
        Abdul Rafi
      </p>
      <h1 className="max-w-[900px] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
        Sistem Informasi yang Rapi dan Mudah Dikelola untuk Institusi Kecil
      </h1>
      <p className="mt-7 max-w-[720px] text-[17px] leading-relaxed text-muted">
        Mahasiswa IT UNY dan eks-intern DISKOMINFO Yogyakarta. Membantu ormawa,
        prodi, sekolah, padukuhan, dan organisasi kecil membangun website serta
        sistem informasi sesuai alur kerja mereka.
      </p>
      <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
        <a
          href="#kontak"
          className="rounded-lg bg-accent px-7 py-[15px] text-center text-[15px] font-bold text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Diskusikan Kebutuhan
        </a>
        <a
          href="#projects"
          className="rounded-lg border-[1.5px] border-ink px-7 py-[15px] text-center text-[15px] font-bold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Lihat Studi Kasus
        </a>
      </div>
    </section>
  );
}
