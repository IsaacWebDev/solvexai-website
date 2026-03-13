import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: '--font-heading',
  weight: ['400', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: "Prestige Estate - Luxury Real Estate",
  description: "Exclusive luxury properties in the world's most prestigious locations. Your dream home awaits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-body antialiased bg-light text-dark`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
