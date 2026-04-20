"use client"

import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"
import { MapPin, Clock } from "lucide-react"

export interface Truck {
  id: string
  name: string
  cuisine: string[]
  isOpen: boolean
  location: string
  distance: string
  todayHours?: string
  imageUrl?: string
}

interface TruckCardProps {
  truck: Truck
  locale?: "en" | "fr"
  onClick?: () => void
  className?: string
}

export function TruckCard({ truck, locale = "en", onClick, className }: TruckCardProps) {
  const openLabel = locale === "fr" ? "OUVERT" : "OPEN NOW"
  const closedLabel = locale === "fr" ? "FERMÉ" : "CLOSED"
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full bg-charcoal border border-border-dark p-4 text-left transition-colors hover:bg-graphite",
        className
      )}
    >
      <div className="flex gap-4">
        {/* Truck image */}
        <div className="w-20 h-20 bg-graphite flex-shrink-0 overflow-hidden">
          {truck.imageUrl ? (
            <img 
              src={truck.imageUrl} 
              alt={truck.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-text">
              <MapPin className="w-6 h-6" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display text-lg text-warm-cream truncate">
              {truck.name}
            </h3>
            <StatusBadge variant={truck.isOpen ? "open" : "closed"}>
              {truck.isOpen ? openLabel : closedLabel}
            </StatusBadge>
          </div>
          
          {/* Cuisine tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {truck.cuisine.map((tag) => (
              <span 
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider text-muted-text"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Location & distance */}
          <div className="flex items-center gap-3 text-sm text-muted-text">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {truck.location}
            </span>
            <span className="text-fire-orange font-medium">{truck.distance}</span>
          </div>
          
          {/* Today's hours */}
          {truck.todayHours && (
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-text">
              <Clock className="w-3.5 h-3.5" />
              {truck.todayHours}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export function TruckCardSkeleton() {
  return (
    <div className="w-full bg-charcoal border border-border-dark p-4">
      <div className="flex gap-4">
        <div className="w-20 h-20 skeleton flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="h-5 w-32 skeleton" />
            <div className="h-5 w-16 skeleton rounded-full" />
          </div>
          <div className="h-3 w-24 skeleton mb-2" />
          <div className="h-4 w-40 skeleton" />
        </div>
      </div>
    </div>
  )
}
