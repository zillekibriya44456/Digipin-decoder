import Link from "next/link"
import { MapPin, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">DIGIPIN</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The world's most advanced DIGIPIN platform for decoding, generating, and managing precise locations globally.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/decoder" className="hover:text-primary transition-colors">Decoder</Link></li>
              <li><Link href="/generator" className="hover:text-primary transition-colors">Generator</Link></li>
              <li><Link href="/map" className="hover:text-primary transition-colors">Interactive Map</Link></li>
              <li><Link href="/api-docs" className="hover:text-primary transition-colors">Developer API</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ZilVerse Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
