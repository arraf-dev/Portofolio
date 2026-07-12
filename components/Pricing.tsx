const packages = [
  {
    name: "Landing Page",
    price: "Rp 800rb – 1,2jt",
    duration: "3–5 hari kerja",
    features: [
      "1 halaman profesional",
      "Desain responsive (mobile-friendly)",
      "Optimasi SEO dasar",
      "Form kontak / tombol WhatsApp",
    ],
    highlight: false,
  },
  {
    name: "Company Profile",
    price: "Rp 1,5 – 2,5jt",
    duration: "1–2 minggu",
    features: [
      "3–6 halaman (profil, layanan, kontak, dll.)",
      "Desain custom sesuai identitas organisasi",
      "Optimasi SEO dasar",
      "Panduan pengelolaan konten",
    ],
    highlight: false,
  },
  {
    name: "Sistem Informasi Custom",
    price: "Rp 4 – 7jt",
    duration: "3–5 minggu",
    features: [
      "Laravel / Livewire, fitur sesuai kebutuhan",
      "Login multi-role & manajemen data",
      "Export laporan (PDF / Excel)",
      "Training penggunaan & dokumentasi",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section
      id="layanan"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14"
    >
      <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-faint">
        02 — LAYANAN
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Layanan &amp; Paket Harga
      </h2>
      <p className="mt-3 max-w-[620px] text-base leading-relaxed text-muted">
        Paket transparan untuk kebutuhan institusi &amp; organisasi Anda.
      </p>
      <div className="mt-10 grid items-start gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative flex flex-col rounded-2xl border-[1.5px] p-6 sm:p-7 ${
              pkg.highlight
                ? "border-accent bg-ink text-white"
                : "border-line bg-card"
            }`}
          >
            {pkg.highlight && (
              <span className="absolute -top-[13px] left-6 max-w-[calc(100%-3rem)] rounded-full bg-accent px-3.5 py-[5px] text-[11.5px] font-bold leading-snug text-white sm:left-7 sm:max-w-[calc(100%-3.5rem)]">
                Paling cocok untuk institusi/organisasi
              </span>
            )}
            <h3 className="mt-1 font-display text-xl font-extrabold">
              {pkg.name}
            </h3>
            <p className="mt-2.5 font-display text-[26px] font-extrabold">
              {pkg.price}
            </p>
            <p className="mt-1 text-[13px] font-medium opacity-65">
              Estimasi {pkg.duration}
            </p>
            <ul className="mt-[22px] flex-1 space-y-3 text-sm">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="font-bold text-accent">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:hello@abdulrafi.my.id?subject=${encodeURIComponent(
                `Konsultasi Paket ${pkg.name}`
              )}`}
              className={`mt-6 rounded-lg px-5 py-3 text-center text-sm font-bold ${
                pkg.highlight
                  ? "bg-accent text-white"
                  : "border-[1.5px] border-ink text-ink"
              }`}
            >
              Diskusikan Kebutuhan
            </a>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-faint">
        * Harga dapat disesuaikan dengan kebutuhan &amp; scope. DP 50% di awal.
      </p>
    </section>
  );
}
