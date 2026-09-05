"use client";

import { servicePackages as packages } from "@/data/services";

export default function Pricing() {
  function selectPackage(packageName: string) {
    window.dispatchEvent(
      new CustomEvent("portfolio:package-selected", { detail: packageName }),
    );
  }
  return (
    <section id="layanan" className="pricing-section scroll-mt-24">
      <div className="site-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / LAYANAN & INVESTASI</p>
            <h2>Mulai dari yang Anda butuhkan.</h2>
          </div>
          <p>
            Dari halaman perkenalan hingga sistem kerja. Pilih titik awal yang
            sesuai dengan organisasi Anda.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <article
              key={pkg.name}
              className={`pricing-card ${pkg.highlight ? "featured" : ""}`}
            >
              <p className="pricing-label">
                {pkg.highlight
                  ? "✦ UNTUK ALUR KERJA ORGANISASI"
                  : `0${i + 1} / WEB DEVELOPMENT`}
              </p>
              <h3>{pkg.name}</h3>
              <p className="price-value">{pkg.price}</p>
              <p className="price-note">Estimasi {pkg.duration}</p>
              <ul>
                {pkg.features.map((f) => (
                  <li key={f}>
                    <span aria-hidden="true">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#kontak"
                onClick={() => selectPackage(pkg.name)}
                className="button-primary mt-6"
              >
                Diskusikan paket ini <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted leading-relaxed">
          Harga final menyesuaikan ruang lingkup, jumlah pengguna, fitur, dan
          kebutuhan integrasi. DP 50% di awal.
        </p>
      </div>
    </section>
  );
}
