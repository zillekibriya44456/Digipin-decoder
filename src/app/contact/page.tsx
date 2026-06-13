import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Mail, Phone, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | DIGIPIN Enterprise",
  description: "Get in touch with the DIGIPIN team for support, enterprise inquiries, and partnerships.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our location intelligence API or need enterprise support? Our team is here to help.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="glass p-6 rounded-2xl flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl"><Mail className="text-primary w-6 h-6" /></div>
                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="text-muted-foreground">support@digipin.io</p>
                  <p className="text-muted-foreground">enterprise@digipin.io</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl"><Phone className="text-primary w-6 h-6" /></div>
                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl"><MapPin className="text-primary w-6 h-6" /></div>
                <div>
                  <h4 className="font-semibold text-lg">Headquarters</h4>
                  <p className="text-muted-foreground">123 Geospatial Way<br/>Tech District, San Francisco<br/>CA 94105, USA</p>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-3xl">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
