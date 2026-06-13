"use client"

import { useState } from "react"
import { Search, Map, Navigation, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function Hero() {
  const [digipin, setDigipin] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (digipin.trim()) {
      router.push(`/decoder?pin=${encodeURIComponent(digipin.trim().toUpperCase())}`)
    }
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Decode the World with <br className="hidden md:block" />
            <span className="text-gradient">Absolute Precision</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            The world's most advanced DIGIPIN platform. Generate, decode, and manage locations with pinpoint accuracy, built for global scale.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch} 
            className="w-full max-w-2xl relative flex items-center"
          >
            <div className="absolute left-4 text-muted-foreground">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={digipin}
              onChange={(e) => setDigipin(e.target.value)}
              placeholder="Enter DIGIPIN (e.g., 39J-438-TJC7)"
              className="w-full h-16 pl-14 pr-32 rounded-2xl border-2 border-primary/20 bg-white/60 dark:bg-black/40 backdrop-blur-md focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg shadow-xl"
            />
            <button 
              type="submit" 
              className="absolute right-2 h-12 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              Decode <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-primary" />
              <span>Interactive Maps</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              <span>Turn-by-turn Routing</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              <span>Reverse Generation</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
