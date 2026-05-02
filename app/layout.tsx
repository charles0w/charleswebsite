import type { Metadata } from "next";
import { Dancing_Script, Caveat, Lato } from "next/font/google";
import "./globals.css";

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Charles Ow — Builder, Developer, Gearhead",
  description:
    "UC Berkeley student building AI tools, startups, and websites. Founder of Redline car club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancing.variable} ${caveat.variable} ${lato.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
