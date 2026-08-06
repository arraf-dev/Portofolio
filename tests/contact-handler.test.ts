import { describe, expect, it, vi } from "vitest";
import { createContactHandler } from "@/lib/contact-handler";
import { EmailConfigurationError } from "@/lib/email";

const validData = {
  name: "Pengguna Uji",
  email: "qa@example.com",
  service: "Sistem Informasi Custom",
  message: "Kami membutuhkan sistem informasi untuk organisasi.",
  website: "",
};

function createRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

const allowRequest = () => ({ allowed: true, retryAfterSeconds: 0 });

describe("contact API handler", () => {
  it("mengembalikan sukses hanya setelah transport email berhasil", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const handler = createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    });

    const response = await handler(createRequest(validData));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.message).toContain("berhasil dikirim");
    expect(sendEmail).toHaveBeenCalledOnce();
  });

  it("menolak data yang tidak valid sebelum mengirim email", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const handler = createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    });

    const response = await handler(
      createRequest({ ...validData, email: "tidak-valid" }),
    );
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.errors.email).toBeDefined();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("menolak honeypot yang terisi", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const handler = createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    });

    const response = await handler(
      createRequest({ ...validData, website: "https://spam.example" }),
    );

    expect(response.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("memberikan error jujur saat SMTP belum dikonfigurasi", async () => {
    const handler = createContactHandler({
      sendEmail: vi.fn().mockRejectedValue(new EmailConfigurationError()),
      consumeRateLimit: allowRequest,
    });

    const response = await handler(createRequest(validData));
    const result = await response.json();

    expect(response.status).toBe(503);
    expect(result.message).toContain("belum dikonfigurasi");
  });

  it("memberikan error tanpa mengklaim sukses saat transport gagal", async () => {
    const handler = createContactHandler({
      sendEmail: vi.fn().mockRejectedValue(new Error("SMTP unavailable")),
      consumeRateLimit: allowRequest,
    });

    const response = await handler(createRequest(validData));
    const result = await response.json();

    expect(response.status).toBe(502);
    expect(result.message).toContain("belum berhasil dikirim");
  });
});
