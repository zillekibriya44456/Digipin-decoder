import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  const type = searchParams.get("type") || "hospital" // hospital, school, atm, etc.

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
  }

  try {
    // Using Nominatim for nearby places
    // We construct a viewbox around the point (roughly 5km radius)
    const offset = 0.05
    const viewbox = `${parseFloat(lon) - offset},${parseFloat(lat) + offset},${parseFloat(lon) + offset},${parseFloat(lat) - offset}`
    
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(type)}&viewbox=${viewbox}&bounded=1&limit=10`
    
    const response = await axios.get(nominatimUrl, {
      headers: { "User-Agent": "DigiPinSaaS/1.0" }
    })

    const places = response.data.map((place: any) => {
      // Calculate rough distance in km
      const pLat = parseFloat(place.lat)
      const pLon = parseFloat(place.lon)
      const dLat = (pLat - parseFloat(lat)) * Math.PI / 180
      const dLon = (pLon - parseFloat(lon)) * Math.PI / 180
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(parseFloat(lat) * Math.PI / 180) * Math.cos(pLat * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      const distance = 6371 * c // Radius of earth in km

      return {
        id: place.place_id,
        name: place.display_name.split(",")[0],
        address: place.display_name,
        latitude: pLat,
        longitude: pLon,
        distance: distance.toFixed(2),
        type: place.type
      }
    })

    // Sort by distance
    places.sort((a: any, b: any) => parseFloat(a.distance) - parseFloat(b.distance))

    return NextResponse.json({ places })
  } catch (error) {
    console.error("Nearby API Error:", error)
    return NextResponse.json({ error: "Failed to fetch nearby places" }, { status: 500 })
  }
}
