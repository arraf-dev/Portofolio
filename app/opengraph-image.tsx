import { ImageResponse } from "next/og";

export const alt =
  "Abdul Rafi — Sistem Informasi untuk Institusi dan Organisasi Kecil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f9fb",
        color: "#16232e",
        padding: "72px 80px",
        border: "22px solid #e9f2f8",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 34,
          fontWeight: 800,
        }}
      >
        Abdul Rafi<span style={{ color: "#276a8c" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: 980,
          fontSize: 68,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-2px",
        }}
      >
        Sistem Informasi yang Rapi dan Mudah Dikelola untuk Institusi Kecil
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 27,
          color: "#45586a",
        }}
      >
        Website &amp; sistem informasi sesuai alur kerja organisasi
      </div>
    </div>,
    size,
  );
}
