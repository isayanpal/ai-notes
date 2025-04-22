import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import Navbar from "@/components/custom/Navbar";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteGenius",
  description:
    "Take smarter notes with AI assistance. NoteGenius helps you create, organize, and summarize your notes with the power of artificial intelligence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark bg-black`}
      >
        <ReactQueryProvider>
          <Navbar/>
          {children}
          <Toaster />
          </ReactQueryProvider>
      </body>
    </html>
  );
}
