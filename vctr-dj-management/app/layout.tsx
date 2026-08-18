import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VCTR DJ Management | Booking DJ & Rental Alat Profesional",
  description:
    "Manajemen DJ dan penyewaan peralatan sound & lighting profesional untuk klub, festival, pernikahan, dan acara korporat di seluruh Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-void text-ink font-body antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
