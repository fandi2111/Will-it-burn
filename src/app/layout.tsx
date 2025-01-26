import type { Metadata } from "next";
import { League_Spartan, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Will it burn?",
  description:
    "Minimalistic app that raise awarerness on social issues with a touch of craziness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} ${libreBaskerville.variable} overflow-hidden bg-bg font-text text-fg antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
