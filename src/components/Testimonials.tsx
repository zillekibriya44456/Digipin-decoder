"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Operations Director, SwiftLogistics",
    content: "DIGIPIN has revolutionized our last-mile delivery. We've seen a 40% reduction in failed deliveries simply by routing directly to the 10-character code.",
    rating: 5
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Chief Medical Officer, City Health",
    content: "In emergency response, seconds matter. Our ambulance drivers now use DIGIPIN to bypass vague addresses and navigate exactly to the patient's location.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Product, E-Shop Global",
    content: "Integrating the DIGIPIN API took less than a day. Our checkout conversion rate went up by 15% after replacing the long, confusing address forms.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by the Best</h2>
          <p className="text-lg text-muted-foreground">See how industry leaders are transforming their operations with exact location intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-6 text-foreground italic">"{testimonial.content}"</p>
              <div>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
