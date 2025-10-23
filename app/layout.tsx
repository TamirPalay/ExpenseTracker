import type { Metadata } from "next";
import "./globals.css";
import { ToasterProvider } from "@/components/ToasterProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NexaTrack | Expense Manager",
  description: "Track expenses, analyze spending, and stay on top of your finances with NexaTrack."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
