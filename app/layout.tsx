import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "J & M Painting | The Art of Living, Refined",
  description: "Boutique residential and commercial painting curation. Meticulous craftsmanship, premium finishes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-bespoke-gradient selection:bg-gold/30`}
      >
        <div className="noise-bg" />
        <CustomCursor />
        {children}
      </body>

    </html>
  );
}

