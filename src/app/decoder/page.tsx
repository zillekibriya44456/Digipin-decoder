"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { Search, MapPin, Navigation, Compass, AlertCircle, Copy, Check, Loader2 } from "lucide-react"

function DecoderContent() {
  const searchParams = useSearchParams()
  const initialPin = searchParams.get("pin") || ""
  
  const [digipin, setDigipin] = useState(initialPin)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const decodePin = async (pinToDecode: string) => {
    if (!pinToDecode.trim()) return

    setLoading(true)
    setError("")
    
    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ digipin: pinToDecode })
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || "Failed to decode")
      
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialPin && !result) {
      decodePin(initialPin)
    }
  }, [initialPin])

  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault()
    decodePin(digipin)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`${result.latitude}, ${result.longitude}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Advanced Decoder</h1>
            <p className="text-muted-foreground text-lg">
              Enter any DIGIPIN to instantly retrieve highly accurate geospatial data and full address details.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleDecode} className="relative flex items-center">
              <div className="absolute left-4 text-muted-foreground">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={digipin}
                onChange={(e) => setDigipin(e.target.value.toUpperCase())}
                placeholder="Enter DIGIPIN (e.g., 39J-438-TJC7)"
                className="w-full h-16 pl-14 pr-36 rounded-2xl border-2 border-primary/20 bg-white/60 dark:bg-black/40 backdrop-blur-md focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-xl font-medium tracking-wider shadow-xl uppercase"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
              >
                {loading ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> Decoding</>
                ) : (
                  <>Decode</>
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-destructive/10 text-destructive flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {result && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="glass p-6 rounded-3xl">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Address</p>
                      <p className="font-medium text-lg leading-tight mt-1">{result.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">City/District</p>
                        <p className="font-medium">{result.addressDetails.city || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Postal Code</p>
                        <p className="font-medium">{result.addressDetails.postal_code || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="font-medium">{result.addressDetails.state || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{result.addressDetails.country || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Geospatial Data
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Coordinates</p>
                        <p className="font-medium font-mono tracking-tight">
                          {result.latitude.toFixed(6)}, {result.longitude.toFixed(6)}
                        </p>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/20 text-primary transition-colors"
                        title="Copy Coordinates"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy Radius</p>
                      <p className="font-medium text-emerald-500">{result.accuracy}</p>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${result.latitude},${result.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 mt-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Navigation className="w-4 h-4" /> Navigate Here
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 h-[600px] glass p-2 rounded-3xl relative overflow-hidden">
                <Map lat={result.latitude} lng={result.longitude} zoom={16} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function DecoderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black/5 dark:bg-white/5">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <DecoderContent />
    </Suspense>
  )
}
