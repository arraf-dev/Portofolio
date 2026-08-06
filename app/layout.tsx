import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: "Portofolio Abdul Rafi",
  authors: [{ name: "Abdul Rafi", url: SITE_URL }],
  creator: "Abdul Rafi",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Abdul Rafi",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Abdul Rafi — Sistem Informasi untuk Institusi dan Organisasi Kecil",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.theme;if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${archivo.variable} ${plex.variable} bg-paper font-sans text-ink antialiased`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-lg bg-ink px-4 py-3 font-bold text-paper transition-transform focus:translate-y-0"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
