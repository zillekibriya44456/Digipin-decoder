import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { MapPin, Navigation, Share2, Compass } from "lucide-react"

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const place = await prisma.savedPlace.findUnique({
    where: { slug: params.slug, isPublic: true }
  })

  if (!place) {
    // If we don't find it in the DB, maybe it's just a raw DIGIPIN?
    // In a real app, we'd handle raw DIGIPINs via URL decoding.
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-3xl mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
                  {place.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{place.title || "Shared Location"}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {place.address}
                </p>
              </div>
              <div className="text-center bg-white/50 dark:bg-black/50 p-6 rounded-2xl shadow-inner min-w-[200px]">
                <p className="text-sm font-semibold text-muted-foreground uppercase mb-1">DIGIPIN</p>
                <p className="text-3xl font-bold tracking-widest text-primary">{place.digipin}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="glass p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-medium font-mono">{place.latitude.toFixed(6)}, {place.longitude.toFixed(6)}</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/60 dark:hover:bg-black/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`} target="_blank" rel="noreferrer" className="font-medium">
                    Navigate Here
                  </a>
                  <p className="text-sm text-muted-foreground">Open in Google Maps</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/60 dark:hover:bg-black/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Share Location</p>
                  <p className="text-sm text-muted-foreground">Copy URL or QR Code</p>
                </div>
              </div>
            </div>

            <div className="h-[500px] glass p-2 rounded-3xl relative overflow-hidden">
              <Map lat={place.latitude} lng={place.longitude} zoom={16} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
