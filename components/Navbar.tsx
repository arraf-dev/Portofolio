"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "projects", label: "Studi Kasus" },
  { id: "layanan", label: "Layanan" },
  { id: "tentang", label: "Tentang" },
  { id: "kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
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
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-[18px] sm:px-8 lg:px-14"
      >
        <Link
          href="/#top"
          className="flex-shrink-0 font-display text-xl font-extrabold tracking-tight"
        >
          Abdul Rafi<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              className={linkClass(l.id)}
              aria-current={active === l.id ? "location" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#kontak"
            className="whitespace-nowrap rounded-full bg-ink px-[22px] py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Diskusikan Kebutuhan
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
          type="button"
          aria-label="Buka menu"
          aria-controls="mobile-navigation"
          aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-[5px] rounded-lg"
          >
            <span className="h-0.5 w-[22px] bg-ink" />
            <span className="h-0.5 w-[22px] bg-ink" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[100] flex flex-col bg-paper px-5 py-5 sm:px-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-extrabold">
              Abdul Rafi<span className="text-accent">.</span>
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Tutup menu"
              onClick={() => {
                setOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[26px] leading-none"
            >
              ✕
            </button>
          </div>
          <div className="mt-14 flex flex-col gap-7">
            {links.map((l) => (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                className="font-display text-[34px] font-extrabold text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#kontak"
              onClick={() => setOpen(false)}
              className="mt-3 self-start rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper"
            >
              Diskusikan Kebutuhan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
