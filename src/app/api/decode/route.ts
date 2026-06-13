import { NextResponse } from "next/server"
import { getLatLngFromDigiPin } from "digipinjs"
import axios from "axios"

export async function POST(req: Request) {
  try {
    const { digipin } = await req.json()

    if (!digipin) {
      return NextResponse.json({ error: "DIGIPIN is required" }, { status: 400 })
    }

    const sanitizedPin = digipin.replace(/\s+/g, "").toUpperCase()

    let decoded;
    try {
      decoded = getLatLngFromDigiPin(sanitizedPin)
    } catch (e: any) {
      return NextResponse.json({ error: e.message || "Invalid DIGIPIN format" }, { status: 400 })
    }

    if (!decoded) {
      return NextResponse.json({ error: "Invalid DIGIPIN format" }, { status: 400 })
    }

    const { latitude, longitude } = decoded

    // Reverse Geocoding using Nominatim (OpenStreetMap)
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    
    let address = "Address not found"
    let addressDetails: any = {}

    try {
      const response = await axios.get(nominatimUrl, {
        headers: { "User-Agent": "DigiPinSaaS/1.0" }
      })
      if (response.data && response.data.address) {
        address = response.data.display_name
        addressDetails = {
          street: response.data.address.road || response.data.address.pedestrian || "",
          neighborhood: response.data.address.suburb || response.data.address.neighbourhood || "",
          city: response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.county || "",
          state: response.data.address.state || "",
          country: response.data.address.country || "",
          postal_code: response.data.address.postcode || ""
        }
      }
    } catch (geoError) {
      console.error("Geocoding error:", geoError)
    }

    // Determine accuracy radius based on DIGIPIN length (standard 10 chars = ~4m)
    const accuracy = digipin.length === 10 ? "±4 meters" : "±10 meters"

    return NextResponse.json({
      digipin,
      latitude,
      longitude,
      address,
      addressDetails,
      accuracy
    })
  } catch (error) {
    console.error("Decode API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
