"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Map } from "@/components/Map"
import { AlertTriangle, Navigation, MapPin, Share2, ShieldAlert } from "lucide-react"

export default function SOSPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [emergencyData, setEmergencyData] = useState<any>(null)

  const triggerSOS = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported. Cannot trigger SOS.")
      return
    }

    setLoading(true)
    setError("")

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch("/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              latitude: position.coords.latitude, 
              longitude: position.coords.longitude 
            })
          })
          const data = await res.json()
          
          if (!res.ok) throw new Error(data.error)
          
          setEmergencyData({
            ...data,
            timestamp: new Date().toLocaleString(),
            shareUrl: `${window.location.origin}/location/${data.digipin}`
          })
        } catch (err: any) {
          setError("Failed to generate emergency location: " + err.message)
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setError("Location access denied. Please enable GPS for emergency features.")
        setLoading(false)
      },
      { enableHighAccuracy: true }
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-6">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">Emergency SOS</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                One-click emergency location generation. We instantly calculate your exact 4x4m DIGIPIN and prepare it for immediate sharing with emergency services.
              </p>
            </div>

            {!emergencyData ? (
              <div className="text-center">
                <button
                  onClick={triggerSOS}
                  disabled={loading}
                  className="w-48 h-48 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-2xl shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 mx-auto"
                >
                  {loading ? (
                    <span className="animate-pulse">Locating...</span>
                  ) : (
                    <>
                      <AlertTriangle className="w-10 h-10" />
                      SOS
                    </>
                  )}
                </button>
                {error && <p className="text-red-500 mt-6 font-medium">{error}</p>}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-3xl border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                  <h2 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" /> Active Emergency
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Exact DIGIPIN</p>
                      <p className="text-4xl font-bold tracking-widest text-foreground mt-1">{emergencyData.digipin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timestamp</p>
                      <p className="font-medium text-red-400">{emergencyData.timestamp}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Latitude</p>
                        <p className="font-mono font-medium">{emergencyData.latitude.toFixed(6)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Longitude</p>
                        <p className="font-mono font-medium">{emergencyData.longitude.toFixed(6)}</p>
                      </div>
                    </div>
                    <div className="pt-6 grid grid-cols-2 gap-4 border-t border-border">
                      <a href={`whatsapp://send?text=EMERGENCY! My exact location DIGIPIN is ${emergencyData.digipin}. Map: ${emergencyData.shareUrl}`} className="w-full py-3 bg-[#25D366] text-white rounded-xl font-medium flex justify-center items-center gap-2">
                        WhatsApp
                      </a>
                      <button onClick={() => navigator.clipboard.writeText(`EMERGENCY! DIGIPIN: ${emergencyData.digipin}`)} className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-medium flex justify-center items-center gap-2">
                        <Share2 className="w-4 h-4" /> Copy Link
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="h-[300px] glass p-2 rounded-3xl relative overflow-hidden">
                    <Map lat={emergencyData.latitude} lng={emergencyData.longitude} zoom={18} />
                  </div>
                  <div className="glass p-6 rounded-3xl flex items-center gap-6">
                    <img src={`/api/qr?text=${encodeURIComponent(emergencyData.shareUrl)}&type=svg`} alt="Emergency QR" className="w-32 h-32 rounded-xl bg-white p-2" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Scan to locate</h3>
                      <p className="text-sm text-muted-foreground">First responders can scan this QR code to get turn-by-turn navigation directly to your exact 4x4m location.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
