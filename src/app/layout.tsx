import type { Metadata } from "next"
import "./globals.css"
import { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Providers from "@/components/Providers"
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "E-commerce SEO",
  description: "SEO optimized E-commerce site",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}