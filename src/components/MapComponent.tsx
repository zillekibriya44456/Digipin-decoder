"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet's default icon path issues in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const customMarkerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background-color: #6366f1; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(99,102,241,0.6);"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

interface MapComponentProps {
  lat: number
  lng: number
  zoom?: number
  markers?: { lat: number, lng: number, title: string }[]
  onMapClick?: (lat: number, lng: number) => void
}

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.5 })
  }, [center, zoom, map])
  return null
}

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng)
      }
    },
  })
  return null
}

export default function MapComponent({ lat, lng, zoom = 15, markers = [], onMapClick }: MapComponentProps) {
  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={zoom} 
      style={{ height: "100%", width: "100%", borderRadius: "inherit", zIndex: 10 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />
      <ZoomControl position="bottomright" />
      <MapUpdater center={[lat, lng]} zoom={zoom} />
      <MapClickHandler onMapClick={onMapClick} />
      
      {/* Primary Marker */}
      <Marker position={[lat, lng]} icon={customMarkerIcon}>
        <Popup>Target Location</Popup>
      </Marker>

      {/* Additional Markers */}
      {markers.map((marker, i) => (
        <Marker key={i} position={[marker.lat, marker.lng]} icon={icon}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
