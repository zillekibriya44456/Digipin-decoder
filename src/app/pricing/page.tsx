import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Check } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | DIGIPIN Enterprise",
  description: "Flexible API pricing plans for startups and enterprises using DIGIPIN.",
}

const PLANS = [
  {
    name: "Developer",
    price: "Free",
    desc: "Perfect for testing and small personal projects.",
    features: ["1,000 API requests / month", "Standard Accuracy (±10m)", "Community Support", "1 API Key"],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    desc: "For growing logistics and delivery applications.",
    features: ["100,000 API requests / month", "High Accuracy (±4m)", "Bulk Decoding API", "Email Support", "5 API Keys"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Unlimited scale for massive geospatial platforms.",
    features: ["Unlimited API requests", "On-Premise Deployment", "Dedicated Account Manager", "24/7 Phone Support", "SLA Guarantee"],
    cta: "Contact Sales",
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground">
              Scale your location intelligence seamlessly. No hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i} className={`glass p-8 rounded-3xl relative ${plan.popular ? 'border-2 border-primary ring-4 ring-primary/10' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className="bg-primary/20 p-1 rounded-full"><Check className="w-3 h-3 text-primary" /></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/register'}
                  className={`block w-full py-3 rounded-xl font-medium text-center transition-all ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
