import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAdvisor from "@/components/advisor/FloatingAdvisor";

export const metadata: Metadata = {
  title: {
    default: "Pura — Premium Farm-Fresh Dairy Delivery",
    template: "%s | Pura",
  },
  description:
    "Pure A2 cow milk, buffalo milk, ghee, paneer, and curd — delivered from certified farms to your doorstep within 12 hours. Customise your milk, subscribe daily, or order once.",
  keywords: ["A2 milk delivery", "fresh dairy", "buffalo milk", "Bilona ghee", "milk subscription", "paneer"],
  openGraph: {
    title: "Pura — Premium Dairy Delivery",
    description: "Farm freshness delivered with precision. A2 milk, buffalo milk, ghee, and more.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-cream-50 text-stone-900 antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingAdvisor />
      </body>
    </html>
  );
}
