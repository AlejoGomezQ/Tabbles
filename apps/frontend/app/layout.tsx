import type { Metadata } from "next";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer/>
        <AuthProvider>{children}</AuthProvider>
        <script src="html2pdf.bundle.min.js"></script>
      </body>
    </html>
  );
}
