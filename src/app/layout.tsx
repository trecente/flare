import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/app/providers";
import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Flare | %s",
    default: "Flare",
  },
  description:
    "Browse through a wide collection of anime images and easily find what you’re looking for by filtering by tags, artists, characters, and age ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <BackToTop />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
