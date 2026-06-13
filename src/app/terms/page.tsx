import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | DIGIPIN Enterprise",
  description: "Terms and conditions for using the DIGIPIN Enterprise platform and API.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 13, 2026</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using the DIGIPIN platform and APIs, you agree to be bound by these Terms of Service. If you do not agree, you must not access the platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. API Usage & Rate Limiting</h2>
            <p className="text-muted-foreground mb-4">
              Free tier users are subject to rate limiting of 100 requests per minute. Abuse of the API, unauthorized scraping, or attempting to reverse-engineer the core grid algorithm is strictly prohibited.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Accuracy of Data</h2>
            <p className="text-muted-foreground mb-4">
              While we strive for 4-square-meter accuracy, location data can be affected by GPS drift and external factors. DIGIPIN should not be used as the sole navigation source in life-critical situations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The DIGIPIN name, branding, and proprietary algorithms are intellectual property of DIGIPIN Enterprise. The base alphanumeric generation methodology is inspired by national postal frameworks.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
