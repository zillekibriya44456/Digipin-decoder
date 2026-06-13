"use client"

import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Code, Terminal, Key } from "lucide-react"

export default function APIDocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">API Documentation</h1>
            <p className="text-muted-foreground text-lg">
              Integrate enterprise-grade location intelligence into your apps in minutes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Authentication</h2>
                  <p className="text-muted-foreground">All API requests require an API key passed via headers.</p>
                </div>
              </div>
              <div className="bg-black/80 text-white p-4 rounded-xl font-mono text-sm overflow-x-auto">
                <p>Authorization: Bearer YOUR_API_KEY</p>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Decode DIGIPIN</h2>
                  <p className="text-muted-foreground">Convert a DIGIPIN into exact lat/lng and full address.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 font-bold rounded-md text-sm">POST</span>
                  <span className="font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded">/api/decode</span>
                </div>
                <div className="bg-black/80 text-white p-4 rounded-xl font-mono text-sm overflow-x-auto">
                  <p className="text-gray-400">// Request Body</p>
                  <p>{"{"}</p>
                  <p className="pl-4">"digipin": "39J-438-TJC7"</p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Generate DIGIPIN</h2>
                  <p className="text-muted-foreground">Convert coordinates or an address into a DIGIPIN.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 font-bold rounded-md text-sm">POST</span>
                  <span className="font-mono bg-black/5 dark:bg-white/5 px-2 py-1 rounded">/api/generate</span>
                </div>
                <div className="bg-black/80 text-white p-4 rounded-xl font-mono text-sm overflow-x-auto">
                  <p className="text-gray-400">// Request Body (Option A - Coords)</p>
                  <p>{"{"}</p>
                  <p className="pl-4">"latitude": 28.6139,</p>
                  <p className="pl-4">"longitude": 77.2090</p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
