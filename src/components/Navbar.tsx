"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { MapPin, Moon, Sun, Menu } from "lucide-react"
import { useState, useEffect } from "react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            DIGIPIN
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          <Link href="/#use-cases" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Use Cases</Link>
          <Link href="/api-docs" className="text-sm font-medium hover:text-primary transition-colors">
            API Docs
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors cursor-pointer bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
            <span>EN</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <Link href="/register" className="hidden md:block px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-full shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
            Get Started
          </Link>
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-primary/10 rounded-lg">Features</Link>
          <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-primary/10 rounded-lg">How it Works</Link>
          <Link href="/#use-cases" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-primary/10 rounded-lg">Use Cases</Link>
          <Link href="/api-docs" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 hover:bg-primary/10 rounded-lg">API Docs</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium p-2 bg-primary text-white text-center rounded-lg mt-2">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
