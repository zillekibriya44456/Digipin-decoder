import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { MapPin, Search } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | DIGIPIN",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-28 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-8 animate-pulse">
            <Search className="w-10 h-10" />
          </div>
          <h1 className="text-7xl font-black mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-600">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-6">Location Not Found</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto mb-10">
            We've mapped the entire globe, but we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Return Home
            </Link>
            <Link href="/decoder" className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 font-medium rounded-full transition-transform hover:scale-105 active:scale-95">
              Open Decoder
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
