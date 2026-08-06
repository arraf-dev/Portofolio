"use client";

import Tilt from "@/components/Tilt";

const packages = [
  {
    name: "Landing Page",
    price: "Rp 800rb – 1,2jt",
    duration: "3–5 hari kerja",
    features: [
      "Satu halaman profesional yang fokus pada tujuan utama",
      "Tampilan nyaman digunakan di mobile dan desktop",
      "Struktur konten dan SEO dasar",
      "Form kontak atau tombol WhatsApp",
    ],
    highlight: false,
  },
  {
    name: "Company Profile",
    price: "Rp 1,5 – 2,5jt",
    duration: "1–2 minggu",
    features: [
      "3–6 halaman profil, layanan, dan kontak",
      "Tampilan sesuai identitas organisasi",
      "Struktur informasi yang mudah dipahami pengunjung",
      "SEO dasar dan panduan pengelolaan konten",
    ],
    highlight: false,
  },
  {
    name: "Sistem Informasi Custom",
    price: "Rp 4 – 7jt",
    duration: "3–5 minggu",
    features: [
      "Analisis kebutuhan dan pemetaan alur kerja",
      "Sistem yang disesuaikan dengan proses organisasi",
      "Login dan hak akses bila dibutuhkan",
      "Pengelolaan data serta laporan/export",
      "Dokumentasi dan pelatihan penggunaan",
      "Dapat dikembangkan dengan Laravel / Livewire",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  function selectPackage(packageName: string) {
    window.dispatchEvent(
      new CustomEvent("portfolio:package-selected", {
        detail: packageName,
      }),
    );
  }

  return (
    <section
      id="layanan"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-14"
    >
      <p className="mb-3 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.1em] text-accent">
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
        02 — LAYANAN
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Layanan &amp; Paket Harga
      </h2>
      <p className="mt-3 max-w-[660px] text-base leading-relaxed text-muted">
        Pilihan layanan untuk membangun kehadiran digital dan sistem kerja yang
        lebih rapi bagi institusi atau organisasi Anda.
      </p>

      <div className="mt-10 grid items-start gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {packages.map((pkg) => (
          <Tilt key={pkg.name} max={4} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-2xl border-[1.5px] p-6 shadow-sm sm:p-7 ${
              pkg.highlight
                ? "border-accent bg-tint ring-1 ring-accent/40"
                : "border-line bg-card"
            }`}
          >
            {pkg.highlight ? (
              <span className="absolute -top-[13px] left-6 max-w-[calc(100%-3rem)] rounded-full bg-accent px-3.5 py-[5px] text-[11.5px] font-bold leading-snug text-accent-ink sm:left-7 sm:max-w-[calc(100%-3.5rem)]">
                Paling cocok untuk institusi/organisasi
              </span>
            ) : null}
            <h3 className="mt-1 font-display text-xl font-extrabold">
              {pkg.name}
            </h3>
            <p className="mt-2.5 font-display text-[26px] font-extrabold">
              {pkg.price}
            </p>
            <p className="mt-1 text-[13px] font-medium text-muted">
              Estimasi {pkg.duration}
            </p>

            <ul className="mt-[22px] flex-1 space-y-3 text-sm">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span aria-hidden="true" className="font-bold text-accent">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#kontak"
              onClick={() => selectPackage(pkg.name)}
              className={`mt-6 rounded-lg px-5 py-3 text-center text-sm font-bold transition-colors ${
                pkg.highlight
                  ? "bg-accent text-accent-ink hover:bg-accent-hover"
                  : "border-[1.5px] border-ink text-ink hover:border-accent hover:text-accent"
              }`}
            >
              Diskusikan Kebutuhan
            </a>
          </article>
          </Tilt>
        ))}
      </div>

      <p className="mt-6 max-w-[760px] text-[13px] leading-relaxed text-faint">
        * Harga final menyesuaikan ruang lingkup, jumlah pengguna, fitur, dan
        kebutuhan integrasi. DP 50% di awal.
      </p>
    </section>
  );
}
