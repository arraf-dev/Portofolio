export type ProjectTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  audience: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  process: string[];
  technologies: string[];
  screenshots: ProjectScreenshot[];
  demoUrl?: string;
  repositoryUrl?: string;
  status: string;
  testimonial?: ProjectTestimonial;
  outcomes?: string[];
};

export const projects: Project[] = [
  {
    slug: "docuverify-uny",
    title: "DocuVerify UNY",
    category: "Prototype sistem verifikasi dokumen",
    audience: "Pengelola dan pemeriksa dokumen akademik",
    summary:
      "Prototype aplikasi web untuk mendaftarkan dan memeriksa identitas digital dokumen akademik.",
    problem:
      "Dokumen digital membutuhkan cara pemeriksaan yang konsisten agar perubahan pada file dapat diketahui dan dokumen yang telah dicabut tidak lagi dianggap aktif.",
    solution:
      "Sistem membandingkan hash SHA-256 dari PDF yang diperiksa dengan data dokumen yang telah didaftarkan, lalu menampilkan status verifikasi tanpa menyimpan file pemeriksaan secara permanen.",
    features: [
      "Verifikasi PDF secara publik menggunakan hash SHA-256",
      "Pendaftaran dan pencabutan status dokumen oleh admin",
      "Riwayat verifikasi dan audit aktivitas",
      "QR code untuk membuka alur verifikasi",
      "Validasi file dan pembatasan request pada API verifikasi",
    ],
    process: [
      "Memetakan alur pendaftaran, pemeriksaan, dan pencabutan dokumen",
      "Membangun antarmuka publik serta dashboard pengelola",
      "Menghubungkan alur verifikasi dengan penyimpanan metadata dokumen",
      "Menguji API utama dan aturan keamanan akses",
    ],
    technologies: ["Next.js 15", "TypeScript", "Prisma", "Supabase PostgreSQL"],
    screenshots: [],
    demoUrl: "https://docuverify-ten.vercel.app",
    repositoryUrl: "https://github.com/arraf-dev/DocuVerify-",
    status: "Prototype Project Mandiri / Skripsi",
  },
  {
    slug: "tanisync",
    title: "TaniSync",
    category: "MVP sistem informasi pertanian",
    audience: "Desa, kelompok tani, dan gapoktan",
    summary:
      "Platform multi-organisasi untuk mengelola anggota, komoditas, harga pasar, catatan panen, dan laporan.",
    problem:
      "Data operasional pertanian tersebar di antara banyak pengguna dan organisasi, sementara setiap peran membutuhkan akses serta tanggung jawab yang berbeda.",
    solution:
      "TaniSync menyediakan ruang data terpisah untuk setiap organisasi, alur persetujuan, pencatatan panen, verifikasi data, dan laporan yang dapat diekspor.",
    features: [
      "Ruang data terpisah untuk setiap organisasi",
      "Login dan hak akses super admin, admin, dan petani",
      "Pengelolaan komoditas, pasar, serta harga harian",
      "Pencatatan dan verifikasi hasil panen",
      "Laporan terfilter dengan ekspor PDF, XLSX, dan CSV",
      "Audit aktivitas penting di dalam organisasi",
    ],
    process: [
      "Memetakan aktor dan alur persetujuan organisasi",
      "Menyusun struktur data yang terpisah untuk setiap organisasi",
      "Membangun alur pencatatan, verifikasi, dan pelaporan",
      "Menguji akses pengguna serta proses laporan utama",
    ],
    technologies: ["Laravel 12", "Blade", "Tailwind CSS", "Alpine.js", "MySQL"],
    screenshots: [],
    repositoryUrl: "https://github.com/arraf-dev/TaniSync",
    status: "MVP capstone",
  },
  {
    slug: "chatbot-kesehatan-mental",
    title: "Chatbot Kesehatan Mental",
    category: "Prototype chatbot informasi",
    audience: "Pengguna yang mencari informasi dukungan awal",
    summary:
      "Prototype chatbot berbasis web untuk membantu pengguna memperoleh informasi awal mengenai kesehatan mental.",
    problem:
      "Informasi dukungan awal perlu disampaikan melalui alur yang sederhana dan mudah digunakan.",
    solution:
      "Antarmuka percakapan digunakan untuk menyajikan respons dan informasi awal secara bertahap.",
    features: [
      "Antarmuka percakapan berbasis web",
      "Alur respons untuk informasi kesehatan mental",
      "Backend Python untuk memproses percakapan",
    ],
    process: [],
    technologies: ["Python", "NLP", "Machine Learning"],
    screenshots: [],
    repositoryUrl: "https://github.com/arraf-dev/chatbot-mental-health",
    status: "Prototype",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
