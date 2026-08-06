# PROGRESS — Portofolio abdulrafi.my.id

> Arsip status project. Baca ini dulu sebelum melanjutkan pekerjaan.
> Terakhir diupdate: 5 Agustus 2026.

## Status: LIVE ✅

- **Production**: https://abdulrafi.my.id (+ www) dan https://abdulrafi-portfolio.vercel.app
- **Vercel project**: `abdulrafi-portfolio` (akun `abdulrafi393-5137`)
- **Deploy**: push ke branch `main` (repo GitHub `arraf-dev/Portofolio`) = auto-deploy production. Tidak perlu `vercel deploy` manual.
- **Stack**: Next.js 15 App Router + Tailwind CSS 4. Homepage, halaman studi kasus statis, dan Route Handler untuk form kontak.

## Domain & DNS — JANGAN DIUBAH

- `abdulrafi.my.id` dipindah dari project Vercel `intan-web` ke `abdulrafi-portfolio` pada 12 Jul 2026 (`--force`).
- DNS dikelola Cloudflare, sudah benar: A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com, proxy OFF (DNS-only). Tidak ada yang perlu disentuh di Cloudflare.

## Revisi portofolio (26 Jul 2026)

1. Positioning hero, About, dan layanan diperbarui agar berorientasi manfaat.
2. Data project dipusatkan di `data/projects.ts`.
3. Halaman internal tersedia melalui `/studi-kasus/[slug]`.
4. Placeholder project tidak lagi dianggap screenshot asli.
5. Form kontak memakai validasi client/server dan hanya sukses setelah SMTP menerima email.
6. WhatsApp bersifat opsional melalui environment variable.
7. Canonical, Open Graph, Twitter card, favicon, robots, sitemap, structured data, dan 404 ditambahkan.
8. ESLint, Prettier, type-check, dan Vitest dikonfigurasi.
9. Next.js diperbarui ke 15.5.21 dan PostCSS dipaksa ke 8.5.23 untuk mengambil patch keamanan yang tersedia tanpa mengganti major version.

## Redesign brand #B2D5E5 (5 Agu 2026) — atas permintaan eksplisit owner

1. Palet baru berbasis #B2D5E5: light theme pakai accent turunan `#276a8c` (AA contrast), dark theme pakai #B2D5E5 langsung sebagai accent. Semua token di `app/globals.css` (`@theme inline` + CSS variables).
2. Dark mode + toggle (`components/ThemeToggle.tsx` di Navbar), persist via `localStorage.theme`, default ikut `prefers-color-scheme`, anti-FOUC inline script di `app/layout.tsx`. Tanpa dependency baru.
3. Polish visual: hero decorative gradient (#B2D5E5), eyebrow section seragam (garis accent), banding section (Projects & Contact `bg-tint`), card shadow + hover lift, scroll reveal (`components/Reveal.tsx`, hormati reduced-motion).
4. Pricing highlight card tidak lagi inversi `bg-ink` — sekarang `bg-tint` + ring accent (aman di kedua tema).
5. `app/icon.svg` dan `app/opengraph-image.tsx` disinkronkan ke palet baru.
6. Copy/teks, harga paket, data project, font, dan deployment TIDAK diubah.

## TODO (butuh aset/konfigurasi pemilik)

- [ ] Berikan screenshot asli DocuVerify, TaniSync, dan Chatbot; file saat ini masih placeholder lama dan tidak ditampilkan.
- [ ] Upload foto profil ke `public/foto.jpg` (atau `.png`).
- [ ] Isi credential SMTP di environment production.
- [ ] Isi `NEXT_PUBLIC_WHATSAPP_NUMBER` jika CTA WhatsApp ingin ditampilkan.
- [x] Demo DocuVerify aktif: `demoUrl` = https://docuverify-ten.vercel.app (diverifikasi 7 Agu 2026, HTTP 200, publik). Custom domain `araf393.dev` mati (DNS tidak resolve) dan SSO protection Vercel aktif untuk semua URL kecuali custom domain — jangan ganti ke URL lain tanpa cek ulang.
- [ ] TaniSync belum punya demo: tidak ada project di Vercel (stack Laravel + MySQL). Isi `demoUrl` setelah di-hosting di tempat lain.
- [ ] Tambahkan data Website Padukuhan, screenshot, dokumentasi serah terima, testimoni, dan outcomes asli ke `data/projects.ts`.

Setiap selesai menaruh file → commit & push → auto-deploy.

## Batasan kerja (permintaan owner)

Jangan redesign total, jangan ubah copy/teks, warna, font, atau harga paket tanpa diminta eksplisit. Perubahan selalu targeted per section.

> Catatan: redesign warna #B2D5E5 + dark mode (5 Agu 2026) dilakukan atas permintaan eksplisit owner — copy, harga, dan font tetap tidak berubah.
