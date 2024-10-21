import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Tabbles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-teal-400 to-blue-300">
        <AuthProvider>{children}</AuthProvider>
        <script src="html2pdf.bundle.min.js"></script>
      </body>
    </html>
  );
}
