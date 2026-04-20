"use client"

import { cn } from "@/lib/utils"
import { Gift } from "lucide-react"

interface LoyaltyCardProps {
  truckName: string
  stampsCollected: number
  stampsRequired: number
  reward: string
  locale?: "en" | "fr"
  className?: string
}

export function LoyaltyCard({ 
  truckName, 
  stampsCollected, 
  stampsRequired,
  reward,
  locale = "en",
  className 
}: LoyaltyCardProps) {
  const isComplete = stampsCollected >= stampsRequired
  const progressLabel = locale === "fr" 
    ? `${stampsCollected}/${stampsRequired} TAMPONS` 
    : `${stampsCollected}/${stampsRequired} STAMPS`
  const rewardReadyLabel = locale === "fr" ? "RÉCOMPENSE PRÊTE!" : "REWARD READY!"

  return (
    <div
      className={cn(
        "bg-charcoal border border-border-dark p-4",
        isComplete && "border-fire-orange",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display text-lg text-warm-cream">{truckName}</h3>
        {isComplete && (
          <span className="badge-pill bg-fire-orange text-warm-cream">
            {rewardReadyLabel}
          </span>
        )}
      </div>
      
      {/* Stamp grid */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {Array.from({ length: stampsRequired }).map((_, i) => {
          const isFilled = i < stampsCollected
          return (
            <div
              key={i}
              className={cn(
                "aspect-square border flex items-center justify-center",
                isFilled 
                  ? "bg-fire-orange border-fire-orange" 
                  : "bg-graphite border-border-dark"
              )}
            >
              {isFilled && <Gift className="w-4 h-4 text-warm-cream" />}
            </div>
          )
        })}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
          {progressLabel}
        </span>
        <span className="text-sm text-warm-cream">{reward}</span>
      </div>
    </div>
  )
}

export function LoyaltyCardSkeleton() {
  return (
    <div className="bg-charcoal border border-border-dark p-4">
      <div className="h-5 w-32 skeleton mb-3" />
      <div className="grid grid-cols-5 gap-2 mb-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-square skeleton" />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="h-3 w-20 skeleton" />
        <div className="h-4 w-24 skeleton" />
      </div>
    </div>
  )
}
