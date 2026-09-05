export const servicePackages = [
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

export const serviceOptions = [
  ...servicePackages.map((service) => service.name),
  "Belum yakin / ingin berdiskusi",
];
