"use client"

import { useState } from "react"
import { ArrowUpRight, Clock, MapPin, Navigation, User, Users, X } from "lucide-react"
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
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)
  const nearbyLabel = locale === "fr" ? "CAMIONS À PROXIMITÉ" : "NEARBY TRUCKS"
  const openNowLabel = locale === "fr" ? "OUVERTS MAINTENANT" : "OPEN NOW"
  const closeLabel = locale === "fr" ? "Fermer le résumé" : "Close summary"
  const summaryLabel = locale === "fr" ? "APERÇU DU CAMION" : "TRUCK SUMMARY"
  const followersLabel = locale === "fr" ? "ABONNÉS" : "FOLLOWERS"
  const profileLabel = locale === "fr" ? "PROFIL" : "PROFILE"

  const truckStats: Record<string, { followers: string; imageUrl?: string }> = {
    "1": { followers: "1.2K", imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=320&q=80" },
    "2": { followers: "864", imageUrl: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=320&q=80" },
    "3": { followers: "2.8K", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=320&q=80" },
    "4": { followers: "947", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=320&q=80" },
  }

  const openTrucks = mockTrucks.filter(t => t.isOpen)

  const markerPositions: Record<string, string> = {
    "1": "top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2",
    "2": "top-[48%] left-[30%] -translate-x-1/2 -translate-y-1/2",
    "3": "top-[64%] right-[24%] translate-x-1/2 -translate-y-1/2",
    "4": "top-[26%] right-[18%] translate-x-1/2 -translate-y-1/2",
  }

  const handleMarkerSelect = (truck: Truck) => {
    setSelectedTruck(truck)
    setSheetOpen(true)
  }

  const handleCloseSummary = () => {
    setSelectedTruck(null)
  }

  const handleOpenTruckProfile = (truck: Truck) => {
    onTruckSelect?.(truck)
  }

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
        {mockTrucks.map((truck) => {
          const isSelected = selectedTruck?.id === truck.id

          return (
            <button
              key={truck.id}
              type="button"
              onClick={() => handleMarkerSelect(truck)}
              className={`absolute ${markerPositions[truck.id]} z-10 flex flex-col items-center gap-1`}
              aria-label={truck.name}
            >
              <div className="relative flex items-start">
                {/* Pin box - always fire orange */}
                <div className="flex h-11 w-11 items-center justify-center border border-fire-orange bg-fire-orange text-app-black shadow-[0_8px_20px_rgba(0,0,0,0.28)]">
                  <span className="text-lg leading-none">🚚</span>
                </div>
                {/* Name box - adjacent to the right */}
                <div
                  className={`h-11 flex items-center border px-3 text-left font-mono text-[10px] uppercase tracking-[0.1em] ${
                    isSelected
                      ? "border-fire-orange bg-fire-orange text-app-black"
                      : "border-border-dark bg-charcoal text-warm-cream"
                  }`}
                >
                  <span className="truncate max-w-[100px]">{truck.name}</span>
                </div>
                {/* Pin pointer */}
                <div className="absolute left-[18px] top-[42px] flex flex-col items-center">
                  <div className="h-2 w-px bg-fire-orange" />
                  <div className="h-2 w-2 rotate-45 border-r border-b border-fire-orange bg-fire-orange" />
                </div>
              </div>
            </button>
          )
        })}

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
        snapPoints={selectedTruck ? ["quarter", "half"] : ["peek", "half", "full"]}
        initialSnap={selectedTruck ? "quarter" : "half"}
      >
        {selectedTruck ? (
          <div className="flex h-full flex-col">
            {(() => {
              const truckMeta = truckStats[selectedTruck.id]

              return (
                <>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-text">
                  {summaryLabel}
                </p>
                <h2 className="font-display text-2xl text-warm-cream">{selectedTruck.name}</h2>
              </div>
              <button
                type="button"
                onClick={handleCloseSummary}
                aria-label={closeLabel}
                className="flex h-9 w-9 items-center justify-center border border-border-dark bg-graphite text-warm-cream transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <StatusBadge variant={selectedTruck.isOpen ? "open" : "closed"}>
                {selectedTruck.isOpen ? (locale === "fr" ? "OUVERT" : "OPEN NOW") : (locale === "fr" ? "FERMÉ" : "CLOSED")}
              </StatusBadge>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-fire-orange">
                {selectedTruck.distance}
              </span>
            </div>

            <div className="grid grid-cols-[68px_1fr_auto] gap-3 border border-border-dark bg-graphite p-3">
              <div className="h-[68px] w-[68px] overflow-hidden border border-border-dark bg-charcoal">
                {truckMeta?.imageUrl ? (
                  <img
                    src={truckMeta.imageUrl}
                    alt={selectedTruck.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-fire-orange">
                    <span className="text-2xl leading-none">🚚</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-text">
                  <MapPin className="h-4 w-4 shrink-0 text-fire-orange" />
                  <span className="truncate">{selectedTruck.location}</span>
                </div>
                {selectedTruck.todayHours && (
                  <div className="flex items-center gap-2 text-sm text-muted-text">
                    <Clock className="h-4 w-4 shrink-0 text-fire-orange" />
                    <span>{selectedTruck.todayHours}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedTruck.cuisine.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="border border-border-dark px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1 text-sm text-warm-cream">
                  <Users className="h-4 w-4 shrink-0 text-fire-orange" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-text">{followersLabel}</span>
                  <span className="font-display text-lg leading-none text-warm-cream">{truckMeta?.followers ?? "—"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenTruckProfile(selectedTruck)}
                className="flex min-w-[78px] items-center justify-center gap-1 border border-fire-orange bg-fire-orange px-3 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-app-black transition-colors hover:bg-fire-orange-hover"
              >
                {profileLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
                </>
              )
            })()}
          </div>
        ) : (
          <>
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
                    onClick={() => handleOpenTruckProfile(truck)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </BottomSheet>
    </div>
  )
}
