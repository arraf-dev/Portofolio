const steps = [
  [
    "Kita mulai dari cerita Anda.",
    "Diskusikan tujuan, pengguna, dan kendala yang ingin diselesaikan.",
  ],
  [
    "Susun arah yang jelas.",
    "Petakan alur kerja, ruang lingkup, tampilan, dan estimasi pengerjaan.",
  ],
  [
    "Bangun, lalu sempurnakan.",
    "Pengembangan bertahap dengan pengujian dan penyesuaian kebutuhan.",
  ],
  [
    "Siap digunakan. Siap tumbuh.",
    "Serah terima disertai dokumentasi dan panduan penggunaan sistem.",
  ],
];
export default function Process() {
  return (
    <section className="process-section">
      <div className="site-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CARA KITA BEKERJA</p>
            <h2>
              Proses jelas.
              <br />
              Langkah lebih tenang.
            </h2>
          </div>
          <p>
            Anda tetap terlibat di setiap tahap. Dari percakapan pertama sampai
            website siap digunakan.
          </p>
        </div>
        <ol className="process-grid">
          {steps.map(([title, description], i) => (
            <li key={title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
