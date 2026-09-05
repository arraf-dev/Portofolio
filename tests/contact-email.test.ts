import { afterEach, describe, expect, it, vi } from "vitest";
import { buildContactEmail } from "@/lib/contact-email";
import { serviceOptions } from "@/data/services";
import { validateContactPayload } from "@/lib/contact";
import nodemailer from "nodemailer";
import { sendContactEmail } from "@/lib/email";

const data = {
  name: "Pengguna",
  email: "qa@example.com",
  service: "Landing Page",
  message: "Kami membutuhkan website organisasi.",
  website: "",
};
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("email konsultasi", () => {
  it.each(serviceOptions)("menerima pilihan frontend %s", (service) => {
    expect(validateContactPayload({ ...data, service }).errors).toEqual({});
  });
  it("mengizinkan layanan kosong dan menolak tipe yang salah", () => {
    expect(validateContactPayload({ ...data, service: "" }).errors).toEqual({});
    expect(
      validateContactPayload({ ...data, service: 123 }).errors.service,
    ).toBeDefined();
  });
  it("mengamankan HTML, mempertahankan pesan teks, dan mencegah header baru", () => {
    const message = '<script>alert("x")</script>\nBaris kedua';
    const email = buildContactEmail({
      ...data,
      name: "User\r\nBcc: attacker",
      message,
    });
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("<br>Baris kedua");
    expect(email.text).toContain(message);
    expect(email.subject).not.toMatch(/[\r\n]/);
    expect(email.text).toContain("bukan penawaran final");
  });
  it.each([true, false])(
    "menggunakan SMTP dan mengecek penerimaan: %s",
    async (accepted) => {
      for (const [key, value] of Object.entries({
        CONTACT_SMTP_HOST: "smtp.example.com",
        CONTACT_SMTP_PORT: "587",
        CONTACT_SMTP_SECURE: "false",
        CONTACT_SMTP_USER: "test",
        CONTACT_SMTP_PASSWORD: "test",
        CONTACT_EMAIL_FROM: "website@example.com",
        CONTACT_EMAIL_TO: "owner@example.com",
      }))
        vi.stubEnv(key, value);
      const sendMail = vi
        .fn()
        .mockResolvedValue({ accepted: accepted ? ["owner@example.com"] : [] });
      vi.spyOn(nodemailer, "createTransport").mockReturnValue({
        sendMail,
      } as unknown as ReturnType<typeof nodemailer.createTransport>);
      if (accepted)
        await expect(sendContactEmail(data)).resolves.toBeUndefined();
      else
        await expect(sendContactEmail(data)).rejects.toThrow("did not accept");
      expect(sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: "website@example.com",
          to: "owner@example.com",
          replyTo: data.email,
          html: expect.stringContaining("Mari mulai percakapan."),
          text: expect.stringContaining(data.message),
        }),
      );
    },
  );
});
