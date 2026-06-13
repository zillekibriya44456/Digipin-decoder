import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { AlertTriangle, MapPin, Navigation, Clock } from "lucide-react"

export default async function SOSPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const sosEvent = await prisma.sOSEvent.findUnique({
    where: { id: params.id }
  })

  if (!sosEvent) {
    notFound()
  }

  const timeAgo = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diffInMinutes = Math.round((new Date(sosEvent.createdAt).getTime() - new Date().getTime()) / 60000)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-destructive/10 border-2 border-destructive/20 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-destructive animate-pulse" />
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold text-destructive mb-4 tracking-tight">EMERGENCY SOS</h1>
              <p className="text-xl text-foreground/80 font-medium max-w-2xl mx-auto">
                Someone has shared this live emergency location. If you are a first responder or contact, navigate to this location immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold uppercase tracking-wider text-sm">Exact Location</span>
                </div>
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <p className="text-3xl font-bold text-primary mb-2">{sosEvent.digipin}</p>
                  <p className="font-medium text-lg">{sosEvent.address || "Address unavailable"}</p>
                  <p className="text-sm font-mono text-muted-foreground mt-2">
                    {sosEvent.latitude.toFixed(6)}, {sosEvent.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground mb-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold uppercase tracking-wider text-sm">Status</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                    </span>
                    <span className="font-bold text-lg">{sosEvent.status}</span>
                  </div>
                  <p className="text-muted-foreground">
                    Triggered {timeAgo.format(diffInMinutes, 'minute')}
                  </p>
                </div>

                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${sosEvent.latitude},${sosEvent.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-destructive/20"
                >
                  <Navigation className="w-5 h-5" /> NAVIGATE TO EMERGENCY
                </a>
              </div>
            </div>

            <div className="h-[500px] glass p-2 rounded-3xl relative overflow-hidden">
               <Map lat={sosEvent.latitude} lng={sosEvent.longitude} zoom={18} />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
