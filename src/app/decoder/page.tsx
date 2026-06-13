"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { QRCodeGenerator } from "@/components/QRCodeGenerator"
import { Search, MapPin, Navigation, Compass, AlertCircle, Copy, Check, Loader2, Share2, Map as MapIcon } from "lucide-react"

function DecoderContent() {
  const searchParams = useSearchParams()
  const initialPin = searchParams.get("pin") || ""
  
  const [digipin, setDigipin] = useState(initialPin)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)
  
  const [copiedCoords, setCopiedCoords] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [copiedPin, setCopiedPin] = useState(false)

  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([])
  const [nearbyLoading, setNearbyLoading] = useState(false)
  const [nearbyType, setNearbyType] = useState("hospital")

  const fetchNearby = async (lat: number, lng: number, type: string) => {
    setNearbyLoading(true)
    try {
      const res = await fetch(`/api/nearby?lat=${lat}&lon=${lng}&type=${type}`)
      const data = await res.json()
      setNearbyPlaces(data.places || [])
    } catch (e) {
      console.error(e)
    } finally {
      setNearbyLoading(false)
    }
  }

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
      
      setResult({ ...data, digipin: pinToDecode.toUpperCase() })
      fetchNearby(data.latitude, data.longitude, nearbyType)
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

  const handleCopy = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (result && navigator.share) {
      try {
        await navigator.share({
          title: `DIGIPIN Location: ${result.digipin}`,
          text: `Check out this exact location at DIGIPIN ${result.digipin}:\n${result.address}`,
          url: `${window.location.origin}/location/${result.digipin}`,
        })
      } catch (err) {
        console.error("Error sharing", err)
      }
    } else {
      handleCopy(`${window.location.origin}/location/${result?.digipin}`, setCopiedPin) // fallback
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Data & QR */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* DIGIPIN Card */}
                <div className="glass p-6 rounded-3xl bg-primary/5 border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MapIcon className="w-24 h-24 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">DIGIPIN</h3>
                  <div className="flex items-center justify-between relative z-10">
                    <p className="font-bold text-3xl tracking-wider text-primary">{result.digipin}</p>
                    <button 
                      onClick={() => handleCopy(result.digipin, setCopiedPin)}
                      className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/20 text-primary transition-colors"
                      title="Copy DIGIPIN"
                    >
                      {copiedPin ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Location Details */}
                <div className="glass p-6 rounded-3xl">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</span>
                    <button 
                      onClick={() => handleCopy(result.address, setCopiedAddress)}
                      className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors"
                      title="Copy Address"
                    >
                      {copiedAddress ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-lg leading-tight">{result.address}</p>
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

                {/* Geospatial Data */}
                <div className="glass p-6 rounded-3xl">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Compass className="w-4 h-4" /> Coordinates
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium font-mono tracking-tight text-lg">
                        {result.latitude.toFixed(6)}, {result.longitude.toFixed(6)}
                      </p>
                      <button 
                        onClick={() => handleCopy(`${result.latitude}, ${result.longitude}`, setCopiedCoords)}
                        className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/20 text-primary transition-colors"
                        title="Copy Coordinates"
                      >
                        {copiedCoords ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground inline-block mr-2">Accuracy Radius:</p>
                      <span className="font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md text-sm">{result.accuracy}</span>
                    </div>
                  </div>
                </div>

                {/* Actions & QR */}
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${result.latitude},${result.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20"
                  >
                    <Navigation className="w-4 h-4" /> Navigate
                  </a>
                  <button 
                    onClick={handleShare}
                    className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share PIN
                  </button>
                </div>

                <QRCodeGenerator 
                  value={`${typeof window !== 'undefined' ? window.location.origin : 'https://digipin.io'}/location/${result.digipin}`} 
                  title="Location QR Code"
                />
              </div>

              {/* Right Column: Map & Nearby */}
              <div className="lg:col-span-8 space-y-6">
                <div className="h-[500px] lg:h-[600px] glass p-2 rounded-3xl relative overflow-hidden">
                  <Map 
                    lat={result.latitude} 
                    lng={result.longitude} 
                    zoom={18} 
                    markers={nearbyPlaces.map(p => ({
                      lat: p.latitude, 
                      lng: p.longitude, 
                      title: p.name, 
                      description: `${p.distance} km away`
                    }))}
                  />
                </div>

                <div className="glass p-6 rounded-3xl">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Nearby Explorer
                    </h3>
                    <div className="flex gap-2">
                      {["hospital", "school", "restaurant", "atm"].map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setNearbyType(t);
                            fetchNearby(result.latitude, result.longitude, t);
                          }}
                          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize ${nearbyType === t ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-primary/10"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {nearbyLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : nearbyPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {nearbyPlaces.map((place, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white/50 dark:bg-black/40 border border-white/20 dark:border-white/10 hover:border-primary/30 transition-colors">
                          <p className="font-bold text-sm mb-1">{place.name}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground capitalize">{place.type.replace("_", " ")}</span>
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{place.distance} km</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground text-sm">
                      No nearby {nearbyType}s found within 5km.
                    </div>
                  )}
                </div>
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
