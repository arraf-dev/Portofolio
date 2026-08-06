import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

describe("WhatsApp configuration", () => {
  it("mengubah nomor lokal Indonesia ke format internasional", () => {
    expect(normalizeWhatsAppNumber("0812-3456-7890")).toBe("6281234567890");
  });

  it("mempertahankan nomor internasional yang valid", () => {
    expect(normalizeWhatsAppNumber("+62 812 3456 7890")).toBe("6281234567890");
  });

  it("menyembunyikan link untuk konfigurasi kosong atau tidak valid", () => {
    expect(buildWhatsAppUrl()).toBeNull();
    expect(buildWhatsAppUrl("123")).toBeNull();
  });

  it("membuat link dengan pesan awal", () => {
    const url = buildWhatsAppUrl("+62 812 3456 7890");

    expect(url).toContain("https://wa.me/6281234567890?text=");
    expect(decodeURIComponent(url || "")).toContain(
      "Halo Abdul Rafi, saya ingin berdiskusi",
    );
  });
});
