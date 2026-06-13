import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer | DIGIPIN Enterprise",
  description: "Legal disclaimers regarding the use of DIGIPIN data.",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
            <p className="text-muted-foreground mb-8">Last updated: June 13, 2026</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">No Warranties</h2>
            <p className="text-muted-foreground mb-4">
              The DIGIPIN platform, including all APIs, decoders, and map services, is provided "as is" without any representations or warranties, express or implied.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Location Accuracy</h2>
            <p className="text-muted-foreground mb-4">
              DIGIPIN algorithms map global coordinates to a theoretical grid. Actual on-the-ground precision relies heavily on the accuracy of the GPS hardware in the user's device and the underlying OpenStreetMap dataset. 
              We are not liable for any logistical errors, delayed shipments, or damages caused by geospatial inaccuracies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Not for Emergency Navigation</h2>
            <p className="text-muted-foreground mb-4">
              While we provide extremely accurate geospatial mapping, DIGIPIN must not be relied upon as the sole method of navigation for aviation, maritime operations, or emergency life-saving dispatches.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
