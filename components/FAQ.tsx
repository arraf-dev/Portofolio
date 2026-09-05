const items = [
  [
    "Belum punya gambaran website, bisa mulai diskusi?",
    "Bisa. Ceritakan aktivitas organisasi Anda dan kendala yang dihadapi. Kita dapat memulai dari kebutuhan tersebut untuk menyusun fitur dan alur yang sesuai.",
  ],
  [
    "Apa yang memengaruhi biaya pengerjaan?",
    "Jumlah halaman, kompleksitas fitur, hak akses pengguna, dan kebutuhan integrasi. Harga pada paket adalah kisaran; ruang lingkup dan biaya final dibahas sebelum pengerjaan. DP 50% di awal.",
  ],
  [
    "Apakah domain dan hosting termasuk?",
    "Kebutuhan domain dan hosting dibahas terpisah saat menentukan ruang lingkup, agar kapasitas dan biaya berlangganannya sesuai dengan kebutuhan Anda.",
  ],
  [
    "Bagaimana dengan revisi dan dukungan setelah selesai?",
    "Ruang lingkup revisi dan dukungan disepakati sebelum proyek dimulai. Dokumentasi serta panduan penggunaan membantu pengelola memahami dan melanjutkan sistem.",
  ],
];
export default function FAQ() {
  return (
    <section className="site-container section-space faq-grid">
      <div>
        <p className="eyebrow">SEBELUM KITA MULAI</p>
        <h2 className="section-title">
          Mungkin ini
          <br />
          pertanyaan Anda.
        </h2>
        <a
          href="#kontak"
          className="inline-block mt-6 font-semibold underline underline-offset-4"
        >
          Tanyakan hal lainnya ↗
        </a>
      </div>
      <div>
        {items.map(([q, a]) => (
          <details className="faq-item" key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
