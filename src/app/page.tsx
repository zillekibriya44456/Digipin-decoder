import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { TrustBadges } from "@/components/TrustBadges"
import { QuickActions } from "@/components/QuickActions"
import { HomePromos } from "@/components/HomePromos"
import { SEOContent } from "@/components/SEOContent"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <QuickActions />
        <HomePromos />
        <SEOContent />
      </main>
      <Footer />
    </>
  )
}
