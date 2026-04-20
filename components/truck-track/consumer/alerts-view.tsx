"use client"

import { useState } from "react"
import { User, MapPin, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertsViewProps {
  locale?: "en" | "fr"
  onProfileClick?: () => void
}

type AlertFilter = "all" | "truck_opened" | "location_changed" | "specials"

interface AlertCard {
  id: string
  type: "specials" | "location_changed" | "truck_opened" | "maintenance"
  title: string
  description: string
  timestamp: string
  imageUrl?: string
  truckName?: string
  actionLabel?: string
}

// Mock alerts
const mockAlerts: AlertCard[] = [
  {
    id: "1",
    type: "specials",
    title: "FLASH DEAL: 2-FOR-1 AL PASTOR",
    description: "Available only at the Downtown container for the next 2 hours.",
    timestamp: "14:02 PM",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80",
  },
  {
    id: "2",
    type: "location_changed",
    title: "BURGER BOX MOVED TO PORT QUAY",
    description: "New coordinates logged at 45.5017° N. Catch them before they leave!",
    timestamp: "11:45 AM",
  },
  {
    id: "3",
    type: "truck_opened",
    title: "THE WAFFLE HUB IS NOW LIVE",
    description: "Start your morning with their signature iron-pressed delights.",
    timestamp: "09:00 AM",
    actionLabel: "VIEW MENU",
  },
  {
    id: "4",
    type: "maintenance",
    title: "APP UPDATE COMPLETE",
    description: "Version 2.4.0 deployed. Enhanced tracking accuracy.",
    timestamp: "YESTERDAY",
  },
]

export function AlertsView({ locale = "en", onProfileClick }: AlertsViewProps) {
  const [activeFilter, setActiveFilter] = useState<AlertFilter>("all")
  const [alerts] = useState<AlertCard[]>(mockAlerts)
  
  const titleLabel = locale === "fr" ? "ALERTES" : "ALERTS"
  const statusLabel = locale === "fr" ? "ÉTAT DU SYSTÈME: OPÉRATIONNEL" : "SYSTEM STATUS: OPERATIONAL"
  const loadArchiveLabel = locale === "fr" ? "CHARGER LES ARCHIVES" : "LOAD ARCHIVE"

  const filters: { id: AlertFilter; labelEn: string; labelFr: string }[] = [
    { id: "all", labelEn: "ALL", labelFr: "TOUS" },
    { id: "truck_opened", labelEn: "TRUCK OPENED", labelFr: "OUVERTURES" },
    { id: "location_changed", labelEn: "LOCATION CHANGED", labelFr: "DÉPLACEMENTS" },
    { id: "specials", labelEn: "SPECIALS", labelFr: "PROMOS" },
  ]

  const getTypeLabel = (type: AlertCard["type"]) => {
    if (locale === "fr") {
      switch (type) {
        case "specials": return "PROMOS"
        case "location_changed": return "DÉPLACEMENT"
        case "truck_opened": return "OUVERTURE"
        case "maintenance": return "MAINTENANCE"
      }
    }
    switch (type) {
      case "specials": return "SPECIALS"
      case "location_changed": return "LOCATION CHANGED"
      case "truck_opened": return "TRUCK OPENED"
      case "maintenance": return "MAINTENANCE"
    }
  }

  const getTypeColor = (type: AlertCard["type"]) => {
    switch (type) {
      case "specials": return "text-fire-orange"
      case "location_changed": return "text-fire-orange"
      case "truck_opened": return "text-muted-text"
      case "maintenance": return "text-muted-text"
    }
  }

  const filteredAlerts = activeFilter === "all" 
    ? alerts 
    : alerts.filter(a => a.type === activeFilter)

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center overflow-hidden"
        >
          <User className="w-5 h-5 text-warm-cream" />
        </button>
      </header>

      {/* Title section */}
      <div className="px-4 pb-4">
        <h2 className="font-display text-4xl text-warm-cream tracking-[0.2em] mb-2">{titleLabel}</h2>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fire-orange">
            {statusLabel}
          </span>
          <div className="flex-1 h-[2px] bg-fire-orange" />
        </div>
      </div>

      {/* Filter chips - horizontal scroll */}
      <div className="px-4 pb-4 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id
            const label = locale === "fr" ? filter.labelFr : filter.labelEn
            
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "px-4 py-2 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors",
                  isActive 
                    ? "bg-fire-orange text-app-black" 
                    : "bg-charcoal text-warm-cream hover:bg-graphite"
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Alerts feed */}
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="flex flex-col">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="border-b border-border-dark">
              {/* Image if present */}
              {alert.imageUrl && (
                <div className="px-4 pt-4">
                  <div className="aspect-[16/9] bg-graphite overflow-hidden">
                    <img 
                      src={alert.imageUrl} 
                      alt=""
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
              )}
              
              <div className="p-4">
                {/* Type label and timestamp */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-mono text-[10px] uppercase tracking-wider",
                      getTypeColor(alert.type)
                    )}>
                      {getTypeLabel(alert.type)}
                    </span>
                    {alert.type === "truck_opened" && (
                      <span className="w-2 h-2 bg-success-green rounded-full" />
                    )}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                    {alert.timestamp}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-warm-cream mb-2 leading-tight">
                  {alert.title}
                </h3>

                {/* Location icon for location_changed type */}
                {alert.type === "location_changed" && (
                  <div className="flex gap-3 mb-2">
                    <div className="w-12 h-12 bg-fire-orange/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-fire-orange" />
                    </div>
                    <p className="text-sm text-muted-text leading-relaxed">
                      {alert.description}
                    </p>
                  </div>
                )}

                {/* Regular description */}
                {alert.type !== "location_changed" && (
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-muted-text leading-relaxed flex-1">
                      {alert.description}
                    </p>
                    {alert.actionLabel && (
                      <button className="px-3 py-2 bg-charcoal font-mono text-[10px] uppercase tracking-wider text-warm-cream hover:bg-graphite transition-colors flex-shrink-0">
                        {alert.actionLabel}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Load archive */}
          <div className="p-8 flex flex-col items-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-text mb-2">
              {loadArchiveLabel}
            </span>
            <ChevronDown className="w-5 h-5 text-fire-orange" />
          </div>
        </div>
      </div>
    </div>
  )
}
