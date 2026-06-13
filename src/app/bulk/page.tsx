"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Upload, FileType2, FileText, ArrowRightLeft, Download } from "lucide-react"

export default function BulkProcessingPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bulk Processing Engine</h1>
            <p className="text-muted-foreground text-lg">
              Upload thousands of addresses or coordinates to instantly convert them to standard DIGIPINs.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ArrowRightLeft className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Address to DIGIPIN</h3>
                  <p className="text-sm text-muted-foreground">Convert messy addresses to exact pins</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <FileType2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">DIGIPIN to Coordinates</h3>
                  <p className="text-sm text-muted-foreground">Extract exact lat/lng for mapping</p>
                </div>
              </div>
            </div>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`glass border-2 border-dashed rounded-3xl p-12 text-center transition-all ${isDragging ? "border-primary bg-primary/5" : "border-border"}`}
            >
              {!file ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Drag & Drop your file</h3>
                  <p className="text-muted-foreground mb-6">Supports .CSV and .XLSX files up to 50MB</p>
                  <label className="px-6 py-3 bg-primary text-white font-medium rounded-xl cursor-pointer hover:bg-primary/90 transition-colors inline-block">
                    Browse Files
                    <input type="file" className="hidden" accept=".csv, .xlsx" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]) }} />
                  </label>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{file.name}</h3>
                  <p className="text-muted-foreground mb-6">{(file.size / 1024).toFixed(2)} KB ready for processing</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => setFile(null)} className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors">
                      Cancel
                    </button>
                    <button onClick={() => setProcessing(true)} disabled={processing} className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2">
                      {processing ? "Processing 5,000 rows..." : "Start Processing"}
                    </button>
                  </div>
                  
                  {processing && (
                    <div className="mt-8">
                      <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 mb-2">
                        <div className="bg-emerald-500 h-2 rounded-full w-[45%] animate-pulse"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated time remaining: 12 seconds</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
