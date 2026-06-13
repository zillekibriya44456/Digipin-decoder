"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What exactly is a DIGIPIN?",
    answer: "DIGIPIN is a highly accurate, 10-character alphanumeric code that represents a precise 4x4 meter area on the globe. It serves as a universal, simplified address alternative."
  },
  {
    question: "Is the API free to use?",
    answer: "We offer a generous free tier for developers with up to 10,000 requests per month. For enterprise needs, we have scalable paid plans with SLA guarantees."
  },
  {
    question: "How accurate is the geocoding?",
    answer: "DIGIPIN uses advanced grid systems to pinpoint locations with an accuracy radius of under 4 meters, making it highly reliable for drone deliveries and emergency services."
  },
  {
    question: "Can I use DIGIPIN offline?",
    answer: "Yes, the core DIGIPIN algorithm runs completely offline. You only need an internet connection to fetch rich data like street names, nearby landmarks, or live maps."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about the DIGIPIN platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
