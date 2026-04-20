"use client"

import { useState } from "react"
import { MapPin, Navigation, User } from "lucide-react"
import { BottomSheet } from "../bottom-sheet"
import { TruckCard, TruckCardSkeleton, type Truck } from "../truck-card"
import { StatusBadge } from "../status-badge"

interface MapViewProps {
  locale?: "en" | "fr"
  onTruckSelect?: (truck: Truck) => void
  onProfileClick?: () => void
}

// Mock data for demo
const mockTrucks: Truck[] = [
  {
    id: "1",
    name: "SMOKE'S POUTINERIE",
    cuisine: ["POUTINE", "CANADIAN"],
    isOpen: true,
    location: "ByWard Market",
    distance: "0.3 km",
    todayHours: "11:00 - 21:00",
  },
  {
    id: "2",
    name: "TACOS EL GORDO",
    cuisine: ["MEXICAN", "TACOS"],
    isOpen: true,
    location: "Lansdowne Park",
    distance: "1.2 km",
    todayHours: "12:00 - 20:00",
  },
  {
    id: "3",
    name: "BEAVERTAILS",
    cuisine: ["DESSERT", "CANADIAN"],
    isOpen: false,
    location: "Sparks Street",
    distance: "0.8 km",
  },
  {
    id: "4",
    name: "PHO KING",
    cuisine: ["VIETNAMESE", "NOODLES"],
    isOpen: true,
    location: "Preston Street",
    distance: "2.1 km",
    todayHours: "11:30 - 19:00",
  },
]

export function MapView({ locale = "en", onTruckSelect, onProfileClick }: MapViewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(true)
  const nearbyLabel = locale === "fr" ? "CAMIONS À PROXIMITÉ" : "NEARBY TRUCKS"
  const openNowLabel = locale === "fr" ? "OUVERTS MAINTENANT" : "OPEN NOW"

  const openTrucks = mockTrucks.filter(t => t.isOpen)

  return (
    <div className="relative h-full w-full bg-app-black">
      {/* Map placeholder - dark themed */}
      <div className="absolute inset-0 bg-app-black">
        {/* Dark map background with grid lines to simulate map */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #1A1A1A 1px, transparent 1px),
              linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Mock truck markers */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-10 h-10 bg-fire-orange flex items-center justify-center">
              <MapPin className="w-5 h-5 text-warm-cream" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-fire-orange" />
          </div>
        </div>
        
        <div className="absolute top-1/2 left-1/3">
          <div className="relative">
            <div className="w-8 h-8 bg-fire-orange/80 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-warm-cream" />
            </div>
          </div>
        </div>
        
        <div className="absolute top-2/3 right-1/3">
          <div className="relative">
            <div className="w-8 h-8 bg-muted-text flex items-center justify-center">
              <MapPin className="w-4 h-4 text-warm-cream" />
            </div>
          </div>
        </div>

        {/* User location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-fire-orange rounded-full border-2 border-warm-cream">
            <div className="absolute inset-0 bg-fire-orange/30 rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        </div>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center text-warm-cream hover:bg-graphite transition-colors"
        >
          <User className="w-5 h-5" />
        </button>
      </div>

      {/* Locate button */}
      <button 
        className="absolute top-20 right-4 w-10 h-10 bg-charcoal border border-border-dark flex items-center justify-center text-fire-orange hover:bg-graphite transition-colors z-10"
        aria-label={locale === "fr" ? "Ma position" : "My location"}
      >
        <Navigation className="w-5 h-5" />
      </button>

      {/* Bottom sheet with nearby trucks */}
      <BottomSheet 
        isOpen={sheetOpen} 
        snapPoints={["peek", "half", "full"]}
        initialSnap="half"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-warm-cream">{nearbyLabel}</h2>
          <StatusBadge variant="accent">
            {openTrucks.length} {openNowLabel}
          </StatusBadge>
        </div>
        
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <>
              <TruckCardSkeleton />
              <TruckCardSkeleton />
              <TruckCardSkeleton />
            </>
          ) : (
            mockTrucks.map((truck) => (
              <TruckCard
                key={truck.id}
                truck={truck}
                locale={locale}
                onClick={() => onTruckSelect?.(truck)}
              />
            ))
          )}
        </div>
      </BottomSheet>
    </div>
  )
}
