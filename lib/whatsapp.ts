const WHATSAPP_MESSAGE =
  "Halo Abdul Rafi, saya ingin berdiskusi mengenai kebutuhan website atau sistem informasi untuk organisasi kami.";

export function normalizeWhatsAppNumber(value?: string) {
  if (!value) return null;

  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `62${digits.slice(1)}`;

  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;

  return digits;
}

export function buildWhatsAppUrl(value?: string) {
  const number = normalizeWhatsAppNumber(value);
  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
