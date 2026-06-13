"use client"

import { MapPin, Search, Navigation, Map, AlertCircle, QrCode, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Decode DIGIPIN",
      description: "Convert any DIGIPIN back to a highly accurate address and GPS coordinates.",
      icon: <Search className="w-8 h-8 text-blue-500" />,
      href: "/decoder",
      color: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/50 hover:bg-blue-500/10"
    },
    {
      title: "Address to DIGIPIN",
      description: "Type an address or landmark to instantly generate its official 10-character DIGIPIN.",
      icon: <MapPin className="w-8 h-8 text-purple-500" />,
      href: "/generator",
      color: "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10"
    },
    {
      title: "GPS to DIGIPIN",
      description: "Auto-detect your current live location and generate a DIGIPIN for sharing.",
      icon: <Navigation className="w-8 h-8 text-emerald-500" />,
      href: "/generator?action=gps",
      color: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/50 hover:bg-emerald-500/10"
    },
    {
      title: "Map to DIGIPIN",
      description: "Drop a pin anywhere on the interactive map to generate a precise DIGIPIN.",
      icon: <Map className="w-8 h-8 text-amber-500" />,
      href: "/generator?action=map",
      color: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10"
    },
    {
      title: "SOS Location Sharing",
      description: "1-Click emergency beacon. Send your DIGIPIN and exact coordinates to responders.",
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      href: "/generator?action=gps", // the user can click SOS in navbar, but this directs them to the GPS generator as a fallback
      color: "border-red-500/20 bg-red-500/5 hover:border-red-500/50 hover:bg-red-500/10"
    },
    {
      title: "Generate QR Code",
      description: "Create and print standard QR codes containing your DIGIPIN and address.",
      icon: <QrCode className="w-8 h-8 text-zinc-500" />,
      href: "/generator",
      color: "border-zinc-500/20 bg-zinc-500/5 hover:border-zinc-500/50 hover:bg-zinc-500/10 dark:text-zinc-300"
    }
  ]

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground">The complete location intelligence toolkit. Access any DIGIPIN functionality instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, idx) => (
            <Link 
              key={idx} 
              href={action.href}
              className={`group flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${action.color}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-sm">
                  {action.icon}
                </div>
                <div className="p-2 bg-black/5 dark:bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{action.title}</h3>
              <p className="text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
