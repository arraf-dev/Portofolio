"use client";

import { useState } from "react";

type Form = { name: string; email: string; message: string };
type Errors = Partial<Form>;

function validate(data: Form): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Nama wajib diisi.";
  if (!data.email.trim()) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Format email tidak valid.";
  if (!data.message.trim()) errors.message = "Ceritakan kebutuhan Anda dulu.";
  return errors;
}

const empty: Form = { name: "", email: "", message: "" };

export default function Contact() {
  const [data, setData] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // ponytail: validasi + state sukses in-page (sesuai desain). Untuk mengirim
  // sungguhan, POST `data` ke Formspree/Web3Forms di dalam handleSubmit.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  function reset() {
    setData(empty);
    setErrors({});
    setSubmitted(false);
  }

  const field = (err?: string) =>
    `w-full rounded-lg border-[1.5px] px-4 py-3 text-[15px] outline-none ${
      err ? "border-danger" : "border-line focus:border-accent"
    }`;

  return (
    <section
      id="kontak"
      className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14"
    >
      <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-faint">
        04 — KONTAK
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Kontak
      </h2>
      <div className="mt-7 grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div>
          <p className="max-w-[380px] text-[16.5px] leading-relaxed text-muted">
            Punya kebutuhan website atau sistem informasi? Ceritakan saja dulu —
            konsultasi awal gratis.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4">
            <a
              href="mailto:hello@abdulrafi.my.id"
              className="text-base font-bold text-accent"
            >
              hello@abdulrafi.my.id
            </a>
            <a
              href="https://github.com/arraf-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-accent"
            >
              github.com/arraf-dev
            </a>
          </div>
          <p className="mt-6 text-[13.5px] text-faint">
            Biasanya membalas dalam 1×24 jam pada hari kerja.
          </p>
        </div>

        <div className="rounded-2xl border-[1.5px] border-line bg-card p-5 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-start gap-3.5 py-5">
              <div className="font-display text-xl font-extrabold">
                Pesan terkirim ✓
              </div>
              <p className="text-[15px] leading-relaxed text-ink/70">
                Terima kasih! Saya akan membalas ke email kamu dalam 1×24 jam
                pada hari kerja.
              </p>
              <button
                onClick={reset}
                className="rounded-lg border-[1.5px] border-ink px-5 py-2.5 text-sm font-bold text-ink"
              >
                Kirim pesan lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <input
                  type="text"
                  placeholder="Nama"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className={field(errors.name)}
                />
                {errors.name && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-danger">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className={field(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-danger">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="Ceritakan kebutuhan Anda..."
                  rows={4}
                  value={data.message}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                  className={`${field(errors.message)} resize-y`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-[12.5px] font-medium text-danger">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-1 rounded-lg bg-accent px-6 py-3.5 text-[15px] font-bold text-white"
              >
                Kirim Pesan
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
