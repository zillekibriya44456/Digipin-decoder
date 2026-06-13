import { ShieldCheck, CheckCircle2 } from "lucide-react"

export function TrustBadges() {
  const badges = [
    "Official DIGIPIN Specification Compliant",
    "Accurate DIGIPIN Generation & Decoding",
    "GIS-Based Location Intelligence",
    "Address ↔ DIGIPIN Conversion",
    "GPS ↔ DIGIPIN Conversion",
    "Interactive Maps & Navigation",
    "SOS Emergency Location Sharing",
    "Real-Time Address Intelligence"
  ]

  return (
    <section className="py-12 border-y border-border bg-black/5 dark:bg-white/5 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-4">
            <ShieldCheck className="w-4 h-4" /> Trusted Architecture
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-center">Built for Absolute Reliability</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 glass rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-muted-foreground">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
