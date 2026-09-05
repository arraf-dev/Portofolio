import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-container footer-new">
      <Link href="/#top" className="footer-brand">
        abdulrafi.
      </Link>
      <p>Website yang bekerja. Dibangun dengan perhatian.</p>
      <div>
        <span>© {new Date().getFullYear()} Abdul Rafi</span>
        <a
          href="https://github.com/arraf-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        <Link href="/#top">Kembali ke atas ↑</Link>
      </div>
    </footer>
  );
}
