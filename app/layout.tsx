import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emmanuel Villegas Urrea — Desarrollador Full-Stack",
  description:
    "Portafolio de Emmanuel Villegas Urrea, Desarrollador Full-Stack y Fundador de FlowsFy. Especializado en Node.js, Next.js, TypeScript y arquitecturas SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#0a0a0f] text-slate-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
