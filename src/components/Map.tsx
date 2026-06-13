"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the MapComponent with no SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-inherit">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  ),
})

export function Map(props: any) {
  return <MapComponent {...props} />
}
