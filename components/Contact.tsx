"use client";

import { useEffect, useState } from "react";
import {
  CONTACT_LIMITS,
  EMPTY_CONTACT_DATA,
  validateContactPayload,
  type ContactData,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { CONTACT_EMAIL } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const serviceOptions = [
  "Landing Page",
  "Company Profile",
  "Sistem Informasi Custom",
  "Belum yakin / ingin berdiskusi",
];

function focusFirstError(errors: ContactErrors) {
  const firstField = Object.keys(errors)[0] as ContactField | undefined;
  if (!firstField) return;

  requestAnimationFrame(() => {
    document.getElementById(`contact-${firstField}`)?.focus();
  });
}

export default function Contact() {
  const [data, setData] = useState<ContactData>(EMPTY_CONTACT_DATA);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const whatsappUrl = buildWhatsAppUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

  useEffect(() => {
    function handlePackageSelection(event: Event) {
      const packageName = (event as CustomEvent<string>).detail;
      if (!serviceOptions.includes(packageName)) return;

      setData((current) => ({ ...current, service: packageName }));
      setErrors((current) => ({ ...current, service: undefined }));
      setStatus("idle");
      setStatusMessage("");
    }

    window.addEventListener(
      "portfolio:package-selected",
      handlePackageSelection,
    );
    return () =>
      window.removeEventListener(
        "portfolio:package-selected",
        handlePackageSelection,
      );
  }, []);

  function updateField(field: keyof ContactData, value: string) {
    setData((current) => ({ ...current, [field]: value }));

    if (field !== "website") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status !== "submitting") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function handleNativeInvalid(
    field: ContactField,
    message: string,
    event: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    event.preventDefault();
    setErrors((current) => ({ ...current, [field]: message }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateContactPayload(data);
    if (Object.keys(validation.errors).length) {
      setErrors(validation.errors);
      setStatus("error");
      setStatusMessage("Periksa kembali data yang Anda isi.");
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("Mengirim pesan...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        errors?: ContactErrors;
      };

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          focusFirstError(result.errors);
        }
        setStatus("error");
        setStatusMessage(
          result.message ||
            "Pesan belum berhasil dikirim. Silakan coba kembali.",
        );
        return;
      }

      setData(EMPTY_CONTACT_DATA);
      setErrors({});
      setStatus("success");
      setStatusMessage(
        result.message ||
          "Pesan berhasil dikirim. Terima kasih sudah menghubungi Abdul Rafi.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "Tidak dapat terhubung ke layanan pengiriman. Periksa koneksi lalu coba kembali.",
      );
    }
  }

  const fieldClass = (error?: string) =>
    `mt-2 w-full rounded-lg border-[1.5px] bg-paper px-4 py-3 text-[15px] text-ink transition-colors ${
      error
        ? "border-danger"
        : "border-line hover:border-ink/35 focus:border-accent"
    }`;

  return (
    <section id="kontak" className="scroll-mt-24 border-t border-line bg-tint">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
      <p className="mb-3 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.1em] text-accent">
        <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
        04 — KONTAK
      </p>
      <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.625rem)] font-extrabold tracking-tight">
        Kontak
      </h2>

      <div className="mt-7 grid gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <div>
          <p className="max-w-[400px] text-[16.5px] leading-relaxed text-muted">
            Punya kebutuhan website atau sistem informasi? Ceritakan kebutuhan
            dan alur kerja organisasi Anda untuk memulai diskusi.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-base font-bold text-accent hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-[1.5px] border-ink px-4 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Konsultasi via WhatsApp ↗
              </a>
            ) : null}
            <a
              href="https://github.com/arraf-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-accent hover:underline"
            >
              github.com/arraf-dev
            </a>
          </div>
        </div>

        <div className="rounded-2xl border-[1.5px] border-line bg-card p-5 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="text-sm font-bold text-ink"
              >
                Nama
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={CONTACT_LIMITS.name}
                value={data.name}
                onChange={(event) => updateField("name", event.target.value)}
                onInvalid={(event) =>
                  handleNativeInvalid("name", "Nama wajib diisi.", event)
                }
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
                className={fieldClass(errors.name)}
              />
              {errors.name ? (
                <p
                  id="contact-name-error"
                  className="mt-1.5 text-[12.5px] font-medium text-danger"
                >
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="text-sm font-bold text-ink"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={CONTACT_LIMITS.email}
                value={data.email}
                onChange={(event) => updateField("email", event.target.value)}
                onInvalid={(event) =>
                  handleNativeInvalid(
                    "email",
                    event.currentTarget.value
                      ? "Masukkan alamat email yang valid."
                      : "Email wajib diisi.",
                    event,
                  )
                }
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                className={fieldClass(errors.email)}
              />
              {errors.email ? (
                <p
                  id="contact-email-error"
                  className="mt-1.5 text-[12.5px] font-medium text-danger"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-service"
                className="text-sm font-bold text-ink"
              >
                Jenis kebutuhan{" "}
                <span className="font-normal text-faint">(opsional)</span>
              </label>
              <select
                id="contact-service"
                name="service"
                value={data.service}
                onChange={(event) => updateField("service", event.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={
                  errors.service ? "contact-service-error" : undefined
                }
                className={fieldClass(errors.service)}
              >
                <option value="">Pilih jenis kebutuhan</option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <p
                  id="contact-service-error"
                  className="mt-1.5 text-[12.5px] font-medium text-danger"
                >
                  {errors.service}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-sm font-bold text-ink"
              >
                Pesan
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={CONTACT_LIMITS.messageMin}
                maxLength={CONTACT_LIMITS.messageMax}
                value={data.message}
                onChange={(event) => updateField("message", event.target.value)}
                onInvalid={(event) =>
                  handleNativeInvalid(
                    "message",
                    event.currentTarget.value
                      ? `Pesan minimal ${CONTACT_LIMITS.messageMin} karakter.`
                      : "Pesan wajib diisi.",
                    event,
                  )
                }
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? "contact-message-help contact-message-error"
                    : "contact-message-help"
                }
                className={`${fieldClass(errors.message)} resize-y`}
              />
              <div
                id="contact-message-help"
                className="mt-1.5 flex justify-between gap-3 text-[12px] text-faint"
              >
                <span>Jelaskan kebutuhan dan alur kerja secara singkat.</span>
                <span aria-label={`${data.message.length} karakter`}>
                  {data.message.length}/{CONTACT_LIMITS.messageMax}
                </span>
              </div>
              {errors.message ? (
                <p
                  id="contact-message-error"
                  className="mt-1.5 text-[12.5px] font-medium text-danger"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>

            <div aria-live="polite" aria-atomic="true">
              {statusMessage ? (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                    status === "success"
                      ? "border-ok/25 bg-ok-bg text-ok"
                      : status === "error"
                        ? "border-danger/25 bg-danger-bg text-danger"
                        : "border-line bg-paper text-muted"
                  }`}
                >
                  <p className="font-semibold">{statusMessage}</p>
                  {status === "error" ? (
                    <p className="mt-1">
                      Alternatif:{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-bold underline"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg bg-accent px-6 py-3.5 text-[15px] font-bold text-accent-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
}
