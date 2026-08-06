import { createContactHandler } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = createContactHandler();
