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
  it("menolak layanan yang tidak ada dalam katalog", async () => {
    const sendEmail = vi.fn();
    const handler = createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    });
    const response = await handler(
      createRequest({ ...validData, service: "Paket palsu" }),
    );
    expect(response.status).toBe(400);
    expect((await response.json()).errors.service).toBeDefined();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("mengembalikan waktu tunggu dan tidak memanggil SMTP saat dibatasi", async () => {
    const sendEmail = vi.fn();
    const handler = createContactHandler({
      sendEmail,
      consumeRateLimit: () => ({ allowed: false, retryAfterSeconds: 120 }),
    });
    const response = await handler(createRequest(validData));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("120");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect((await response.json()).retryAfterSeconds).toBe(120);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it.each(["application/json-invalid", "text/plain"])(
    "menolak content type %s",
    async (contentType) => {
      const sendEmail = vi.fn();
      const response = await createContactHandler({ sendEmail })(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "Content-Type": contentType },
          body: JSON.stringify(validData),
        }),
      );
      expect(response.status).toBe(415);
      expect(sendEmail).not.toHaveBeenCalled();
    },
  );

  it("menolak JSON rusak", async () => {
    const sendEmail = vi.fn();
    const response = await createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    })(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{broken",
      }),
    );
    expect(response.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("menghitung byte UTF-8 sebelum parsing tanpa Content-Length", async () => {
    const sendEmail = vi.fn();
    const body = JSON.stringify({ ...validData, message: "🌱".repeat(5500) });
    expect(body.length).toBeLessThan(20000);
    const response = await createContactHandler({
      sendEmail,
      consumeRateLimit: allowRequest,
    })(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    );
    expect(response.status).toBe(413);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("membatalkan stream ketika batas byte terlampaui", async () => {
    const cancel = vi.fn();
    const stream = new ReadableStream({
      pull(controller) {
        controller.enqueue(new Uint8Array(11000));
      },
      cancel,
    });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: stream,
      duplex: "half",
    } as RequestInit);
    const response = await createContactHandler({
      sendEmail: vi.fn(),
      consumeRateLimit: allowRequest,
    })(request);
    expect(response.status).toBe(413);
    expect(cancel).toHaveBeenCalledOnce();
  });

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
