import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog & Updates | DIGIPIN Enterprise",
  description: "Read the latest news, updates, and tutorials about the DIGIPIN platform.",
}

const POSTS = [
  {
    title: "How DIGIPIN is Revolutionizing Last-Mile Delivery",
    excerpt: "Discover how 10-character alphanumeric codes are solving the billion-dollar problem of unstructured addresses in developing nations.",
    date: "Jun 10, 2026",
    author: "Zille Kibriya",
    category: "Logistics"
  },
  {
    title: "DIGIPIN API v2.0 Released",
    excerpt: "We've massively improved our geocoding speed and introduced bulk processing for enterprise clients mapping millions of coordinates.",
    date: "May 28, 2026",
    author: "Engineering Team",
    category: "Updates"
  },
  {
    title: "Location Intelligence for Emergency Responders",
    excerpt: "When every second counts, a 4-square-meter accurate DIGIPIN can mean the difference between life and death.",
    date: "May 15, 2026",
    author: "Sarah Jenkins",
    category: "Use Cases"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest Updates</h1>
            <p className="text-lg text-muted-foreground">
              Insights, engineering deep-dives, and news from the DIGIPIN team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {POSTS.map((post, i) => (
              <div key={i} className="glass p-6 rounded-3xl flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-4">{post.category}</span>
                <h3 className="text-xl font-bold mb-3 leading-tight">{post.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  </div>
                  <Link href="#" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium">
                    Read <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
