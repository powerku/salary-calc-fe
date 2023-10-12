import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '인상률 계산기',
  description: '인상률 계산기',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      {children}</body>
    </html>
  )
}
