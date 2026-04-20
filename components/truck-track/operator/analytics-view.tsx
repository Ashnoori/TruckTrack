"use client"

import { useState } from "react"
import { TrendingUp, Users, MapPin, Eye, Lock } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"

interface AnalyticsViewProps {
  locale?: "en" | "fr"
  isPro?: boolean
}

// Mock analytics data
const mockStats = {
  followers: 1247,
  followersGrowth: 12,
  views: 3892,
  viewsGrowth: 8,
}

const mockChartData = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 180 },
  { day: "Wed", value: 150 },
  { day: "Thu", value: 220 },
  { day: "Fri", value: 310 },
  { day: "Sat", value: 420 },
  { day: "Sun", value: 280 },
]

const mockTopLocations = [
  { name: "ByWard Market", visits: 892 },
  { name: "Lansdowne Park", visits: 654 },
  { name: "Sparks Street", visits: 423 },
  { name: "Preston Street", visits: 312 },
]

export function AnalyticsView({ locale = "en", isPro = true }: AnalyticsViewProps) {
  const titleLabel = locale === "fr" ? "STATISTIQUES" : "ANALYTICS"
  const followersLabel = locale === "fr" ? "ABONNÉS" : "FOLLOWERS"
  const viewsLabel = locale === "fr" ? "VUES" : "PROFILE VIEWS"
  const weeklyLabel = locale === "fr" ? "CETTE SEMAINE" : "THIS WEEK"
  const topLocationsLabel = locale === "fr" ? "TOP EMPLACEMENTS" : "TOP LOCATIONS"
  const proRequiredLabel = locale === "fr" ? "PRO REQUIS" : "PRO REQUIRED"
  const upgradeLabel = locale === "fr" ? "PASSER À PRO" : "UPGRADE TO PRO"
  const upgradeDescLabel = locale === "fr" 
    ? "Débloquez les statistiques avancées, cartes fidélité et placement prioritaire."
    : "Unlock advanced analytics, loyalty stamps, and priority placement."

  // Non-pro overlay
  if (!isPro) {
    return (
      <div className="h-full flex flex-col bg-app-black">
        <header className="px-4 py-4 border-b border-border-dark flex items-center justify-between">
          <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
          <StatusBadge variant="accent">{proRequiredLabel}</StatusBadge>
        </header>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-charcoal border border-border-dark flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-text" />
          </div>
          <h2 className="font-display text-xl text-warm-cream mb-2">
            {locale === "fr" ? "STATISTIQUES PRO" : "PRO ANALYTICS"}
          </h2>
          <p className="text-sm text-muted-text max-w-xs mb-6">
            {upgradeDescLabel}
          </p>
          <PrimaryButton>{upgradeLabel}</PrimaryButton>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...mockChartData.map(d => d.value))

  return (
    <div className="h-full flex flex-col bg-app-black">
      <header className="px-4 py-4 border-b border-border-dark flex items-center justify-between">
        <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
        <StatusBadge variant="accent">PRO</StatusBadge>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-charcoal border border-border-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-fire-orange" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                  {followersLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl text-warm-cream">
                  {mockStats.followers.toLocaleString()}
                </span>
                <span className="flex items-center text-success text-xs">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  +{mockStats.followersGrowth}%
                </span>
              </div>
            </div>
            
            <div className="bg-charcoal border border-border-dark p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-fire-orange" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                  {viewsLabel}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl text-warm-cream">
                  {mockStats.views.toLocaleString()}
                </span>
                <span className="flex items-center text-success text-xs">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  +{mockStats.viewsGrowth}%
                </span>
              </div>
            </div>
          </div>

          {/* Followers chart */}
          <div className="bg-charcoal border border-border-dark p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
                {followersLabel}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-fire-orange">
                {weeklyLabel}
              </span>
            </div>
            
            {/* Simple bar chart */}
            <div className="flex items-end justify-between gap-2 h-32">
              {mockChartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-fire-orange transition-all duration-300"
                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-text">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top locations */}
          <div className="bg-charcoal border border-border-dark">
            <div className="px-4 py-3 border-b border-border-dark">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
                {topLocationsLabel}
              </span>
            </div>
            {mockTopLocations.map((location, i) => (
              <div 
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${i !== mockTopLocations.length - 1 ? 'border-b border-border-dark' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-fire-orange w-4">
                    {i + 1}
                  </span>
                  <MapPin className="w-4 h-4 text-muted-text" />
                  <span className="text-sm text-warm-cream">{location.name}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                  {location.visits} {locale === "fr" ? "visites" : "visits"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
