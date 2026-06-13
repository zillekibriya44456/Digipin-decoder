import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Book, LifeBuoy, Terminal, MessageSquare } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Help Center | DIGIPIN Enterprise",
  description: "Get support and learn how to use DIGIPIN.",
}

const TOPICS = [
  { title: "Getting Started", icon: Book, desc: "Learn the basics of what a DIGIPIN is and how to decode one." },
  { title: "API Documentation", icon: Terminal, desc: "Integrate our location intelligence engine into your app.", link: "/api-docs" },
  { title: "Account & Billing", icon: LifeBuoy, desc: "Manage your API keys, subscriptions, and billing details." },
  { title: "Community Forum", icon: MessageSquare, desc: "Ask questions and share solutions with other developers." }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help?</h1>
            <div className="relative max-w-xl mx-auto">
              <input 
                type="text" 
                placeholder="Search for articles, guides, or API endpoints..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary text-lg"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TOPICS.map((topic, i) => (
              <Link key={i} href={topic.link || "#"} className="glass p-8 rounded-3xl hover:bg-white/5 transition-colors group">
                <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <topic.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground">{topic.desc}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">Still need help?</p>
            <Link href="/contact" className="text-primary hover:underline font-medium mt-2 inline-block">Contact Support</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
