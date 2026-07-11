export default function Hero() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-28 lg:px-14">
      <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.14em] text-accent">
        Abdul Rafi
      </p>
      <h1 className="max-w-[820px] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight">
        Web Developer &amp; Sistem Informasi untuk Institusi &amp; Organisasi
        Kecil
      </h1>
      <div className="mt-7 flex max-w-[640px] flex-col gap-3.5">
        <p className="text-[17px] leading-relaxed text-muted">
          Mahasiswa IT Universitas Negeri Yogyakarta, eks-intern DISKOMINFO
          Yogyakarta.
        </p>
        <p className="text-[17px] leading-relaxed text-muted">
          Membangun sistem informasi custom untuk ormawa, kopma, prodi, sekolah,
          dan organisasi kecil lainnya.
        </p>
      </div>
      <div className="mt-9 flex flex-wrap gap-3.5">
        <a
          href="#kontak"
          className="rounded-lg bg-accent px-7 py-[15px] text-[15px] font-bold text-white"
        >
          Hubungi Saya
        </a>
        <a
          href="#projects"
          className="rounded-lg border-[1.5px] border-ink px-7 py-[15px] text-[15px] font-bold text-ink"
        >
          Lihat Project
        </a>
      </div>
    </section>
  );
}
