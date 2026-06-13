import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interactive Global Map | DIGIPIN Enterprise",
  description: "Explore the global DIGIPIN grid via our interactive geospatial map.",
}

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Grid Map</h1>
            <p className="text-lg text-muted-foreground">
              Click anywhere on the map to instantly generate its 4m² precise DIGIPIN.
            </p>
          </div>
          
          <div className="h-[70vh] rounded-3xl overflow-hidden glass p-2 relative z-10">
            <Map lat={28.6139} lng={77.2090} zoom={4} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
