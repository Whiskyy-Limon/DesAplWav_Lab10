import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Next.js Pokédex",
  description: "Laboratorio ISR/SSG en Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  );
}
