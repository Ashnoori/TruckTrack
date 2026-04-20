"use client"

import { useState } from "react"
import { ArrowLeft, Heart, User, MapPin, Clock, Image as ImageIcon, ChevronUp } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"
import type { Truck } from "../truck-card"

interface TruckProfileProps {
  truck: Truck
  locale?: "en" | "fr"
  onBack?: () => void
}

// Mock schedule for today
const mockTodaySchedule = [
  { 
    type: "current",
    label: "CURRENT LOCATION",
    location: "PLACE DES ARTS (DOWNTOWN)",
    hours: "11:00 AM — 03:00 PM"
  },
  { 
    type: "evening",
    label: "EVENING SHIFT",
    location: "AVENUE MONT-ROYAL (LE PLATEAU)",
    hours: "05:30 PM — 10:00 PM"
  },
]

// Mock gallery
const mockGallery = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
  "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80",
  "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
]

export function TruckProfile({ truck, locale = "en", onBack }: TruckProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  
  const followLabel = locale === "fr" ? "SUIVRE" : "FOLLOW"
  const followingLabel = locale === "fr" ? "SUIVI" : "FOLLOWING"
  const todayScheduleLabel = locale === "fr" ? "HORAIRE AUJOURD'HUI" : "TODAY'S SCHEDULE"
  const currentLocationLabel = locale === "fr" ? "EMPLACEMENT ACTUEL" : "CURRENT LOCATION"
  const eveningShiftLabel = locale === "fr" ? "QUART DU SOIR" : "EVENING SHIFT"
  const quickStatsLabel = locale === "fr" ? "STATISTIQUES" : "QUICK STATS"
  const stampsLabel = locale === "fr" ? "TAMPONS" : "STAMPS"
  const followersLabel = locale === "fr" ? "ABONNÉS" : "FOLLOWERS"
  const conceptLabel = locale === "fr" ? "LE CONCEPT" : "THE CONCEPT"
  const viewGalleryLabel = locale === "fr" ? "VOIR LA GALERIE" : "VIEW FULL GALLERY"
  const openLabel = locale === "fr" ? "OUVERT" : "OPEN NOW"
  const closedLabel = locale === "fr" ? "FERMÉ" : "CLOSED"

  // Mock data
  const stamps = { current: 8, total: 10 }
  const followers = "1.2K"
  const conceptDescription = locale === "fr" 
    ? "Artisanat de BBQ de qualité industrielle pour le nomade moderne. Nos fumoirs ne s'arrêtent jamais, mélangeant les techniques traditionnelles du Texas avec du charbon local. Chaque plateau est un manifeste de saveur."
    : "Crafting industrial-grade BBQ for the modern nomad. Our smokers never stop, blending traditional Texas techniques with local charcoal. Every tray is a manifest of flavor."

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-4 py-4 flex items-center justify-between z-20">
        <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        <button 
          className="w-10 h-10 bg-charcoal/80 border border-border-dark rounded-full flex items-center justify-center overflow-hidden"
        >
          <User className="w-5 h-5 text-warm-cream" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Hero image */}
        <div className="relative h-72 bg-graphite">
          {truck.imageUrl ? (
            <img 
              src={truck.imageUrl} 
              alt={truck.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-graphite flex items-center justify-center">
              <MapPin className="w-16 h-16 text-muted-text" />
            </div>
          )}
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-app-black via-app-black/50 to-transparent" />
          
          {/* Status badge */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2">
            <StatusBadge variant={truck.isOpen ? "open" : "closed"}>
              {truck.isOpen ? openLabel : closedLabel}
            </StatusBadge>
          </div>

          {/* Truck name and info - overlaid on image */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <h1 className="font-display text-4xl text-warm-cream text-center mb-3">
              {truck.name}
            </h1>
            
            {/* Cuisine tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {truck.cuisine.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-charcoal/80 font-mono text-[10px] uppercase tracking-wider text-muted-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Follow button */}
            <PrimaryButton 
              onClick={() => setIsFollowing(!isFollowing)}
              variant="primary"
              className="w-auto mx-auto flex items-center justify-center gap-2 px-8"
            >
              <Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />
              {isFollowing ? followingLabel : followLabel}
            </PrimaryButton>
          </div>
        </div>

        {/* Today's Schedule Section */}
        <div className="p-4">
          <h2 className="font-display text-2xl text-warm-cream mb-4 pb-2 border-b border-border-dark">
            {todayScheduleLabel}
          </h2>

          <div className="flex flex-col gap-3">
            {mockTodaySchedule.map((shift, index) => (
              <div 
                key={index}
                className={`p-4 ${index === 0 ? 'bg-fire-orange' : 'bg-charcoal border border-border-dark'}`}
              >
                <span className={`font-mono text-[10px] uppercase tracking-wider mb-2 block ${index === 0 ? 'text-app-black' : 'text-muted-text'}`}>
                  {shift.type === "current" ? currentLocationLabel : eveningShiftLabel}
                </span>
                <h3 className={`font-display text-lg mb-1 ${index === 0 ? 'text-app-black' : 'text-warm-cream'}`}>
                  {shift.location}
                </h3>
                <span className={`font-mono text-[11px] uppercase tracking-wider ${index === 0 ? 'text-app-black/80' : 'text-muted-text'}`}>
                  {shift.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 pb-4">
          <div className="bg-charcoal border border-border-dark p-4">
            <h3 className="font-display text-lg text-warm-cream mb-4">{quickStatsLabel}</h3>
            <div className="flex">
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-1">
                  {stampsLabel}
                </span>
                <span className="font-display text-2xl text-fire-orange">
                  {stamps.current.toString().padStart(2, '0')} / {stamps.total}
                </span>
              </div>
              <div className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-1">
                  {followersLabel}
                </span>
                <span className="font-display text-2xl text-warm-cream">
                  {followers}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Concept */}
        <div className="px-4 pb-6">
          <h2 className="font-display text-2xl text-warm-cream mb-3">
            {conceptLabel}
          </h2>
          <p className="text-sm text-muted-text leading-relaxed">
            {conceptDescription}
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="px-4 pb-4">
          {/* Main image */}
          <div className="aspect-[4/3] bg-graphite overflow-hidden mb-2">
            <img 
              src={mockGallery[0]} 
              alt="Gallery"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          
          {/* Grid of smaller images */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {mockGallery.slice(1, 3).map((url, i) => (
              <div key={i} className="aspect-square bg-graphite overflow-hidden">
                <img 
                  src={url} 
                  alt="Gallery"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>

          {/* Remaining image */}
          <div className="aspect-square bg-graphite overflow-hidden mb-4">
            <img 
              src={mockGallery[3]} 
              alt="Gallery"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* View full gallery placeholder */}
          <div className="bg-charcoal border border-border-dark border-dashed p-8 flex flex-col items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-text mb-2" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
              {viewGalleryLabel}
            </span>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="fixed bottom-20 right-4">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-fire-orange flex items-center justify-center text-app-black"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom padding for tab bar */}
        <div className="h-24" />
      </div>
    </div>
  )
}
