import type { Metadata } from "next";
import { League_Spartan, Libre_Baskerville } from "next/font/google";
import "./globals.css";

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
  title: "Are you lost?",
  description: "App that will",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.variable} ${libreBaskerville.variable} bg-bg font-text text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
