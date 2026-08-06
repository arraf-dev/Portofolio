# Portofolio Abdul Rafi

Website portofolio untuk memperkenalkan layanan pembuatan website dan sistem
informasi bagi institusi serta organisasi kecil.

## Stack

- Next.js 15 App Router
- React 19 dan TypeScript
- Tailwind CSS 4
- Next.js Route Handler untuk form kontak
- Nodemailer untuk pengiriman melalui SMTP

## Menjalankan secara lokal

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

Untuk menguji hasil production:

```bash
npm run build
npm run start
```

Jika lingkungan Windows gagal mengambil Google Fonts karena validasi
sertifikat, gunakan CA sistem pada terminal tersebut:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm run build
```

## Konfigurasi form kontak

Salin `.env.example` menjadi `.env.local`, lalu isi:

| Variable                | Keterangan                                                  |
| ----------------------- | ----------------------------------------------------------- |
| `CONTACT_EMAIL_TO`      | Tujuan pesan. Pertahankan `hello@abdulrafi.my.id`.          |
| `CONTACT_EMAIL_FROM`    | Identitas pengirim yang diizinkan penyedia SMTP.            |
| `CONTACT_SMTP_HOST`     | Host server SMTP.                                           |
| `CONTACT_SMTP_PORT`     | Umumnya `587` untuk STARTTLS atau `465` untuk TLS langsung. |
| `CONTACT_SMTP_SECURE`   | `false` untuk port 587, `true` untuk port 465.              |
| `CONTACT_SMTP_USER`     | Username SMTP, hanya tersedia di server.                    |
| `CONTACT_SMTP_PASSWORD` | Password SMTP, hanya tersedia di server.                    |

Jika konfigurasi SMTP kosong atau pengiriman gagal, API mengembalikan error dan
form mempertahankan data pengguna. Website tidak pernah menampilkan status
sukses sebelum SMTP menerima tujuan email.

Form memiliki validasi client/server, honeypot, pembatasan body, dan rate limit
best-effort per instance. Rate limit ini tidak bersifat global di seluruh
instance serverless. Rate limit terdistribusi membutuhkan penyimpanan eksternal
dan belum ditambahkan agar tidak memerlukan layanan atau akun berbayar.

## WhatsApp

Isi `NEXT_PUBLIC_WHATSAPP_NUMBER` menggunakan format internasional:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
```

Nomor lokal dengan awalan `0` akan dinormalisasi menjadi kode Indonesia `62`.
Tombol disembunyikan jika variabel kosong atau tidak valid. Karena menggunakan
prefix `NEXT_PUBLIC_`, nomor akan terlihat di client dan harus dianggap sebagai
informasi publik.

## Data studi kasus

Seluruh kartu dan halaman studi kasus memakai `data/projects.ts`. Untuk
menambahkan Website Padukuhan, tambahkan satu object baru dengan field:

```ts
{
  slug,
  title,
  category,
  audience,
  summary,
  problem,
  solution,
  features,
  process,
  technologies,
  screenshots,
  demoUrl,
  repositoryUrl,
  status,
  testimonial,
  outcomes,
}
```

`testimonial` dan `outcomes` bersifat opsional. Jangan mengisinya sebelum data
asli tersedia. Gambar harus disimpan di `public/projects/` dan dicatat pada
array `screenshots` dengan alt text serta dimensi asli. Jika array kosong,
website menampilkan “Screenshot segera tersedia”.

Foto profil asli dapat ditambahkan sebagai `public/foto.jpg` atau
`public/foto.png`. Selama file belum ada, avatar AR tetap digunakan.

## Pemeriksaan kualitas

```bash
npm run format
npm run lint
npm run typecheck
npm test
npm run build
```

Tidak ada proses deployment atau perubahan konfigurasi production dalam
repository ini. Production tetap mengikuti alur deployment pemilik project.
