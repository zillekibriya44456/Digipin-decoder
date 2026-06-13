"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Map } from "@/components/Map"
import { MapPin, Navigation, Copy, Check, Target, Search, Share2, Bookmark } from "lucide-react"

export default function GeneratorPage() {
  const [address, setAddress] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [activeTab, setActiveTab] = useState<"address" | "coords">("address")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  // Default to center of India
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 })
  const [mapZoom, setMapZoom] = useState(5)

  const generatePin = async (payload: any) => {
    setLoading(true)
    setError("")
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || "Failed to generate DIGIPIN")
      
      setResult(data)
      setMapCenter({ lat: data.latitude, lng: data.longitude })
      setMapZoom(16)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    generatePin({ address })
  }

  const handleCoordsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lat || !lng) return
    generatePin({ latitude: parseFloat(lat), longitude: parseFloat(lng) })
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        generatePin({ 
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude 
        })
      },
      (err) => {
        setError("Unable to retrieve your location")
        setLoading(false)
      }
    )
  }

  const handleMapClick = useCallback((newLat: number, newLng: number) => {
    generatePin({ latitude: newLat, longitude: newLng })
  }, [])

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.digipin)
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">DIGIPIN Generator</h1>
            <p className="text-muted-foreground text-lg">
              Convert any address, GPS coordinate, or map location into a standard 10-character DIGIPIN.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass p-6 rounded-3xl">
                <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl mb-6">
                  <button 
                    onClick={() => setActiveTab("address")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "address" ? "bg-white dark:bg-black/40 shadow text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    By Address
                  </button>
                  <button 
                    onClick={() => setActiveTab("coords")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "coords" ? "bg-white dark:bg-black/40 shadow text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    By Coordinates
                  </button>
                </div>

                {activeTab === "address" ? (
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g., Mysore Palace, Karnataka"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading || !address.trim()}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                      {loading ? <span className="animate-pulse">Processing...</span> : "Generate DIGIPIN"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCoordsSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Latitude</label>
                        <input
                          type="number"
                          step="any"
                          value={lat}
                          onChange={(e) => setLat(e.target.value)}
                          placeholder="e.g., 28.6139"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Longitude</label>
                        <input
                          type="number"
                          step="any"
                          value={lng}
                          onChange={(e) => setLng(e.target.value)}
                          placeholder="e.g., 77.2090"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading || !lat || !lng}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                      {loading ? <span className="animate-pulse">Processing...</span> : "Generate DIGIPIN"}
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <button 
                    onClick={handleGetCurrentLocation}
                    className="w-full py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Target className="w-4 h-4" /> Use Current GPS Location
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
              </div>

              {result && (
                <div className="glass p-8 rounded-3xl text-center border-primary/20 bg-primary/5">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Generated DIGIPIN</h3>
                  <div className="text-4xl font-bold tracking-widest text-primary mb-6 py-4 bg-white/50 dark:bg-black/50 rounded-2xl shadow-inner">
                    {result.digipin}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {result.address}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={handleCopy} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium">
                      {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-primary/10 transition-colors text-sm font-medium">
                      <Bookmark className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 h-[600px] glass p-2 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 dark:bg-black/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Click anywhere on the map to generate a DIGIPIN
              </div>
              <Map 
                lat={mapCenter.lat} 
                lng={mapCenter.lng} 
                zoom={mapZoom} 
                onMapClick={handleMapClick}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
