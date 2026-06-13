import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { MapPin, Globe, Shield, Zap } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | DIGIPIN Enterprise",
  description: "Learn about DIGIPIN Enterprise and our mission to revolutionize location intelligence globally.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About DIGIPIN</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are on a mission to democratize location intelligence by providing the most precise, reliable, and accessible alphanumeric addressing system in the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20 max-w-5xl mx-auto">
            <div className="glass p-8 rounded-3xl">
              <MapPin className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To create a world where every 4-square-meter patch of land has a unique, universally recognizable identifier, enabling seamless logistics, emergency response, and digital integration.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl">
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
              <p className="text-muted-foreground">
                Powered by OpenStreetMap and advanced geospatial algorithms, our technology maps the entire globe with unprecedented accuracy, transcending borders and language barriers.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
