"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Enter Location Data",
    description: "Input a DIGIPIN, regular address, or drop a pin on the map to start the process."
  },
  {
    number: "02",
    title: "Engine Processes",
    description: "Our proprietary algorithm decodes the input into highly accurate geospatial coordinates."
  },
  {
    number: "03",
    title: "Get Results",
    description: "Instantly view exact map locations, accuracy radii, and nearby landmarks."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-black/5 dark:bg-white/5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">How DIGIPIN Works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to enterprise-grade location intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="relative text-center px-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl relative z-10">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
