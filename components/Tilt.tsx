"use client";

import { useRef } from "react";

// Tilt 3D mengikuti kursor. Hanya aktif untuk mouse; touch & reduced-motion
// tidak terpengaruh (rule .tilt di-gate @media prefers-reduced-motion di CSS).
export default function Tilt({
  children,
  max = 6,
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}
