import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { digipin, latitude, longitude, address } = await req.json()

    if (!digipin || !latitude || !longitude) {
      return NextResponse.json({ error: "Missing required location data" }, { status: 400 })
    }

    const sosEvent = await prisma.sOSEvent.create({
      data: {
        digipin,
        latitude,
        longitude,
        address,
        userAgent: req.headers.get("user-agent") || undefined
      }
    })

    return NextResponse.json({
      success: true,
      sosId: sosEvent.id,
      sosUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://digipintolocation.online"}/sos/${sosEvent.id}`
    })
  } catch (error) {
    console.error("SOS API Error:", error)
    return NextResponse.json({ error: "Failed to create SOS alert" }, { status: 500 })
  }
}
