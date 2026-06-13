import { Search, MapPin, AlertCircle, Map, Target, QrCode, Share2, Compass, ShieldAlert, Navigation } from "lucide-react"

export function HomePromos() {
  return (
    <div className="flex flex-col gap-24 py-24 relative z-10 overflow-hidden">
      {/* Decoder Promo */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 lg:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
              <Search className="w-4 h-4" /> The DIGIPIN Decoder
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Unlock the Power of Precision</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Transform any official 10-character DIGIPIN back into a highly accurate physical address. The decoder provides you with pinpoint accuracy, making delivery and logistics flawless.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><Target className="w-5 h-5 text-blue-500" /></div>
                <span className="font-medium">Pinpoint Latitude & Longitude</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><Map className="w-5 h-5 text-blue-500" /></div>
                <span className="font-medium">Instant Interactive Map Display</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><QrCode className="w-5 h-5 text-blue-500" /></div>
                <span className="font-medium">Scannable QR Code Generation</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="glass p-6 md:p-8 rounded-3xl relative z-10 shadow-2xl border-t border-l border-white/20">
              <div className="space-y-4">
                <div className="h-4 w-1/3 bg-black/10 dark:bg-white/10 rounded-full" />
                <div className="h-12 w-full bg-black/5 dark:bg-white/5 rounded-xl border border-border flex items-center px-4">
                  <span className="font-mono text-xl tracking-wider font-bold">39J-438-TJC7</span>
                </div>
                <div className="h-32 w-full bg-black/5 dark:bg-white/5 rounded-xl mt-4 relative overflow-hidden">
                  {/* Fake map dots */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Encoder Promo */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="glass p-6 md:p-8 rounded-3xl relative z-10 shadow-2xl border-t border-l border-white/20">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold">ADDRESS MAPPED</div>
                </div>
                <div>
                  <div className="h-4 w-3/4 bg-black/10 dark:bg-white/10 rounded-full mb-2" />
                  <div className="h-4 w-1/2 bg-black/10 dark:bg-white/10 rounded-full" />
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-1">Generated DIGIPIN</div>
                  <div className="text-3xl font-mono font-bold text-purple-500">8K3-9M1-X2A</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 lg:pl-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" /> The DIGIPIN Encoder
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Create Your Universal Address</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't have a DIGIPIN yet? Generate one instantly using your current GPS coordinates, a manual map click, or by typing in your physical address.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><Navigation className="w-5 h-5 text-purple-500" /></div>
                <span className="font-medium">1-Click GPS Detection</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><Compass className="w-5 h-5 text-purple-500" /></div>
                <span className="font-medium">Visual Map Pin Dropping</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5"><Share2 className="w-5 h-5 text-purple-500" /></div>
                <span className="font-medium">Instantly Shareable Links</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SOS Promo */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="glass border-red-500/30 bg-red-500/5 p-8 md:p-12 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold mb-6">
                <ShieldAlert className="w-4 h-4 animate-pulse" /> Emergency Location Sharing
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">When Every Second Counts</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                The built-in SOS feature instantly detects your GPS, generates your exact DIGIPIN, and creates a live emergency tracking room that you can share with first responders via WhatsApp, Telegram, or SMS.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full text-sm font-medium border border-border">
                  <AlertCircle className="w-4 h-4 text-red-500" /> 1-Click SOS
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full text-sm font-medium border border-border">
                  <MapPin className="w-4 h-4 text-red-500" /> Live Tracking Room
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-4 bg-red-500/40 rounded-full animate-pulse" />
                <div className="relative z-10 w-24 h-24 bg-red-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-zinc-900">
                  <span className="text-white font-black text-xl tracking-widest">SOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
