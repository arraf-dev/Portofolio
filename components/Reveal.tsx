"use client";

import { useEffect, useRef } from "react";

// Konten tetap terlihat tanpa JS: class .reveal baru ditambahkan saat effect
// jalan, lalu .is-visible saat masuk viewport.
export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
