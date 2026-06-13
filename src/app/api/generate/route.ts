import { NextResponse } from "next/server"
import { getDigiPin } from "digipinjs"
import axios from "axios"

export async function POST(req: Request) {
  try {
    const { latitude, longitude, address } = await req.json()

    let finalLat = latitude
    let finalLng = longitude
    let finalAddress = ""

    if (address && (!latitude || !longitude)) {
      // Forward Geocoding using Nominatim
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      const response = await axios.get(nominatimUrl, {
        headers: { "User-Agent": "DigiPinSaaS/1.0" }
      })

      if (response.data && response.data.length > 0) {
        finalLat = parseFloat(response.data[0].lat)
        finalLng = parseFloat(response.data[0].lon)
        finalAddress = response.data[0].display_name
      } else {
        return NextResponse.json({ error: "Address not found" }, { status: 404 })
      }
    } else if (latitude && longitude) {
      // Reverse geocode to get address just for display
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      try {
        const response = await axios.get(nominatimUrl, {
          headers: { "User-Agent": "DigiPinSaaS/1.0" }
        })
        if (response.data && response.data.address) {
          finalAddress = response.data.display_name
        }
      } catch (e) {
        console.error("Reverse geocoding error in generator", e)
      }
    } else {
      return NextResponse.json({ error: "Either coordinates or address is required" }, { status: 400 })
    }

    const digipin = getDigiPin(finalLat, finalLng)
    
    if (!digipin) {
      return NextResponse.json({ error: "Failed to generate DIGIPIN for these coordinates" }, { status: 500 })
    }

    return NextResponse.json({
      digipin,
      latitude: finalLat,
      longitude: finalLng,
      address: finalAddress || "Coordinates mapped successfully"
    })
  } catch (error) {
    console.error("Generate API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
