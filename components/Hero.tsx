import Link from "next/link";
import ProjectVisual from "./ProjectVisual";
export default function Hero() {
  return (
    <section id="top" className="hero-shell scroll-mt-24">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> WEB DEVELOPER · YOGYAKARTA
          </p>
          <h1>
            Ide Anda.
            <br />
            Website yang
            <br />
            <span className="hero-highlight">bekerja.</span>
            <span className="hero-asterisk" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            Saya Abdul Rafi. Membantu organisasi mengubah kebutuhan menjadi
            website dan sistem informasi yang mudah digunakan, dikelola, dan
            dikembangkan.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a className="button-primary" href="#kontak">
              Mari diskusikan ide Anda <span aria-hidden="true">↗</span>
            </a>
            <a className="button-secondary" href="#projects">
              Jelajahi karya <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-credentials">
            <span className="avatar-mini">ar.</span>
            <div>
              <strong>Dari kebutuhan, menjadi solusi.</strong>
              <p>Mahasiswa IT UNY · Eks-intern DISKOMINFO Yogyakarta</p>
            </div>
          </div>
        </div>
        <div className="hero-showcase">
          <div className="showcase-top">
            <span>IDE → DESAIN → DEVELOPMENT</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="hero-preview">
            <ProjectVisual kind="tanisync" />
          </div>
          <Link href="/studi-kasus/tanisync" className="showcase-caption">
            <div>
              <span>PROJECT SPOTLIGHT</span>
              <h2>TaniSync</h2>
              <p>Sistem informasi untuk ekosistem pertanian.</p>
            </div>
            <span className="round-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
          <div className="showcase-note">
            <span aria-hidden="true">✦</span> Dirancang untuk kebutuhan nyata.
          </div>
        </div>
      </div>
      <div className="audience-strip site-container">
        <p>
          UNTUK ORGANISASI
          <br />
          <strong>yang ingin melangkah maju.</strong>
        </p>
        <div>
          <span>Ormawa</span>
          <span>Program Studi</span>
          <span>Sekolah</span>
          <span>Padukuhan</span>
          <span>Organisasi</span>
        </div>
      </div>
    </section>
  );
}
