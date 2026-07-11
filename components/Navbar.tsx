"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "projects", label: "Project" },
  { id: "layanan", label: "Layanan" },
  { id: "tentang", label: "Tentang" },
  { id: "kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (id: string) =>
    `whitespace-nowrap border-b-2 pb-1 text-[15px] font-semibold transition-colors ${
      active === id
        ? "border-accent text-accent"
        : "border-transparent text-ink/80 hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-[18px] sm:px-8 lg:px-14">
        <a
          href="#"
          className="flex-shrink-0 font-display text-xl font-extrabold tracking-tight"
        >
          Abdul Rafi<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)}>
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="whitespace-nowrap rounded-full bg-ink px-[22px] py-2.5 text-sm font-semibold text-paper"
          >
            Hubungi Saya
          </a>
        </div>

        <button
          aria-label="Buka menu"
          onClick={() => setOpen(true)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span className="h-0.5 w-[22px] bg-ink" />
          <span className="h-0.5 w-[22px] bg-ink" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-paper px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-extrabold">
              Abdul Rafi<span className="text-accent">.</span>
            </span>
            <button
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="text-[26px] leading-none"
            >
              ✕
            </button>
          </div>
          <div className="mt-14 flex flex-col gap-7">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="font-display text-[34px] font-extrabold text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="mt-3 self-start rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper"
            >
              Hubungi Saya
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
