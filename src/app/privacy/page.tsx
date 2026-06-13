import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | DIGIPIN Enterprise",
  description: "Learn how DIGIPIN Enterprise handles and protects your data and location information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 13, 2026</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              When you use the DIGIPIN platform, we collect information necessary to provide you with precise location intelligence. This includes coordinates, IP addresses, and standard web analytics. If you register an account, we collect your name and email.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the collected information to operate, maintain, and improve the DIGIPIN platform. We do not sell your personal data or precise location history to third-party data brokers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard encryption and security measures to protect your data. All API requests are encrypted via HTTPS.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We utilize OpenStreetMap for map rendering and reverse geocoding. Your use of the map is also subject to OpenStreetMap's privacy terms.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
