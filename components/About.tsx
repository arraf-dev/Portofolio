import fs from "fs";
import path from "path";
import Image from "next/image";
const photo = ["foto.jpg", "foto.png"].find((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);
export default function About() {
  return (
    <section
      id="tentang"
      className="site-container section-space about-grid scroll-mt-24"
    >
      <div className="about-portrait">
        {photo ? (
          <Image
            src={`/${photo}`}
            alt="Abdul Rafi"
            width={480}
            height={520}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <span className="portrait-orbit" aria-hidden="true" />
            <span className="portrait-mark">
              ar<span>.</span>
            </span>
            <span className="portrait-star" aria-hidden="true">
              ✳
            </span>
          </>
        )}
        <div className="portrait-caption">
          <span>ABDUL RAFI</span>
          <span>DEVELOPER & PROBLEM SOLVER ↗</span>
        </div>
      </div>
      <div>
        <p className="eyebrow">03 / DI BALIK LAYAR</p>
        <h2 className="section-title">
          Teknologi yang baik
          <br />
          berawal dari
          <br />
          <span className="text-muted">memahami Anda.</span>
        </h2>
        <p className="mt-6 text-muted leading-relaxed">
          Halo, saya Rafi — mahasiswa IT Universitas Negeri Yogyakarta dan
          eks-intern DISKOMINFO Yogyakarta. Saya senang mengubah proses yang
          rumit menjadi pengalaman digital yang sederhana.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Fokus saya adalah website dan sistem informasi untuk institusi serta
          organisasi kecil. Dibangun sesuai alur kerja Anda, dengan dokumentasi
          agar mudah dikelola oleh tim berikutnya.
        </p>
        <div className="work-tags mt-6">
          {[
            "Laravel",
            "Livewire",
            "React / Next.js",
            "Tailwind CSS",
            "MySQL",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <a
          href="https://github.com/arraf-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="button-secondary mt-7"
        >
          Kenali karya saya di GitHub ↗
        </a>
      </div>
    </section>
  );
}
