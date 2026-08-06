import fs from "fs";
import path from "path";
import Image from "next/image";

const stack = [
  "Laravel",
  "Livewire",
  "Tailwind CSS",
  "React / Next.js",
  "MySQL",
];

// Tambahkan foto asli sebagai public/foto.jpg atau public/foto.png.
const photo = ["foto.jpg", "foto.png"].find((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);

export default function About() {
  return (
    <section
      id="tentang"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-14"
    >
      <p className="mb-3 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.1em] text-accent">
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
        03 — TENTANG
      </p>
      <h2 className="mb-8 font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Tentang Saya
      </h2>
      <div className="grid items-start gap-8 md:grid-cols-[200px_1fr] md:gap-12">
        <div className="flex flex-col gap-3.5">
          {photo ? (
            <Image
              src={`/${photo}`}
              alt="Foto Abdul Rafi"
              width={132}
              height={132}
              className="h-[132px] w-[132px] rounded-full border-[1.5px] border-line object-cover"
            />
          ) : (
            <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-ink font-display text-[38px] font-extrabold text-paper">
              AR
            </div>
          )}
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
            Saya Abdul Rafi, mahasiswa IT Universitas Negeri Yogyakarta dan
            eks-intern DISKOMINFO Yogyakarta. Saya membantu institusi dan
            organisasi kecil membangun website serta sistem informasi yang rapi,
            terdokumentasi, dan mudah dilanjutkan oleh pengelola berikutnya.
          </p>
          <p className="mt-[18px] text-[16.5px] leading-[1.7] text-ink/85">
            Setiap project dimulai dari pemetaan kebutuhan dan alur kerja,
            kemudian dilanjutkan dengan pengembangan, dokumentasi, pelatihan
            penggunaan, dan dukungan setelah serah terima.
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
