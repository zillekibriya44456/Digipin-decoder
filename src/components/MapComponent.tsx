"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Layers, Maximize } from "lucide-react"

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
  markers?: { lat: number, lng: number, title: string, description?: string }[]
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
  const [mapType, setMapType] = useState<"street" | "satellite">("street")
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const markerRef = useRef<L.Marker>(null)
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const position = marker.getLatLng()
          if (onMapClick) onMapClick(position.lat, position.lng)
        }
      },
    }),
    [onMapClick],
  )

  return (
    <div ref={containerRef} className="w-full h-full relative rounded-inherit">
      {/* Custom Map Controls Layer */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button 
          onClick={(e) => { e.preventDefault(); setMapType(mapType === "street" ? "satellite" : "street"); }}
          className="bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Toggle Map Style"
        >
          <Layers className="w-5 h-5 text-foreground" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); toggleFullscreen(); }}
          className="bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <MapContainer 
        center={[lat, lng]} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%", borderRadius: "inherit", zIndex: 10 }}
        zoomControl={false}
      >
        {mapType === "street" ? (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={20}
          />
        )}
        <ZoomControl position="bottomright" />
        <MapUpdater center={[lat, lng]} zoom={zoom} />
        <MapClickHandler onMapClick={onMapClick} />
        
        {/* Primary Draggable Marker */}
        <Marker 
          position={[lat, lng]} 
          icon={customMarkerIcon}
          draggable={!!onMapClick}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Target Location<br/><span className="text-xs text-muted-foreground">Drag to reposition</span></Popup>
        </Marker>

        {/* Additional Markers */}
        {markers.map((marker, i) => (
          <Marker key={i} position={[marker.lat, marker.lng]} icon={icon}>
            <Popup>
              <strong>{marker.title}</strong>
              {marker.description && <p className="text-sm mt-1">{marker.description}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
