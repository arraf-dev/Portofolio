# PROGRESS — Portofolio abdulrafi.my.id

> Arsip status project. Baca ini dulu sebelum melanjutkan pekerjaan.
> Terakhir diupdate: 12 Juli 2026.

## Status: LIVE ✅

- **Production**: https://abdulrafi.my.id (+ www) dan https://abdulrafi-portfolio.vercel.app
- **Vercel project**: `abdulrafi-portfolio` (akun `abdulrafi393-5137`)
- **Deploy**: push ke branch `main` (repo GitHub `arraf-dev/Portofolio`) = auto-deploy production. Tidak perlu `vercel deploy` manual.
- **Stack**: Next.js 15 (App Router, full static) + Tailwind CSS 4. Satu halaman: Hero → Projects → Pricing → About → Contact.

## Domain & DNS — JANGAN DIUBAH

- `abdulrafi.my.id` dipindah dari project Vercel `intan-web` ke `abdulrafi-portfolio` pada 12 Jul 2026 (`--force`).
- DNS dikelola Cloudflare, sudah benar: A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com, proxy OFF (DNS-only). Tidak ada yang perlu disentuh di Cloudflare.

## Yang sudah dikerjakan (12 Jul 2026)

1. Deploy pertama ke Vercel + connect domain.
2. **Projects**: tiap card punya gambar 16:9 di atas judul; DocuVerify punya tombol "Lihat Demo →" (https://www.araf393.dev), link GitHub jadi sekunder. Data project ada di array atas `components/Projects.tsx`.
3. **About**: foto profil otomatis tampil dari `public/foto.jpg` atau `foto.png` (dicek saat build); selama belum ada, fallback inisial "AR".
4. **Responsive mobile**: grid `minmax(min(...,100%),1fr)` (anti overflow <340px), badge Pricing dibatasi lebar card, tombol Hero full-width di mobile, padding card/form dikecilkan di layar kecil.

## TODO (butuh aksi user)

- [ ] Timpa placeholder screenshot dengan asli (1280×720): `public/projects/tanisync.png`, `docuverify.png`, `chatbot.png` — nama file harus sama.
- [ ] Upload foto profil ke `public/foto.jpg` (atau `.png`).
- [ ] Isi field `demo` untuk TaniSync / Chatbot di `components/Projects.tsx` jika nanti ada demo live.
- [ ] Buat `public/og-image.png` (1200×630) — sudah direferensikan di `app/layout.tsx` tapi filenya belum ada.
- [ ] Form kontak belum mengirim sungguhan (hanya validasi + pesan sukses) — sambungkan ke Formspree/Web3Forms di `components/Contact.tsx` `handleSubmit`.

Setiap selesai menaruh file → commit & push → auto-deploy.

## Batasan kerja (permintaan owner)

Jangan redesign total, jangan ubah copy/teks, warna, font, atau harga paket tanpa diminta eksplisit. Perubahan selalu targeted per section.
