import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halo Gate - Anti-Scam Security Toolkit",
  description: "Protect yourself from scams with our comprehensive security toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
