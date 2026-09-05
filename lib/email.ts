import nodemailer from "nodemailer";
import type { ContactData } from "@/lib/contact";
import { CONTACT_EMAIL } from "@/lib/site";
import { buildContactEmail } from "@/lib/contact-email";

export class EmailConfigurationError extends Error {
  constructor() {
    super("Email transport is not configured.");
    this.name = "EmailConfigurationError";
  }
}

function getRequiredEnvironment(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new EmailConfigurationError();
  return value;
}

function getEmailConfiguration() {
  const host = getRequiredEnvironment("CONTACT_SMTP_HOST");
  const user = getRequiredEnvironment("CONTACT_SMTP_USER");
  const pass = getRequiredEnvironment("CONTACT_SMTP_PASSWORD");
  const from = getRequiredEnvironment("CONTACT_EMAIL_FROM");
  const to = process.env.CONTACT_EMAIL_TO?.trim() || CONTACT_EMAIL;
  const port = Number(process.env.CONTACT_SMTP_PORT || "587");

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new EmailConfigurationError();
  }

  const secureSetting = process.env.CONTACT_SMTP_SECURE?.trim().toLowerCase();
  if (secureSetting && secureSetting !== "true" && secureSetting !== "false") {
    throw new EmailConfigurationError();
  }

  return {
    host,
    port,
    secure: secureSetting ? secureSetting === "true" : port === 465,
    user,
    pass,
    from,
    to,
  };
}

export async function sendContactEmail(data: ContactData) {
  const config = getEmailConfiguration();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const info = await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    ...buildContactEmail(data),
  });

  if (!info.accepted.length) {
    throw new Error("SMTP server did not accept a recipient.");
  }
}
