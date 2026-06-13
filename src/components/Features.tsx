"use client"

import { motion } from "framer-motion"
import { QrCode, MapPinned, Share2, ShieldCheck, Zap, Database } from "lucide-react"

const features = [
  {
    icon: <MapPinned className="w-6 h-6" />,
    title: "Advanced Decoder",
    description: "Get exact coordinates, full address details, accuracy radius, and nearby landmarks instantly."
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Reverse Generator",
    description: "Convert any address, GPS coordinate, or map click directly into a standard DIGIPIN."
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Shareable QR Pages",
    description: "Generate unique location URLs and QR codes for quick sharing on WhatsApp or Telegram."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Enterprise Dashboard",
    description: "Save places, manage business branches, and export bulk analytics with ease."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Developer APIs",
    description: "Integrate our high-performance REST APIs into your own applications with 99.9% uptime."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Bank-Grade Security",
    description: "Your location data is encrypted and protected with advanced rate limiting and JWT auth."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for <span className="text-primary">Scale</span></h2>
          <p className="text-lg text-muted-foreground">Everything you need to manage location intelligence seamlessly across your organization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
