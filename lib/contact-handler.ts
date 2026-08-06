import {
  consumeContactRateLimit,
  type RateLimitResult,
} from "@/lib/contact-rate-limit";
import { validateContactPayload, type ContactData } from "@/lib/contact";
import { EmailConfigurationError, sendContactEmail } from "@/lib/email";

const MAX_BODY_BYTES = 20_000;

type ContactHandlerDependencies = {
  sendEmail?: (data: ContactData) => Promise<void>;
  consumeRateLimit?: (key: string) => RateLimitResult;
};

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

export function createContactHandler(
  dependencies: ContactHandlerDependencies = {},
) {
  const sendEmail = dependencies.sendEmail || sendContactEmail;
  const consumeRateLimit =
    dependencies.consumeRateLimit || consumeContactRateLimit;

  return async function handleContactRequest(request: Request) {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse(
        { message: "Format permintaan tidak didukung." },
        415,
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ message: "Pesan terlalu besar." }, 413);
    }

    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return jsonResponse({ message: "Data form tidak dapat dibaca." }, 400);
    }

    if (JSON.stringify(input).length > MAX_BODY_BYTES) {
      return jsonResponse({ message: "Pesan terlalu besar." }, 413);
    }

    const rateLimit = consumeRateLimit(getClientKey(request));
    if (!rateLimit.allowed) {
      return jsonResponse(
        {
          message:
            "Terlalu banyak percobaan. Silakan tunggu sebelum mengirim lagi.",
        },
        429,
        { "Retry-After": String(rateLimit.retryAfterSeconds) },
      );
    }

    const { data, errors } = validateContactPayload(input);

    if (data.website) {
      return jsonResponse({ message: "Permintaan tidak dapat diproses." }, 400);
    }

    if (Object.keys(errors).length) {
      return jsonResponse(
        {
          message: "Periksa kembali data yang Anda isi.",
          errors,
        },
        400,
      );
    }

    try {
      await sendEmail(data);
      return jsonResponse(
        {
          message:
            "Pesan berhasil dikirim. Terima kasih sudah menghubungi Abdul Rafi.",
        },
        200,
      );
    } catch (error) {
      if (error instanceof EmailConfigurationError) {
        return jsonResponse(
          {
            message:
              "Layanan pengiriman pesan belum dikonfigurasi. Silakan hubungi melalui email.",
          },
          503,
        );
      }

      console.error(
        "Contact email delivery failed.",
        error instanceof Error ? error.name : "UnknownError",
      );

      return jsonResponse(
        {
          message:
            "Pesan belum berhasil dikirim. Silakan coba lagi atau hubungi melalui email.",
        },
        502,
      );
    }
  };
}
