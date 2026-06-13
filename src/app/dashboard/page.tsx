"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { LogOut, MapPin, Search, Star, Settings, FileDown } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name}</h1>
              <p className="text-muted-foreground">Manage your DIGIPIN locations and history.</p>
            </div>
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors flex items-center gap-2 font-medium"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-1">12</h3>
              <p className="text-sm text-muted-foreground">Saved Places</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-1">148</h3>
              <p className="text-sm text-muted-foreground">Total Searches</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-1">3</h3>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
            <div className="glass p-6 rounded-2xl flex flex-col justify-center gap-3">
              <button className="w-full px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <FileDown className="w-4 h-4" /> Export Data
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> My Saved Places
            </h2>
            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
              <p className="text-muted-foreground mb-4">You haven't saved any locations yet.</p>
              <button onClick={() => router.push("/generator")} className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Generate a DIGIPIN
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
