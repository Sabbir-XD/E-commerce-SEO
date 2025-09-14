import { ReactNode } from "react"
import Sidebar from "@/components/dashboard/Sidebar"
import Providers from "@/components/Providers"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Providers>
        {/* Sidebar for dashboard */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </Providers>
    </div>
  )
}
