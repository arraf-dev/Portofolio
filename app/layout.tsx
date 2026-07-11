import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
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
  metadataBase: new URL("https://abdulrafi.my.id"),
  title: "Abdul Rafi — Web Developer & Sistem Informasi untuk Institusi",
  description:
    "Web developer & pengembang sistem informasi custom untuk ormawa, kopma, prodi, sekolah, dan organisasi kecil. Mahasiswa IT UNY, eks-intern DISKOMINFO Yogyakarta.",
  openGraph: {
    title: "Abdul Rafi — Web Developer & Sistem Informasi untuk Institusi",
    description:
      "Sistem informasi custom untuk ormawa, kopma, prodi, sekolah, dan organisasi kecil.",
    url: "https://abdulrafi.my.id",
    siteName: "Abdul Rafi",
    images: ["/og-image.png"], // ganti dengan gambar 1200x630 di folder public/
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${archivo.variable} ${plex.variable} bg-paper font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
