"use client"

import { useRef } from "react"
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react"
import { Download } from "lucide-react"

interface QRCodeGeneratorProps {
  value: string
  title?: string
  size?: number
}

export function QRCodeGenerator({ value, title = "Scan QR Code", size = 200 }: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadPNG = () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      let downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "digipin-qr.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector("svg")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const svgUrl = URL.createObjectURL(blob)
      let downloadLink = document.createElement("a")
      downloadLink.href = svgUrl
      downloadLink.download = "digipin-qr.svg"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-white dark:bg-white/5 p-6 rounded-2xl">
      <h4 className="font-semibold text-center text-sm uppercase tracking-wider">{title}</h4>
      
      {/* We render both so we can download either format, but hide the SVG visually to prevent duplicate display */}
      <div ref={qrRef} className="relative bg-white p-4 rounded-xl">
        <QRCodeCanvas 
          value={value} 
          size={size} 
          level="H"
          imageSettings={{
            src: "/favicon.ico",
            x: undefined,
            y: undefined,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          }}
        />
        <div className="hidden">
          <QRCodeSVG 
            value={value} 
            size={size} 
            level="H"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2 w-full">
        <button 
          onClick={downloadPNG}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" /> PNG
        </button>
        <button 
          onClick={downloadSVG}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" /> SVG
        </button>
      </div>
    </div>
  )
}
