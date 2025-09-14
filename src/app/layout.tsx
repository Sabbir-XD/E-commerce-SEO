import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import Providers from "@/components/Providers"
import { Inter } from "next/font/google"
import LayoutWrapper from "@/components/LayoutWrapper"  // new client component

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Arial"],
})

export const metadata: Metadata = {
  title: "E-commerce SEO",
  description: "SEO optimized E-commerce site",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
