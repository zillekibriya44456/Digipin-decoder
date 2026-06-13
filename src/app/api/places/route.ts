import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { digipin, latitude, longitude, address, title, category, isPublic } = await req.json()

    if (!digipin || !latitude || !longitude) {
      return NextResponse.json({ error: "Missing required location data" }, { status: 400 })
    }

    // Generate unique slug for public sharing
    const slug = Math.random().toString(36).substring(2, 10) + Date.now().toString(36).substring(4)

    const savedPlace = await prisma.savedPlace.create({
      data: {
        userId: (session.user as any).id,
        digipin,
        latitude,
        longitude,
        address,
        title: title || address || "Saved Location",
        category: category || "CUSTOM",
        isPublic: isPublic ?? false,
        slug
      }
    })

    return NextResponse.json({ success: true, place: savedPlace })
  } catch (error) {
    console.error("Save Place Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
