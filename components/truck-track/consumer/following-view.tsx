"use client"

import { useState } from "react"
import { User, Rss, MapPin } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"
import { EmptyState } from "../empty-state"
import type { Truck } from "../truck-card"

interface FollowingViewProps {
  locale?: "en" | "fr"
  onTruckSelect?: (truck: Truck) => void
  onExplore?: () => void
  onProfileClick?: () => void
}

// Extended truck type with additional fields for feed
interface FeedTruck extends Truck {
  actionType: "menu" | "schedule" | "order"
  description?: string
}

// Mock followed trucks with images
const mockFollowedTrucks: FeedTruck[] = [
  {
    id: "1",
    name: "THE SMASH BOX",
    cuisine: ["SMASH BURGERS", "AMERICAN"],
    isOpen: true,
    location: "PLACE DES ARTS | DOWNTOWN",
    distance: "0.8 KM",
    todayHours: "11:00 - 21:00",
    imageUrl: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&q=80",
    actionType: "menu",
  },
  {
    id: "2",
    name: "NEON NOODLES",
    cuisine: ["ASIAN FUSION", "NOODLES"],
    isOpen: false,
    location: "MILE END | BERNARD ST",
    distance: "2.4 KM",
    imageUrl: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80",
    actionType: "schedule",
  },
  {
    id: "3",
    name: "FIRE & DOUGH",
    cuisine: ["WOOD-FIRED PIZZA"],
    isOpen: true,
    isMoving: true,
    location: "LACHINE CANAL | ATWATER MARKET",
    distance: "1.2 KM",
    todayHours: "12:00 - 22:00",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    actionType: "menu",
  },
  {
    id: "4",
    name: "BLACK BEAN CAFE",
    cuisine: ["MEXICAN", "COFFEE"],
    isOpen: true,
    location: "OLD PORT | HISTORIC DISTRICT",
    distance: "0.2 KM",
    todayHours: "08:00 - 18:00",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    actionType: "order",
  },
]

// Extend Truck type to include isMoving
declare module "../truck-card" {
  interface Truck {
    isMoving?: boolean
  }
}

export function FollowingView({ locale = "en", onTruckSelect, onExplore, onProfileClick }: FollowingViewProps) {
  const [trucks] = useState<FeedTruck[]>(mockFollowedTrucks)
  
  const subtitleLabel = locale === "fr" ? "VENDEURS ACTIFS PRÈS DE VOUS" : "ACTIVE VENDORS NEAR YOU"
  const todayLocationLabel = locale === "fr" ? "EMPLACEMENT AUJOURD'HUI" : "TODAY'S LOCATION"
  
  const getActionLabel = (type: FeedTruck["actionType"]) => {
    if (locale === "fr") {
      switch (type) {
        case "menu": return "VOIR LE MENU"
        case "schedule": return "VOIR L'HORAIRE"
        case "order": return "COMMANDER"
      }
    }
    switch (type) {
      case "menu": return "VIEW MENU"
      case "schedule": return "CHECK SCHEDULE"
      case "order": return "ORDER NOW"
    }
  }

  const getStatusLabel = (truck: FeedTruck) => {
    if (truck.isMoving) return locale === "fr" ? "EN ROUTE" : "MOVING"
    if (truck.isOpen) return locale === "fr" ? "OUVERT" : "OPEN"
    return locale === "fr" ? "FERMÉ" : "CLOSED"
  }

  const getStatusVariant = (truck: FeedTruck): "open" | "closed" | "moving" => {
    if (truck.isMoving) return "moving"
    return truck.isOpen ? "open" : "closed"
  }

  if (trucks.length === 0) {
    return (
      <div className="h-full flex flex-col bg-app-black">
<header className="px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center"
        >
          <User className="w-5 h-5 text-warm-cream" />
        </button>
      </header>
        <EmptyState type="following" locale={locale} onAction={onExplore} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center"
        >
          <User className="w-5 h-5 text-warm-cream" />
        </button>
      </header>

      {/* Subtitle */}
      <div className="px-4 pb-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
          {subtitleLabel}
        </span>
      </div>
      
      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="flex flex-col gap-6 px-4">
          {trucks.map((truck) => (
            <div key={truck.id} className="flex flex-col">
              {/* Image with status and distance overlay */}
              <div className="relative aspect-[4/3] bg-graphite overflow-hidden mb-3">
                {truck.imageUrl ? (
                  <img 
                    src={truck.imageUrl} 
                    alt={truck.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-text">
                    <MapPin className="w-12 h-12" />
                  </div>
                )}
                
                {/* Status and distance badges - top right */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                  <StatusBadge variant={getStatusVariant(truck)}>
                    {getStatusLabel(truck)}
                  </StatusBadge>
                  <div className="bg-charcoal/90 px-2 py-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-warm-cream">
                      {truck.distance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Truck name with RSS icon */}
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-display text-2xl text-warm-cream">{truck.name}</h2>
                <button className="text-fire-orange hover:text-fire-orange/80 transition-colors">
                  <Rss className="w-5 h-5" />
                </button>
              </div>

              {/* Today's location label */}
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text mb-1">
                {todayLocationLabel}
              </span>

              {/* Location */}
              <p className="font-mono text-[12px] uppercase tracking-wider text-warm-cream mb-4">
                {truck.location}
              </p>

              {/* Action button */}
              <PrimaryButton
                onClick={() => onTruckSelect?.(truck)}
                variant={truck.actionType === "schedule" ? "secondary" : "primary"}
                className="w-full"
              >
                {getActionLabel(truck.actionType)}
              </PrimaryButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
