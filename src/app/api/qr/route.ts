import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get("text")
  const type = searchParams.get("type") || "png" // png or svg

  if (!text) {
    return NextResponse.json({ error: "Text parameter is required" }, { status: 400 })
  }

  try {
    if (type === "svg") {
      const svg = await QRCode.toString(text, {
        type: "svg",
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      })
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400"
        }
      })
    } else {
      const dataUrl = await QRCode.toDataURL(text, {
        errorCorrectionLevel: "H",
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      })
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "")
      const buffer = Buffer.from(base64Data, "base64")
      
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400"
        }
      })
    }
  } catch (error) {
    console.error("QR Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
