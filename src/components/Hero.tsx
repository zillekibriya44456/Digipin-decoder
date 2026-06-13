"use client"

import { useState } from "react"
import { Search, MapPin, Navigation, ArrowRight, Crosshair, Map } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function Hero() {
  const [activeTab, setActiveTab] = useState<"decode" | "encode">("decode")
  const [decodeValue, setDecodeValue] = useState("")
  const [encodeType, setEncodeType] = useState<"address" | "gps" | "map">("address")
  const [encodeValue, setEncodeValue] = useState("")
  const router = useRouter()

  const handleDecode = (e: React.FormEvent) => {
    e.preventDefault()
    if (decodeValue.trim()) {
      router.push(`/decoder?pin=${encodeURIComponent(decodeValue.trim().toUpperCase())}`)
    }
  }

  const handleEncode = (e: React.FormEvent) => {
    e.preventDefault()
    if (encodeType === "address" && encodeValue.trim()) {
      router.push(`/generator?address=${encodeURIComponent(encodeValue.trim())}`)
    } else if (encodeType === "gps") {
      router.push(`/generator?action=gps`)
    } else if (encodeType === "map") {
      router.push(`/generator?action=map`)
    }
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Enterprise Location Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            India's Advanced <br className="hidden md:block" />
            <span className="text-gradient">DIGIPIN Platform</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
          >
            Generate, Decode, Verify, and Share DIGIPIN locations using the official DIGIPIN specification with real-time address intelligence, interactive maps, GPS integration, and SOS location sharing.
          </motion.p>
        </div>

        {/* DUAL MODE SYSTEM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto glass rounded-3xl p-2 md:p-4 shadow-2xl relative z-20"
        >
          {/* Tab Switcher */}
          <div className="flex bg-black/5 dark:bg-white/5 rounded-2xl p-1 mb-6 relative">
            <button
              onClick={() => setActiveTab("decode")}
              className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${activeTab === "decode" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Search className="w-4 h-4" /> Decode DIGIPIN
            </button>
            <button
              onClick={() => setActiveTab("encode")}
              className={`flex-1 py-3 text-sm md:text-base font-medium rounded-xl transition-all relative z-10 flex items-center justify-center gap-2 ${activeTab === "encode" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <MapPin className="w-4 h-4" /> Generate DIGIPIN
            </button>
            
            {/* Animated Tab Background */}
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-900 shadow-sm rounded-xl transition-all duration-300 ease-out z-0"
              style={{ left: activeTab === "decode" ? "4px" : "calc(50%)" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "decode" ? (
              <motion.form 
                key="decode"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleDecode} 
                className="relative flex items-center"
              >
                <div className="absolute left-4 text-muted-foreground">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={decodeValue}
                  onChange={(e) => setDecodeValue(e.target.value)}
                  placeholder="Enter DIGIPIN (e.g., 39J-438-TJC7)"
                  className="w-full h-16 pl-14 pr-32 rounded-2xl border-2 border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  Decode <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="encode"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleEncode} 
                className="space-y-4"
              >
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                  <button type="button" onClick={() => setEncodeType("address")} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${encodeType === "address" ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                    By Address
                  </button>
                  <button type="button" onClick={() => setEncodeType("gps")} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${encodeType === "gps" ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                    <Navigation className="w-4 h-4" /> Use GPS
                  </button>
                  <button type="button" onClick={() => setEncodeType("map")} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${encodeType === "map" ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"}`}>
                    <Crosshair className="w-4 h-4" /> Pick on Map
                  </button>
                </div>

                <div className="relative flex items-center">
                  <div className="absolute left-4 text-muted-foreground">
                    {encodeType === "address" ? <MapPin className="w-6 h-6" /> : <Map className="w-6 h-6" />}
                  </div>
                  <input
                    type="text"
                    value={encodeType === "address" ? encodeValue : ""}
                    onChange={(e) => setEncodeValue(e.target.value)}
                    placeholder={encodeType === "address" ? "Enter any address or landmark..." : "Click Generate to proceed"}
                    readOnly={encodeType !== "address"}
                    className={`w-full h-16 pl-14 pr-40 rounded-2xl border-2 border-border bg-background/50 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg ${encodeType !== "address" ? "opacity-70 cursor-not-allowed" : ""}`}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    Generate <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
