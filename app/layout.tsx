import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitrine — Landing pages que convertem",
  description: "Três experiências digitais pensadas para transformar visitantes em clientes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
