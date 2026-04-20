"use client"

import { useState } from "react"
import { Settings, MapPin, Power } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"

interface TodayViewProps {
  locale?: "en" | "fr"
  onSettingsClick?: () => void
}

// Mock saved locations
const savedLocations = [
  { id: "1", name: "ByWard Market", address: "55 ByWard Market Square" },
  { id: "2", name: "Lansdowne Park", address: "1015 Bank Street" },
  { id: "3", name: "Sparks Street", address: "Sparks St. Mall" },
  { id: "4", name: "Preston Street", address: "Preston & Somerset" },
]

export function TodayView({ locale = "en", onSettingsClick }: TodayViewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<string | null>(null)
  
  const titleLabel = locale === "fr" ? "AUJOURD'HUI" : "TODAY"
  const publishLabel = locale === "fr" ? "PUBLIER L'EMPLACEMENT" : "PUBLISH LOCATION"
  const savedLabel = locale === "fr" ? "EMPLACEMENTS ENREGISTRÉS" : "SAVED LOCATIONS"
  const statusLabel = locale === "fr" ? "STATUT" : "STATUS"
  const openLabel = locale === "fr" ? "OUVERT" : "OPEN"
  const closedLabel = locale === "fr" ? "FERMÉ" : "CLOSED"
  const currentLabel = locale === "fr" ? "EMPLACEMENT ACTUEL" : "CURRENT LOCATION"
  const noneLabel = locale === "fr" ? "Aucun emplacement publié" : "No location published"

  const handleLocationSelect = (location: typeof savedLocations[0]) => {
    setCurrentLocation(location.name)
    setIsOpen(true)
  }

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border-dark flex items-center justify-between">
        <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
        <button 
          onClick={onSettingsClick}
          className="w-10 h-10 flex items-center justify-center text-muted-text hover:text-warm-cream transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {/* Status toggle */}
          <div className="bg-charcoal border border-border-dark p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
                {statusLabel}
              </span>
              <StatusBadge variant={isOpen ? "open" : "closed"}>
                {isOpen ? openLabel : closedLabel}
              </StatusBadge>
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-center gap-3 py-4 transition-colors ${
                isOpen 
                  ? "bg-success text-app-black" 
                  : "bg-graphite text-muted-text border border-border-dark hover:bg-charcoal"
              }`}
            >
              <Power className="w-5 h-5" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {isOpen 
                  ? (locale === "fr" ? "OUVERT" : "OPEN FOR BUSINESS")
                  : (locale === "fr" ? "FERMÉ" : "CLOSED")
                }
              </span>
            </button>
          </div>

          {/* Current location */}
          <div className="mb-6">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
              {currentLabel}
            </span>
            <div className="bg-charcoal border border-border-dark p-4 mt-2">
              {currentLocation ? (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-fire-orange" />
                  <span className="text-warm-cream">{currentLocation}</span>
                </div>
              ) : (
                <span className="text-muted-text">{noneLabel}</span>
              )}
            </div>
          </div>

          {/* Publish button - THE primary CTA */}
          <PrimaryButton size="lg" className="w-full mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            {publishLabel}
          </PrimaryButton>

          {/* Saved locations */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
              {savedLabel}
            </span>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {savedLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className={`p-3 text-left transition-colors ${
                    currentLocation === location.name
                      ? "bg-fire-orange text-warm-cream"
                      : "bg-charcoal border border-border-dark text-warm-cream hover:bg-graphite"
                  }`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-1">
                    {location.name}
                  </div>
                  <div className="text-xs text-muted-text truncate">
                    {location.address}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
