import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Scrabdle (Working Title)",
  description: "A Scrabble-like game built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`}>
          <Header />
          <main className="flex-grow py-4">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
