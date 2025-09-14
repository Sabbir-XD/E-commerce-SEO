"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ReactNode } from "react"

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  return (
    <>
      {!isDashboard && <Navbar />}

      <main className="flex-grow w-full">{children}</main>

      {!isDashboard && <Footer />}
    </>
  )
}
