"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Truck, HeartPulse, Building2 } from "lucide-react"

const cases = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Logistics & Delivery",
    description: "Eliminate failed deliveries. Drivers use highly accurate DIGIPINs to navigate straight to the exact doorstep.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Emergency Services",
    description: "Save lives with instant, highly accurate location sharing. Ambulances reach the exact spot faster.",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-Commerce",
    description: "Streamline checkout by replacing long addresses with a single, verified 10-character code.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Real Estate",
    description: "Tag properties without precise addresses and share them securely with prospective buyers.",
    color: "from-green-500 to-emerald-500"
  }
]

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Industry Use Cases</h2>
            <p className="text-lg text-muted-foreground">Discover how the top industries are leveraging DIGIPIN to optimize their operational efficiency and cut costs.</p>
          </div>
          <button className="px-6 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all">
            View All Cases
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((useCase, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {useCase.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
