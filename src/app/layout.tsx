import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "연봉 계산기",
  description: "연봉 계산기",
  verification: {
    google: "5nZ3LeTLOyAdZmEZ9vLrmRYJkP0pfYLWMxkguihGjQM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
