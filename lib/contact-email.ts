import type { ContactData } from "@/lib/contact";
import { servicePackages } from "@/data/services";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );
}

export function buildContactEmail(data: ContactData) {
  const service = data.service || "Belum dipilih";
  const selectedPackage = servicePackages.find(
    (item) => item.name === data.service,
  );
  const estimate = selectedPackage
    ? `${selectedPackage.price} · ${selectedPackage.duration} (indikasi, bukan penawaran final)`
    : "Ruang lingkup perlu didiskusikan";
  return {
    subject: `Konsultasi ${service} — ${data.name}`
      .replace(/[\r\n]+/g, " ")
      .slice(0, 180),
    text: [
      "PERMINTAAN KONSULTASI WEBSITE",
      `Nama: ${data.name}`,
      `Email: ${data.email}`,
      `Jenis kebutuhan: ${service}`,
      `Estimasi paket: ${estimate}`,
      "",
      "Pesan:",
      data.message,
      "",
      "Balas email ini untuk menghubungi pengirim.",
    ].join("\n"),
    html: `<!doctype html><html lang="id"><body style="margin:0;padding:28px;background:#f7f8f2;font-family:Arial,sans-serif;color:#20251f">
      <table role="presentation" style="max-width:600px;width:100%;margin:auto;border:1px solid #dce1d4;border-spacing:0;background:#fff">
        <tr><td style="padding:28px;background:#252d22;color:#f1f4e9"><p style="color:#d3f36b;font-size:12px">ABDULRAFI. / KONTAK WEBSITE</p><h1 style="font-size:26px">Mari mulai percakapan.</h1></td></tr>
        <tr><td style="padding:28px"><h2 style="font-size:18px">${escapeHtml(service)}</h2>
          <p><strong>Nama:</strong> ${escapeHtml(data.name)}<br><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p style="font-size:13px;color:#61685d">${escapeHtml(estimate)}</p>
          <div style="padding:20px;background:#eef1e6;border-radius:8px;line-height:1.7;overflow-wrap:anywhere">${escapeHtml(data.message).replace(/\r?\n/g, "<br>")}</div>
          <p style="font-size:12px;color:#61685d">Balas email ini untuk menghubungi pengirim.</p>
        </td></tr>
      </table></body></html>`,
  };
}
