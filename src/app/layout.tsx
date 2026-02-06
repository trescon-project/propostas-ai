import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '700'],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gestão de Propostas",
  description: "Plataforma Interna",
};

import { ProposalProvider } from "@/contexts/ProposalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ProposalProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ProposalProvider>
      </body>
    </html>
  );
}
