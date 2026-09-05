export default function ProjectVisual({ kind }: { kind: string }) {
  const farm = kind === "tanisync";
  const chat = kind === "chatbot-kesehatan-mental";
  return (
    <div
      className={`project-visual ${farm ? "visual-farm" : chat ? "visual-chat" : "visual-doc"}`}
    >
      <div className="mock-browser" aria-hidden="true">
        <div className="browser-bar">
          <span>● ● ●</span>
          <span>
            {farm
              ? "TaniSync / dashboard"
              : chat
                ? "Ruang percakapan"
                : "DocuVerify / verifikasi"}
          </span>
          <span>↗</span>
        </div>
        {farm ? (
          <div className="mock-dashboard">
            <aside>
              <b>
                ✳ tani<span>sync</span>
              </b>
              <i>▦ Overview</i>
              <i>♧ Komoditas</i>
              <i>▤ Hasil panen</i>
              <i>◷ Laporan</i>
              <div className="mock-profile">
                T
                <span>
                  Kelompok tani
                  <br />
                  Ruang organisasi
                </span>
              </div>
            </aside>
            <div className="mock-main">
              <div className="mock-heading">
                <div>
                  <small>RUANG ORGANISASI</small>
                  <h3>
                    Selamat datang! <span>☀</span>
                  </h3>
                </div>
                <span className="mock-badge">Overview</span>
              </div>
              <div className="mock-stats">
                <div>
                  <small>Anggota</small>
                  <b>
                    128 <em>orang</em>
                  </b>
                </div>
                <div>
                  <small>Hasil panen</small>
                  <b>
                    8.4 <em>ton</em>
                  </b>
                </div>
                <div>
                  <small>Komoditas</small>
                  <b>
                    12 <em>jenis</em>
                  </b>
                </div>
              </div>
              <div className="mock-chart">
                <div>
                  <b>Aktivitas panen</b>
                  <small>6 bulan terakhir ↗</small>
                </div>
                <div className="chart-bars">
                  {[36, 55, 44, 72, 62, 91].map((n, i) => (
                    <span key={i} style={{ height: `${n}%` }} />
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>Mei</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </div>
        ) : chat ? (
          <div className="mock-chat">
            <div className="chat-symbol">✳</div>
            <h3>Ruang untuk bercerita.</h3>
            <p>Informasi awal, lewat percakapan sederhana.</p>
            <div className="chat-bubble">
              Halo, aku ingin memahami perasaanku.
            </div>
            <div className="chat-bubble answer">
              Terima kasih sudah bercerita. Apa yang sedang kamu rasakan?
            </div>
            <div className="chat-input">
              Tuliskan pesan Anda… <span>↑</span>
            </div>
          </div>
        ) : (
          <div className="mock-document">
            <span className="doc-symbol">✓</span>
            <small>DOCUVERIFY UNY</small>
            <h3>
              Dokumen digital.
              <br />
              Identitas terverifikasi.
            </h3>
            <div className="upload-zone">
              <span>↥</span>
              <b>Periksa dokumen Anda</b>
              <small>Verifikasi identitas digital PDF</small>
            </div>
            <div className="verified-strip">
              ◉ Berbasis hash SHA-256 <span>↗</span>
            </div>
          </div>
        )}
      </div>
      <span className="visual-disclaimer">
        ILUSTRASI ANTARMUKA · DATA CONTOH
      </span>
    </div>
  );
}
