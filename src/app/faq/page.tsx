import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { FAQ as FAQComponent } from "@/components/FAQ"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | DIGIPIN Enterprise",
  description: "Find answers to the most common questions about the DIGIPIN system.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about implementing and using DIGIPIN.
            </p>
          </div>
          
          {/* Reuse the existing FAQ component */}
          <FAQComponent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
