import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "SolveXAI - AI Automation & Web Development",
  description: "We save businesses 20+ hours/week with AI. Turn your website into a 24/7 sales machine.",
  keywords: ["AI automation", "web development", "AI receptionist", "business automation", "website templates"],
  authors: [{ name: "SolveXAI" }],
  openGraph: {
    title: "SolveXAI - AI Automation & Web Development",
    description: "We save businesses 20+ hours/week with AI. Turn your website into a 24/7 sales machine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll />
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
