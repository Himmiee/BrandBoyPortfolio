import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brand Boy",
  description: "My Portfolio",
  icons: {
    icon: "/logo/BrandBoy_Icon@4x.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${openSans.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right"  />
      </body>
    </html>
  );
}
