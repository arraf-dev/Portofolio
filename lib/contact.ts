import { serviceOptions } from "@/data/services";

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  service: 80,
  messageMin: 10,
  messageMax: 3000,
} as const;

export type ContactField = "name" | "email" | "service" | "message";

export type ContactData = {
  name: string;
  email: string;
  service: string;
  message: string;
  website: string;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_CONTACT_DATA: ContactData = {
  name: "",
  email: "",
  service: "",
  message: "",
  website: "",
};

function readString(record: Record<string, unknown>, key: string) {
  return typeof record[key] === "string" ? record[key] : "";
}

export function validateContactPayload(input: unknown): {
  data: ContactData;
  errors: ContactErrors;
} {
  const record =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const data: ContactData = {
    name: readString(record, "name").trim(),
    email: readString(record, "email").trim().toLowerCase(),
    service: readString(record, "service").trim(),
    message: readString(record, "message").trim(),
    website: readString(record, "website").trim(),
  };

  const errors: ContactErrors = {};

  if (!data.name) {
    errors.name = "Nama wajib diisi.";
  } else if (data.name.length > CONTACT_LIMITS.name) {
    errors.name = `Nama maksimal ${CONTACT_LIMITS.name} karakter.`;
  }

  if (!data.email) {
    errors.email = "Email wajib diisi.";
  } else if (data.email.length > CONTACT_LIMITS.email) {
    errors.email = `Email maksimal ${CONTACT_LIMITS.email} karakter.`;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (data.service.length > CONTACT_LIMITS.service) {
    errors.service = `Pilihan kebutuhan maksimal ${CONTACT_LIMITS.service} karakter.`;
  } else if (
    record.service !== undefined &&
    typeof record.service !== "string"
  ) {
    errors.service = "Pilihan kebutuhan tidak valid.";
  } else if (data.service && !serviceOptions.includes(data.service)) {
    errors.service = "Pilih jenis kebutuhan yang tersedia.";
  }

  if (!data.message) {
    errors.message = "Pesan wajib diisi.";
  } else if (data.message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Pesan minimal ${CONTACT_LIMITS.messageMin} karakter.`;
  } else if (data.message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Pesan maksimal ${CONTACT_LIMITS.messageMax} karakter.`;
  }

  return { data, errors };
}
