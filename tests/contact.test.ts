import { describe, expect, it } from "vitest";
import { validateContactPayload } from "@/lib/contact";

describe("validateContactPayload", () => {
  it("menolak form kosong", () => {
    const result = validateContactPayload({});

    expect(result.errors).toEqual({
      name: "Nama wajib diisi.",
      email: "Email wajib diisi.",
      message: "Pesan wajib diisi.",
    });
  });

  it("menolak email yang tidak valid", () => {
    const result = validateContactPayload({
      name: "Pengguna",
      email: "email-tidak-valid",
      message: "Kami membutuhkan website organisasi.",
    });

    expect(result.errors.email).toBe("Masukkan alamat email yang valid.");
  });

  it("menormalisasi data yang valid", () => {
    const result = validateContactPayload({
      name: "  Abdul  ",
      email: "  USER@EXAMPLE.COM ",
      service: " Company Profile ",
      message: "  Kami membutuhkan website organisasi.  ",
    });

    expect(result.errors).toEqual({});
    expect(result.data).toMatchObject({
      name: "Abdul",
      email: "user@example.com",
      service: "Company Profile",
      message: "Kami membutuhkan website organisasi.",
    });
  });
});
