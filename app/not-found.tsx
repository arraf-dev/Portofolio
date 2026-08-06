import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-[760px] flex-col items-start justify-center px-5 py-20 sm:px-8"
    >
      <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-accent">
        404 — Halaman tidak ditemukan
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-tight tracking-tight">
        Halaman yang Anda cari tidak tersedia.
      </h1>
      <p className="mt-5 max-w-[600px] text-lg leading-relaxed text-muted">
        Alamat mungkin berubah atau halaman sudah tidak tersedia. Kembali ke
        beranda untuk melihat layanan dan studi kasus.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-accent-ink transition-colors hover:bg-accent-hover"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
